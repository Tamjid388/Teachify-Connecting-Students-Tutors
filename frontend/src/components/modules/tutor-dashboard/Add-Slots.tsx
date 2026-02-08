"use client";

import { useForm } from "@tanstack/react-form";
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

export default function AddSlots() {
  const form = useForm({
    defaultValues: {
      day: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const startDateTime = new Date(`${value.startDate}T${value.startTime}`);
        const endDateTime = new Date(`${value.endDate}T${value.endTime}`);

        const payload = {
          day: value.day,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        };

        const res = await addAvailabilitySlot(payload);

        console.log("Slot added:", res);

        form.reset();
        toast.success("Availability slot added successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to add slot. Try again.");
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-custom-primary mb-1">
            Add Availability Slot
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Set your available teaching hours
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Day */}
          <form.Field
            name="day"
            validators={{
              onChange: ({ value }) => (!value ? "Day is required" : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-custom-accent" />
                  Day of Week
                </label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-custom-primary focus:ring-custom-primary/20 transition-all">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d) => (
                      <SelectItem
                        key={d}
                        value={d}
                        className="focus:bg-custom-primary/10 focus:text-custom-primary"
                      >
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    {field.state.meta.errors}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          {/* .......................... */}
          {/* Start Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-custom-secondary" />
              Start Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <form.Field
                name="startDate"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Date required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-custom-secondary focus:ring-custom-secondary/20 transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        {field.state.meta.errors}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="startTime"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Time required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-custom-secondary focus:ring-custom-secondary/20 transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        {field.state.meta.errors}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-custom-secondary" />
              End Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <form.Field
                name="endDate"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Date required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-custom-secondary focus:ring-custom-secondary/20 transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        {field.state.meta.errors}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="endTime"
                validators={{
                  onChange: ({ value, fieldApi }) => {
                    if (!value) return "Time required";

                    const startDate = fieldApi.form.getFieldValue("startDate");
                    const startTime = fieldApi.form.getFieldValue("startTime");
                    const endDate = fieldApi.form.getFieldValue("endDate");

                    if (startDate && startTime && endDate) {
                      const start = new Date(`${startDate}T${startTime}`);
                      const end = new Date(`${endDate}T${value}`);

                      if (end <= start) {
                        return "End time must be after start time";
                      }
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-custom-secondary focus:ring-custom-secondary/20 transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        {field.state.meta.errors}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!form.state.canSubmit}
            className="w-full bg-custom-primary hover:bg-custom-primary/90 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Save Availability Slot
          </Button>
        </form>
      </div>
    </div>
  );
}
