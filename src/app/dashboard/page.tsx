"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Idea, IdeaStatus } from "@/types";
import api from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiOutlineInformationCircle,
  HiEye,
  HiChatBubbleLeftEllipsis,
  HiArrowUp,
  HiLightBulb,
  HiCheckCircle,
  HiClock
} from "react-icons/hi2";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { StatsChart } from "@/components/dashboard/StatsChart";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [myIdeas, setMyIdeas] = useState<Idea[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/auth/login";
    } else if (isAuthenticated) {
      fetchMyIdeas();
    }
  }, [isAuthenticated, loading]);

  const fetchMyIdeas = async () => {
    try {
      const response = (await api.get("/ideas/my")) as any;
      setMyIdeas(response.data);
    } catch (error) {
      console.error("Failed to fetch my ideas");
    } finally {
      setIsPageLoading(false);
    }
  };

  const getStatusStyles = (status: IdeaStatus) => {
    switch (status) {
      case IdeaStatus.APPROVED: return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" };
      case IdeaStatus.UNDER_REVIEW: return { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
      case IdeaStatus.REJECTED: return { color: "text-destructive", bg: "bg-destructive/5", border: "border-destructive/10" };
      default: return { color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-100" };
    }
  };

  const handleSubmitForReview = async (id: string) => {
    try {
      await api.patch(`/ideas/${id}/submit`);
      toast.success("Idea submitted for review!");
      fetchMyIdeas();
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    try {
      await api.delete(`/ideas/${id}`);
      toast.success("Idea deleted");
      fetchMyIdeas();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading || isPageLoading) return <div className="pt-40 text-center flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="font-bold text-slate-500">Loading Workspace...</p>
  </div>;

  return (
    <div className="flex bg-[#F1F5F9] min-h-screen">
      <Sidebar />
      
      <div className="flex-1 lg:ml-72 flex flex-col">
        <DashboardHeader />
        
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">My Workspace</h1>
                <p className="text-slate-500 text-sm">Welcome back, {user?.name}.</p>
              </div>
              <Button className="rounded-lg shadow-lg shadow-primary/20 gap-2 h-11 px-6" render={<Link href="/ideas/create" />}>
                <HiPlus className="w-5 h-5" />
                New Innovation
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Ideas", value: myIdeas.length, icon: HiLightBulb, color: "text-blue-600", bg: "bg-blue-100" },
                { label: "Approved", value: myIdeas.filter(i => i.status === IdeaStatus.APPROVED).length, icon: HiCheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
                { label: "Pending", value: myIdeas.filter(i => i.status === IdeaStatus.UNDER_REVIEW).length, icon: HiClock, color: "text-amber-600", bg: "bg-amber-100" },
                { label: "Impact Score", value: myIdeas.reduce((acc, i) => acc + i.upvoteCount, 0), icon: HiArrowUp, color: "text-indigo-600", bg: "bg-indigo-100" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                  </div>
                  <div className={cn("p-4 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Left Column: Innovations List */}
               <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h2 className="font-bold text-slate-800">Recent Submissions</h2>
                      <Link href="/ideas" className="text-xs font-bold text-primary hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {myIdeas.length > 0 ? (
                        myIdeas.map((idea) => {
                          const styles = getStatusStyles(idea.status);
                          return (
                            <div key={idea.id} className="p-6 hover:bg-slate-50/50 transition-colors group">
                              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex gap-4 min-w-0">
                                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border shrink-0">
                                    {idea.images?.[0] ? <img src={idea.images[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><HiLightBulb className="w-6 h-6" /></div>}
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors truncate">{idea.title}</h3>
                                    <div className="flex items-center gap-3 mt-1.5">
                                      <Badge className={cn("rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight", styles.bg, styles.color, styles.border)}>
                                        {idea.status.replace('_', ' ')}
                                      </Badge>
                                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(idea.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                    {idea.adminFeedback && (
                                      <div className="mt-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10 flex gap-2 items-start">
                                        <HiOutlineInformationCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                        <p className="text-xs text-destructive font-medium leading-relaxed">
                                          <span className="font-bold uppercase tracking-tight mr-1">Admin Feedback:</span>
                                          {idea.adminFeedback}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg" render={<Link href={`/ideas/${idea.id}`} />}>
                                    <HiEye className="w-5 h-5 text-slate-400" />
                                  </Button>
                                  {idea.status !== IdeaStatus.APPROVED && (
                                    <>
                                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg hover:text-blue-600" render={<Link href={`/ideas/edit/${idea.id}`} />}>
                                        <HiPencil className="w-5 h-5 text-slate-400" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg hover:text-destructive" onClick={() => handleDelete(idea.id)}>
                                        <HiTrash className="w-5 h-5 text-slate-400" />
                                      </Button>
                                    </>
                                  )}
                                  {(idea.status === IdeaStatus.DRAFT || idea.status === IdeaStatus.REJECTED) && (
                                    <Button size="sm" className="ml-2 h-9 px-4 rounded-lg text-xs" onClick={() => handleSubmitForReview(idea.id)}>
                                      Submit
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-20 text-center flex flex-col items-center gap-4">
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                             <HiLightBulb className="w-8 h-8" />
                           </div>
                           <p className="text-slate-400 font-medium">No innovations shared yet.</p>
                        </div>
                      )}
                    </div>
                 </div>
               </div>

               {/* Right Column: Activity/Analytics */}
               <div className="space-y-6">
                 <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="font-bold text-slate-800 mb-6">Engagement</h2>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                             <HiArrowUp className="w-5 h-5" />
                           </div>
                           <span className="text-sm font-medium text-slate-600">Total Upvotes</span>
                         </div>
                         <span className="font-black text-slate-800">{myIdeas.reduce((acc, i) => acc + i.upvoteCount, 0)}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                             <HiChatBubbleLeftEllipsis className="w-5 h-5" />
                           </div>
                           <span className="text-sm font-medium text-slate-600">Discussions</span>
                         </div>
                         <span className="font-black text-slate-800">{myIdeas.reduce((acc, i) => acc + i.commentCount, 0)}</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="font-bold text-slate-800 mb-4">Tips</h2>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs text-primary font-bold mb-2 uppercase tracking-widest">Growth</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Keep your innovations updated with recent findings to increase visibility and community trust.
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
