"use client";

import { useGetReviews } from "@/hooks/userReview";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export type User = {
  name: string;
  image: string | null;
  email: string;
};

export type Booking = {
  booking_id: string;
  startTime: string; 
  endTime: string;
  createdAt: string;
};

export type TReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tutorId: string;
  booking_id: string;
  user: User;
  booking: Booking;
};
export default function ReviewsAndRatings({ profile }: { profile: any }) {
  const { data, isLoading, error } = useGetReviews(profile?.tutor_id);
  const reviews:TReview[] = data?.result || [];

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Failed to load reviews</div>;
  if (!reviews.length) return <div>No reviews yet</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>All reviews for this tutor</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Reviewer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Booking Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">
              <p>  {review.user?.name || review.userId}</p>
              <p className="text-sm text-muted-foreground">  {review.user?.email || review.userId}</p>
              </TableCell>
              <TableCell>{review.rating} ⭐</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                {new Date(review.booking?.startTime).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}