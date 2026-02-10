"use client";
import { ArrowUpRight, CirclePlay, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 h-72 w-72 animate-pulse rounded-full bg-my-custom-color/30 blur-3xl" />
        <div className="absolute top-0 -right-4 h-72 w-72 animate-pulse rounded-full bg-custom-secondary/30 blur-3xl [animation-delay:2s]" />
        <div className="absolute -bottom-8 left-20 h-72 w-72 animate-pulse rounded-full bg-custom-accent/30 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          {/* Badge with gradient */}
          <Badge
            asChild
            className="group w-fit animate-in fade-in slide-in-from-bottom-4 rounded-full border border-my-custom-color/20 bg-gradient-to-r from-my-custom-color/10 to-custom-secondary/10 py-1.5 px-4 shadow-sm transition-all hover:shadow-md hover:scale-105 duration-300"
            variant="secondary"
          >
            <Link href="#" className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-custom-primary dark:text-white" />
              <span className="bg-linear-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent font-medium dark:text-white">
                New! Explore our latest courses
              </span>
              <ArrowUpRight className="ml-1 h-4 w-4 text-my-custom-color transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Badge>

          {/* Main Heading with gradient */}
          <h1 className="mt-6 max-w-[17ch] animate-in fade-in slide-in-from-bottom-4 duration-700 font-bold text-4xl leading-[1.2] tracking-[-0.035em] md:text-6xl lg:text-7xl">
            Find the{" "}
            <span className="bg-gradient-to-r from-custom-primary via-custom-secondary to-custom-accent bg-clip-text text-transparent">
              Right Tutor
            </span>
            . Learn Smarter.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[60ch] animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:200ms] text-foreground/70 text-lg leading-relaxed">
            Browse top-rated tutors across multiple subjects and book sessions
            in seconds. Personalized learning for everyone.
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:400ms]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-my-custom-color border-2 border-background" />
                <div className="h-8 w-8 rounded-full bg-custom-secondary border-2 border-background" />
                <div className="h-8 w-8 rounded-full bg-custom-accent border-2 border-background" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">1,000+</span>
                <span className="text-foreground/60"> Active Tutors</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-custom-accent text-custom-accent" />
              <span className="font-semibold">4.9</span>
              <span className="text-foreground/60">(2.5k reviews)</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:600ms]">
            <Button
              className="group rounded-full bg-gradient-to-r from-custom-primary to-custom-secondary text-base shadow-lg transition-all hover:shadow-xl hover:scale-105 dark:text-white"
              size="lg"
            >
              Get Started
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              className="group rounded-full border-my-custom-color/30 text-base shadow-none hover:bg-my-custom-color/5 hover:border-my-custom-color/50"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Browse Courses
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-foreground/60 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:800ms]">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Verified Tutors</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Image with enhanced effects */}
        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 [animation-delay:400ms]">
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-my-custom-color to-custom-secondary opacity-20 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-custom-secondary to-custom-accent opacity-20 blur-2xl" />

          {/* Main image container */}
          <div className="group relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl lg:h-[600px]">
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Image */}
            <Image
              src={"/grad.jpg"}
              alt="Students learning with tutors"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              priority
            />

            {/* Floating card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl border border-white/20 bg-background/80 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-custom-primary to-custom-accent">
                  <Star className="h-6 w-6 fill-white text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Join 50,000+ Students
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Start learning today
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -right-8 top-1/4 grid grid-cols-3 gap-2 opacity-30">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-my-custom-color"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}