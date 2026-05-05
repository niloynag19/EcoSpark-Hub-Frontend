"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiUsers, HiBolt, HiGlobeAmericas, HiAcademicCap, HiSparkles, HiHandThumbUp } from "react-icons/hi2";
import { FaTree, FaDroplet } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import api from "@/lib/api";

export const Stats = () => {
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = (await api.get("/ideas/stats/public")) as any;
        setStatsData(response.data);
      } catch (error: any) {
        console.error("Failed to fetch stats:", error.response?.data?.message || error.message || error);
      }
    };
    fetchStats();
  }, []);

  const statsItems = [
    {
      label: "Eco-Innovators",
      value: statsData?.activeContributors || "10,240",
      icon: HiUsers,
      color: "text-emerald-600",
      glow: "from-emerald-500/20",
    },
    {
      label: "Trees Planted",
      value: "542,890",
      icon: FaTree,
      color: "text-green-600",
      glow: "from-green-500/20",
    },
    {
      label: "Water Preserved",
      value: statsData?.waterSaved || "2.4M L",
      icon: FaDroplet,
      color: "text-cyan-600",
      glow: "from-cyan-500/20",
    },
    {
      label: "Renewable Energy",
      value: statsData?.energyGained || "450 GWh",
      icon: HiBolt,
      color: "text-amber-600",
      glow: "from-amber-500/20",
    },
    {
      label: "Impact Countries",
      value: "142",
      icon: HiGlobeAmericas,
      color: "text-blue-600",
      glow: "from-blue-500/20",
    },
    {
      label: "Verified Ideas",
      value: statsData?.approvedInnovations || "500+",
      icon: HiHandThumbUp,
      color: "text-purple-600",
      glow: "from-purple-500/20",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-50/50 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <Container>
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <HiSparkles className="w-4 h-4" />
            <span>Our Global Footprint</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            Measurable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Impact</span> for a Greener Future
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
          >
            EcoSpark Hub isn't just about ideas—it's about real, data-driven change. Join thousands of contributors building sustainable innovations worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-start">
                <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 ${stat.color} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-1 tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-sm font-medium">
              Join <span className="text-slate-900 font-bold">5,000+</span> teams already making an impact
            </p>
          </div>
          <button className="px-8 py-3 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-colors shadow-xl shadow-emerald-500/10">
            Start Your Project
          </button>
        </motion.div>
      </Container>
    </section>
  );
};
