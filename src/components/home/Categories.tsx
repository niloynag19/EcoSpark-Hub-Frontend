"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { HiBolt, HiTrash, HiTruck, HiGlobeAlt, HiCloud, HiSun } from "react-icons/hi2";

const categories = [
  { name: "Renewable Energy", icon: HiBolt, color: "bg-amber-100 text-amber-600", count: "124 Ideas" },
  { name: "Waste Management", icon: HiTrash, color: "bg-emerald-100 text-emerald-600", count: "89 Ideas" },
  { name: "Eco Transport", icon: HiTruck, color: "bg-blue-100 text-blue-600", count: "56 Ideas" },
  { name: "Nature Tech", icon: HiGlobeAlt, color: "bg-green-100 text-green-600", count: "42 Ideas" },
  { name: "Carbon Capture", icon: HiCloud, color: "bg-purple-100 text-purple-600", count: "31 Ideas" },
  { name: "Solar Solutions", icon: HiSun, color: "bg-orange-100 text-orange-600", count: "78 Ideas" },
];

export const Categories = () => {
  return (
    <section id="categories" className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Discover innovations across various sectors of the green economy.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="p-6 bg-background border rounded-[2rem] text-center hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all group cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.count}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
