"use client";

import { TTutor } from "@/Types/Ttutor";
import TutorCard from "./TutorCard";
import TutorFilters from "./TutorFilters";
import { useSearchParams } from "next/navigation";
import { useFilterTutors } from "@/hooks/useTutors";

export default function TutorList({ initialTutors }: { initialTutors: any }) {
  const searchParams = useSearchParams();

  // const params = {
  //   searchQuery: searchParams.get("search") || "",
  //   rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : 0,
  //   experience: searchParams.get("experience") || "",
  //   price: searchParams.get("price") || ""
  // };
  const params = {
    search: searchParams.get("search") || "",
    rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : 0,
  
  };

  const { data, isLoading } = useFilterTutors(params as any, initialTutors);
  const tutors = data?.result || [];

  return (
    <div className="max-w-7xl mx-auto">
      <TutorFilters />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      ) : tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor: TTutor) => (
            <TutorCard key={tutor.tutor_id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No tutors found matching your filters.</p>
          <button
            onClick={() => window.location.href = '/tutors'}
            className="mt-4 text-custom-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
