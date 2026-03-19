'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  badge?: number
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  children?: (activeTab: string) => React.ReactNode
}

export default function Tabs({ tabs, defaultTab, onChange, className, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)

  const handleChange = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-0 border-b border-sona-stone-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider transition-colors border-b-2 -mb-px',
              active === tab.id
                ? 'border-sona-dark-teal text-sona-dark-teal'
                : 'border-transparent text-sona-stone-400 hover:text-sona-stone-900'
            )}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 font-mono',
                active === tab.id
                  ? 'bg-sona-dark-teal text-white'
                  : 'bg-sona-stone-200 text-sona-stone-500'
              )} style={{ borderRadius: '2px' }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {children?.(active)}
    </div>
  )
}
