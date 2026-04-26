"use client";

import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { assignSubjectsAction } from "@/actions/admin.actions";
import { useRouter } from "next/navigation";

export type Subject = {
  id: string;
  subject: string;
  description: string;
  thumbnail?: string;
  slug?: string;
};

interface AddSubjectsProps {
  subjects: Subject[];
}

export default function AddSubjects({ subjects }: AddSubjectsProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId],
    );
  };

  const handleSubmit = () => {
    if (selectedSubjects.length === 0) {
      return toast.error("Please select at least one subject");
    }

    startTransition(async () => {
      try {
        await assignSubjectsAction(selectedSubjects);
        toast.success("Subjects assigned successfully!");
        setSelectedSubjects([]);
        router.refresh();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        if (message.includes("Tutor not found")) {
          toast.error("You haven't created your tutor profile", {
            description: "Before assigning subjects, please create your profile.",
          });
        } else {
          toast.error(message);
        }
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Select Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={item.id}
                checked={selectedSubjects.includes(item.id)}
                onCheckedChange={() => handleToggleSubject(item.id)}
                className="mt-1"
              />
              <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                <div>
                  <p className="font-semibold text-base">{item.subject}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="mt-6 p-3 bg-muted rounded-md border border-dashed">
            <p className="text-sm font-medium mb-1">
              Selected ({selectedSubjects.length})
            </p>
            <p className="text-[10px] font-mono break-all text-muted-foreground">
              {selectedSubjects.join(", ")}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <Button
          onClick={handleSubmit}
          disabled={isPending || selectedSubjects.length === 0}
          className="w-full"
        >
          {isPending ? "Assigning..." : "Save Selection"}
        </Button>
      </CardFooter>
    </Card>
  );
}
