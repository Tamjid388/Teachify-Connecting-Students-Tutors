"use client";
import { TTutor } from "@/Types/Ttutor";
import TutorCard from "./TutorCard";
import TutorFilters from "./TutorFilters";


export default function TutorList({ tutors }: { tutors: TTutor[] }) {



  return (
    <div className="max-w-7xl mx-auto">
      <TutorFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors?.map((tutor: TTutor) => (
          <TutorCard key={tutor.tutor_id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
