'use client'

import { useState } from 'react'
import {
  Mic,
  FileSearch,
  BarChart3,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Plus,
  BookOpen,
  Video,
  FileText,
  Presentation,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { cn } from '@/lib/utils'

const callThemes = [
  { theme: 'Scheduling pain / manager time', frequency: 67, color: 'bg-red-500' },
  { theme: 'Agency costs / temp staff', frequency: 54, color: 'bg-orange-500' },
  { theme: 'Staff retention / turnover', frequency: 48, color: 'bg-amber-500' },
  { theme: 'Compliance concerns (CQC/WTD)', frequency: 42, color: 'bg-yellow-500' },
  { theme: 'AI in workforce management', frequency: 38, color: 'bg-sona-dark-teal' },
  { theme: 'Mobile app for frontline staff', frequency: 35, color: 'bg-cyan-500' },
  { theme: 'Payroll integration', frequency: 28, color: 'bg-indigo-400' },
  { theme: 'Competitor frustration (Fourth)', frequency: 24, color: 'bg-purple-400' },
]

const contentGaps = [
  { id: 'g1', gap: 'No CFO-targeted ROI content', priority: 'High', priorityVariant: 'danger' as const },
  { id: 'g2', gap: 'No Allocate migration case study', priority: 'High', priorityVariant: 'danger' as const },
  { id: 'g3', gap: 'No retail vertical one-pager', priority: 'High', priorityVariant: 'danger' as const },
  { id: 'g4', gap: 'Missing competitive battle card for Access Group', priority: 'Medium', priorityVariant: 'warning' as const },
  { id: 'g5', gap: 'No video testimonial from hospitality customer', priority: 'Medium', priorityVariant: 'warning' as const },
  { id: 'g6', gap: 'Blog content on AI scheduling outdated (6 months old)', priority: 'Low', priorityVariant: 'default' as const },
]

const competitorMentions = [
  { name: 'Fourth', mentions: 34, trend: 'up' as const, color: 'bg-red-500' },
  { name: 'Allocate', mentions: 28, trend: 'up' as const, color: 'bg-orange-500' },
  { name: 'Harri', mentions: 15, trend: 'stable' as const, color: 'bg-amber-500' },
  { name: 'Deputy', mentions: 12, trend: 'down' as const, color: 'bg-yellow-500' },
  { name: 'Civica', mentions: 9, trend: 'stable' as const, color: 'bg-sona-dark-teal' },
  { name: 'Access Group', mentions: 7, trend: 'up' as const, color: 'bg-purple-500' },
]

const suggestedContent = [
  {
    id: 'sc1',
    title: 'The True Cost of Manual Scheduling',
    format: 'Whitepaper',
    icon: BookOpen,
    persona: 'CFO',
    priority: 'High',
    priorityVariant: 'danger' as const,
    rationale: 'Agency costs mentioned in 54% of calls — no CFO-targeted ROI content exists',
  },
  {
    id: 'sc2',
    title: 'Migrating from Allocate: A Care Provider\'s Guide',
    format: 'Case Study',
    icon: FileText,
    persona: 'IT Director',
    priority: 'High',
    priorityVariant: 'danger' as const,
    rationale: 'Allocate mentioned in 28 calls — no migration content exists',
  },
  {
    id: 'sc3',
    title: 'AI Scheduling: Hype vs Reality for Hospitality',
    format: 'Webinar',
    icon: Presentation,
    persona: 'Operations Director',
    priority: 'Medium',
    priorityVariant: 'warning' as const,
    rationale: 'AI mentioned in 38% of calls — strong interest but scepticism',
  },
  {
    id: 'sc4',
    title: 'Sona for Retail: Why Frontline Matters',
    format: 'One-pager',
    icon: FileText,
    persona: 'HR Director',
    priority: 'Medium',
    priorityVariant: 'warning' as const,
    rationale: 'New vertical, zero retail-specific content available',
  },
]

const maxMentions = 34

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-red-600" />
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-sona-teal" />
  return <Minus className="w-3.5 h-3.5 text-sona-stone-400" />
}

const trendLabel = (trend: 'up' | 'down' | 'stable') => {
  if (trend === 'up') return 'Increasing'
  if (trend === 'down') return 'Decreasing'
  return 'Stable'
}

