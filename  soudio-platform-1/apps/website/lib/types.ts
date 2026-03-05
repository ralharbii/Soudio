// ─── Common Types ─────────────────────────────────────────────────────────

export interface Studio {
  id: string
  name: string
  title: string
  role: string
  description: string
  style: string
  usage: string
  color: string
  emoji: string
  tag: string
  styles: string[]
  isLocked?: boolean
}

export interface Plan {
  id: string
  name: string
  subtitle: string
  price: number
  images: number
  trial: number
  popular: boolean
  badge?: string
  features: string[]
}

export interface FAQItem {
  q: string
  a: string
}

export interface FAQCategory {
  id: string
  label: string
  faqs: FAQItem[]
}

export interface GalleryItem {
  id: number
  studio: string
  studioId: string
  style: string
  imageUrl?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// ─── User Types ────────────────────────────────────────────────────────────

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  createdAt: string
}

export interface Subscription {
  planId: string
  planName: string
  status: 'active' | 'expired' | 'cancelled'
  startDate: string
  endDate: string
  imageBalance: number
  imageUsed: number
  additionalBalance?: number
}
