"use client"

import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Star } from "lucide-react"
import { useState } from "react"

interface WriteReviewProps {
    bookingId: string
    onSubmit?: (data: { rating: number; comment: string }) => void
}

export default function WriteReview({ bookingId, onSubmit }: WriteReviewProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [hoveredRating, setHoveredRating] = useState(0)

    const form = useForm({
        defaultValues: {
            rating: 0,
            comment: "",
        },
        onSubmit: async ({ value }) => {
            console.log("Review submitted:", { bookingId, ...value })

            // Call the onSubmit callback if provided
            if (onSubmit) {
                onSubmit(value)
            }

            // Reset form and close modal
            form.reset()
            setIsOpen(false)
        },
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="default">
                    Write Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience with this booking (ID: {bookingId})
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-6 py-4"
                >
                    {/* Rating Section */}
                    <form.Field
                        name="rating"
                        validators={{
                            onChange: ({ value }) =>
                                value === 0 ? "Please select a rating" : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="rating">Rating</Label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => field.handleChange(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                className={`h-8 w-8 ${star <= (hoveredRating || field.state.value)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    {field.state.value > 0 && (
                                        <span className="ml-2 text-sm text-muted-foreground">
                                            {field.state.value} out of 5 stars
                                        </span>
                                    )}
                                </div>
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">
                                        {field.state.meta.errors}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Comment Section */}
                    <form.Field
                        name="comment"
                        validators={{
                            onChange: ({ value }) =>
                                value.length > 500
                                    ? "Comment must be less than 500 characters"
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Textarea
                                    id="comment"
                                    placeholder="Share your thoughts about this booking experience..."
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    rows={6}
                                    className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    {field.state.value.length} / 500 characters
                                </p>
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">
                                        {field.state.meta.errors}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <DialogFooter>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                        >
                            {([canSubmit, isSubmitting]) => (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            form.reset()
                                            setIsOpen(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Review"}
                                    </Button>
                                </>
                            )}
                        </form.Subscribe>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
