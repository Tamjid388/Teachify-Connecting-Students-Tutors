'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Calendar, CalendarDays, Clock, Mails } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  authorRole: string;
  readTime: number;
  tags: string[];
  createdAt: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/blogs.json');
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <Skeleton className="h-14 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
  <section className="mx-auto max-w-screen-xl px-6 py-16">
    {/* Header */}
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-balance font-semibold text-4xl tracking-tight">
          Welcome to our blog!
        </h2>
        <p className="mt-2 text-balance text-lg text-muted-foreground tracking-normal sm:text-xl">
          Stay updated with the latest news and insights.
        </p>
      </div>
      <Button
        className="hidden gap-3 sm:inline-flex"
        size="lg"
        variant="secondary"
      >
        <Mails />
        <span className="hidden lg:inline">
          Subscribe to our newsletter
        </span>
        <span className="hidden md:inline lg:hidden">Subscribe</span>
      </Button>
    </div>

    <Separator className="mt-7 mb-10" />

    {/* Blog Grid */}
    {blogs.length > 0 ? (
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs`}>
            <div className="group cursor-pointer ">
              <div className="relative aspect-[14/9] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-1">
                {/* Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h3 className="mt-3 font-semibold text-xl line-clamp-2">
                  {blog.title}
                </h3>

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <CalendarDays className="size-4" />
                    {formatDate(blog.createdAt)}
                  </div>

                  <Button className="-me-2" variant="ghost">
                    Read Article <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No blogs found.</p>
      </div>
    )}

    {/* Load more */}
    <Button className="mx-auto mt-16 flex" size="lg" variant="secondary">
      Load more articles
    </Button>
  </section>
  );
}