"use client";

import React from "react";
import { 
  HiBell, 
  HiBars3BottomLeft 
} from "react-icons/hi2";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 right-0 left-0 bg-white border-b border-slate-100 z-30 px-8 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <HiBars3BottomLeft className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">{user?.role} PANEL</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
          <HiBell className="w-5 h-5" />
        </button>
        
        <div className="w-[1px] h-8 bg-slate-100 mx-2" />

        <div className="flex items-center gap-3 p-1 pr-3 rounded-full bg-slate-50/50 border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-full" /> : user?.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-slate-800 leading-none mb-0.5">{user?.name}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
