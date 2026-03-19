'use client'

import { Target, Presentation, Megaphone, Users, TrendingUp, AlertTriangle, Calendar, Zap } from 'lucide-react'
import Link from 'next/link'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import { formatCurrency, relativeTime } from '@/lib/utils'
import { getActiveDeals, getTotalPipeline, getWeightedPipeline } from '@/data/deals'
import { getRecentSignals } from '@/data/signals'
import { team } from '@/data/team'
import { accounts } from '@/data/accounts'

const signalTypeIcons: Record<string, string> = {
  linkedin_post: '💼',
  content_download: '📄',
  website_visit: '🌐',
  gong_mention: '🎙️',
  job_change: '👤',
  hiring_signal: '📢',
  competitor_news: '⚡',
  event_registration: '📅',
  slack_mention: '💬',
  funding_round: '💰',
}

const hqCards = [
  {
    label: 'BDR HQ',
    href: '/bdr',
    icon: Target,
    color: 'text-sona-dark-teal',
    bgColor: 'bg-sky-50',
    borderColor: 'border-blue-500/20',
    stats: [
      { label: 'Meetings Booked', value: '27 / 48' },
      { label: 'Active Accounts', value: '30' },
    ],
    description: 'Account prioritisation, contact discovery, outreach intelligence',
  },
  {
    label: 'AE HQ',
    href: '/ae',
    icon: Presentation,
    color: 'text-sona-teal',
    bgColor: 'bg-teal-50',
    borderColor: 'border-emerald-500/20',
    stats: [
      { label: 'Pipeline', value: formatCurrency(getTotalPipeline()) },
      { label: 'Active Deals', value: String(getActiveDeals().length) },
    ],
    description: 'Account planning, deal coaching, post-meeting automation',
  },
  {
    label: 'Marketing HQ',
    href: '/marketing',
    icon: Megaphone,
    color: 'text-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500/20',
    stats: [
      { label: 'MQLs This Month', value: '34' },
      { label: 'Events This Quarter', value: '6' },
    ],
    description: 'Event intelligence, content insights, ABM campaigns',
  },
  {
    label: 'Manager HQ',
    href: '/manager',
    icon: Users,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500/20',
    stats: [
      { label: 'Team Members', value: '8' },
      { label: 'CRM Hygiene', value: '74%' },
    ],
    description: '1:1 coaching, data hygiene, enablement, team performance',
  },
]

export default function Dashboard() {
  const recentSignals = getRecentSignals(6)
  const activeDeals = getActiveDeals()
  const atRiskDeals = activeDeals.filter((d) => d.risks.some((r) => r.severity === 'high'))
  const bdrs = team.filter((t) => t.role === 'BDR')
  const totalMeetings = bdrs.reduce((sum, b) => sum + b.meetingsBooked, 0)
  const totalTarget = bdrs.reduce((sum, b) => sum + b.monthlyTarget, 0)

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Command Centre</h1>
        <p className="text-sona-stone-400 text-sm mt-1">
          Wednesday, 19 March 2026 — Good morning. Here&apos;s your GTM overview.
        </p>
      </div>

      {/* Top-level stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Pipeline"
          value={formatCurrency(getTotalPipeline())}
          change={12}
          changeLabel="vs last month"
          icon={TrendingUp}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="Weighted Forecast"
          value={formatCurrency(getWeightedPipeline())}
          change={8}
          changeLabel="vs last month"
          icon={Target}
          iconColor="text-sona-dark-teal"
        />
        <StatCard
          label="BDR Meetings"
          value={`${totalMeetings} / ${totalTarget}`}
          change={-5}
          changeLabel="pace vs target"
          icon={Calendar}
          iconColor="text-violet-600"
        />
        <StatCard
          label="Deals at Risk"
          value={atRiskDeals.length}
          icon={AlertTriangle}
          iconColor="text-amber-600"
        />
      </div>

      {/* HQ Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hqCards.map((hq) => (
          <Link key={hq.href} href={hq.href}>
            <Card hover className="h-full">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded ${hq.bgColor} ${hq.borderColor} border`}>
                  <hq.icon className={`w-6 h-6 ${hq.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-sona-dark-teal">{hq.label}</h3>
                  <p className="text-xs text-sona-stone-400 mt-0.5">{hq.description}</p>
                  <div className="flex gap-6 mt-3">
                    {hq.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-bold text-sona-dark-teal">{stat.value}</div>
                        <div className="text-xs text-sona-stone-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Bottom row: Signals + At-Risk Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Signals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-sona-dark-teal flex items-center gap-2">
              <Zap className="w-4 h-4 text-sona-teal" />
              Recent Signals
            </h3>
            <Link href="/bdr/account-prioritiser" className="text-xs text-sona-teal hover:text-sona-teal">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentSignals.map((signal) => {
              const account = accounts.find((a) => a.id === signal.accountId)
              return (
                <div key={signal.id} className="flex items-start gap-3 p-2.5 rounded hover:bg-sona-stone-100 transition-colors">
                  <span className="text-base mt-0.5">{signalTypeIcons[signal.type] || '📌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-sona-dark-teal truncate">{signal.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-sona-stone-400">{account?.name}</span>
                      <Badge variant={signal.strength === 'high' ? 'success' : signal.strength === 'medium' ? 'warning' : 'default'}>
                        {signal.strength}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-sona-stone-400 whitespace-nowrap">{relativeTime(signal.timestamp)}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* At-Risk Deals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-sona-dark-teal flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-sona-warning" />
              Deals Needing Attention
            </h3>
            <Link href="/ae/account-planner" className="text-xs text-sona-teal hover:text-sona-teal">
              View pipeline
            </Link>
          </div>
          <div className="space-y-3">
            {atRiskDeals.map((deal) => {
              const account = accounts.find((a) => a.id === deal.accountId)
              const ae = team.find((t) => t.id === deal.assignedAe)
              return (
                <div key={deal.id} className="flex items-start gap-3 p-2.5 rounded hover:bg-sona-stone-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-sona-dark-teal truncate">{deal.name}</p>
                      <Badge variant="info">{deal.stage.split('-')[0]}</Badge>
                    </div>
                    <p className="text-xs text-sona-stone-400 mt-0.5">
                      {formatCurrency(deal.value)} · {account?.vertical}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {deal.risks.filter((r) => r.severity === 'high').map((risk, i) => (
                        <Badge key={i} variant="danger" dot>
                          {risk.description.slice(0, 50)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {ae && <Avatar name={ae.name} size="sm" />}
                </div>
              )
            })}
            {atRiskDeals.length === 0 && (
              <p className="text-sm text-sona-stone-400 text-center py-4">No deals at risk</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
