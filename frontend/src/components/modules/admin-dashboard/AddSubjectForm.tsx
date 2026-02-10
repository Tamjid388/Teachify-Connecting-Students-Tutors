"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin-service";
import { toast } from "sonner";
import { createSubjectAction } from "@/actions/admin.actions";

const formSchema = z.object({
  subject: z.string().min(2, "Subject name must be at least 2 characters."),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters.")
    
});

export default function AddSubjectForm() {
  const form = useForm({
    defaultValues: {
      subject: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
    
      console.log("Submitted Subject:", value);
     try {
    const res=await createSubjectAction(value)
    console.log(res);
      if (res.error) {
      // Show the actual error from backend
      toast.error(res.error);
      return;
    }
        toast.success("Subject added Successfully")
        //  form.reset();
     } catch (error) {
        console.error("Submit error:", error);
    toast.error("Failed to add subject. Please try again.");
     }
     
    },
  });

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Add Subject</CardTitle>
        <CardDescription>
          Fill the subject details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="add-subject-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Subject Name */}
            <form.Field name="subject">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Subject Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Mathematics"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Optional description"
                    />
                    <FieldDescription>
                      A short description of the subject (optional)
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <div className="flex justify-end p-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="mr-2"
        >
          Reset
        </Button>
        <Button type="submit" form="add-subject-form">
          {form.state.isSubmitting?"Submitting...":"Add Subject"}
        </Button>
      </div>
    </Card>
  );
}
