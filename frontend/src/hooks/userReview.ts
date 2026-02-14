import { reviewService, CreateReviewPayload } from "@/services/review-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReviewMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewPayload) => reviewService.createReview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["review"] });
            toast.success("Review submitted successfully!");
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Something went wrong";

            toast.error("Review Submission Failed", {
                description: message,
            });
        },
    });
};
