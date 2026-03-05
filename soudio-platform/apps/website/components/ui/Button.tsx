import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined
}

interface LinkProps extends BaseProps {
  href: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

type Props = ButtonProps | LinkProps

const variants: Record<Variant, string> = {
  primary:  'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md',
  secondary:'bg-white hover:bg-neutral-50 text-primary-700 border border-primary-200 shadow-sm hover:shadow-md',
  ghost:    'hover:bg-neutral-100 text-neutral-700',
  outline:  'border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:bg-neutral-50',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-xl gap-1.5',
  md: 'text-sm px-6 py-3 rounded-xl gap-2',
  lg: 'text-base px-8 py-3.5 rounded-xl gap-2.5',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, fullWidth, ...props }: Props) {
  const base = `inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if ('href' in props && props.href) {
    const { href, target, ...rest } = props as LinkProps
    return (
      <Link href={href} target={target} className={base} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={base} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
