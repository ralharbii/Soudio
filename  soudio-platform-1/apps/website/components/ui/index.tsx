import { HTMLAttributes, ReactNode } from 'react'

/* ── Card ──────────────────────────────────────────────── */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ children, hover = false, padding = 'md', className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200 ${paddings[padding]} ${
        hover ? 'hover:shadow-lg hover:-translate-y-0.5' : 'shadow-sm'
      } transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Container ─────────────────────────────────────────── */
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function Container({ children, size = 'xl', className = '', ...props }: ContainerProps) {
  return (
    <div className={`${containerSizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  )
}

/* ── Section ───────────────────────────────────────────── */
interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  bg?: 'white' | 'subtle' | 'dark' | 'primary'
}

const bgClasses = {
  white:   'bg-white',
  subtle:  'bg-neutral-50',
  dark:    'bg-neutral-950 text-white',
  primary: 'bg-primary-600 text-white',
}

export function Section({ children, bg = 'white', className = '', ...props }: SectionProps) {
  return (
    <section className={`py-20 lg:py-28 ${bgClasses[bg]} ${className}`} {...props}>
      {children}
    </section>
  )
}

/* ── SectionHeader ─────────────────────────────────────── */
interface SectionHeaderProps {
  tag?: string
  title: string
  description?: string
  center?: boolean
  light?: boolean
}

export function SectionHeader({ tag, title, description, center = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {tag && (
        <span className="inline-flex items-center bg-primary-50 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full border border-primary-100 mb-4">
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-primary-100' : 'text-neutral-500'} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  )
}

/* ── Badge ─────────────────────────────────────────────── */
interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'accent'
  className?: string
}

const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-700',
  success: 'bg-primary-50 text-primary-700',
  warning: 'bg-accent-50 text-accent-700',
  accent:  'bg-accent-100 text-accent-800',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${badgeVariants[variant]} ${className}`}>
      {children}
    </span>
  )
}
