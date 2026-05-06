"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiCalendar, HiSparkles } from "react-icons/hi2";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const latestPosts = [
  {
    id: 1,
    title: "The Future of Community Solar: Scaling Local Energy",
    excerpt: "How small neighborhoods are banding together to build independent, renewable power grids.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    date: "May 12, 2026",
    category: "Energy",
  },
  {
    id: 2,
    title: "Zero Waste Living: 5 Innovations Changing the Game",
    excerpt: "From seaweed-based packaging to AI sorting systems, explore the tech of tomorrow.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    date: "May 10, 2026",
    category: "Waste",
  },
  {
    id: 3,
    title: "Why Modular EV Batteries are the Key to Adoption",
    excerpt: "Eliminating range anxiety and high costs through standardized, swappable power units.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    date: "May 08, 2026",
    category: "Transport",
  },
];

export const LatestBlog = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
              <HiSparkles className="w-4 h-4" />
              EcoSpark Insights
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Latest from <span className="text-primary">Our Blog</span></h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Stay updated with the latest trends in sustainability, green tech, and community innovations.
            </p>
          </div>
          <Button variant="ghost" className="font-bold group" nativeButton={false} render={<Link href="/blog" />}>
            Visit Our Blog
            <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-[2rem] overflow-hidden border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-md text-foreground border-none">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <HiCalendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent className="p-6 pt-0 mt-auto">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link"
                  >
                    Read Article
                    <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
