import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline' | 'lime' | 'sky' | 'teal'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-sona-stone-100 text-sona-stone-500 border-sona-stone-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  purple: 'bg-violet-50 text-violet-700 border-violet-200',
  outline: 'bg-transparent text-sona-stone-500 border-sona-stone-300',
  lime: 'bg-lime-50 text-lime-700 border-lime-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
  dot?: boolean
  dotColor?: string
}

export default function Badge({ children, variant = 'default', className, dot, dotColor }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 border',
        variantStyles[variant],
        className
      )}
      style={{ borderRadius: '2px' }}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5', dotColor || 'bg-current')} style={{ borderRadius: '1px' }} />
      )}
      {children}
    </span>
  )
}
