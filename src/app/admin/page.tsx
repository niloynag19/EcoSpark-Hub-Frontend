"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Idea, IdeaStatus, User, Role } from "@/types";
import api from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { 
  HiCheck, 
  HiXMark, 
  HiChartBar, 
  HiUsers, 
  HiLightBulb, 
  HiEye,
  HiTrash,
  HiStar as HiStarSolid,
  HiCog6Tooth,
  HiPlus
} from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi2";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { StatsChart } from "@/components/dashboard/StatsChart";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

import { useRouter, useSearchParams } from "next/navigation";

export default function AdminDashboard() {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "ideas");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      window.location.href = "/";
    } else if (isAdmin) {
      fetchTabData("initial");
    }
  }, [isAdmin, isAuthenticated, loading]);

  const fetchedTabs = useRef<Set<string>>(new Set());

  const fetchTabData = useCallback(async (tab: string, silent = false) => {
    if (!silent && !fetchedTabs.current.has(tab)) setIsLoading(true);
    else if (silent) setIsRefreshing(true);

    try {
      switch (tab) {
        case "ideas":
        case "all-ideas":
          const ideasRes = (await api.get("/admin/ideas")) as any;
          setIdeas(ideasRes.data);
          break;
        case "users":
          const usersRes = (await api.get("/admin/users")) as any;
          setUsers(usersRes.data);
          break;
        case "categories":
          const catsRes = (await api.get("/categories")) as any;
          setCategories(catsRes.data);
          break;
        case "stats":
          const statsRes = (await api.get("/admin/stats")) as any;
          setStats(statsRes.data);
          break;
        case "initial":
          const [sRes, iRes] = await Promise.all([
            api.get("/admin/stats"),
            api.get("/admin/ideas?status=UNDER_REVIEW")
          ]) as any;
          setStats(sRes.data);
          setIdeas(iRes.data);
          break;
      }
      fetchedTabs.current.add(tab);
    } catch (error: any) {
      console.error(`Failed to fetch ${tab} data:`, error);
      toast.error(`Failed to sync ${tab} data`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [isAdmin, activeTab]);

  useEffect(() => {
    if (isAdmin && activeTab !== "initial") {
      fetchTabData(activeTab);
    }
  }, [activeTab, isAdmin, fetchTabData]);

  // For manual refresh, refresh everything
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchTabData("ideas", true),
        fetchTabData("users", true),
        fetchTabData("stats", true),
        fetchTabData("categories", true)
      ]);
      toast.success("Dashboard synced");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleApprove = async (id: string) => {
    // Optimistic update
    const previousIdeas = [...ideas];
    setIdeas(ideas.map(i => i.id === id ? { ...i, status: IdeaStatus.APPROVED } : i));
    
    try {
      await api.patch(`/admin/ideas/${id}/approve`, {});
      toast.success("Idea approved!");
      fetchTabData(activeTab, true);
    } catch (error) {
      setIdeas(previousIdeas);
      toast.error("Approval failed");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    // Optimistic update
    const previousIdeas = [...ideas];
    setIdeas(ideas.map(i => i.id === id ? { ...i, isFeatured: !i.isFeatured } : i));

    try {
      await api.patch(`/admin/ideas/${id}/featured`);
      toast.success("Featured status updated!");
      fetchTabData(activeTab, true);
    } catch (error) {
      setIdeas(previousIdeas);
      toast.error("Failed to update featured status");
    }
  };

  const handleToggleUser = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/toggle`);
      toast.success("User status updated");
      fetchTabData("users", true);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleChangeRole = async (id: string, role: Role) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      toast.success(`Role changed to ${role}`);
      fetchTabData("users", true);
    } catch (error) {
      toast.error("Failed to change role");
    }
  };

  const handleDeleteIdea = async (id: string) => {
    // Two-step confirmation logic
    if (deletingId !== id) {
      setDeletingId(id);
      // Auto-reset after 3 seconds
      setTimeout(() => setDeletingId(null), 3000);
      return;
    }

    setDeletingId(null);
    
    // Optimistic update
    const previousIdeas = [...ideas];
    setIdeas(ideas.filter(i => i.id !== id));

    try {
      await api.delete(`/admin/ideas/${id}`);
      toast.success("Idea deleted permanently");
      fetchTabData(activeTab, true);
    } catch (error: any) {
      setIdeas(previousIdeas);
      toast.error(`Delete failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleReject = async (id: string) => {
    const feedback = prompt("Reason for rejection:");
    if (feedback === null) return;
    if (!feedback.trim()) {
      toast.error("Feedback is required for rejection");
      return;
    }

    // Optimistic update
    const previousIdeas = [...ideas];
    setIdeas(ideas.map(i => i.id === id ? { ...i, status: IdeaStatus.REJECTED, adminFeedback: feedback } : i));

    try {
      await api.patch(`/admin/ideas/${id}/reject`, { feedback });
      toast.success("Idea rejected");
      fetchTabData(activeTab, true);
    } catch (error) {
      setIdeas(previousIdeas);
      toast.error("Rejection failed");
    }
  };

  if (loading || isLoading) return <div className="pt-40 text-center flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="font-bold text-slate-500">Loading Admin Control...</p>
  </div>;

  return (
    <div className="flex bg-[#F1F5F9] min-h-screen">
      <Sidebar isAdmin />
      
      <div className="flex-1 lg:ml-72 flex flex-col">
        <DashboardHeader />
        
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
                <p className="text-slate-500 text-sm">Welcome back to the EcoSpark Command Center.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="rounded-lg bg-white shadow-sm border-slate-200 gap-2" 
                  onClick={handleRefreshAll}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
                <Button className="rounded-lg shadow-lg shadow-primary/20">
                  Export Data
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Users", value: stats?.totalUsers || 0, icon: HiUsers, color: "text-blue-600", bg: "bg-blue-100" },
                { label: "Innovations", value: stats?.totalIdeas || 0, icon: HiLightBulb, color: "text-amber-600", bg: "bg-amber-100" },
                { label: "Approved", value: stats?.approved || 0, icon: HiCheck, color: "text-emerald-600", bg: "bg-emerald-100" },
                { label: "Impact Votes", value: stats?.totalVotes || 0, icon: HiChartBar, color: "text-indigo-600", bg: "bg-indigo-100" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
                    {stats ? (
                      <p className="text-2xl font-black text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-500">{stat.value}</p>
                    ) : (
                      <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg" />
                    )}
                  </div>
                  <div className={cn("p-4 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white p-1 rounded-xl border border-slate-200 mb-6 shadow-sm">
                <TabsTrigger value="ideas" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Moderation</TabsTrigger>
                <TabsTrigger value="all-ideas" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">All Innovations</TabsTrigger>
                <TabsTrigger value="users" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">User Base</TabsTrigger>
                <TabsTrigger value="categories" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Categories</TabsTrigger>
                <TabsTrigger value="stats" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Analytics</TabsTrigger>
              </TabsList>

              {/* Ideas Moderation */}
              <TabsContent value="ideas" className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800">Pending Review</h2>
                    <Badge variant="outline" className="rounded-full bg-amber-50 text-amber-600 border-amber-200">
                      {ideas.filter(i => i.status === IdeaStatus.UNDER_REVIEW).length} Pending
                    </Badge>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {ideas.filter(i => i.status === IdeaStatus.UNDER_REVIEW).length > 0 ? (
                      ideas.filter(i => i.status === IdeaStatus.UNDER_REVIEW).map((idea) => (
                        <div key={idea.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border shrink-0">
                               {idea.images?.[0] ? <img src={idea.images[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><HiLightBulb className="w-8 h-8" /></div>}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 mb-1">{idea.title}</h3>
                              <p className="text-sm text-slate-500 line-clamp-1">{idea.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs font-medium text-slate-400">By {idea.author?.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{idea.category?.name}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-2" onClick={() => handleApprove(idea.id)}>
                              <HiCheck className="w-4 h-4" /> Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-amber-600 hover:bg-amber-50 rounded-lg border-slate-200" onClick={() => handleReject(idea.id)}>
                              Reject
                            </Button>
                            <Button 
                              variant={deletingId === idea.id ? "destructive" : "ghost"} 
                              size="sm" 
                              className={cn("rounded-lg text-slate-400 hover:text-destructive", deletingId === idea.id && "bg-destructive text-white animate-pulse px-3")}
                              onClick={() => handleDeleteIdea(idea.id)}
                            >
                              {deletingId === idea.id ? "Sure?" : <HiTrash className="w-5 h-5" />}
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0" render={<Link href={`/ideas/${idea.id}`} />}>
                              <HiEye className="w-5 h-5 text-slate-400" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center">
                        <p className="text-slate-400 font-medium">All innovations have been reviewed!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* All Ideas with Featured Toggle */}
              <TabsContent value="all-ideas">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Innovation</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Author</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Featured</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ideas.map((idea) => (
                        <tr key={idea.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                {idea.images?.[0] ? <img src={idea.images[0]} className="w-full h-full object-cover" /> : <HiLightBulb className="w-5 h-5 m-2.5 text-slate-300" />}
                              </div>
                              <span className="font-bold text-slate-800 line-clamp-1">{idea.title}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm font-medium text-slate-600">{idea.author?.name}</div>
                            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{idea.category?.name}</div>
                          </td>
                          <td className="p-4">
                            <Badge className={cn(
                              "rounded-full border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                              idea.status === IdeaStatus.APPROVED ? "bg-emerald-100 text-emerald-700" :
                              idea.status === IdeaStatus.REJECTED ? "bg-destructive/10 text-destructive" :
                              idea.status === IdeaStatus.UNDER_REVIEW ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                            )}>
                              {idea.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {idea.status === IdeaStatus.APPROVED && (
                              <button 
                                onClick={() => handleToggleFeatured(idea.id)}
                                className={cn(
                                  "relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none shadow-inner",
                                  idea.isFeatured ? "bg-primary" : "bg-slate-300"
                                )}
                              >
                                <div className={cn(
                                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300",
                                  idea.isFeatured ? "translate-x-6" : "translate-x-0"
                                )} />
                                {idea.isFeatured && <HiStarSolid className="absolute right-1 top-1 w-4 h-4 text-white p-0.5" />}
                              </button>
                            )}
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex items-center justify-end gap-1">
                               <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg" render={<Link href={`/ideas/${idea.id}`} />}>
                                 <HiEye className="w-5 h-5 text-slate-400" />
                               </Button>
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 className={cn(
                                   "h-9 px-2 rounded-lg transition-all", 
                                   deletingId === idea.id ? "bg-destructive text-white hover:bg-destructive/90 w-auto" : "w-9 p-0 hover:text-destructive"
                                 )} 
                                 onClick={() => handleDeleteIdea(idea.id)}
                               >
                                 {deletingId === idea.id ? (
                                   <span className="text-[10px] font-bold uppercase">Sure?</span>
                                 ) : (
                                   <HiTrash className="w-5 h-5" />
                                 )}
                               </Button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Users Table */}
              <TabsContent value="users">
                 <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Identity</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Access Level</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Network Status</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Operations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200 shadow-sm overflow-hidden">
                                  {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">{user.name}</div>
                                  <div className="text-xs text-slate-400">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={cn(
                                "rounded-lg border-none px-2.5 py-1 text-[10px] font-bold uppercase",
                                user.role === Role.ADMIN ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                              )}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-4">
                               <div className="flex items-center gap-2">
                                  <div className={cn("w-2 h-2 rounded-full", user.isActive ? "bg-emerald-500" : "bg-destructive animate-pulse")} />
                                  <span className="text-sm font-medium text-slate-700">{user.isActive ? "Connected" : "Suspended"}</span>
                               </div>
                            </td>
                            <td className="p-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg" />}>
                                  <HiCog6Tooth className="w-5 h-5 text-slate-400" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl w-56 p-2 shadow-xl border-slate-200">
                                   <DropdownMenuGroup>
                                     <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">Account Controls</DropdownMenuLabel>
                                     <DropdownMenuItem className="rounded-lg p-3 cursor-pointer" onClick={() => handleToggleUser(user.id)}>
                                       {user.isActive ? "Restrict Access" : "Grant Access"}
                                     </DropdownMenuItem>
                                   </DropdownMenuGroup>
                                   <DropdownMenuSeparator className="my-2" />
                                   <DropdownMenuGroup>
                                     <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">Privileges</DropdownMenuLabel>
                                     <DropdownMenuItem className="rounded-lg p-3 cursor-pointer" onClick={() => handleChangeRole(user.id, Role.ADMIN)}>Assign Admin Role</DropdownMenuItem>
                                     <DropdownMenuItem className="rounded-lg p-3 cursor-pointer" onClick={() => handleChangeRole(user.id, Role.MEMBER)}>Revoke Admin Role</DropdownMenuItem>
                                   </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                 </div>
              </TabsContent>

              {/* Categories Management */}
              <TabsContent value="categories">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800">Available Sectors</h2>
                    <Button size="sm" className="rounded-lg gap-2">
                      <HiPlus className="w-4 h-4" /> Add Category
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between group hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl filter drop-shadow-sm">{category.icon || "🌿"}</div>
                          <div>
                            <div className="font-bold text-slate-800">{category.name}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {category._count?.ideas || 0} Innovations
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg text-slate-400 hover:text-destructive">
                          <HiTrash className="w-5 h-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stats">
                 <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                   <StatsChart title="Growth Analytics" />
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
