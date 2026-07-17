/**
 * Domain types for MojMajstor.ba.
 *
 * These model the data shapes the UI renders today from local mock data,
 * shaped so a future API/database layer can populate them without the
 * components needing to change.
 */

export type UserRole = "customer" | "craftsman" | "admin";

export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  city: string;
  role: UserRole;
  createdAt: string;
}

export interface Customer extends BaseUser {
  role: "customer";
  savedCraftsmanIds: string[];
}

export interface Category {
  slug: string;
  name: string;
  pluralName: string;
  description: string;
  icon: string;
  craftsmanCount: number;
}

export type AvailabilityStatus = "available" | "busy" | "away";

export interface WorkingHours {
  days: string;
  hours: string;
  closed?: boolean;
}

export interface Craftsman extends BaseUser {
  role: "craftsman";
  headline: string;
  categorySlugs: string[];
  bio: string[];
  rating: number;
  reviewCount: number;
  hourlyRateFrom: number;
  yearsExperience: number;
  verified: boolean;
  availability: AvailabilityStatus;
  tags: string[];
  skills: string[];
  neighborhood: string;
  phone: string;
  responseTime: string;
  gallery: { src: string; caption: string }[];
  workingHours: WorkingHours[];
}

export interface Review {
  id: string;
  craftsmanId: string;
  authorName: string;
  authorInitials: string;
  rating: number;
  comment: string;
  createdAgo: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  city: string;
  avatarUrl: string;
  quote: string;
  badge: "Verifikovan korisnik" | "Registrovan majstor";
}

export type JobRequestStatus =
  | "pending"
  | "offer_received"
  | "accepted"
  | "completed"
  | "cancelled";

export interface JobRequest {
  id: string;
  title: string;
  description: string;
  categorySlug: string;
  city: string;
  neighborhood: string;
  budgetFrom?: number;
  budgetTo?: number;
  preferredDate?: string;
  status: JobRequestStatus;
  createdAgo: string;
  urgent?: boolean;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatarUrl: string;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  sentAt: string;
}

export interface Conversation {
  id: string;
  participant: ChatParticipant;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface ActivityItem {
  id: string;
  actorName: string;
  actorAvatarUrl?: string;
  description: string;
  timeAgo: string;
  tags: { label: string; tone: "primary" | "success" | "warning" | "neutral" }[];
}
