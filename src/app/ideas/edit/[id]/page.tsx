"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category, Idea, IdeaStatus } from "@/types";
import api from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { HiPencilSquare, HiLightBulb } from "react-icons/hi2";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function EditIdeaPage() {
  const { id } = useParams();
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);

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
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated, loading]);

  const fetchData = async () => {
    try {
      const [categoriesRes, ideaRes] = await Promise.all([
        api.get("/categories"),
        api.get(`/ideas/${id}`)
      ]) as any;

      setCategories(categoriesRes.data);
      const idea = ideaRes.data as Idea;

      if (idea.status === IdeaStatus.APPROVED && !isAdmin) {
        toast.error("Cannot edit a published idea");
        router.push("/dashboard");
        return;
      }

      setFormData({
        title: idea.title,
        categoryId: idea.categoryId,
        problemStatement: idea.problemStatement,
        proposedSolution: idea.proposedSolution,
        description: idea.description,
        isPaid: idea.isPaid,
        price: idea.price?.toString() || "",
      });
      setExistingImages(idea.images || []);
      if (idea.images?.[0]) setImagePreview(idea.images[0]);
    } catch (error) {
      toast.error("Failed to fetch data");
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      
      if (newImage) {
        formDataToSend.append("images", newImage);
      }

      await api.put(`/ideas/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Idea updated successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update idea");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="pt-40 text-center">Loading idea details...</div>;

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl">
              <HiPencilSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Innovation</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Innovation Title</Label>
                <Input
                  id="title"
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
              <Label htmlFor="problem">Problem Statement</Label>
              <Textarea
                id="problem"
                className="min-h-[100px] rounded-2xl"
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Proposed Solution</Label>
              <Textarea
                id="solution"
                className="min-h-[100px] rounded-2xl"
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
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {newImage ? "New Image" : "Existing Image"}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="font-bold">No image uploaded</p>
                    <p className="text-sm text-muted-foreground">Click to add one</p>
                  </div>
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
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                className="min-h-[200px] rounded-2xl"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="p-6 bg-muted/30 rounded-3xl border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Monetize Your Idea</h3>
                  <p className="text-sm text-muted-foreground">Is this a premium innovation?</p>
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
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    className="h-12 rounded-xl"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required={formData.isPaid}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button type="button" variant="ghost" className="rounded-xl h-12 px-8" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-12 px-10 flex-1 shadow-lg shadow-primary/20" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Innovation"}
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
