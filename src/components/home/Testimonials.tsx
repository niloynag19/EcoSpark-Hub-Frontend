"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiStar, HiSparkles, HiChatBubbleBottomCenterText, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Container } from "@/components/ui/container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Environmental Engineer",
    text: "EcoSpark Hub provided the perfect bridge between my research and real-world application. I've connected with three serious investors in two months.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Social Entrepreneur",
    text: "The community feedback here is invaluable. The voting system helped us pivot our solar project to better serve remote villages in just weeks.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Sustainability Consultant",
    text: "I love the monetization feature. It allows experts like me to sustain our work while sharing high-impact solutions with those who need them most.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Urban Architect",
    text: "The technical specifications I found on EcoSpark Hub helped us reduce the carbon footprint of our latest skyscraper project by 40%.",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5
  },
  {
    name: "Sophie Müller",
    role: "Marine Biologist",
    text: "Connecting with global partners here has accelerated our coral restoration efforts across Southeast Asia. Truly a game-changer.",
    avatar: "https://i.pravatar.cc/150?u=sophie",
    rating: 5
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <Container>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <HiChatBubbleBottomCenterText className="w-4 h-4" />
            <span>Community Feedback</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Voice of the <span className="text-primary italic">Community</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Hear from the innovators and experts who are accelerating the world's transition to a sustainable future.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-20"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={t.name} className="h-auto pb-4">
                <div className="h-full relative p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 group">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-12 group-hover:rotate-0 transition-transform">
                    <HiSparkles className="w-6 h-6" />
                  </div>

                  <div className="flex gap-1 text-amber-500 mb-8">
                    {[...Array(t.rating)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-lg font-medium leading-relaxed mb-10 text-slate-700 dark:text-slate-300">
                    "{t.text}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-lg flex items-center justify-center text-white">
                        <HiStar className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};
