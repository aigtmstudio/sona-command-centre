'use client'

import { Bell, Search, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import SonaDiamond from '@/components/shared/SonaDiamond'

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = [{ label: 'Dashboard', href: '/' }]

  const labelMap: Record<string, string> = {
    bdr: 'BDR HQ',
    ae: 'AE HQ',
    marketing: 'Marketing HQ',
    manager: 'Manager HQ',
    'account-prioritiser': 'Account prioritiser',
    'contact-discovery': 'Contact discovery',
    'outreach-intelligence': 'Outreach intelligence',
    'handover-pack': 'AE handover pack',
    'chief-of-staff': 'Chief of staff',
    'account-planner': 'Account planner',
    'discovery-coach': 'Discovery coach',
    'admin-assistant': 'Admin assistant',
    'asset-factory': 'Asset factory',
    'pre-event': 'Pre-event intel',
    'post-event': 'Post-event pipeline',
    'content-intelligence': 'Content intelligence',
    'abm-workshop': 'ABM workshop',
    'one-to-one': '1:1 prep & coaching',
    'data-hygiene': 'Data hygiene',
    enablement: 'Enablement engine',
    performance: 'Team performance',
  }

  let href = ''
  for (const segment of segments) {
    href += `/${segment}`
    crumbs.push({
      label: labelMap[segment] || segment,
      href,
    })
  }

  return crumbs
}

export default function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <header className="sticky top-0 z-30 h-14 bg-sona-stone-50 border-b border-sona-stone-200 flex items-center justify-between px-6 gap-4">
      {/* Left: mobile menu + breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden text-sona-stone-400 hover:text-sona-stone-900">
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}
        <nav className="flex items-center gap-2 min-w-0">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2 min-w-0">
              {i > 0 && (
                <SonaDiamond size={8} className="text-sona-stone-300" />
              )}
              <span
                className={cn(
                  'truncate font-mono text-xs uppercase tracking-wider',
                  i === breadcrumbs.length - 1
                    ? 'text-sona-dark-teal font-medium'
                    : 'text-sona-stone-400'
                )}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right: search + notifications */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden md:flex items-center gap-2 bg-sona-stone-100 border border-sona-stone-200 px-3 py-1.5" style={{ borderRadius: '4px' }}>
          <Search className="w-4 h-4 text-sona-stone-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search accounts, deals..."
            className="bg-transparent text-sm text-sona-stone-900 placeholder-sona-stone-400 outline-none w-48 font-light"
          />
          <kbd className="font-mono text-[10px] text-sona-stone-400 bg-white px-1.5 py-0.5 border border-sona-stone-200" style={{ borderRadius: '2px' }}>
            /
          </kbd>
        </div>

        <button className="relative p-2 text-sona-stone-400 hover:text-sona-stone-900 transition-colors" style={{ borderRadius: '4px' }}>
          <Bell className="w-5 h-5" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sona-danger" style={{ borderRadius: '2px' }} />
        </button>

        <div
          className="w-8 h-8 bg-sona-dark-teal flex items-center justify-center text-white font-mono text-[10px] font-semibold"
          style={{ borderRadius: '2px' }}
        >
          MW
        </div>
      </div>
    </header>
  )
}
