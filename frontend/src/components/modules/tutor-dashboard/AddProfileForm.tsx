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
import { createTutorProfileAction, updateTutorProfileAction } from "@/actions/tutor.actions";

const formSchema = z.object({
  image: z.string().url("Please provide a valid image URL."),
  bio: z
    .string()
    .min(30, "Bio must be at least 30 characters.")
    .max(300, "Bio must be at most 300 characters."),

  experience: z.number().min(0).max(30),
  education: z
    .string()
    .min(5, "Education must be at least 5 characters.")
    .max(100),
});

export default function AddProfileForm({ profile }: { profile: any }) {
  console.log(profile.tutor_id)
  const form = useForm({
    defaultValues: {
      image: profile.image || "",
      bio: profile.bio || "",

      experience: profile.experience || 0,
      education: profile.education || "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {

      try {
        if (profile.tutor_id) {
          // update profile
          console.log("update profile")
          console.log("profile id", profile.tutor_id)
          await updateTutorProfileAction(value)
          toast.success("Tutor profile updated successfully");
        } else {
          console.log("create profile")
          await createTutorProfileAction(value)
          toast.success("Tutor profile created successfully");
        }


        form.reset();
      } catch (error) {
        toast.error(`Failed to ${profile ? "update" : "create"} tutor profile`);
        console.error(error);
      }
    },
  });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-custom-primary mb-1">
          {profile ? "Update Tutor Profile" : "Create Tutor Profile"}
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
            className="text-custom-primary dark:text-white"
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-custom-primary
          hover:bg-custom-accent dark:text-white
          "
            form="add-profile-form"
          >
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
