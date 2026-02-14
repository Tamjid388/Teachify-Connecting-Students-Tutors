"use client";

import { Field, useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { addAvailabilitySlot } from "@/actions/tutor.actions";
import { toast } from "sonner";

const DAYS = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

// ... আগের ইমপোর্টগুলো থাকবে

export default function AddSlots() {
  const form = useForm({
    defaultValues: {
      day: "",
      startTime: "",
      endTime: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const payload = {
          slots: [{
            day: value.day,
            startTime: value.startTime,
            endTime: value.endTime,
          }],
        };
        
        const res = await addAvailabilitySlot(payload);
        
        if (res.success) {
          toast.success("Availability slot added successfully!");
          form.reset();
        } else {
          toast.error(res.message || "Something went wrong");
        }
      } catch (error) {
        toast.error("Failed to add slot. Try again.");
      }
    },
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-custom-primary mb-1">Add Availability Slot</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Set your available teaching hours</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
         
          {/* Start Time */}
          <form.Field name="day"
          validators={{onChange:({value})=>!value?"Day is Requred":undefined}}
          >
{(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-custom-primary" /> Select Day
                </label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="border-2 focus:border-custom-primary">
                    <SelectValue placeholder="Pick a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors && <p className="text-xs text-red-500">{field.state.meta.errors}</p>}
              </div>
            )}
          </form.Field>
          <form.Field
            name="startTime"
            validators={{ onChange: ({ value }) => !value ? "Start time required" : undefined }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-custom-secondary" /> Start Time
                </label>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-2 focus:border-custom-secondary"
                />
                {field.state.meta.errors && <p className="text-xs text-red-500">{field.state.meta.errors}</p>}
              </div>
            )}
          </form.Field>

          {/* End Time */}
          <form.Field
            name="endTime"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (!value) return "End time required";
                const startTime = fieldApi.form.getFieldValue("startTime");
                if (startTime && value <= startTime) return "End time must be after start time";
              }
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-custom-secondary" /> End Time
                </label>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-2 focus:border-custom-secondary"
                />
                {field.state.meta.errors && <p className="text-xs text-red-500">{field.state.meta.errors}</p>}
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full bg-custom-primary mt-4"
              >
                {isSubmitting ? "Saving..." : "Save Availability Slot"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}