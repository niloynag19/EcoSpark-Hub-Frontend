"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { HiCamera, HiShieldCheck, HiOutlineUser } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: "", // Assuming phone/address might not be in base user yet
        address: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await api.patch("/users/profile", formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="pt-40 text-center flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="font-bold text-slate-500">Loading Profile...</p>
  </div>;

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-[#F1F5F9] min-h-screen">
      <Sidebar />
      
      <div className="flex-1 lg:ml-72 flex flex-col">
        <DashboardHeader />
        
        <main className="p-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">Member Settings</h1>
              <p className="text-slate-500 font-medium mt-2">Update your community profile and information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Identity Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm flex flex-col items-center text-center">
                   <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full bg-orange-50 flex items-center justify-center border-4 border-white shadow-xl">
                        {user?.avatar ? (
                          <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <HiOutlineUser className="w-12 h-12 text-orange-500" />
                        )}
                      </div>
                      <button className="absolute bottom-1 right-1 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <HiCamera className="w-4 h-4" />
                      </button>
                   </div>
                   
                   <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{user?.name}</h2>
                   <p className="text-slate-400 font-medium mb-6 italic">{user?.email}</p>
                   
                   <div className="px-6 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-200">
                      {user?.role}
                   </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
                   <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                           <Input 
                             value={formData.name}
                             onChange={e => setFormData({...formData, name: e.target.value})}
                             className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                           <Input 
                             value={formData.email}
                             readOnly
                             className="h-12 rounded-xl bg-slate-50/50 border-slate-100 text-slate-300 font-bold cursor-not-allowed"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone (Database Update)</Label>
                           <Input 
                             value={formData.phone}
                             onChange={e => setFormData({...formData, phone: e.target.value})}
                             placeholder="+880 1XXX XXXXXX"
                             className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Living Address</Label>
                           <Input 
                             value={formData.address}
                             onChange={e => setFormData({...formData, address: e.target.value})}
                             placeholder="Dhaka, Bangladesh"
                             className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700"
                           />
                         </div>
                      </div>

                      <div className="pt-4">
                        <Button type="submit" className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                      </div>
                   </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
