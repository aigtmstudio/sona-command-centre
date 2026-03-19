'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, type NavSection } from '@/lib/navigation'
import SonaLogo from '@/components/shared/SonaLogo'
import SonaDiamond from '@/components/shared/SonaDiamond'

function SectionItem({ section, collapsed }: { section: NavSection; collapsed: boolean }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(section.href)
  const [expanded, setExpanded] = useState(isActive)

  const totalBadge = section.items.reduce((sum, item) => sum + (item.badge || 0), 0)

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-white/10 text-white'
            : 'text-sona-stone-300 hover:text-white hover:bg-white/5'
        )}
        style={{ borderRadius: '4px' }}
      >
        <section.icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-sona-lime' : '')} strokeWidth={1.5} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{section.label}</span>
            {totalBadge > 0 && (
              <span className="bg-sona-lime text-sona-dark-teal font-mono text-[10px] font-semibold px-1.5 py-0.5" style={{ borderRadius: '2px' }}>
                {totalBadge}
              </span>
            )}
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-sona-stone-300" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="w-4 h-4 text-sona-stone-300" strokeWidth={1.5} />
            )}
          </>
        )}
      </button>

      {expanded && !collapsed && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-white/8 pl-3">
          {section.items.map((item) => {
            const isItemActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 text-sm transition-colors',
                  isItemActive
                    ? 'text-sona-lime font-medium'
                    : 'text-sona-stone-300 hover:text-white hover:bg-white/5'
                )}
                style={{ borderRadius: '4px' }}
              >
                <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    'font-mono text-[10px] font-medium px-1.5 py-0.5',
                    isItemActive
                      ? 'bg-sona-lime/20 text-sona-lime'
                      : 'bg-white/10 text-sona-stone-300'
                  )} style={{ borderRadius: '2px' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-sona-dark-teal border-r border-white/8 flex flex-col z-40 transition-all duration-300',
        collapsed ? 'w-16' : 'w-[270px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/8 shrink-0">
        {collapsed ? (
          <SonaDiamond size={20} className="text-sona-lime mx-auto" />
        ) : (
          <div className="flex items-center gap-3">
            <SonaLogo className="text-white" height={22} />
            <span className="font-mono text-[10px] font-medium text-sona-stone-200 uppercase tracking-widest">CMD</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {/* Dashboard link */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-sona-stone-300 hover:text-white hover:bg-white/5 transition-colors mb-3"
          style={{ borderRadius: '4px' }}
        >
          <SonaDiamond size={16} className="text-sona-lime" />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        {navigation.map((section) => (
          <SectionItem key={section.href} section={section} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 py-3 border-t border-white/8 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 text-sm text-sona-stone-300 hover:text-white hover:bg-white/5 transition-colors w-full"
          style={{ borderRadius: '4px' }}
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
