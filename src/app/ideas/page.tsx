"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Idea, Category } from "@/types";
import api from "@/lib/api";
import { HiMagnifyingGlass, HiFunnel, HiXMark, HiChevronLeft, HiChevronRight, HiSparkles } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [priceFilter, setPriceFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);



  useEffect(() => {
    fetchIdeas();
  }, [debouncedSearchTerm, sortBy, priceFilter, page]);



  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      if (sortBy) params.append("sort", sortBy);
      if (priceFilter) params.append("payment", priceFilter);
      params.append("page", page.toString());
      params.append("limit", "12");
      
      const response = (await api.get(`/ideas?${params.toString()}`)) as any;
      setIdeas(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      console.error("Failed to fetch ideas:", error.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  };



  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("recent");
    setPriceFilter("");
    setPage(1);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50/50 dark:bg-slate-950/20">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                <HiSparkles className="w-4 h-4" />
                Innovations
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Explore the <span className="text-primary italic">Green Future</span></h1>
              <p className="text-muted-foreground text-lg">Discover and support high-impact sustainable solutions.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search innovations..." 
                  className="pl-12 h-12 rounded-2xl bg-background border-border focus-visible:ring-primary shadow-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className={cn("h-12 rounded-2xl px-6 gap-2 border-border shadow-sm flex-1 sm:flex-none", isFilterOpen && "bg-primary/5 border-primary/50 text-primary")}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <HiFunnel className="w-5 h-5" />
                  Filters
                </Button>
                <select 
                  className="h-12 px-4 rounded-2xl bg-background border border-border text-sm font-medium focus:ring-2 focus:ring-primary outline-none shadow-sm flex-1 sm:flex-none"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="top-voted">Top Voted</option>
                  <option value="most-commented">Most Commented</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-8 bg-background rounded-[2rem] border border-border shadow-xl space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


                    {/* Price Filter */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Access Type</h3>
                      <div className="flex gap-3">
                        {["", "free", "paid"].map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setPriceFilter(type);
                              setPage(1);
                            }}
                            className={cn(
                              "px-6 py-3 rounded-xl text-sm font-bold transition-all capitalize flex-1",
                              priceFilter === type 
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                : "bg-muted/50 hover:bg-muted border border-transparent"
                            )}
                          >
                            {type === "" ? "All" : type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {(searchTerm || priceFilter || sortBy !== "recent") && (
                    <div className="flex justify-between items-center pt-6 border-t">
                      <p className="text-sm text-muted-foreground">
                        Found <span className="font-bold text-foreground">{pagination?.total || 0}</span> results
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-sm font-bold text-destructive hover:underline flex items-center gap-2"
                      >
                        <HiXMark className="w-4 h-4" />
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ideas Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/9] w-full rounded-[2rem]" />
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-2/3 rounded-lg" />
                </div>
              ))}
            </div>
          ) : ideas.length > 0 ? (
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea, index) => (
                  <IdeaCard key={idea.id} idea={idea} index={index} />
                ))}
              </div>

              {/* Enhanced Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-12 border-t">
                  <Button
                    variant="outline"
                    className="rounded-2xl h-12 w-12 p-0 border-border"
                    disabled={!pagination.hasPrev}
                    onClick={() => setPage(page - 1)}
                  >
                    <HiChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "ghost"}
                        className={cn(
                          "rounded-2xl h-12 w-12 p-0 text-sm font-bold",
                          page === i + 1 && "shadow-xl shadow-primary/20 bg-primary"
                        )}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>

                  <div className="sm:hidden px-4 font-bold text-sm">
                    Page {page} of {pagination.totalPages}
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-2xl h-12 w-12 p-0 border-border"
                    disabled={!pagination.hasNext}
                    onClick={() => setPage(page + 1)}
                  >
                    <HiChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-background rounded-[3rem] border border-dashed border-border shadow-inner">
              <div className="bg-primary/5 p-8 rounded-full mb-8">
                <HiMagnifyingGlass className="w-16 h-16 text-primary/30" />
              </div>
              <h3 className="text-3xl font-bold mb-3 tracking-tight">No innovations found</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
                We couldn&apos;t find any ideas matching your current filters. Try broadening your search or clearing the filters.
              </p>
              <Button variant="link" className="mt-6 text-primary font-bold text-lg" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

// Helper function for conditional classes (if not imported from utils)
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
