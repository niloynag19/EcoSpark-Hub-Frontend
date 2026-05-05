"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { HiEnvelope, HiMapPin, HiPhone, HiClock, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-slate-950">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                Let's <span className="text-emerald-600">Connect</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed">
                Have a groundbreaking eco-innovation? Interested in a partnership? Our global team is ready to help you spark change.
              </p>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                {[
                  { icon: HiEnvelope, label: "General Inquiries", value: "hello@ecosparkhub.com", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { icon: HiPhone, label: "Global Support", value: "+1 (555) ECO-SPARK", color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: HiMapPin, label: "Main Office", value: "Green Valley, CA 94043", color: "text-amber-500", bg: "bg-amber-500/10" },
                  { icon: HiClock, label: "Response Time", value: "Under 24 Hours", color: "text-purple-500", bg: "bg-purple-500/10" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-3xl border border-slate-50 dark:border-slate-800 hover:border-emerald-500/20 transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</h3>
                      <p className="font-bold text-slate-900 dark:text-white break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Departmental Emails */}
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-black mb-6">Specific Inquiries</h3>
                <div className="space-y-4">
                  {[
                    { dept: "Partnerships", email: "partners@ecosparkhub.com" },
                    { dept: "Press & Media", email: "media@ecosparkhub.com" },
                    { dept: "Investor Relations", email: "invest@ecosparkhub.com" },
                  ].map((dept, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <span className="font-bold text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 transition-colors">{dept.dept}</span>
                      <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                        {dept.email}
                        <HiArrowTopRightOnSquare className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-bold ml-1">First Name</Label>
                    <Input id="firstName" placeholder="John" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none px-6 focus-visible:ring-emerald-500" required />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-bold ml-1">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none px-6 focus-visible:ring-emerald-500" required />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-bold ml-1">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none px-6 focus-visible:ring-emerald-500" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-sm font-bold ml-1">Inquiry Type</Label>
                  <select className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none px-6 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none">
                    <option>General Inquiry</option>
                    <option>Submit an Idea</option>
                    <option>Partnership Proposal</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-bold ml-1">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[180px] rounded-[2rem] bg-slate-50 dark:bg-slate-950 border-none p-6 focus-visible:ring-emerald-500 resize-none" required />
                </div>
                <Button type="submit" className="w-full h-16 rounded-[2rem] text-lg font-black bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Spark a Conversation
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
