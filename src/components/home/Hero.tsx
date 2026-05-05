"use client";

import React from "react";
import Link from "next/link";
import { HiArrowRight, HiSparkles, HiShieldCheck, HiGlobeEuropeAfrica, HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000"
];

export const Hero = () => {
  const [userCount, setUserCount] = React.useState<number | string>("10,000+");
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = (await api.get("/ideas/stats/public")) as any;
        setUserCount(response.data.activeContributors);
      } catch (error: any) {
        console.error("Failed to fetch user count:", error.response?.data?.message || error.message || error);
      }
    };
    fetchStats();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ideas?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
      {/* Premium Image Slider Background */}
      <div className="absolute inset-0 -z-20 bg-slate-900">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={slides[currentSlide]} 
              className="w-full h-full object-cover"
              alt="Eco Background"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <Container>
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-8 border border-white/20">
            <HiSparkles className="w-4 h-4 text-emerald-400" />
            <span>Join {userCount} Eco-Innovators</span>
          </div>

          <h1 className="reveal text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-white max-w-4xl">
            Empowering <span className="text-emerald-400 italic">Green Ideas</span> to Build a Better World
          </h1>

          <p className="reveal text-lg md:text-xl text-slate-200 mb-12 leading-relaxed max-w-2xl font-medium">
            EcoSpark Hub is where sustainability meets innovation. Share, collaborate, and monetize your impactful solutions.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="reveal w-full max-w-2xl mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-primary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-white rounded-[2rem] p-2 shadow-2xl overflow-hidden">
              <HiMagnifyingGlass className="w-6 h-6 ml-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search for Innovations like 'solar power'..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-slate-700 font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-full px-8 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                Explore
              </Button>
            </div>
          </form>

          <div className="reveal flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link href="/ideas" className="text-white font-black uppercase tracking-[0.2em] text-[10px] hover:text-emerald-400 transition-colors flex items-center gap-2 group">
              View All Submissions <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <Link href="/auth/signup" className="text-white font-black uppercase tracking-[0.2em] text-[10px] hover:text-emerald-400 transition-colors">
              Start Your Journey
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="reveal mt-20 flex flex-wrap justify-center gap-10 md:gap-16 text-white/70">
            {[
              { icon: HiShieldCheck, label: "Secure Payments" },
              { icon: HiGlobeEuropeAfrica, label: "Global Community" },
              { icon: HiSparkles, label: "Verified Tech" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                  <badge.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
