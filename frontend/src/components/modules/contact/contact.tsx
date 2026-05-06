"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const contactChannels = [
  {
    icon: Mail,
    title: "Email",
    description: "We usually reply within one business day.",
    action: (
      <Link
        href="mailto:support@teachify.com"
        className="text-sm font-medium text-custom-primary hover:underline"
      >
        support@teachify.com
      </Link>
    ),
  },
  {
    icon: Clock,
    title: "Hours",
    description: "Our team is available during the week.",
    action: (
      <span className="text-sm text-muted-foreground">
        Mon–Fri, 9:00 AM – 6:00 PM EST
      </span>
    ),
  },
  {
    icon: MapPin,
    title: "Where we are",
    description: "Teachify is remote-first with tutors and students worldwide.",
    action: (
      <span className="text-sm text-muted-foreground">
        Serving learners globally
      </span>
    ),
  },
] as const;

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setIsSending(true);
    window.setTimeout(() => {
      setIsSending(false);
      toast.success(
        "Thanks — your message has been recorded. We’ll get back to you soon.",
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 600);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,color-mix(in_oklab,var(--color-custom-primary)_18%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <MessageCircle className="size-3.5 text-custom-primary" />
            We’re here to help
          </div>
          <h1 className="mt-4 text-balance font-semibold text-4xl tracking-tight md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-3 text-pretty text-lg text-muted-foreground sm:text-xl">
            Questions about tutoring, your account, or partnerships? Send us a
            note — the Teachify team reads every message.
          </p>
        </div>

        <Separator className="my-10 md:my-12" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-5">
            <p className="text-muted-foreground leading-relaxed">
              Prefer email? Reach us directly at{" "}
              <Link
                href="mailto:support@teachify.com"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                support@teachify.com
              </Link>
              . For the fastest help, include your account email and a short
              summary of what you need.
            </p>
            <ul className="space-y-4">
              {contactChannels.map(
                ({ icon: Icon, title, description, action }) => (
                  <li key={title}>
                    <Card className="border-border/80 shadow-sm transition-shadow hover:shadow-md">
                      <CardContent className="flex gap-4 pt-6">
                        <div className="flex w-12 h-12 items-center justify-center rounded-lg bg-custom-primary/10 text-custom-primary">
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <p className="font-semibold leading-none">{title}</p>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                          <div className="pt-1">{action}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ),
              )}
            </ul>
          </div>
          <p className="mt-4" />
          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Send a message</CardTitle>
                <CardDescription>
                  Tell us how we can help. This demo doesn’t post to a server
                  yet — wire your API here when you’re ready.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject (optional)</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="e.g. Booking issue, tutor application"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="How can we help?"
                      rows={5}
                      className="min-h-[120px] resize-y"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="custom"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSending}
                  >
                    {isSending ? (
                      "Sending…"
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
