import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

export default function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-sona-teal',
  className,
}: StatCardProps) {
  const TrendIcon = change && change > 0 ? TrendingUp : change && change < 0 ? TrendingDown : Minus
  const trendColor = change && change > 0 ? 'text-sona-success' : change && change < 0 ? 'text-sona-danger' : 'text-sona-stone-400'

  return (
    <div
      className={cn('bg-white border border-sona-stone-200 p-5', className)}
      style={{ borderRadius: '4px' }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400">{label}</span>
        {Icon && (
          <div className={cn('p-2 bg-sona-stone-100', iconColor)} style={{ borderRadius: '4px' }}>
            <Icon className="w-4 h-4" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="font-mono text-2xl font-semibold text-sona-dark-teal mb-1">{value}</div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-mono', trendColor)}>
          <TrendIcon className="w-3 h-3" strokeWidth={1.5} />
          <span>{change > 0 ? '+' : ''}{change}%</span>
          {changeLabel && <span className="text-sona-stone-400 ml-1">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}
