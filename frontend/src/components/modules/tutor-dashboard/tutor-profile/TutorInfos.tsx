import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Star,
    BookOpen,
    Clock,
    CheckCircle,
    XCircle,
    Phone,
    Mail,
    GraduationCap,
    Briefcase,
    Tag,
    MessageSquare,
    Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const availabilityLabel: Record<string, string> = {
    FULLDAY: "Full Day",
    MORNING: "Morning",
    AFTERNOON: "Afternoon",
    EVENING: "Evening",
};

export default function TutorInfos({ profile }: any) {
    if (!profile) return null;

    const {
        user,
        image,
        bio,
        avilability_slot,
        phone_number,
        averageRating,
        reviewCount,
        education,
        experience,
        is_verified,
        categories,
    } = profile;

    const initials = user?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-4">

                {/* ── Hero Card ── */}
                <Card className="overflow-hidden border-0 shadow-lg">
                    {/* top accent bar */}
                    <div
                        className="h-2 w-full"
                        style={{
                            background:
                                "linear-gradient(to right, var(--custom-primary), var(--custom-accent), var(--custom-secondary))",
                        }}
                    />

                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div
                                    className="rounded-full p-[3px]"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, var(--custom-primary), var(--custom-accent))",
                                    }}
                                >
                                    <Avatar className="w-24 h-24 border-2 border-background">
                                        <AvatarImage src={image} alt={user?.name} className="object-cover" />
                                        <AvatarFallback
                                            className="text-xl font-semibold"
                                            style={{
                                                backgroundColor: "color-mix(in srgb, var(--custom-primary) 10%, transparent)",
                                                color: "var(--custom-primary)",
                                            }}
                                        >
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                {/* verified dot */}
                                <span
                                    className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center ${is_verified ? "bg-green-500" : "bg-red-400"
                                        }`}
                                >
                                    {is_verified ? (
                                        <CheckCircle size={11} className="text-white" />
                                    ) : (
                                        <XCircle size={11} className="text-white" />
                                    )}
                                </span>
                            </div>

                            {/* Name / email / tags */}
                            <div className="flex-1 space-y-2 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                            {user?.name}
                                        </h1>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${is_verified
                                                    ? "border-green-500/40 text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400"
                                                    : "border-red-400/40 text-red-500 bg-red-50 dark:bg-red-500/10 dark:text-red-400"
                                                }`}
                                        >
                                            {is_verified ? "Verified Tutor" : "Not Verified"}
                                        </Badge>
                                    </div>

                                    <Link href="/tutor-dashboard/add-profile">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 border-custom-primary/20 hover:border-custom-primary/50 text-custom-primary"
                                        >
                                            <Edit size={14} />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>

                                <p className="text-sm text-muted-foreground">{user?.email}</p>

                                {/* Category chips */}
                                {categories?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {categories.map((cat: any, i: number) => (
                                            <div
                                                key={i}
                                                className="gap-1 text-xs font-medium"

                                            >
                                                <Tag size={10} />
                                                {cat.category.subject}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Rating bubble */}
                            <div
                                className="shrink-0 flex flex-col items-center justify-center rounded-2xl px-5 py-4 gap-1 min-w-[90px] border"

                            >
                                <div className="flex items-center gap-1" style={{ color: "var(--custom-accent)" }}>
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-xl font-bold text-foreground">
                                        {averageRating?.toFixed(1) ?? "0.0"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <MessageSquare size={11} />
                                    <span className="text-[11px]">
                                        {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* ── Stats Row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            icon: <Briefcase size={20} style={{ color: "var(--custom-primary)" }} />,
                            value: `${experience} Year${experience !== 1 ? "s" : ""}`,
                            label: "Experience",
                        },
                        {
                            icon: <GraduationCap size={20} style={{ color: "var(--custom-primary)" }} />,
                            value: education,
                            label: "Education",
                        },
                        {
                            icon: <Clock size={20} style={{ color: "var(--custom-primary)" }} />,
                            value: availabilityLabel[avilability_slot] ?? avilability_slot,
                            label: "Availability",
                        },
                    ].map((stat, i) => (
                        <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5 flex items-center gap-4">
                                <div
                                    className="rounded-xl p-3 shrink-0"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--custom-primary) 10%, transparent)",
                                    }}
                                >
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground leading-tight">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ── Bio ── */}
                <Card className="border shadow-sm">
                    <CardHeader className="pb-2 pt-5 px-6">
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} style={{ color: "var(--custom-primary)" }} />
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                About
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <Separator className="mb-4" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
                    </CardContent>
                </Card>

                {/* ── Contact ── */}
                <Card className="border shadow-sm">
                    <CardHeader className="pb-2 pt-5 px-6">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Contact Information
                        </span>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-4">
                        <Separator className="mb-2" />

                        {/* Email row */}
                        <div className="flex items-center gap-3">
                            <div
                                className="rounded-lg p-2 shrink-0"
                                style={{
                                    backgroundColor:
                                        "color-mix(in srgb, var(--custom-primary) 10%, transparent)",
                                }}
                            >
                                <Mail size={15} style={{ color: "var(--custom-primary)" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                                <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                            </div>
                            {!user?.emailVerified && (
                                <Badge
                                    variant="outline"
                                    className="text-[10px] border-orange-400/40 text-orange-500 bg-orange-50 dark:bg-orange-500/10 shrink-0"
                                >
                                    Unverified
                                </Badge>
                            )}
                        </div>

                        {/* Phone row */}
                        <div className="flex items-center gap-3">
                            <div
                                className="rounded-lg p-2 shrink-0"
                                style={{
                                    backgroundColor:
                                        "color-mix(in srgb, var(--custom-primary) 10%, transparent)",
                                }}
                            >
                                <Phone size={15} style={{ color: "var(--custom-primary)" }} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                                <p className="text-sm font-medium text-foreground">
                                    {phone_number ?? (
                                        <span className="text-muted-foreground italic">Not provided</span>
                                    )}
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}