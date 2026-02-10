"use client";

import { useState } from "react";
import { useAssignSubjects, useSubjects } from "@/hooks/useCategory";
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

export type Subject = {
  id: string;
  subject: string;
  description: string;
  thumbnail?: string;
  slug?: string;
};

export default function AddSubjects() {
  const { data: result, isLoading, isError, error } = useSubjects();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { mutate: assign, isPending } = useAssignSubjects();

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

    assign(selectedSubjects, {
      onSuccess: () => {
        toast.success("Subjects assigned successfully!");
      },
      onError: (err: Error) => {
        if (err.message.includes("Tutor not found")) {
          toast.error("You Havent Created Your Tutor Profile", {
            description: "Before Assigning Subject Please Make Your Profile",
          });
        } else {
          toast.error(err.message || "Something went wrong");
        }
      },
    });
  };

  if (isLoading) return <div>Loading subjects...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Select Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {result.data?.map((item: Subject) => (
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
