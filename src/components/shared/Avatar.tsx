import { cn, getInitials } from '@/lib/utils'

const colorMap: Record<string, string> = {
  A: 'bg-sky-100 text-sky-700',
  B: 'bg-teal-100 text-teal-700',
  C: 'bg-violet-100 text-violet-700',
  D: 'bg-amber-100 text-amber-700',
  E: 'bg-red-100 text-red-700',
  F: 'bg-cyan-100 text-cyan-700',
  G: 'bg-pink-100 text-pink-700',
  H: 'bg-indigo-100 text-indigo-700',
  I: 'bg-teal-100 text-teal-700',
  J: 'bg-orange-100 text-orange-700',
  K: 'bg-rose-100 text-rose-700',
  L: 'bg-violet-100 text-violet-700',
  M: 'bg-sky-100 text-sky-700',
  N: 'bg-teal-100 text-teal-700',
  O: 'bg-amber-100 text-amber-700',
  P: 'bg-red-100 text-red-700',
  Q: 'bg-violet-100 text-violet-700',
  R: 'bg-cyan-100 text-cyan-700',
  S: 'bg-lime-100 text-lime-700',
  T: 'bg-indigo-100 text-indigo-700',
}

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
}

export default function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name)
  const colors = colorMap[name[0]?.toUpperCase()] || 'bg-sona-stone-100 text-sona-stone-500'

  return (
    <div
      className={cn(
        'flex items-center justify-center font-mono font-medium shrink-0',
        colors,
        sizeStyles[size],
        className
      )}
      style={{ borderRadius: '2px' }}
      title={name}
    >
      {initials}
    </div>
  )
}
