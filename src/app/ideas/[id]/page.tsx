"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Idea, Comment, VoteType } from "@/types";
import api from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { 
  HiArrowUp, 
  HiArrowDown, 
  HiChatBubbleLeftEllipsis, 
  HiCalendar, 
  HiUser, 
  HiTag, 
  HiLockClosed,
  HiChevronLeft,
  HiShare,
  HiArrowRight,
  HiStar
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StripePayment } from "@/components/payment/StripePayment";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function IdeaDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [relatedIdeas, setRelatedIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    fetchIdea();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (idea?.categoryId) {
      fetchRelatedIdeas();
    }
  }, [idea?.categoryId]);

  const fetchRelatedIdeas = async () => {
    if (!idea) return;
    try {
      const res = (await api.get(`/ideas?category=${idea.categoryId}&limit=4`)) as any;
      setRelatedIdeas(res.data.filter((i: Idea) => i.id !== id));
    } catch (error) {
      console.error("Failed to fetch related ideas");
    }
  };

  const fetchIdea = async () => {
    try {
      const response = (await api.get(`/ideas/${id}`)) as any;
      setIdea(response.data);
    } catch (error) {
      toast.error("Idea not found");
      router.push("/ideas");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = (await api.get(`/ideas/${id}/comments`)) as any;
      setComments(response.data);
    } catch (error: any) {
      console.error("Failed to fetch comments:", error.response?.data?.message || error.message || error);
    }
  };

  const handleVote = async (type: VoteType) => {
    if (!isAuthenticated) {
      toast.error("Please login to vote");
      router.push("/auth/login");
      return;
    }
    
    setIsVoting(true);
    try {
      await api.post(`/ideas/${id}/vote`, { type });
      fetchIdea(); // Refresh idea to get new counts
      toast.success(type === VoteType.UPVOTE ? "Upvoted!" : "Downvoted!");
    } catch (error: any) {
      toast.error(error.message || "Vote failed");
    } finally {
      setIsVoting(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      await api.post(`/ideas/${id}/comments`, { 
        content: newComment,
        rating: rating > 0 ? rating : null 
      });
      setNewComment("");
      setRating(0);
      fetchComments();
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="aspect-[21/9] w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-2/3 rounded-lg" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!idea) return null;

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent group" render={<Link href="/ideas" />}>
            <div className="flex items-center gap-2 font-medium">
              <HiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Innovations
            </div>
          </Button>

          {/* Header */}
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-none flex items-center gap-1.5 py-1 px-3">
                <HiTag className="w-4 h-4" />
                {idea.category?.name}
              </Badge>
              {idea.isPaid && (
                <Badge variant="secondary" className="bg-amber-500 text-white border-none flex items-center gap-1.5 py-1 px-3">
                  <HiLockClosed className="w-4 h-4" />
                  Premium Idea
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{idea.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg overflow-hidden border">
                  {idea.author?.avatar ? (
                    <img src={idea.author.avatar} alt={idea.author.name} className="w-full h-full object-cover" />
                  ) : (
                    idea.author?.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-bold text-lg leading-none mb-1">{idea.author?.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HiCalendar className="w-4 h-4" />
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-xl h-11 px-4 gap-2 border-border/60 hover:bg-muted" onClick={() => {
                   navigator.clipboard.writeText(window.location.href);
                   toast.success("Link copied!");
                }}>
                  <HiShare className="w-5 h-5" />
                  Share
                </Button>
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn("h-9 rounded-lg gap-2 px-3", isVoting && "opacity-50")} 
                    onClick={() => handleVote(VoteType.UPVOTE)}
                  >
                    <HiArrowUp className="w-5 h-5 text-primary" />
                    <span className="font-bold">{idea.upvoteCount}</span>
                  </Button>
                  <div className="w-[1px] h-4 bg-border" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn("h-9 rounded-lg px-3", isVoting && "opacity-50")} 
                    onClick={() => handleVote(VoteType.DOWNVOTE)}
                  >
                    <HiArrowDown className="w-5 h-5 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  Problem Statement
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {idea.problemStatement}
                </p>
              </section>

              {idea.images && idea.images.length > 0 && (
                <div className="rounded-3xl overflow-hidden border shadow-lg">
                  <img src={idea.images[0]} alt="Idea Visual" className="w-full object-cover aspect-[16/9]" />
                </div>
              )}

              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  Proposed Solution
                </h2>
                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap italic">
                    &quot;{idea.proposedSolution}&quot;
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  Full Description
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
                  {idea.description}
                </div>
              </section>

              {/* Comments Section */}
              <section className="pt-12 border-t">
                <div className="flex items-center gap-3 mb-8">
                  <HiChatBubbleLeftEllipsis className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Discussion ({idea.commentCount})</h2>
                </div>

                {isAuthenticated ? (
                  <form onSubmit={handleAddComment} className="mb-12">
                    <div className="p-1 bg-muted/50 rounded-2xl border focus-within:ring-2 ring-primary/20 transition-all">
                      <div className="flex items-center gap-1 p-3 px-4 border-b border-border/50">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-3">Rate Experience</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-transform active:scale-90"
                          >
                            <HiStar 
                              className={cn(
                                "w-5 h-5 transition-colors",
                                (hoveredRating || rating) >= star ? "text-amber-400" : "text-muted/40"
                              )} 
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[120px] resize-none text-lg outline-none"
                        placeholder="Share your experience or thoughts on this innovation..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="flex justify-end p-2">
                        <Button type="submit" disabled={!newComment.trim()} className="rounded-xl px-6">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="p-8 bg-muted/30 rounded-3xl text-center border border-dashed mb-12">
                    <p className="text-muted-foreground mb-4">You need to be logged in to join the discussion.</p>
                    <Button variant="outline" className="rounded-xl" render={<Link href="/auth/login" />}>
                      Sign In to Comment
                    </Button>
                  </div>
                )}

                <div className="space-y-8">
                  {comments.map((comment) => (
                    <CommentItem 
                      key={comment.id} 
                      comment={comment} 
                      ideaId={idea.id} 
                      onReplySuccess={fetchComments}
                      isAuthenticated={isAuthenticated}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-32">
                <Card className="rounded-3xl border-primary/10 shadow-lg overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-6">
                    <CardTitle className="text-xl font-bold">Innovation Impact</CardTitle>
                    <CardDescription>Support this project to help it grow</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Community Support</span>
                      <span className="font-bold text-primary flex items-center gap-1">
                        <HiArrowUp className="w-4 h-4" />
                        {idea.upvoteCount} Votes
                      </span>
                    </div>
                    {idea.isPaid && (
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30">
                        <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-2 flex items-center gap-2">
                          <HiLockClosed className="w-4 h-4" />
                          Premium Access
                        </p>
                        <p className="text-2xl font-bold mb-4">${idea.price}</p>
                        <Button 
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-11 shadow-lg shadow-amber-500/20"
                          onClick={() => {
                            if (!isAuthenticated) {
                              toast.error("Please login to purchase");
                              router.push("/auth/login");
                              return;
                            }
                            setIsPaymentModalOpen(true);
                          }}
                        >
                          Purchase Access
                        </Button>
                      </div>
                    )}
                    <Button variant="outline" className="w-full rounded-xl h-11">
                      Save for Later
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {relatedIdeas.length > 0 && (
        <section className="py-20 border-t bg-muted/20 mt-20">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Related Innovations</h2>
              <Button variant="ghost" render={<Link href="/ideas" />}>
                <div className="flex items-center">View All <HiArrowRight className="ml-2" /></div>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedIdeas.map((relatedIdea) => (
                <IdeaCard key={relatedIdea.id} idea={relatedIdea} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-primary p-8 text-primary-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Premium Innovation</DialogTitle>
            </DialogHeader>
            <p className="mt-2 text-primary-foreground/80">Support the innovator and unlock full project details.</p>
          </div>
          <StripePayment 
            ideaId={idea.id} 
            amount={Number(idea.price)} 
            onSuccess={() => {
              setIsPaymentModalOpen(false);
              fetchIdea();
            }}
            onCancel={() => setIsPaymentModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Helper Components ---

function CommentItem({ comment, ideaId, onReplySuccess, isAuthenticated, depth = 0 }: { 
  comment: Comment, 
  ideaId: string, 
  onReplySuccess: () => void,
  isAuthenticated: boolean,
  depth?: number 
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isOwner = user?.id === comment.userId;
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${comment.id}`);
      toast.success("Comment deleted");
      onReplySuccess();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setIsLoading(true);
    try {
      await api.post(`/ideas/${ideaId}/comments`, { 
        content: replyContent, 
        parentId: comment.id 
      });
      setReplyContent("");
      setIsReplying(false);
      onReplySuccess();
      toast.success("Reply posted!");
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-4", depth > 0 && "ml-8 md:ml-12 border-l-2 border-primary/10 pl-6")}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold border shrink-0 overflow-hidden">
          {comment.user?.avatar ? (
            <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
          ) : (
            comment.user?.name.charAt(0)
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">{comment.user?.name}</span>
              <span className="text-xs text-muted-foreground">• {new Date(comment.createdAt).toLocaleDateString()}</span>
              {comment.rating !== undefined && comment.rating !== null && (
                <div className="flex items-center gap-0.5 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <HiStar 
                      key={i} 
                      className={cn("w-3 h-3", i < (comment.rating || 0) ? "text-amber-400" : "text-muted/20")} 
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {(isAdmin || isOwner) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs text-destructive hover:bg-destructive/5"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              {isAuthenticated && depth < 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs text-primary hover:bg-primary/5"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  Reply
                </Button>
              )}
            </div>
          </div>
          <p className="text-muted-foreground bg-muted/20 p-4 rounded-2xl border border-border/50">
            {comment.content}
          </p>

          {isReplying && (
            <form onSubmit={handleReply} className="mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="p-1 bg-muted/30 rounded-xl border focus-within:ring-2 ring-primary/20">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 p-3 min-h-[80px] resize-none text-sm outline-none"
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="flex justify-end gap-2 p-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsReplying(false)}>Cancel</Button>
                  <Button type="submit" size="sm" disabled={!replyContent.trim() || isLoading}>
                    {isLoading ? "Posting..." : "Reply"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              ideaId={ideaId} 
              onReplySuccess={onReplySuccess}
              isAuthenticated={isAuthenticated}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

