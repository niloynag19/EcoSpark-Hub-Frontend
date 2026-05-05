"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsChart } from "@/components/dashboard/StatsChart";

export default function EngagementPage() {
  return (
    <div className="flex bg-[#F1F5F9] min-h-screen">
      <Sidebar />
      
      <div className="flex-1 lg:ml-72 flex flex-col">
        <DashboardHeader />
        
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            <div className="mb-12">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">Engagement Analytics</h1>
              <p className="text-slate-500 font-medium mt-2">Track how the community is interacting with your innovations.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <StatsChart title="Community Reach" />
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
