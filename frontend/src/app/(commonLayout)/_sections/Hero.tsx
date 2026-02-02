"use client";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className=" flex min-h-screen items-center justify-center bg-orange-50">
      <div className=" mx-auto grid w-full
       max-w-(--breakpoint-xl) gap-12 px-6  lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <Badge
            asChild
            className="rounded-full border-border py-1"
            variant="secondary"
          >
            <Link href="#">
              New! Explore our latest courses{" "}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>
          <h1 className="mt-6 max-w-[17ch] font-bold text-4xl
           leading-[1.2]! tracking-[-0.035em]
            md:text-6xl ">
            Find the Right Tutor. Learn Smarter.
          </h1>
          <p className="mt-6 max-w-[60ch] text-foreground/80 sm:text-lg">
            Browse top-rated tutors across multiple subjects and book sessions
            in seconds
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button className="rounded-full text-base " size="lg">
              Get Started <ArrowUpRight className="h-5! w-5!" />
            </Button>
            <Button
              className="rounded-full text-base shadow-none"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="h-5! w-5!" /> Browse Courses
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[600px] ">
          <Image
            src={"/grad.jpg"}
            alt="hero-image"
            className="object-cover rounded-2xl"
         fill
          />
        </div>
      </div>
    </div>
  );
}
