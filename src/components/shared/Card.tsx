import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  variant?: 'default' | 'muted'
}

export default function Card({ children, className, hover, onClick, variant = 'default' }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border border-sona-stone-200 p-5',
        variant === 'default' ? 'bg-white' : 'bg-sona-stone-100',
        hover && 'cursor-pointer hover:border-sona-stone-300 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      style={{ borderRadius: '4px' }}
    >
      {children}
    </div>
  )
}
