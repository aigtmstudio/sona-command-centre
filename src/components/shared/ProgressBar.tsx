import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showFraction?: boolean
  color?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  value,
  max,
  label,
  showFraction,
  color = 'bg-sona-dark-teal',
  className,
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  const isOverTarget = value >= max
  const barColor = isOverTarget ? 'bg-sona-teal' : color

  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }

  return (
    <div className={cn('w-full', className)}>
      {(label || showFraction) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="font-mono text-xs uppercase tracking-wider text-sona-stone-400">{label}</span>}
          {showFraction && (
            <span className="font-mono text-sm font-semibold text-sona-dark-teal">
              {value} <span className="text-sona-stone-400 font-normal">/ {max}</span>
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-sona-stone-200 overflow-hidden', heights[size])} style={{ borderRadius: '2px' }}>
        <div
          className={cn('h-full transition-all duration-500', barColor)}
          style={{ width: `${pct}%`, borderRadius: '2px' }}
        />
      </div>
    </div>
  )
}