export default function ContentIntelligencePage() {
  const [createdGaps, setCreatedGaps] = useState<Set<string>>(new Set())

  const handleCreateGap = (id: string) => {
    setCreatedGaps((prev) => new Set(prev).add(id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-600" />
          Content & Campaign Intelligence
        </h1>
        <p className="text-sona-stone-400 mt-1">
          Data-driven insights from Gong calls, competitor mentions, and content performance.
        </p>
      </div>

      {/* Top Row: Call Themes + Content Gaps */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Call Theme Mining */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-sona-teal" />
              <h2 className="text-lg font-semibold text-sona-dark-teal">Call Theme Mining</h2>
            </div>
            <span className="text-xs text-sona-stone-400">147 Gong calls this month</span>
          </div>
          <div className="space-y-3">
            {callThemes.map((theme, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-sona-dark-teal">{theme.theme}</span>
                  <span className="text-sm font-semibold text-sona-dark-teal">{theme.frequency}%</span>
                </div>
                <div className="w-full h-3 bg-sona-stone-100 rounded-sm overflow-hidden">
                  <div
                    className={cn('h-full rounded-sm transition-all duration-700', theme.color)}
                    style={{ width: `${theme.frequency}%`, opacity: 0.4 + (theme.frequency / 100) * 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Gaps */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-sona-dark-teal">Content Gaps</h2>
            </div>
            <Badge variant="danger">{contentGaps.length} gaps identified</Badge>
          </div>
          <div className="space-y-3">
            {contentGaps.map((gap) => (
              <div
                key={gap.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded border transition-all',
                  createdGaps.has(gap.id)
                    ? 'bg-teal-500/5 border-emerald-500/20'
                    : 'bg-sona-stone-100 border-sona-stone-200 hover:border-sona-stone-200'
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge variant={gap.priorityVariant} className="shrink-0">{gap.priority}</Badge>
                  <span className={cn(
                    'text-sm',
                    createdGaps.has(gap.id) ? 'text-sona-stone-400 line-through' : 'text-sona-dark-teal'
                  )}>
                    {gap.gap}
                  </span>
                </div>
                <button
                  onClick={() => handleCreateGap(gap.id)}
                  disabled={createdGaps.has(gap.id)}
                  className={cn(
                    'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded transition-colors shrink-0 ml-3',
                    createdGaps.has(gap.id)
                      ? 'bg-teal-50 text-sona-teal cursor-default'
                      : 'bg-teal-50 text-sona-teal hover:bg-teal-100'
                  )}
                >
                  {createdGaps.has(gap.id) ? (
                    <>Created</>
                  ) : (
                    <><Plus className="w-3 h-3" /> Create</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Competitor Mentions */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-violet-600" />
            <h2 className="text-lg font-semibold text-sona-dark-teal">Competitor Mentions</h2>
          </div>
          <span className="text-xs text-sona-stone-400">Last 3 months across all calls</span>
        </div>
        <div className="space-y-4">
          {competitorMentions.map((comp) => (
            <div key={comp.name} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <span className="text-sm font-medium text-sona-dark-teal">{comp.name}</span>
              </div>
              <div className="flex-1">
                <div className="w-full h-7 bg-sona-stone-100 rounded overflow-hidden">
                  <div
                    className={cn('h-full rounded flex items-center px-3 transition-all duration-700', comp.color)}
                    style={{ width: `${(comp.mentions / maxMentions) * 100}%`, opacity: 0.7 }}
                  >
                    <span className="text-xs font-bold text-white">{comp.mentions}</span>
                  </div>
                </div>
              </div>
              <div className="w-24 shrink-0 flex items-center gap-1.5">
                <TrendIcon trend={comp.trend} />
                <span className={cn(
                  'text-xs',
                  comp.trend === 'up' ? 'text-red-600' : comp.trend === 'down' ? 'text-sona-teal' : 'text-sona-stone-400'
                )}>
                  {trendLabel(comp.trend)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested Content Ideas */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-sona-dark-teal">Suggested Content Ideas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedContent.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.id} hover>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-sona-stone-100 shrink-0">
                    <Icon className="w-5 h-5 text-sona-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-sona-dark-teal">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">{item.format}</Badge>
                      <Badge variant="purple">{item.persona}</Badge>
                      <Badge variant={item.priorityVariant}>{item.priority}</Badge>
                    </div>
                    <p className="text-xs text-sona-stone-400 leading-relaxed">{item.rationale}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
