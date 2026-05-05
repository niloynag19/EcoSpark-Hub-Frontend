export enum Role {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export enum IdeaStatus {
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  createdAt: string;
}

export interface Idea {
  id: string;
  title: string;
  slug: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price?: number;
  status: IdeaStatus;
  adminFeedback?: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: User;
  categoryId: string;
  category?: Category;
  hasAccess?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: User;
  ideaId: string;
  parentId?: string;
  replies?: Comment[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
