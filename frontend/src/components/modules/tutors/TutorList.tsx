import TutorCard from "./TutorCard";

export default function TutorList({ tutors }: { tutors: TTutor[] }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.tutor_id} tutor={tutor} />
      ))}
    </div>
  );
}