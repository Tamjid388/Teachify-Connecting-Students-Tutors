import ReviewsAndRatings from "@/components/modules/tutor-dashboard/reviews-and-ratings/ReviewsAndRatings";
import { tutorService } from "@/services/tutor-service";
import { reviewService } from "@/services/review-service";
import { cookies } from "next/headers";
import type { TReview } from "@/components/modules/tutor-dashboard/reviews-and-ratings/ReviewsAndRatings";

export default async function ReviewAndRatings() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { data } = await tutorService.myProfile({ headers: { Cookie: cookieString } });
  const profile = data?.result;

  const reviewData = profile?.tutor_id
    ? await reviewService.getReviews(profile.tutor_id, cookieString).catch(() => null)
    : null;

  const reviews: TReview[] = reviewData?.result ?? [];

  return (
    <div>
      <ReviewsAndRatings reviews={reviews} />
    </div>
  );
}