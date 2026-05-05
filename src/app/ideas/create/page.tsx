"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types";
import api from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { HiSparkles, HiLightBulb, HiPlus, HiXMark, HiCloudArrowUp } from "react-icons/hi2";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function CreateIdeaPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    problemStatement: "",
    proposedSolution: "",
    description: "",
    isPaid: false,
    price: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to submit an idea");
      router.push("/auth/login");
      return;
    }
    fetchCategories();
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const response = (await api.get("/categories")) as any;
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("problemStatement", formData.problemStatement);
      formDataToSend.append("proposedSolution", formData.proposedSolution);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPaid", String(formData.isPaid));
      if (formData.isPaid && formData.price) {
        formDataToSend.append("price", formData.price);
      }
      
      if (image) {
        formDataToSend.append("images", image);
      }

      await api.post("/ideas", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Idea submitted for review!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit idea");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl">
              <HiLightBulb className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Submit Your Innovation</h1>
          </div>
          <p className="text-muted-foreground text-lg mb-10">
            Share your green idea with the community and let&apos;s build a sustainable future together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Innovation Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Solar Water Filter"
                  className="h-12 rounded-xl"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full h-12 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem">What is the problem? (Problem Statement)</Label>
              <Textarea
                id="problem"
                placeholder="Describe the environmental challenge you're addressing..."
                className="min-h-[100px] rounded-2xl resize-none"
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">What is your proposed solution?</Label>
              <Textarea
                id="solution"
                placeholder="Summarize how your idea solves the problem..."
                className="min-h-[100px] rounded-2xl resize-none"
                value={formData.proposedSolution}
                onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Innovation Image</Label>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50",
                  imagePreview ? "border-primary/50 bg-primary/5" : "border-border"
                )}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 rounded-full hover:bg-destructive hover:text-white transition-all shadow-lg"
                    >
                      <HiXMark className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <HiCloudArrowUp className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">Click or drag an image here</p>
                      <p className="text-muted-foreground">PNG, JPG or WEBP (Max 5MB)</p>
                    </div>
                  </>
                )}
                <input 
                  id="image-upload"
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed breakdown of your innovation, its feasibility, and potential impact..."
                className="min-h-[200px] rounded-2xl resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Premium toggle and Price */}
            <div className="p-6 bg-muted/30 rounded-3xl border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Monetize Your Idea</h3>
                  <p className="text-sm text-muted-foreground">Lock this idea behind a paywall for premium access.</p>
                </div>
                <div 
                  onClick={() => setFormData({ ...formData, isPaid: !formData.isPaid })}
                  className={cn(
                    "w-12 h-6 rounded-full relative cursor-pointer transition-colors",
                    formData.isPaid ? "bg-primary" : "bg-slate-300"
                  )}
                >
                  <motion.div 
                    animate={{ x: formData.isPaid ? 24 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </div>
              </div>
              
              {formData.isPaid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    className="h-12 rounded-xl"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required={formData.isPaid}
                  />
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button type="button" variant="ghost" className="rounded-xl h-12 px-8" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-12 px-10 flex-1 shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save as Draft"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
