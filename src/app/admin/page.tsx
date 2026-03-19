'use client'

import Link from 'next/link'
import { BookOpen, Plug, RefreshCw, AlertTriangle, Check } from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import SonaDiamond from '@/components/shared/SonaDiamond'

export default function AdminOverview() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <SonaDiamond size={12} className="text-sona-teal" />
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-sona-teal">Admin</span>
        </div>
        <h1 className="text-2xl font-semibold text-sona-dark-teal">Command centre admin</h1>
        <p className="text-sona-stone-400 font-light mt-1">
          Manage integrations and keep team playbooks current with AI-suggested updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/playbooks">
          <Card hover className="h-full">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-sona-stone-100" style={{ borderRadius: '4px' }}>
                <BookOpen className="w-5 h-5 text-sona-dark-teal" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-medium text-sona-dark-teal">Playbooks</h2>
                  <Badge variant="warning">7 pending</Badge>
                </div>
                <p className="text-sm text-sona-stone-400 font-light leading-relaxed mb-3">
                  Discovery calls, deal management, competitor battle cards, brand book, product knowledge, and more.
                </p>
                <div className="flex items-center gap-4 font-mono text-[11px] text-sona-stone-400">
                  <span>6 playbooks</span>
                  <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" strokeWidth={1.5} /> Weekly updates</span>
                  <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-sona-warning" strokeWidth={1.5} /> 3 need review</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/integrations">
          <Card hover className="h-full">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-sona-stone-100" style={{ borderRadius: '4px' }}>
                <Plug className="w-5 h-5 text-sona-dark-teal" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-medium text-sona-dark-teal">Integrations</h2>
                  <Badge variant="success">6 connected</Badge>
                </div>
                <p className="text-sm text-sona-stone-400 font-light leading-relaxed mb-3">
                  HubSpot, Slack, Gong, Google Calendar, Granola, Notion, and enrichment providers.
                </p>
                <div className="flex items-center gap-4 font-mono text-[11px] text-sona-stone-400">
                  <span>12 services</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3 text-sona-teal" strokeWidth={1.5} /> 6 connected</span>
                  <span>3 configured</span>
                  <span>3 pending</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
