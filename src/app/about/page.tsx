"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { HiSparkles, HiGlobeAmericas, HiUserGroup, HiShieldCheck, HiOutlineLightBulb, HiRocketLaunch } from "react-icons/hi2";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
              Our Mission to <span className="text-emerald-600 italic">Spark</span> Global Change
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              EcoSpark Hub is a global ecosystem dedicated to accelerating the transition to a sustainable future by empowering innovators to turn green ideas into scalable solutions.
            </p>
          </motion.div>

          {/* Stats/Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { title: "Empowerment", icon: HiSparkles, text: "Giving every green idea a voice and a clear path from concept to realization.", color: "text-amber-500", bg: "bg-amber-500/10" },
              { title: "Sustainability", icon: HiGlobeAmericas, text: "Prioritizing science-backed solutions that actively restore our natural ecosystems.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { title: "Community", icon: HiUserGroup, text: "Fostering radical collaboration between experts, innovators, and impact investors.", color: "text-blue-500", bg: "bg-blue-500/10" },
            ].map(item => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 text-center shadow-xl shadow-slate-200/50 dark:shadow-none transition-transform hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-8`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* The Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-8 leading-tight">The Problem We're <span className="text-emerald-600">Solving</span></h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
                <p>
                  Every year, thousands of brilliant environmental breakthroughs fail to launch. The reasons are consistent: lack of expert validation, insufficient seed funding, and difficulty in reaching the right audience.
                </p>
                <p>
                  Traditional funding models often overlook early-stage concepts, focusing only on "proven" technologies. This creates a valley of death where most green innovations disappear.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 bg-emerald-600 rounded-[4rem] text-white shadow-2xl shadow-emerald-600/20"
            >
              <h3 className="text-3xl font-black mb-6">The EcoSpark Solution</h3>
              <ul className="space-y-6">
                {[
                  { icon: HiShieldCheck, title: "Expert Validation", desc: "Rigorous review by sustainability professionals." },
                  { icon: HiOutlineLightBulb, title: "Monetization Paths", desc: "Monetize IP through our premium licensing marketplace." },
                  { icon: HiRocketLaunch, title: "Scalability Network", desc: "Direct connection to green-tech investors worldwide." }
                ].map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{feature.title}</h4>
                      <p className="text-emerald-50 text-sm">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-16 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-8">Our Vision for <span className="text-emerald-400">2030</span></h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                We envision a world where every city runs on clean energy, zero waste is the standard, and the best environmental minds are compensated fairly for their contributions. By 2030, we aim to have facilitated over 10,000 successful sustainability projects globally.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { label: "Projects Funded", value: "2,500+" },
                  { label: "Carbon Offset", value: "1.2M Tons" },
                  { label: "Countries Reached", value: "142" }
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-emerald-400 mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest font-bold text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
