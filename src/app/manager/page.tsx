'use client'

import { useState } from 'react'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import Badge from '@/components/shared/Badge'
import { getAes, getBdrs } from '@/data/team'
import { formatCurrency } from '@/lib/utils'
import {
  LayoutDashboard,
  Target,
  ShieldCheck,
  Users,
  FileText,
  ClipboardCheck,
  Trophy,
} from 'lucide-react'

const aes = getAes()
const bdrs = getBdrs()

function getStatus(current: number, target: number): { label: string; color: string; dotColor: string; variant: 'success' | 'warning' | 'danger' } {
  const pct = target > 0 ? (current / target) * 100 : 0
  if (pct >= 70) return { label: 'On Track', color: 'text-sona-success', dotColor: 'bg-emerald-400', variant: 'success' }
  if (pct >= 45) return { label: 'At Risk', color: 'text-sona-warning', dotColor: 'bg-amber-400', variant: 'warning' }
  return { label: 'Behind', color: 'text-sona-danger', dotColor: 'bg-red-400', variant: 'danger' }
}

export default function ManagerHQPage() {
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const quickActions = [
    { id: 'prep', label: 'Prepare 1:1', icon: FileText, href: '/manager/one-to-one', description: 'Review team data before your next 1:1' },
    { id: 'hygiene', label: 'Review Hygiene', icon: ClipboardCheck, href: '/manager/data-hygiene', description: 'Check CRM data quality across the team' },
    { id: 'leaderboard', label: 'Team Leaderboard', icon: Trophy, href: '/manager/enablement', description: 'See enablement scores and streaks' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
          <div className="p-2 rounded bg-teal-50">
            <LayoutDashboard className="w-6 h-6 text-sona-teal" />
          </div>
          Manager HQ &mdash; Kate Harrison
        </h1>
        <p className="text-sona-stone-400 mt-1">Your team overview, coaching prep, and performance insights</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Team Pipeline"
          value={formatCurrency(2360000)}
          change={12}
          changeLabel="vs last quarter"
          icon={LayoutDashboard}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="Quota Attainment"
          value="59%"
          change={-4}
          changeLabel="vs target pace"
          icon={Target}
          iconColor="text-sona-warning"
        />
        <StatCard
          label="CRM Hygiene Score"
          value="74%"
          change={8}
          changeLabel="vs last month"
          icon={ShieldCheck}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="1:1s This Week"
          value="4"
          icon={Users}
          iconColor="text-violet-600"
        />
      </div>

      {/* Team at a Glance */}
      <div>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-4">Team at a Glance</h2>
        <div className="grid grid-cols-4 gap-4">
          {aes.map((ae) => {
            const status = getStatus(ae.currentPipeline, ae.quarterlyTarget)
            return (
              <Card key={ae.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={ae.name} size="lg" />
                    <div>
                      <p className="text-sona-dark-teal font-medium text-sm">{ae.name}</p>
                      <p className="text-sona-stone-400 text-xs">{ae.role}</p>
                    </div>
                  </div>
                  <Badge variant={status.variant} dot dotColor={status.dotColor}>
                    {status.label}
                  </Badge>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-sona-stone-400 mb-1">Pipeline: {formatCurrency(ae.currentPipeline)}</p>
                  <ProgressBar
                    value={ae.currentPipeline}
                    max={ae.quarterlyTarget}
                    size="sm"
                    color={
                      status.variant === 'success' ? 'bg-sona-success' :
                      status.variant === 'warning' ? 'bg-sona-warning' :
                      'bg-sona-danger'
                    }
                  />
                </div>
                <p className="text-xs text-sona-stone-400">
                  Quota: {formatCurrency(ae.quarterlyTarget)} &middot; {Math.round((ae.currentPipeline / ae.quarterlyTarget) * 100)}% coverage
                </p>
              </Card>
            )
          })}

          {bdrs.map((bdr) => {
            const status = getStatus(bdr.meetingsBooked, bdr.monthlyTarget)
            return (
              <Card key={bdr.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={bdr.name} size="lg" />
                    <div>
                      <p className="text-sona-dark-teal font-medium text-sm">{bdr.name}</p>
                      <p className="text-sona-stone-400 text-xs">{bdr.role}</p>
                    </div>
                  </div>
                  <Badge variant={status.variant} dot dotColor={status.dotColor}>
                    {status.label}
                  </Badge>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-sona-stone-400 mb-1">Meetings: {bdr.meetingsBooked}/{bdr.monthlyTarget}</p>
                  <ProgressBar
                    value={bdr.meetingsBooked}
                    max={bdr.monthlyTarget}
                    size="sm"
                    color={
                      status.variant === 'success' ? 'bg-sona-success' :
                      status.variant === 'warning' ? 'bg-sona-warning' :
                      'bg-sona-danger'
                    }
                  />
                </div>
                <p className="text-xs text-sona-stone-400">
                  Activities: {bdr.activitiesThisWeek} this week
                </p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              hover
              onClick={() => setActiveAction(action.id)}
              className={activeAction === action.id ? 'border-sona-teal/50 bg-sona-stone-100' : ''}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded bg-teal-50">
                  <action.icon className="w-5 h-5 text-sona-teal" />
                </div>
                <h3 className="text-sona-dark-teal font-medium">{action.label}</h3>
              </div>
              <p className="text-sona-stone-400 text-sm">{action.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
