import Image from "next/image";
import { Star, CheckCircle2, Clock, GraduationCap, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TTutor } from "@/Types/Ttutor";


export default function TutorCard({ tutor }: { tutor: TTutor }) {
 
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-custom-primary/20">
      <CardContent className="">
        {/* Image  */}
        <div className="rounded-2xl  relative w-full h-48 overflow-hidden bg-gradient-to-br from-custom-primary/5 to-custom-secondary/5">
          <Image
            src={tutor.image} 
            alt={`${"Tutor"} profile picture`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Verification badge overlay */}
          {tutor.is_verified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-custom-primary text-white border-0 shadow-lg flex items-center gap-1 px-3 py-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </Badge>
            </div>
          )}

          {/* Rating overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-custom-accent text-custom-accent" />
            <span className="font-semibold text-sm">{tutor.rating}</span>
            <span className="text-xs text-gray-500">
              ({tutor.total_reviews})
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Bio */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {tutor.bio}
          </p>

          {/* Info grid */}
          <div className="space-y-2.5">
            {/* Education */}
            <div className="flex items-start gap-2.5 text-sm group/item">
              <GraduationCap className="w-4 h-4 mt-0.5 text-custom-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-gray-500 text-xs">Education</span>
                <p className="font-medium text-gray-800 line-clamp-1">
                  {tutor.education}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-start gap-2.5 text-sm">
              <Briefcase className="w-4 h-4 mt-0.5 text-custom-secondary shrink-0" />
              <div className="flex-1">
                <span className="text-gray-500 text-xs">Experience</span>
                <p className="font-medium text-gray-800">
                  {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'}
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-2.5 text-sm">
              <Clock className="w-4 h-4 mt-0.5 text-custom-accent shrink-0" />
              <div className="flex-1">
                <span className="text-gray-500 text-xs">Availability</span>
                <p className="font-medium text-gray-800">
                  {tutor.avilability_slot}
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
      <Link href={`tutors/${tutor.tutor_id}`}>
          <Button className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-white py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
            Book Now
          </Button>
      </Link>
      
        </div>
      </CardContent>
    </Card>
  );
}