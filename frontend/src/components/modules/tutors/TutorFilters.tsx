"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function TutorFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/tutors?${params.toString()}`);
    };

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (search) {
                params.set("search", search);
            } else {
                params.delete("search");
            }
            router.push(`/tutors?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [search, router]);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Search by name or subject..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                <Select
                    value={searchParams.get("rating") || "all"}
                    onValueChange={(v) => handleFilterChange("rating", v)}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={searchParams.get("price") || "all"}
                    onValueChange={(v) => handleFilterChange("price", v)}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-50">Under $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100+">$100+</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={searchParams.get("experience") || "all"}
                    onValueChange={(v) => handleFilterChange("experience", v)}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="1-3">1-3 Years</SelectItem>
                        <SelectItem value="3-5">3-5 Years</SelectItem>
                        <SelectItem value="5+">5+ Years</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

