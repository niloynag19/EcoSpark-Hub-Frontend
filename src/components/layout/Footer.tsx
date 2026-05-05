"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLeaf, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiEnvelope as HiMail } from "react-icons/hi2";
import { Container } from "@/components/ui/container";

const footerLinks = {
  Innovations: [
    { name: "All Ideas", href: "/ideas" },
    { name: "How it Works", href: "/#how-it-works" },
  ],
  Resources: [
    { name: "Insights & Blog", href: "/blog" },
    { name: "Newsletter", href: "/#newsletter" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/privacy" },
    { name: "Contact", href: "/contact" },
  ],
};

export const Footer = () => {
  const pathname = usePathname();
  
  const isDashboardPage = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/admin") || 
                          pathname.startsWith("/profile");

  if (isDashboardPage) return null;

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-xl">
                <FaLeaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">EcoSpark</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Connecting passionate innovators with sustainable solutions to build a greener future together. Join our community and spark a change.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-colors">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="mailto:hello@ecospark.hub" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <HiMail className="w-4 h-4" />
              hello@ecospark.hub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
