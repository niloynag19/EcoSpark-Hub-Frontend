"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", votes: 400, ideas: 24 },
  { name: "Feb", votes: 300, ideas: 13 },
  { name: "Mar", votes: 200, ideas: 98 },
  { name: "Apr", votes: 278, ideas: 39 },
  { name: "May", votes: 189, ideas: 48 },
  { name: "Jun", votes: 239, ideas: 38 },
  { name: "Jul", votes: 349, ideas: 43 },
];

export const StatsChart = ({ title }: { title: string }) => {
  return (
    <div className="p-8 bg-background border rounded-[2.5rem] shadow-sm">
      <h3 className="text-xl font-bold mb-8">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#888" }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#888" }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
            />
            <Area 
              type="monotone" 
              dataKey="votes" 
              stroke="var(--primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVotes)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
