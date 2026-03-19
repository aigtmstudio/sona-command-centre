'use client'

import { useState } from 'react'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import Badge from '@/components/shared/Badge'
import { getAes, getBdrs } from '@/data/team'
import { formatCurrency, cn } from '@/lib/utils'
import {
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

const aes = getAes()
const bdrs = getBdrs()

// Pipeline by rep data (stacked bars by stage)
interface PipelineStage {
  stage: string
  value: number
  color: string
}

interface RepPipeline {
  name: string
  id: string
  total: number
  stages: PipelineStage[]
}

const pipelineByRep: RepPipeline[] = [
  {
    name: 'Sarah Bennett',
    id: 'ae-1',
    total: 850000,
    stages: [
      { stage: 'S1', value: 820000, color: 'bg-slate-500' },
      { stage: 'S2', value: 630000, color: 'bg-sky-500' },
      { stage: 'S3', value: 350000, color: 'bg-purple-500' },
      { stage: 'S4', value: 0, color: 'bg-amber-500' },
      { stage: 'S5', value: 0, color: 'bg-teal-500' },
    ],
  },
  {
    name: 'James Cooper',
    id: 'ae-2',
    total: 620000,
    stages: [
      { stage: 'S1', value: 400000, color: 'bg-slate-500' },
      { stage: 'S2', value: 0, color: 'bg-sky-500' },
      { stage: 'S3', value: 0, color: 'bg-purple-500' },
      { stage: 'S4', value: 220000, color: 'bg-amber-500' },
      { stage: 'S5', value: 0, color: 'bg-teal-500' },
    ],
  },
  {
    name: 'Priya Patel',
    id: 'ae-3',
    total: 510000,
    stages: [
      { stage: 'S1', value: 0, color: 'bg-slate-500' },
      { stage: 'S2', value: 380000, color: 'bg-sky-500' },
      { stage: 'S3', value: 195000, color: 'bg-purple-500' },
      { stage: 'S4', value: 0, color: 'bg-amber-500' },
      { stage: 'S5', value: 0, color: 'bg-teal-500' },
    ],
  },
  {
    name: 'David Kim',
    id: 'ae-4',
    total: 380000,
    stages: [
      { stage: 'S1', value: 145000, color: 'bg-slate-500' },
      { stage: 'S2', value: 0, color: 'bg-sky-500' },
      { stage: 'S3', value: 0, color: 'bg-purple-500' },
      { stage: 'S4', value: 0, color: 'bg-amber-500' },
      { stage: 'S5', value: 0, color: 'bg-teal-500' },
    ],
  },
]

// Activity by BDR
interface BdrActivity {
  name: string
  id: string
  calls: number
  emails: number
  meetings: number
}

const bdrActivity: BdrActivity[] = [
  { name: 'Max Chen', id: 'bdr-1', calls: 48, emails: 40, meetings: 2 },
  { name: 'Joey Palmer', id: 'bdr-2', calls: 40, emails: 36, meetings: 3 },
  { name: 'Thomas Wright', id: 'bdr-3', calls: 25, emails: 20, meetings: 1 },
  { name: 'Harry Morrison', id: 'bdr-4', calls: 55, emails: 45, meetings: 3 },
]

// Target tracker
interface TargetRow {
  name: string
  id: string
  role: string
  target: number
  current: number
  isCurrency: boolean
}

const targetTracker: TargetRow[] = [
  { name: 'Sarah Bennett', id: 'ae-1', role: 'AE', target: 400000, current: 120000, isCurrency: true },
  { name: 'James Cooper', id: 'ae-2', role: 'AE', target: 400000, current: 220000, isCurrency: true },
  { name: 'Priya Patel', id: 'ae-3', role: 'AE', target: 400000, current: 85000, isCurrency: true },
  { name: 'David Kim', id: 'ae-4', role: 'AE', target: 400000, current: 0, isCurrency: true },
  { name: 'Max Chen', id: 'bdr-1', role: 'BDR', target: 12, current: 6, isCurrency: false },
  { name: 'Joey Palmer', id: 'bdr-2', role: 'BDR', target: 12, current: 8, isCurrency: false },
  { name: 'Thomas Wright', id: 'bdr-3', role: 'BDR', target: 12, current: 4, isCurrency: false },
  { name: 'Harry Morrison', id: 'bdr-4', role: 'BDR', target: 12, current: 9, isCurrency: false },
]

function getPaceStatus(current: number, target: number): { label: string; variant: 'success' | 'warning' | 'danger' } {
  const pct = target > 0 ? (current / target) * 100 : 0
  if (pct >= 65) return { label: 'On Track', variant: 'success' }
  if (pct >= 40) return { label: 'At Risk', variant: 'warning' }
  return { label: 'Behind', variant: 'danger' }
}

// Win rate by vertical
const verticalWinRates = [
  { name: 'Hospitality', rate: 38, color: 'text-sona-teal', ringColor: 'border-blue-500' },
  { name: 'Social Care', rate: 28, color: 'text-violet-600', ringColor: 'border-purple-500' },
  { name: 'Retail', rate: 0, color: 'text-sona-stone-400', ringColor: 'border-sona-stone-200' },
]

export default function PerformancePage() {
  const maxPipeline = Math.max(...pipelineByRep.map((r) => r.total))
  const maxBdrActivity = Math.max(...bdrActivity.flatMap((b) => [b.calls, b.emails, b.meetings * 10]))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
          <div className="p-2 rounded bg-teal-50">
            <BarChart3 className="w-6 h-6 text-sona-teal" />
          </div>
          Team Performance Dashboard
        </h1>
        <p className="text-sona-stone-400 mt-1">Track pipeline, activity, and performance across the team</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Team Pipeline"
          value={formatCurrency(2360000)}
          change={12}
          changeLabel="vs last quarter"
          icon={DollarSign}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="Avg Quota Attainment"
          value="59%"
          change={-4}
          changeLabel="vs target"
          icon={Target}
          iconColor="text-sona-warning"
        />
        <StatCard
          label="Avg Deal Velocity"
          value="34 days"
          change={-3}
          changeLabel="faster than Q3"
          icon={Zap}
          iconColor="text-violet-600"
        />
        <StatCard
          label="Team Win Rate"
          value="32%"
          change={5}
          changeLabel="vs last quarter"
          icon={TrendingUp}
          iconColor="text-sona-teal"
        />
      </div>

      {/* Pipeline by Rep + Activity by Rep */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline by Rep */}
        <Card>
          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Pipeline by Rep</h3>
          <div className="flex items-center gap-4 mb-4 text-xs text-sona-stone-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-500" /> S1</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> S2</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-purple-500" /> S3</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> S4</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-500" /> S5</span>
          </div>
          <div className="space-y-4">
            {pipelineByRep.map((rep) => {
              const totalStageValue = rep.stages.reduce((s, st) => s + st.value, 0)
              return (
                <div key={rep.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={rep.name} size="sm" />
                      <span className="text-sm text-sona-dark-teal font-medium">{rep.name}</span>
                    </div>
                    <span className="text-sm text-sona-stone-400">{formatCurrency(rep.total)}</span>
                  </div>
                  <div className="flex h-5 overflow-hidden bg-sona-stone-100" style={{ borderRadius: '2px' }}>
                    {rep.stages.map((stage) => {
                      if (stage.value === 0) return null
                      const widthPct = (stage.value / maxPipeline) * 100
                      return (
                        <div
                          key={stage.stage}
                          className={cn(stage.color, 'opacity-70 transition-all duration-500')}
                          style={{ width: `${widthPct}%` }}
                          title={`${stage.stage}: ${formatCurrency(stage.value)}`}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Activity by BDR */}
        <Card>
          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Activity by Rep (This Week)</h3>
          <div className="flex items-center gap-4 mb-4 text-xs text-sona-stone-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> Calls</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-purple-500" /> Emails</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-500" /> Meetings</span>
          </div>
          <div className="space-y-5">
            {bdrActivity.map((bdr) => (
              <div key={bdr.id}>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name={bdr.name} size="sm" />
                  <span className="text-sm text-sona-dark-teal font-medium">{bdr.name}</span>
                </div>
                <div className="space-y-1.5">
                  {/* Calls */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sona-stone-400 w-16">Calls</span>
                    <div className="flex-1 h-4 bg-sona-stone-100 overflow-hidden" style={{ borderRadius: '2px' }}>
                      <div className="h-full bg-sky-500 opacity-70" style={{ width: `${(bdr.calls / 60) * 100}%` }} />
                    </div>
                    <span className="text-xs text-sona-dark-teal w-8 text-right">{bdr.calls}</span>
                  </div>
                  {/* Emails */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sona-stone-400 w-16">Emails</span>
                    <div className="flex-1 h-4 bg-sona-stone-100 overflow-hidden" style={{ borderRadius: '2px' }}>
                      <div className="h-full bg-purple-500 opacity-70" style={{ width: `${(bdr.emails / 60) * 100}%` }} />
                    </div>
                    <span className="text-xs text-sona-dark-teal w-8 text-right">{bdr.emails}</span>
                  </div>
                  {/* Meetings */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sona-stone-400 w-16">Meetings</span>
                    <div className="flex-1 h-4 bg-sona-stone-100 overflow-hidden" style={{ borderRadius: '2px' }}>
                      <div className="h-full bg-teal-500 opacity-70" style={{ width: `${(bdr.meetings / 5) * 100}%` }} />
                    </div>
                    <span className="text-xs text-sona-dark-teal w-8 text-right">{bdr.meetings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Target Tracker */}
      <Card>
        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Target Tracker</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sona-stone-200">
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3">Rep</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3">Target</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3">Current</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3">Gap</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3 w-64">Progress</th>
                <th className="text-center text-xs text-sona-stone-400 font-medium py-3 px-3">Pace</th>
              </tr>
            </thead>
            <tbody>
              {targetTracker.map((row) => {
                const gap = row.target - row.current
                const pace = getPaceStatus(row.current, row.target)
                const barColor = pace.variant === 'success' ? 'bg-sona-success' : pace.variant === 'warning' ? 'bg-sona-warning' : 'bg-sona-danger'
                return (
                  <tr key={row.id} className="border-b border-sona-stone-200 hover:bg-sona-stone-100/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={row.name} size="sm" />
                        <div>
                          <p className="text-sm text-sona-dark-teal font-medium">{row.name}</p>
                          <p className="text-xs text-sona-stone-400">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-sona-stone-400">
                      {row.isCurrency ? formatCurrency(row.target) : `${row.target} meetings`}
                    </td>
                    <td className="py-3 px-3 text-sm text-sona-dark-teal font-medium">
                      {row.isCurrency ? formatCurrency(row.current) : `${row.current} meetings`}
                    </td>
                    <td className="py-3 px-3 text-sm">
                      <span className={gap > 0 ? 'text-sona-warning' : 'text-sona-success'}>
                        {gap > 0 ? (row.isCurrency ? formatCurrency(gap) : `${gap} more`) : 'Target met'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <ProgressBar value={row.current} max={row.target} size="sm" color={barColor} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Badge variant={pace.variant}>{pace.label}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Forecast + Win Rate by Vertical */}
      <div className="grid grid-cols-2 gap-6">
        {/* Forecast View */}
        <Card>
          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-5">Forecast view</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Best case', value: formatCurrency(1200000), sub: 'All pipeline converts', color: 'text-sona-teal', bg: 'bg-teal-50', border: 'border-teal-200' },
              { label: 'Commit', value: formatCurrency(570000), sub: 'S4+ weighted', color: 'text-sona-dark-teal', bg: 'bg-sky-50', border: 'border-sky-200' },
              { label: 'Worst case', value: formatCurrency(220000), sub: 'S5 only', color: 'text-sona-danger', bg: 'bg-red-50', border: 'border-red-200' },
            ].map((item, i) => (
              <div key={i} className={cn('text-center p-4 border', item.bg, item.border)} style={{ borderRadius: '4px' }}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400 mb-2">{item.label}</p>
                <p className={cn('font-mono text-xl font-semibold', item.color)}>{item.value}</p>
                <p className="text-xs text-sona-stone-400 font-light mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
          {/* Forecast bar */}
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-sona-stone-400 mb-2">
              <span>Worst case</span>
              <span>Quarterly target: {formatCurrency(1600000)}</span>
              <span>Best case</span>
            </div>
            <div className="relative h-5 bg-sona-stone-100 overflow-hidden" style={{ borderRadius: '2px' }}>
              <div className="absolute left-0 top-0 h-full bg-teal-200" style={{ width: '75%', borderRadius: '2px' }} />
              <div className="absolute left-0 top-0 h-full bg-sky-300" style={{ width: '36%', borderRadius: '2px' }} />
              <div className="absolute left-0 top-0 h-full bg-red-300" style={{ width: '14%', borderRadius: '2px' }} />
            </div>
          </div>
        </Card>

        {/* Win Rate by Vertical */}
        <Card>
          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Win Rate by Vertical</h3>
          <div className="grid grid-cols-3 gap-6">
            {verticalWinRates.map((v) => (
              <div key={v.name} className="flex flex-col items-center">
                {/* Progress Ring */}
                <div className="relative w-28 h-28 mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-sona-stone-100"
                    />
                    {v.rate > 0 && (
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(v.rate / 100) * 251.2} 251.2`}
                        strokeLinecap="round"
                        className={v.color}
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-bold ${v.color}`}>
                      {v.rate > 0 ? `${v.rate}%` : 'N/A'}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-sona-dark-teal font-medium">{v.name}</span>
                {v.rate === 0 && (
                  <span className="text-xs text-sona-stone-400 mt-0.5">New vertical</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
