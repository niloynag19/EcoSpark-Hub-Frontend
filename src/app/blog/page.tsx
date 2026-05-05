"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiCalendar, HiUser, HiClock, HiTag, HiSparkles } from "react-icons/hi2";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Community Solar: Scaling Local Energy",
    excerpt: "How small neighborhoods are banding together to build independent, renewable power grids and reducing costs by 40%.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    author: "Sarah Chen",
    date: "May 12, 2026",
    readTime: "6 min read",
    category: "Energy",
  },
  {
    id: 2,
    title: "Zero Waste Living: 5 Innovations Changing the Game",
    excerpt: "From seaweed-based packaging to AI sorting systems, explore the tech making a waste-free lifestyle possible.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    author: "Marcus Thorne",
    date: "May 10, 2026",
    readTime: "8 min read",
    category: "Waste",
  },
  {
    id: 3,
    title: "Why Modular EV Batteries are the Key to Mass Adoption",
    excerpt: "Eliminating range anxiety and high costs through standardized, swappable power units for electric vehicles.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    author: "Elena Rodriguez",
    date: "May 08, 2026",
    readTime: "5 min read",
    category: "Transport",
  },
  {
    id: 4,
    title: "Urban Farming: Feeding Cities from the Rooftop Down",
    excerpt: "Vertical hydroponics and community gardens are transforming grey skylines into productive green spaces.",
    image: "https://images.unsplash.com/photo-1558449197-5788cd9248fd?w=800",
    author: "David Park",
    date: "May 05, 2026",
    readTime: "7 min read",
    category: "Agriculture",
  },
  {
    id: 5,
    title: "The Role of AI in Protecting Global Biodiversity",
    excerpt: "How machine learning is helping scientists track endangered species and restore fragmented habitats in real-time.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
    author: "Dr. Lisa Wong",
    date: "May 03, 2026",
    readTime: "10 min read",
    category: "Tech",
  },
  {
    id: 6,
    title: "Circular Fashion: Beyond the Recycling Bin",
    excerpt: "Exploring the repair-first economy and why the future of style is about maintenance, not just materials.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    author: "Julian Moore",
    date: "May 01, 2026",
    readTime: "4 min read",
    category: "Lifestyle",
  },
];

const BlogPage = () => {
  return (
    <main className="pt-32 pb-24">
      {/* Header */}
      <section className="mb-20">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
              <HiSparkles className="w-5 h-5" />
              EcoSpark Insights
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Green <span className="text-primary italic">Perspectives</span> for a Sustainable Future
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In-depth articles, expert interviews, and community stories about the innovations shaping our planet's tomorrow.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="mb-20">
        <Container>
          <Link href={`/blog/${blogPosts[0].id}`} className="group">
            <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden border shadow-2xl">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                <Badge className="bg-primary text-white border-none mb-4">Featured Article</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-white/80 text-lg mb-6 line-clamp-2">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-white/60 text-sm">
                  <span className="flex items-center gap-2"><HiUser /> {blogPosts[0].author}</span>
                  <span className="flex items-center gap-2"><HiCalendar /> {blogPosts[0].date}</span>
                  <span className="flex items-center gap-2"><HiClock /> {blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Blog Grid */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full rounded-[2rem] overflow-hidden border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-md text-foreground border-none">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><HiCalendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><HiClock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
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

          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-12 h-14 font-bold border-2">
              Load More Articles
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default BlogPage;
