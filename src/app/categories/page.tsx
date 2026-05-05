"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { HiArrowRight, HiSparkles, HiChevronRight, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import api from "@/lib/api";
import { Category, Idea } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryWithIdeas extends Category {
  ideas: Idea[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
  };
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryWithIdeas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCategoriesAndIdeas = useCallback(async (isInitial = true) => {
    if (isInitial) setIsLoading(true);
    try {
      const catRes = (await api.get("/categories")) as any;
      const allCategories = catRes.data;

      // Batch fetch up to 100 latest innovations to avoid connection pool timeouts
      const params = new URLSearchParams();
      params.append("limit", "100");
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      if (sortBy) params.append("sort", sortBy);
      
      const ideaRes = (await api.get(`/ideas?${params.toString()}`)) as any;
      const allIdeas: Idea[] = ideaRes.data || [];

      // Group into categories
      const categoriesWithIdeas = allCategories.map((cat: Category) => {
        const catIdeas = allIdeas.filter(idea => idea.categoryId === cat.id).slice(0, 4);
        return {
          ...cat,
          ideas: catIdeas,
          pagination: {
            currentPage: 1,
            totalPages: 1, // Simplified for batch mode
            hasNext: false, // Disabling inline pagination in batch mode for stability
          }
        };
      });

      setCategories(categoriesWithIdeas.filter((cat: CategoryWithIdeas) => cat.ideas.length > 0));
    } catch (error) {
      console.error("Failed to fetch categories and ideas:", error);
    } finally {
      if (isInitial) setIsLoading(false);
    }
  }, [debouncedSearchTerm, sortBy]);

  useEffect(() => {
    fetchCategoriesAndIdeas();
  }, [fetchCategoriesAndIdeas]);

  const loadMoreForCategory = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || !category.pagination?.hasNext) return;

    try {
      const nextPage = category.pagination.currentPage + 1;
      const params = new URLSearchParams();
      params.append("category", categoryId);
      params.append("limit", "4");
      params.append("page", nextPage.toString());
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      if (sortBy) params.append("sort", sortBy);

      const ideaRes = (await api.get(`/ideas?${params.toString()}`)) as any;
      
      setCategories(prev => prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            ideas: [...cat.ideas, ...(ideaRes.data || [])],
            pagination: {
              currentPage: nextPage,
              totalPages: ideaRes.pagination?.totalPages || 1,
              hasNext: ideaRes.pagination?.hasNext || false,
            }
          };
        }
        return cat;
      }));
    } catch (error) {
      console.error("Failed to load more ideas for category:", error);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-slate-50/30 dark:bg-slate-950/20">
      <Container>
        {/* Header & Global Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
              <HiSparkles className="w-5 h-5" />
              Categorized Innovations
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Sectors of <span className="text-primary italic">Sustainability</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore specialized solutions organized by sector. Use the search below to filter across all categories simultaneously.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search across sectors..." 
                className="pl-12 h-14 rounded-2xl bg-background border-border shadow-sm focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              )}
            </div>
            <select 
              className="h-14 px-6 rounded-2xl bg-background border border-border text-sm font-bold focus:ring-2 focus:ring-primary outline-none shadow-sm w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Newest First</option>
              <option value="top-voted">Top Voted</option>
              <option value="most-commented">Most Discussed</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-24">
          {isLoading ? (
            [1, 2].map((i) => (
              <div key={i} className="space-y-10">
                <div className="flex justify-between items-end border-b pb-8">
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-64 rounded-xl" />
                    <Skeleton className="h-4 w-96 rounded-lg" />
                  </div>
                  <Skeleton className="h-12 w-40 rounded-2xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="space-y-4">
                      <Skeleton className="aspect-[16/9] w-full rounded-[2rem]" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <motion.section 
                key={category.id} 
                className="space-y-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-10">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl filter drop-shadow-sm">{category.icon || "🌿"}</span>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{category.name}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Innovations focused on <span className="text-foreground font-medium">{category.name.toLowerCase()}</span> and related environmental technologies.
                    </p>
                  </div>
                  <Button variant="outline" className="group font-bold rounded-2xl h-12 px-6 border-border" render={<Link href={`/ideas?category=${category.id}`} />}>
                    View Collection
                    <HiChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.ideas.map((idea, index) => (
                    <IdeaCard key={idea.id} idea={idea} index={index} />
                  ))}
                </div>

                {category.pagination?.hasNext && (
                  <div className="flex justify-center pt-8">
                    <Button 
                      variant="ghost" 
                      className="font-bold text-primary hover:bg-primary/5 rounded-2xl px-10 h-14 border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all"
                      onClick={() => loadMoreForCategory(category.id)}
                    >
                      Load More in {category.name}
                    </Button>
                  </div>
                )}
              </motion.section>
            ))
          ) : (
            <div className="py-32 text-center bg-background rounded-[4rem] border border-dashed border-primary/20 shadow-inner">
              <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <HiMagnifyingGlass className="w-12 h-12 text-primary/30" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">No innovations found</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed mb-10">
                We couldn't find any ideas matching "<span className="text-foreground font-bold">{searchTerm}</span>" in any category.
              </p>
              <Button size="lg" className="rounded-full px-10 h-14 font-bold" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default CategoriesPage;
