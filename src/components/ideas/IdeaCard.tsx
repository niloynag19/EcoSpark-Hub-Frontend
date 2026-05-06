"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUp, HiChatBubbleLeftEllipsis, HiTag, HiCalendar, HiUser, HiArrowRight, HiLockClosed, HiSparkles } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Idea } from "@/types";

interface IdeaCardProps {
  idea: Idea;
  index?: number;
}

export const IdeaCard = ({ idea, index = 0 }: IdeaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 bg-card">
        <div className="relative aspect-[16/9.5] overflow-hidden">
          <img
            src={idea.images && idea.images[0] ? idea.images[0] : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"}
            alt={idea.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-background/90 backdrop-blur-md text-foreground border-none flex items-center gap-1.5 shadow-sm">
              <HiTag className="w-3 h-3 text-primary" />
              {idea.category?.name || "Eco"}
            </Badge>
            {idea.isPaid && (
              <Badge variant="secondary" className="bg-amber-500 text-white border-none flex items-center gap-1.5 shadow-sm">
                <HiLockClosed className="w-3 h-3" />
                Premium
              </Badge>
            )}
            {idea.upvoteCount >= 10 && (
              <Badge className="bg-indigo-500 text-white border-none flex items-center gap-1.5 shadow-sm">
                <HiSparkles className="w-3 h-3" />
                High Impact
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1.5">
              <HiCalendar className="w-4 h-4" />
              {new Date(idea.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5">
              <HiUser className="w-4 h-4" />
              {idea.author?.name || "EcoSpark User"}
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-2">
            {idea.title}
          </h3>
        </CardHeader>

        <CardContent className="p-6 pt-4">
          <p className="text-base text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {idea.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                <HiArrowUp className="w-4 h-4" />
                {idea.upvoteCount}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <HiChatBubbleLeftEllipsis className="w-4 h-4" />
                {idea.commentCount}
              </div>
            </div>
            <Link 
              href={`/ideas/${idea.id}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-foreground group/link"
            >
              Learn More
              <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
