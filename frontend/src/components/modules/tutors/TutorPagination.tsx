"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { TutorsPaginationMeta } from "@/Types/Ttutor";

function buildTutorsUrl(searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return qs ? `/tutors?${qs}` : "/tutors";
}

export default function TutorPagination({
  pagination,
}: {
  pagination: TutorsPaginationMeta;
}) {
  const searchParams = useSearchParams();
  const { currentPage, totalPages, totalItems, limit, hasNextPage, hasPreviousPage } =
    pagination;

  if (totalItems === 0) {
    return null;
  }

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);
  const prevHref = buildTutorsUrl(searchParams, currentPage - 1);
  const nextHref = buildTutorsUrl(searchParams, currentPage + 1);

  const prevClass = cn(
    buttonVariants({ variant: "ghost", size: "default" }),
    "gap-1 px-2.5 sm:pl-2.5",
  );
  const nextClass = cn(
    buttonVariants({ variant: "ghost", size: "default" }),
    "gap-1 px-2.5 sm:pr-2.5",
  );

  return (
    <div className="flex flex-col gap-4 mt-10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground sm:min-w-0 sm:flex-1">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">{totalItems}</span>{" "}
        tutors
        {totalPages > 1 ? (
          <>
            {" "}
            · Page {currentPage} of {totalPages}
          </>
        ) : null}
      </p>

      <div className="flex w-full justify-end sm:w-auto sm:shrink-0">
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            {hasPreviousPage ? (
              <Link
                href={prevHref}
                prefetch={false}
                scroll={false}
                aria-label="Go to previous page"
                className={prevClass}
              >
                <ChevronLeftIcon />
                <span className="hidden sm:block">Previous</span>
              </Link>
            ) : (
              <span
                aria-disabled
                aria-label="Previous page (unavailable)"
                className={cn(prevClass, "pointer-events-none opacity-50")}
              >
                <ChevronLeftIcon />
                <span className="hidden sm:block">Previous</span>
              </span>
            )}
          </PaginationItem>

          {totalPages > 1 ? (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                size="icon"
                onClick={(e) => e.preventDefault()}
                aria-label={`Page ${currentPage}`}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          ) : null}

          <PaginationItem>
            {hasNextPage ? (
              <Link
                href={nextHref}
                prefetch={false}
                scroll={false}
                aria-label="Go to next page"
                className={nextClass}
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRightIcon />
              </Link>
            ) : (
              <span
                aria-disabled
                aria-label="Next page (unavailable)"
                className={cn(nextClass, "pointer-events-none opacity-50")}
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRightIcon />
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    </div>
  );
}
