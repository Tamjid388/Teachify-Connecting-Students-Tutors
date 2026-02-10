"use client";
import { useForm } from "@tanstack/react-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { tutorService } from "@/services/tutor-service";
import { toast } from "sonner";

const formSchema = z.object({
  image: z.string().url("Please provide a valid image URL."),
  bio: z
    .string()
    .min(30, "Bio must be at least 30 characters.")
    .max(300, "Bio must be at most 300 characters."),
  rating: z.number().min(1).max(5),
  experience: z.number().min(0).max(30),
  education: z
    .string()
    .min(5, "Education must be at least 5 characters.")
    .max(100),
});

export default function AddProfileForm() {
  const form = useForm({
    defaultValues: {
      image: "",
      bio: "",
      rating: 5,
      experience: 0,
      education: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      try {
        await tutorService.createProfile(value);

        toast.success("Tutor profile created successfully");
        form.reset();
      } catch (error) {
        toast.error("Failed to create tutor profile");
        console.error(error);
      }
    },
  });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-custom-primary mb-1">
          Create Tutor Profile
        </CardTitle>
        <CardDescription>
          Add basic information about the tutor.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="add-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Image */}
            <form.Field name="image">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Profile Image URL</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Bio */}
            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Bio</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={5}
                        placeholder="Short introduction about the tutor..."
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText>
                          {field.state.value.length}/300
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Brief background, teaching style, expertise.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Rating */}
            <form.Field name="rating">
              {(field) => (
                <Field>
                  <FieldLabel>Rating (1–5)</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </Field>
              )}
            </form.Field>

            {/* Experience */}
            <form.Field name="experience">
              {(field) => (
                <Field>
                  <FieldLabel>Experience (Years)</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </Field>
              )}
            </form.Field>

            {/* Education */}
            <form.Field name="education">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Education</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="BSc in Computer Science"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            className="text-custom-primary"
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-custom-primary
          hover:bg-custom-accent
          "
            form="add-profile-form"
          >
            Create Profile
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
