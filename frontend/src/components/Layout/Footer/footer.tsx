import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <div className="flex  flex-col">
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="flex flex-col items-center justify-start py-12">
            {/* Logo */}
            <h1 className="text-2xl font-bold">Teachify</h1>

            <ul className="mt-6 flex flex-wrap items-center gap-4">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Teachify
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="https://github.com/Tamjid388" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/Tamjid388" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/Tamjid388" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/Tamjid388" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
