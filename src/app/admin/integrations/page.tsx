'use client'

import {
  Plus,
  RefreshCw,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import SonaDiamond from '@/components/shared/SonaDiamond'
import { cn } from '@/lib/utils'

// --- INTERFACES ---

interface Integration {
  id: string
  name: string
  description: string
  status: 'connected' | 'configured' | 'not_connected'
  icon: string
  category: 'crm' | 'intelligence' | 'comms' | 'enrichment' | 'outbound' | 'content'
  lastSync?: string
  recordsSynced?: number
}

// --- DATA ---

const integrations: Integration[] = [
  { id: 'hubspot', name: 'HubSpot', description: 'CRM — contacts, companies, deals, activities', status: 'connected', icon: '🟠', category: 'crm', lastSync: '2 min ago', recordsSynced: 14832 },
  { id: 'slack', name: 'Slack', description: 'Comms — deal channels, notifications, handovers', status: 'connected', icon: '💬', category: 'comms', lastSync: 'Live', recordsSynced: 892 },
  { id: 'gong', name: 'Gong', description: 'Call intelligence — transcripts, coaching, themes', status: 'connected', icon: '🎙️', category: 'intelligence', lastSync: '15 min ago', recordsSynced: 347 },
  { id: 'gcal', name: 'Google Calendar', description: 'Scheduling — meetings, daily briefings, prep', status: 'connected', icon: '📅', category: 'comms', lastSync: '5 min ago', recordsSynced: 1204 },
  { id: 'granola', name: 'Granola', description: 'Meeting notes — post-meeting automation, action items', status: 'connected', icon: '📝', category: 'intelligence', lastSync: '1 hr ago', recordsSynced: 89 },
  { id: 'cognism', name: 'Cognism', description: 'Primary contact enrichment — email, phone, org data', status: 'configured', icon: '🔍', category: 'enrichment', lastSync: undefined },
  { id: 'fullenrich', name: 'Full Enrich', description: 'Secondary enrichment — HubSpot-embedded waterfall', status: 'configured', icon: '📊', category: 'enrichment', lastSync: undefined },
  { id: 'linkedin', name: 'LinkedIn (via Apify)', description: 'Signals — job changes, posts, company news', status: 'configured', icon: '💼', category: 'intelligence', lastSync: undefined },
  { id: 'notion', name: 'Notion', description: 'Knowledge base — playbooks, product docs, case studies', status: 'connected', icon: '📓', category: 'content', lastSync: '30 min ago', recordsSynced: 215 },
  { id: 'lemlist', name: 'Lemlist', description: 'Outbound orchestration — sequences, templates', status: 'not_connected', icon: '📧', category: 'outbound' },
  { id: 'canva', name: 'Canva', description: 'Asset creation — one-pagers, battle cards, templates', status: 'not_connected', icon: '🎨', category: 'content' },
  { id: 'rocketreach', name: 'Rocket Reach', description: 'Tertiary enrichment — fallback contact data', status: 'not_connected', icon: '🚀', category: 'enrichment' },
]

const statusConfig = {
  connected: { label: 'Connected', variant: 'success' as const },
  configured: { label: 'Configured', variant: 'warning' as const },
  not_connected: { label: 'Not connected', variant: 'default' as const },
}

// --- PAGE ---

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <SonaDiamond size={12} className="text-sona-teal" />
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-sona-teal">Admin · Integrations</span>
        </div>
        <h1 className="text-2xl font-semibold text-sona-dark-teal">Connected services</h1>
        <p className="text-sona-stone-400 font-light mt-1">
          Manage the tools and data sources that power the command centre.
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-6 p-4 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Connected</div>
          <div className="font-mono text-lg font-semibold text-sona-teal">{integrations.filter((i) => i.status === 'connected').length}</div>
        </div>
        <div className="w-px h-8 bg-sona-stone-200" />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Configured</div>
          <div className="font-mono text-lg font-semibold text-sona-warning">{integrations.filter((i) => i.status === 'configured').length}</div>
        </div>
        <div className="w-px h-8 bg-sona-stone-200" />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Not connected</div>
          <div className="font-mono text-lg font-semibold text-sona-stone-400">{integrations.filter((i) => i.status === 'not_connected').length}</div>
        </div>
        <div className="flex-1" />
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 bg-sona-lime text-sona-dark-teal font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-lime-hover transition-colors"
          style={{ borderRadius: '6px' }}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Add integration
        </button>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const status = statusConfig[integration.status]
          return (
            <Card key={integration.id} hover>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{integration.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-medium text-sona-dark-teal">{integration.name}</h3>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <p className="text-xs text-sona-stone-400 font-light mb-3">{integration.description}</p>
                  {integration.status === 'connected' && (
                    <div className="flex items-center gap-4 font-mono text-[10px] text-sona-stone-400">
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
                        {integration.lastSync}
                      </span>
                      {integration.recordsSynced && (
                        <span>{integration.recordsSynced.toLocaleString()} records</span>
                      )}
                    </div>
                  )}
                  {integration.status === 'configured' && (
                    <button className="font-mono text-[11px] font-medium uppercase tracking-wider text-sona-teal hover:text-sona-dark-teal transition-colors">
                      Connect now →
                    </button>
                  )}
                  {integration.status === 'not_connected' && (
                    <button className="font-mono text-[11px] font-medium uppercase tracking-wider text-sona-stone-400 hover:text-sona-dark-teal transition-colors">
                      Set up →
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
