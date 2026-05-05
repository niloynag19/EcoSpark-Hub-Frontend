"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  FaGoogle, 
  FaMicrosoft, 
  FaAmazon, 
  FaApple, 
  FaSpotify, 
  FaSlack,
  FaGithub,
  FaDropbox
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const partners = [
  { name: "Google", icon: FaGoogle, color: "hover:text-[#4285F4]" },
  { name: "Microsoft", icon: FaMicrosoft, color: "hover:text-[#00A4EF]" },
  { name: "Amazon", icon: FaAmazon, color: "hover:text-[#FF9900]" },
  { name: "Apple", icon: FaApple, color: "hover:text-[#555555]" },
  { name: "Spotify", icon: FaSpotify, color: "hover:text-[#1DB954]" },
  { name: "Slack", icon: FaSlack, color: "hover:text-[#4A154B]" },
  { name: "GitHub", icon: FaGithub, color: "hover:text-[#333333]" },
  { name: "Dropbox", icon: FaDropbox, color: "hover:text-[#0061FF]" },
];

export const Partnerships = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <HiSparkles className="w-4 h-4" />
            <span>Trusted Partnerships</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Collaborating with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Global Leaders</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium"
          >
            We work with the world's most innovative organizations to accelerate the transition to a sustainable future.
          </motion.p>
        </div>

        {/* Logo Marquee */}
        <div className="relative mt-8">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              animate={{
                x: [0, -1035],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-16 py-8 items-center"
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={`flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group ${partner.color}`}
                >
                  <partner.icon className="w-10 h-10" />
                  <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-400 dark:from-emerald-700 dark:to-emerald-500 relative overflow-hidden shadow-2xl shadow-emerald-500/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-2">Ready to make an impact?</h3>
              <p className="text-emerald-50/90 font-medium text-lg">Join our network of sustainable innovators and partners.</p>
            </div>
            <button className="px-10 py-4 rounded-full bg-white text-emerald-600 font-black uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap">
              Become a Partner
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
