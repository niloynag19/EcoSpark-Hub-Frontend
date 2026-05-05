"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineUserGroup, 
  HiOutlineDocumentText, 
  HiOutlineBriefcase, 
  HiOutlineCheckBadge, 
  HiOutlineGlobeAlt 
} from "react-icons/hi2";

const steps = [
  {
    title: "Explore Innovations",
    desc: "Browse groundbreaking eco-friendly ideas and innovations from our global community that align with your sustainability goals.",
    icon: HiOutlineMagnifyingGlass,
    linkText: "Browse Ideas",
  },
  {
    title: "Join the Hub",
    desc: "Create your profile to connect with a global network of sustainability experts, innovators, and environmental advocates.",
    icon: HiOutlineUserGroup,
    linkText: "Create Profile",
  },
  {
    title: "Submit Innovation",
    desc: "Share your sustainable solution with the world. Fill out our guided submission process and get ready for impact.",
    icon: HiOutlineDocumentText,
    linkText: "Start Submitting",
  },
  {
    title: "Find Partners",
    desc: "Build a team of passionate individuals or find corporate partners to help bring your environmental vision to life.",
    icon: HiOutlineBriefcase,
    linkText: "Find Collaborators",
  },
  {
    title: "Get Verified",
    desc: "Achieve 'Verified' status through our expert panel review to unlock exclusive funding and global partner networks.",
    icon: HiOutlineCheckBadge,
    linkText: "View Standards",
  },
  {
    title: "Scale Globally",
    desc: "Take your project to the next level with our resource network, mentors, and scaling opportunities in international markets.",
    icon: HiOutlineGlobeAlt,
    linkText: "Learn How",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950">
      <Container>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-wider"
          >
            How EcoSpark Hub Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Join the green revolution in six simple steps. Our platform is designed to take your sustainable ideas from concept to global reality.
          </motion.p>
        </div>

        {/* Grid Layout with Dividers */}
        <div className="relative">
          {/* Vertical Dividers (Desktop) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="absolute left-1/3 top-10 bottom-10 w-px bg-slate-100 dark:bg-slate-800" />
            <div className="absolute left-2/3 top-10 bottom-10 w-px bg-slate-100 dark:bg-slate-800" />
          </div>
          
          {/* Horizontal Divider (Desktop) */}
          <div className="hidden md:block absolute left-10 right-10 top-1/2 -translate-y-1/2 h-px bg-slate-100 dark:bg-slate-800 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 md:p-12 flex flex-col items-center text-center group border-b md:border-b-0 border-slate-100 dark:border-slate-800 last:border-b-0`}
              >
                {/* Icon Container */}
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <step.icon className="w-12 h-12 text-slate-800 dark:text-slate-200 stroke-1 group-hover:text-emerald-600 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-8 max-w-[280px]">
                  {step.desc}
                </p>

                {/* Link */}
                <button className="text-xs md:text-sm font-black text-amber-500 dark:text-amber-400 uppercase tracking-widest hover:brightness-110 relative py-1">
                  {step.linkText}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
