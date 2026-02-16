"use client";

import { useState } from "react";
import { Star, Clock, BookOpen, CheckCircle2, Calendar, MessageCircle } from "lucide-react";
import BookingCard from "./BookingCard/BookingCard";

interface TutorData {
  tutor_id: string;
  image: string;
  bio: string;
  avilability_slot: string;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  experience: number;
  education: string;
  userId: string;
  categories: string[];
}

interface TutorDetailsProps {
  data: TutorData;
}

export default function TutorDetails({ data }: TutorDetailsProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate next 7 days for booking
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const timeSlots = {
    MORNING: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    AFTERNOON: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
    EVENING: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  };

  const availableSlots = timeSlots[data.avilability_slot as keyof typeof timeSlots] || [];

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot");
      return;
    }
    // Handle booking logic here
    console.log("Booking:", { tutorId: data.tutor_id, date: selectedDate, slot: selectedSlot });
    alert(`Booking confirmed for ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <div className="min-h-screen ">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--color-custom-primary)' }}></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--color-custom-accent)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200 mb-8">
          <div className="relative h-48" style={{ backgroundColor: 'var(--color-custom-primary)' }}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent"></div>
          </div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row gap-8 -mt-20">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={data.image}
                    alt="Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
                {data.is_verified && (
                  <div className="absolute -bottom-2 -right-2 text-white rounded-full p-2 shadow-lg" style={{ backgroundColor: 'var(--color-custom-accent)' }}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Tutor Info */}
              <div className="flex-1 pt-4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Expert Tutor
                      </h1>
                      {data.is_verified && (
                        <span className="px-3 py-1 text-white text-sm font-semibold rounded-full" style={{ backgroundColor: 'var(--color-custom-accent)' }}>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg mb-3">{data.education}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < data.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-700 font-semibold">{data?.rating?.toFixed(1)}</span>
                      <span className="text-gray-500">({data?.total_reviews} reviews)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {/* Handle message */}}
                    className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    style={{ backgroundColor: 'var(--color-custom-primary)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center" style={{ color: 'var(--color-custom-primary)' }}>
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-xl font-bold text-gray-900">{data.experience} years</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center" style={{ color: 'var(--color-custom-secondary)' }}>
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Available</p>
                        <p className="text-xl font-bold text-gray-900">{data.avilability_slot}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center" style={{ color: 'var(--color-custom-accent)' }}>
                        <Star className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Reviews</p>
                        <p className="text-xl font-bold text-gray-900">{data.total_reviews}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.bio}
              </p>
            </div>

            {/* Expertise Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Expertise & Specializations
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-custom-accent)' }} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Algebra Mastery</h3>
                    <p className="text-sm text-gray-600">Advanced problem-solving techniques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-custom-accent)' }} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Calculus Excellence</h3>
                    <p className="text-sm text-gray-600">Derivatives, integrals & applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-custom-accent)' }} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Test Preparation</h3>
                    <p className="text-sm text-gray-600">SAT, ACT, and university exams</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-custom-accent)' }} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Learning</h3>
                    <p className="text-sm text-gray-600">Tailored to your learning style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
          <BookingCard
    tutorId={data.tutor_id}
    availabilitySlot={data.avilability_slot}
  />
          </div>
        </div>
      </div>

    
    </div>
  );
}