"use client";

import React from "react";
import Link from "next/link";
import { HiArrowRight, HiSparkles, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Idea } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const FeaturedIdeas = () => {
  const [featuredIdeas, setFeaturedIdeas] = React.useState<Idea[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = (await api.get("/ideas/featured")) as any;
        setFeaturedIdeas(response.data);
      } catch (error: any) {
        console.error("Failed to fetch featured ideas:", error.response?.data?.message || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-emerald-50/30 dark:bg-emerald-950/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
      
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
              <HiSparkles className="w-4 h-4" />
              Spotlight Innovations
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Curated <span className="text-emerald-600 dark:text-emerald-400">Eco-Innovations</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg font-medium leading-relaxed">
              Discover high-impact environmental breakthroughs hand-picked by our experts for their potential to drive global change.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 mr-4">
                <button id="swiper-prev" className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                  <HiChevronLeft className="w-5 h-5" />
                </button>
                <button id="swiper-next" className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                  <HiChevronRight className="w-5 h-5" />
                </button>
             </div>
             <Button variant="ghost" className="font-bold group" nativeButton={false} render={<Link href="/ideas" />}>
              Explore More
              <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200 animate-pulse" />
                  <div className="h-6 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
                  <div className="h-4 w-full rounded-lg bg-slate-200 animate-pulse" />
                </div>
              ))}
            </div>
          ) : featuredIdeas.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: "#swiper-prev",
                nextEl: "#swiper-next",
              }}
              pagination={{ clickable: true, el: "#swiper-pagination" }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-16"
            >
              {featuredIdeas.map((idea, index) => (
                <SwiperSlide key={idea.id} className="h-auto">
                  <IdeaCard idea={idea} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="py-20 text-center bg-white border rounded-[2.5rem] border-dashed shadow-sm">
              <p className="text-slate-400 font-medium">Our curators are searching for the next big idea. Check back soon!</p>
            </div>
          )}
          <div id="swiper-pagination" className="flex justify-center gap-2 mt-8" />
        </div>
      </Container>
    </section>
  );
};
