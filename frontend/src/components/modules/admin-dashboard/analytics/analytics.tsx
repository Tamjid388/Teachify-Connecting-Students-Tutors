"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/useAdmin";
import { BookOpen, CheckCircle, MessageSquare, Users, GraduationCap } from "lucide-react";
import StatCard from "./StatCard";




export interface StatCardProps {
  label: string;
  value: number | string | undefined;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}




export default function Analytics() {
  const { data: stats } = useAdminStats();

  const {
    totalBookings,
    totalCompletedBookings,
    totalReviews,
    totalTutors,
    totalUsers,
  } = stats ?? {};

  const statCards: StatCardProps[] = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <Users size={20} />,
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Tutors",
      value: totalTutors,
      icon: <GraduationCap size={20} />,
      iconBg: "bg-custom-primary/10",
      iconColor: "text-custom-primary",
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: <BookOpen size={20} />,
      iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Completed Bookings",
      value: totalCompletedBookings,
      icon: <CheckCircle size={20} />,
      iconBg: "bg-green-500/10 dark:bg-green-500/15",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: <MessageSquare size={20} />,
      iconBg: "bg-custom-accent/10",
      iconColor: "text-custom-accent",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground dark:text-white">Analytics</h1>
        <p className="text-sm text-muted-foreground dark:text-zinc-400 mt-1">
          Overview of platform activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

    </div>
  );
}