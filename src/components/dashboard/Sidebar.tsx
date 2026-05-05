"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  HiChartBar, 
  HiUsers, 
  HiLightBulb, 
  HiCog6Tooth, 
  HiArrowLeftOnRectangle,
  HiSquares2X2,
  HiBriefcase,
  HiInbox,
  HiDocumentText,
  HiPlus,
  HiStar,
  HiSquaresPlus
} from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { FaLeaf } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar = ({ isAdmin: isAdminProp }: SidebarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logout, isAdmin: authIsAdmin } = useAuth();
  
  const isAdmin = isAdminProp !== undefined ? isAdminProp : authIsAdmin;

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin" && !searchParams.get("tab");
    }
    if (href.includes("?tab=")) {
      const [path, query] = href.split("?");
      const tab = new URLSearchParams(query).get("tab");
      return pathname === path && searchParams.get("tab") === tab;
    }
    return pathname === href;
  };

  const adminLinks = [
    { name: "Overview", href: "/admin", icon: HiSquares2X2 },
    { name: "Moderation", href: "/admin?tab=ideas", icon: HiLightBulb },
    { name: "All Innovations", href: "/admin?tab=all-ideas", icon: HiBriefcase },
    { name: "User Base", href: "/admin?tab=users", icon: HiUsers },
    { name: "Categories", href: "/admin?tab=categories", icon: HiSquaresPlus },
    { name: "Analytics", href: "/admin?tab=stats", icon: HiChartBar },
    { name: "My Profile", href: "/profile", icon: HiCog6Tooth },
  ];

  const userLinks = [
    { name: "My Workspace", href: "/dashboard", icon: HiSquares2X2 },
    { name: "Submit Idea", href: "/ideas/create", icon: HiPlus },
    { name: "Global Feed", href: "/ideas", icon: HiLightBulb },
    { name: "Explore Sectors", href: "/categories", icon: HiSquaresPlus },
    { name: "Engagement", href: "/dashboard/engagement", icon: HiChartBar },
    { name: "My Profile", href: "/profile", icon: HiUsers },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 z-40 hidden lg:flex flex-col">
      <div className="p-8 border-b border-slate-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
            <FaLeaf className="w-6 h-6 text-white" />
          </div>
          <div>
             <span className="text-xl font-black tracking-tight text-slate-800 block leading-none">
              EcoSpark
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAdmin ? 'Admin' : 'Member'} Portal</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto bg-white">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{isAdmin ? 'Admin' : 'Member'} Dashboard</p>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all group border border-transparent",
              isActive(link.href) && "bg-primary/5 text-primary border-primary/10 shadow-sm"
            )}
          >
            <link.icon className={cn(
              "w-5 h-5 transition-colors",
              isActive(link.href) ? "text-primary" : "text-slate-400 group-hover:text-primary"
            )} />
            <span className="font-bold text-sm">{link.name}</span>
          </Link>
        ))}

        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-10 mb-4">Support</p>
        <Link href="/contact" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all group border border-transparent">
          <HiInbox className="w-5 h-5 text-slate-400 group-hover:text-primary" />
          <span className="font-bold text-sm">Help Center</span>
        </Link>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/5 transition-all group border border-transparent mt-2"
        >
          <HiArrowLeftOnRectangle className="w-5 h-5" />
          <span className="font-bold text-sm">Log Out</span>
        </button>
      </nav>

      <div className="p-6 bg-slate-50/50">
         <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Workspace</p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
               Need help? Contact our support team for assistance.
            </p>
         </div>
      </div>
    </aside>
  );
};
