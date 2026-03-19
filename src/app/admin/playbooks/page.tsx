'use client'

import { useState } from 'react'
import {
  Plus,
  Check,
  X,
  Clock,
  AlertTriangle,
  Archive,
  Pencil,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Sparkles,
  FileText,
  Swords,
  Palette,
  Package,
  Calendar,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import SonaDiamond from '@/components/shared/SonaDiamond'
import { cn } from '@/lib/utils'

// --- INTERFACES ---

interface PlaybookUpdate {
  id: string
  field: string
  currentValue: string
  suggestedValue: string
  source: string
  sourceDetail: string
  confidence: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected' | 'archived'
}

interface Playbook {
  id: string
  name: string
  description: string
  icon: LucideIcon
  lastUpdated: string
  lastReviewedBy: string
  updateFrequency: 'Weekly'
  sections: number
  pendingUpdates: number
  status: 'up_to_date' | 'review_needed' | 'overdue'
  updates: PlaybookUpdate[]
}

// --- DATA ---

const playbooks: Playbook[] = [
  {
    id: 'discovery',
    name: 'Discovery calls',
    description: 'Framework for running effective discovery calls. Includes question banks, MEDDIC mapping, objection handling, and call structure guidelines.',
    icon: MessageSquare,
    lastUpdated: '12 Mar 2026',
    lastReviewedBy: 'Kate Harrison',
    updateFrequency: 'Weekly',
    sections: 8,
    pendingUpdates: 2,
    status: 'review_needed',
    updates: [
      {
        id: 'du-1',
        field: 'Common objections — Pricing',
        currentValue: '"We\'re locked into a 3-year contract" — Respond with: migration cost analysis showing break-even at 14 months.',
        suggestedValue: '"We\'re locked into a 3-year contract" — Respond with: migration cost analysis showing break-even at 11 months (updated with Q1 2026 customer data). Add: "3 customers broke contracts early in Q4 — we can share their experience."',
        source: 'Gong call analysis',
        sourceDetail: '14 calls in last 30 days mentioned contract lock-in. New data from Loungers early termination.',
        confidence: 'high',
        status: 'pending',
      },
      {
        id: 'du-2',
        field: 'Discovery questions — Pain identification',
        currentValue: '5 standard pain discovery questions.',
        suggestedValue: 'Add question #6: "How are you currently handling demand forecasting for seasonal peaks?" — This pain point appeared in 38% of hospitality calls this month but isn\'t in the current question bank.',
        source: 'Gong theme analysis',
        sourceDetail: 'Seasonal demand forecasting mentioned in 12 of 32 hospitality calls. No existing question covers this.',
        confidence: 'high',
        status: 'pending',
      },
    ],
  },
  {
    id: 'deal-mgmt',
    name: 'Deal management',
    description: 'Stage-by-stage guide for progressing deals. Entry/exit criteria per stage, required MEDDIC fields, stakeholder engagement milestones, and risk indicators.',
    icon: FileText,
    lastUpdated: '14 Mar 2026',
    lastReviewedBy: 'Kate Harrison',
    updateFrequency: 'Weekly',
    sections: 6,
    pendingUpdates: 1,
    status: 'review_needed',
    updates: [
      {
        id: 'du-3',
        field: 'Stage 2 → Stage 3 exit criteria',
        currentValue: 'Minimum 2 stakeholders engaged. MEDDIC: Pain + Champion identified.',
        suggestedValue: 'Add criterion: "Competitor displacement angle documented." 4 of 6 deals that stalled in S3 last quarter had no competitor strategy. Also suggest requiring IT Director contact for deals >£200K (3 recent losses cited integration concerns raised late).',
        source: 'Win/loss analysis + pipeline data',
        sourceDetail: 'Q4 2025 deal review: 67% of S3 stalls lacked competitor positioning. 3 losses in Jan-Feb 2026 flagged late IT involvement.',
        confidence: 'medium',
        status: 'pending',
      },
    ],
  },
  {
    id: 'events',
    name: 'Event management',
    description: 'End-to-end event playbook. Pre-event prep, delegate research, on-site engagement, lead capture, post-event follow-up cadence, and ROI tracking.',
    icon: Calendar,
    lastUpdated: '10 Mar 2026',
    lastReviewedBy: 'Emma Davies',
    updateFrequency: 'Weekly',
    sections: 10,
    pendingUpdates: 0,
    status: 'up_to_date',
    updates: [],
  },
  {
    id: 'competitor',
    name: 'Competitor battle cards',
    description: 'Displacement playbooks for each competitor. Positioning, weaknesses, win rates, proof points, and objection handling per competitor.',
    icon: Swords,
    lastUpdated: '8 Mar 2026',
    lastReviewedBy: 'Kate Harrison',
    updateFrequency: 'Weekly',
    sections: 8,
    pendingUpdates: 3,
    status: 'overdue',
    updates: [
      {
        id: 'du-4',
        field: 'Fourth — Weaknesses',
        currentValue: '"Support quality has collapsed — average ticket resolution now 72+ hours."',
        suggestedValue: 'Update to: "Support quality has collapsed — average ticket resolution now 96+ hours. Major 12-hour outage on 11 Mar affecting scheduling for multiple chains (confirmed by 3 prospects in calls this week)."',
        source: 'Web monitoring + Gong calls',
        sourceDetail: 'Fourth outage reported on social media 11 Mar. Confirmed by prospects in Burger King, Wagamama, and Pret calls.',
        confidence: 'high',
        status: 'pending',
      },
      {
        id: 'du-5',
        field: 'Fourth — Win rate',
        currentValue: 'Win rate: 72%',
        suggestedValue: 'Update to: Win rate: 78%. Won 7 of 9 Fourth displacements in Q1 2026 (up from 72% in Q4 2025).',
        source: 'HubSpot deal data',
        sourceDetail: 'Closed-won analysis Q1 2026: 7 wins, 2 losses against Fourth. Previous quarter: 13 wins, 5 losses.',
        confidence: 'high',
        status: 'pending',
      },
      {
        id: 'du-6',
        field: 'Harri — New competitive intel',
        currentValue: 'No mention of Harri layoffs.',
        suggestedValue: 'Add: "Harri laid off 15% of UK team in February 2026 (source: LinkedIn posts from former employees). Customer success team particularly affected — expect longer response times for their customers."',
        source: 'LinkedIn monitoring',
        sourceDetail: '6 LinkedIn posts from former Harri employees in Feb 2026 mentioning layoffs. CS team members among them.',
        confidence: 'medium',
        status: 'pending',
      },
    ],
  },
  {
    id: 'brand',
    name: 'Brand book',
    description: 'Sona\'s tone of voice, messaging framework, visual identity guidelines, approved terminology, and content standards for all customer-facing communications.',
    icon: Palette,
    lastUpdated: '15 Mar 2026',
    lastReviewedBy: 'Emma Davies',
    updateFrequency: 'Weekly',
    sections: 12,
    pendingUpdates: 0,
    status: 'up_to_date',
    updates: [],
  },
  {
    id: 'product',
    name: 'Product knowledge',
    description: 'Module-by-module product documentation. Features, use cases, pricing, deployment, integrations, roadmap highlights, and FAQ for each Sona module.',
    icon: Package,
    lastUpdated: '5 Mar 2026',
    lastReviewedBy: 'Kate Harrison',
    updateFrequency: 'Weekly',
    sections: 14,
    pendingUpdates: 1,
    status: 'review_needed',
    updates: [
      {
        id: 'du-7',
        field: 'AI scheduling module — New feature',
        currentValue: 'No mention of demand forecasting v2.',
        suggestedValue: 'Add section: "Demand Forecasting v2 (shipped 10 Mar 2026) — Now includes weather-adjusted predictions and event-based demand spikes. Available to all Enterprise customers. Early data: 23% improvement in forecast accuracy for hospitality customers."',
        source: 'Product changelog + customer data',
        sourceDetail: 'Product team shipped v2 on 10 Mar. Performance data from 8 beta customers over 4 weeks.',
        confidence: 'high',
        status: 'pending',
      },
    ],
  },
]

const playbookStatusConfig = {
  up_to_date: { label: 'Up to date', variant: 'success' as const, icon: Check },
  review_needed: { label: 'Review needed', variant: 'warning' as const, icon: AlertTriangle },
  overdue: { label: 'Overdue', variant: 'danger' as const, icon: Clock },
}

// --- UPDATE CARD COMPONENT ---

function UpdateCard({ update, onAction }: { update: PlaybookUpdate; onAction: (id: string, action: 'approved' | 'rejected' | 'archived') => void }) {
  const [expanded, setExpanded] = useState(false)

  const confidenceConfig = {
    high: { label: 'High confidence', variant: 'success' as const },
    medium: { label: 'Medium confidence', variant: 'warning' as const },
    low: { label: 'Low confidence', variant: 'danger' as const },
  }

  if (update.status !== 'pending') {
    return (
      <div className="p-4 bg-sona-stone-100 border border-sona-stone-200 opacity-60" style={{ borderRadius: '4px' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-sona-stone-400 font-light">{update.field}</span>
          <Badge variant={update.status === 'approved' ? 'success' : update.status === 'rejected' ? 'danger' : 'default'}>
            {update.status}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-sona-stone-200 bg-white" style={{ borderRadius: '4px' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-sona-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Sparkles className="w-4 h-4 text-sona-warning shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-sona-dark-teal">{update.field}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant={confidenceConfig[update.confidence].variant}>
                {confidenceConfig[update.confidence].label}
              </Badge>
              <span className="font-mono text-[10px] text-sona-stone-400">via {update.source}</span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 text-sona-stone-400 shrink-0" strokeWidth={1.5} /> : <ChevronRight className="w-4 h-4 text-sona-stone-400 shrink-0" strokeWidth={1.5} />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-sona-stone-200 space-y-4">
          {/* Current vs Suggested */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
            <div className="p-3 bg-red-50 border border-red-200" style={{ borderRadius: '4px' }}>
              <div className="font-mono text-[11px] uppercase tracking-wider text-red-600 mb-2">Current</div>
              <p className="text-sm text-sona-dark-teal font-light leading-relaxed">{update.currentValue}</p>
            </div>
            <div className="p-3 bg-teal-50 border border-teal-200" style={{ borderRadius: '4px' }}>
              <div className="font-mono text-[11px] uppercase tracking-wider text-sona-teal mb-2">Suggested update</div>
              <p className="text-sm text-sona-dark-teal font-light leading-relaxed">{update.suggestedValue}</p>
            </div>
          </div>

          {/* Source detail */}
          <div className="p-3 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
            <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400 mb-1">Source detail</div>
            <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{update.sourceDetail}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onAction(update.id, 'approved')}
              className="flex items-center gap-1.5 px-3 py-2 bg-sona-dark-teal text-white font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-dark-teal/80 transition-colors"
              style={{ borderRadius: '6px' }}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
              Approve
            </button>
            <button
              onClick={() => onAction(update.id, 'approved')}
              className="flex items-center gap-1.5 px-3 py-2 border border-sona-stone-200 text-sona-dark-teal font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-stone-100 transition-colors"
              style={{ borderRadius: '6px' }}
            >
              <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
              Edit & approve
            </button>
            <button
              onClick={() => onAction(update.id, 'rejected')}
              className="flex items-center gap-1.5 px-3 py-2 border border-sona-stone-200 text-sona-stone-400 font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-stone-100 transition-colors"
              style={{ borderRadius: '6px' }}
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              Reject
            </button>
            <button
              onClick={() => onAction(update.id, 'archived')}
              className="flex items-center gap-1.5 px-3 py-2 border border-sona-stone-200 text-sona-stone-400 font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-stone-100 transition-colors"
              style={{ borderRadius: '6px' }}
            >
              <Archive className="w-3.5 h-3.5" strokeWidth={1.5} />
              Archive
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- PAGE ---

export default function PlaybooksPage() {
  const [updateStatuses, setUpdateStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected' | 'archived'>>({})

  const handleUpdateAction = (id: string, action: 'approved' | 'rejected' | 'archived') => {
    setUpdateStatuses((prev) => ({ ...prev, [id]: action }))
  }

  const getUpdateStatus = (update: PlaybookUpdate) => {
    return updateStatuses[update.id] || update.status
  }

  const totalPending = playbooks.reduce((sum, pb) => {
    return sum + pb.updates.filter((u) => getUpdateStatus(u) === 'pending').length
  }, 0)

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <SonaDiamond size={12} className="text-sona-teal" />
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-sona-teal">Admin · Playbooks</span>
        </div>
        <h1 className="text-2xl font-semibold text-sona-dark-teal">Team playbooks</h1>
        <p className="text-sona-stone-400 font-light mt-1">
          AI-suggested weekly updates from Gong, HubSpot, LinkedIn, and product data. Review and approve to keep playbooks current.
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-6 p-4 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Playbooks</div>
          <div className="font-mono text-lg font-semibold text-sona-dark-teal">{playbooks.length}</div>
        </div>
        <div className="w-px h-8 bg-sona-stone-200" />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Pending updates</div>
          <div className="font-mono text-lg font-semibold text-sona-warning">{totalPending}</div>
        </div>
        <div className="w-px h-8 bg-sona-stone-200" />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Update cycle</div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-sona-teal" strokeWidth={1.5} />
            <span className="font-mono text-sm font-medium text-sona-dark-teal">Weekly</span>
          </div>
        </div>
        <div className="flex-1" />
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 bg-sona-lime text-sona-dark-teal font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-sona-lime-hover transition-colors"
          style={{ borderRadius: '6px' }}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Create playbook
        </button>
      </div>

      {/* Playbook cards */}
      <div className="space-y-4">
        {playbooks.map((pb) => {
          const Icon = pb.icon
          const statusCfg = playbookStatusConfig[pb.status]
          const StatusIcon = statusCfg.icon
          const liveUpdates = pb.updates.map((u) => ({ ...u, status: getUpdateStatus(u) }))
          const livePending = liveUpdates.filter((u) => u.status === 'pending').length

          return (
            <Card key={pb.id}>
              {/* Playbook header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sona-stone-100" style={{ borderRadius: '4px' }}>
                    <Icon className="w-5 h-5 text-sona-dark-teal" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-medium text-sona-dark-teal">{pb.name}</h3>
                      <Badge variant={livePending > 0 ? statusCfg.variant : 'success'}>
                        {livePending > 0 ? `${livePending} pending` : 'Up to date'}
                      </Badge>
                    </div>
                    <p className="text-sm text-sona-stone-400 font-light leading-relaxed max-w-2xl">{pb.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <button className="p-2 text-sona-stone-400 hover:text-sona-dark-teal transition-colors" title="View playbook">
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button className="p-2 text-sona-stone-400 hover:text-sona-dark-teal transition-colors" title="Edit playbook">
                    <Pencil className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-5 mb-4 font-mono text-[11px] text-sona-stone-400">
                <span>{pb.sections} sections</span>
                <span>·</span>
                <span>Updated {pb.lastUpdated}</span>
                <span>·</span>
                <span>Reviewed by {pb.lastReviewedBy}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" strokeWidth={1.5} /> {pb.updateFrequency} updates</span>
              </div>

              {/* Pending updates */}
              {liveUpdates.length > 0 && (
                <div className="border-t border-sona-stone-200 pt-4 space-y-3">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400 mb-2">
                    Suggested updates
                  </div>
                  {liveUpdates.map((update) => (
                    <UpdateCard
                      key={update.id}
                      update={{ ...update, status: getUpdateStatus(update) }}
                      onAction={handleUpdateAction}
                    />
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
