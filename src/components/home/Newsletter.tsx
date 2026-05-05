"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiEnvelope, HiSparkles, HiGlobeAmericas } from "react-icons/hi2";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-32 relative overflow-hidden bg-emerald-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />
      
      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-emerald-600/10 dark:text-emerald-500/20"
      >
        <FaLeaf className="w-24 h-24" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[15%] text-emerald-600/5 dark:text-emerald-500/10"
      >
        <HiGlobeAmericas className="w-32 h-32" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-900/5 dark:text-emerald-500/5 select-none pointer-events-none"
      >
        <h2 className="text-[20vw] font-black uppercase tracking-tighter">EcoSpark</h2>
      </motion.div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-black uppercase tracking-widest mb-8 border border-emerald-500/20"
          >
            <HiSparkles className="w-5 h-5" />
            <span>Join the movement</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
          >
            Fuel Your <span className="text-emerald-600">Green</span> Curiosity
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Weekly insights into world-changing eco-innovations, delivered directly to your inbox. No fluff, just impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubscribe} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-100 dark:border-white/10 p-2 rounded-[2.5rem] shadow-xl shadow-emerald-500/5">
                <div className="relative flex-1 w-full">
                  <HiEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-500 w-6 h-6" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-16 pl-16 pr-8 rounded-[2rem] bg-transparent border-none text-slate-900 dark:text-white text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto h-16 px-10 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg transition-all shadow-xl shadow-emerald-600/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Joining..." : "Get Started"}
                </Button>
              </div>
            </form>
            <p className="text-sm text-slate-500 mt-6 font-medium">
              Join <span className="text-emerald-600 dark:text-emerald-500 font-black">12,000+</span> innovators today. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
