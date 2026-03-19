'use client'

import { useState } from 'react'
import {
  PoundSterling,
  Target,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowRight,
  BarChart3,
  Phone,
  ClipboardList,
  Zap,
} from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { getDealsByAe, getActiveDeals } from '@/data/deals'
import { getTeamMember } from '@/data/team'
import { getAccount } from '@/data/accounts'
import { formatCurrency } from '@/lib/utils'

const AE_ID = 'ae-1'

export default function AeHQPage() {
  const ae = getTeamMember(AE_ID)!
  const allDeals = getDealsByAe(AE_ID)
  const activeDeals = allDeals.filter((d) => !d.stage.startsWith('Closed'))
  const totalPipeline = activeDeals.reduce((sum, d) => sum + d.value, 0)
  const weightedForecast = activeDeals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0)
  const quotaAttainment = Math.round((totalPipeline / ae.quarterlyTarget) * 100)

  const stages = [
    { id: 'S1', label: 'S1-Qualified', color: 'bg-sky-500' },
    { id: 'S2', label: 'S2-Discovery', color: 'bg-cyan-500' },
    { id: 'S3', label: 'S3-Solution', color: 'bg-amber-500' },
    { id: 'S4', label: 'S4-Proposal', color: 'bg-orange-500' },
    { id: 'S5', label: 'S5-Negotiation', color: 'bg-teal-500' },
  ]

  const stageData = stages.map((s) => {
    const stageDeals = activeDeals.filter((d) => d.stage === s.label)
    return {
      ...s,
      count: stageDeals.length,
      value: stageDeals.reduce((sum, d) => sum + d.value, 0),
    }
  })

  const maxStageValue = Math.max(...stageData.map((s) => s.value), 1)

  const atRiskDeals = activeDeals.filter((d) => d.risks.some((r) => r.severity === 'high'))

  const meetings = [
    { time: '10:00 AM', title: 'Discovery Call', account: 'Wagamama', type: 'discovery' as const, icon: Phone },
    { time: '2:00 PM', title: 'Follow-up Call', account: 'Loungers', type: 'follow-up' as const, icon: Phone },
    { time: '4:30 PM', title: 'Internal Prep', account: 'Barchester', type: 'internal' as const, icon: ClipboardList },
  ]

  const quickActions = [
    { label: 'Open Account Planner', href: '/ae/account-planner', icon: Target },
    { label: 'Prep for Next Call', href: '/ae/discovery-coach', icon: Phone },
    { label: 'Review Pipeline', href: '/ae/chief-of-staff', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-sona-bg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sona-dark-teal">AE HQ — {ae.name}&apos;s Dashboard</h1>
          <p className="text-sona-stone-400 mt-1">Wednesday, 19 March 2026</p>
        </div>
        <Badge variant="info" className="text-sm px-3 py-1">Q1 2026 — Week 12</Badge>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Pipeline"
          value={formatCurrency(totalPipeline)}
          icon={PoundSterling}
          iconColor="text-sona-teal"
          change={12}
          changeLabel="vs last month"
        />
        <StatCard
          label="Weighted Forecast"
          value={formatCurrency(weightedForecast)}
          icon={TrendingUp}
          iconColor="text-sona-teal"
          change={8}
          changeLabel="vs last month"
        />
        <StatCard
          label="Deals in Progress"
          value={activeDeals.length}
          icon={Target}
          iconColor="text-amber-600"
        />
        <StatCard
          label="Quota Attainment"
          value={`${quotaAttainment}%`}
          icon={BarChart3}
          iconColor="text-violet-600"
          change={15}
          changeLabel="pipeline / target"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline by Stage */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-sona-dark-teal">Pipeline by Stage</h2>
            <span className="text-sm text-sona-stone-400">{activeDeals.length} active deals</span>
          </div>
          <div className="space-y-4">
            {stageData.map((stage) => (
              <div key={stage.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-sm ${stage.color}`} />
                    <span className="text-sona-dark-teal">{stage.id}</span>
                    <span className="text-sona-stone-400">({stage.count} deal{stage.count !== 1 ? 's' : ''})</span>
                  </div>
                  <span className="text-sona-dark-teal font-medium">{formatCurrency(stage.value)}</span>
                </div>
                <div className="w-full bg-sona-stone-100 rounded-sm h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-700 ${stage.color}`}
                    style={{ width: stage.value > 0 ? `${Math.max((stage.value / maxStageValue) * 100, 4)}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Meetings */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-sona-teal" />
            <h2 className="text-lg font-semibold text-sona-dark-teal">Today&apos;s Meetings</h2>
          </div>
          <div className="space-y-3">
            {meetings.map((meeting, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded bg-sona-stone-100 hover:bg-sona-stone-100 transition-colors"
              >
                <div className="p-2 rounded bg-white">
                  <meeting.icon className="w-4 h-4 text-sona-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sona-dark-teal">{meeting.title}</p>
                  <p className="text-xs text-sona-stone-400">{meeting.account}</p>
                </div>
                <span className="text-xs text-sona-stone-400 whitespace-nowrap">{meeting.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* At-Risk Deals */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-sona-danger" />
            <h2 className="text-lg font-semibold text-sona-dark-teal">At-Risk Deals</h2>
            <Badge variant="danger">{atRiskDeals.length}</Badge>
          </div>
          {atRiskDeals.length === 0 ? (
            <p className="text-sona-stone-400 text-sm">No at-risk deals. Great work!</p>
          ) : (
            <div className="space-y-3">
              {atRiskDeals.map((deal) => {
                const account = getAccount(deal.accountId)
                const highRisks = deal.risks.filter((r) => r.severity === 'high')
                return (
                  <div
                    key={deal.id}
                    className="p-4 rounded bg-sona-stone-100 border border-red-500/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-sona-dark-teal">{deal.name}</p>
                        <p className="text-xs text-sona-stone-400">{account?.name} &middot; {formatCurrency(deal.value)}</p>
                      </div>
                      <Badge variant="danger">{deal.stage}</Badge>
                    </div>
                    {highRisks.map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-2 mt-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-600">{risk.description}</p>
                      </div>
                    ))}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-sona-stone-200">
                      <span className="text-xs text-sona-stone-400">{deal.daysInStage} days in stage</span>
                      <span className="text-xs text-sona-teal">{deal.nextSteps}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-sona-dark-teal">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded bg-sona-stone-100 hover:bg-sona-stone-100 border border-sona-stone-200 hover:border-sona-teal/30 transition-all group"
              >
                <div className="p-2 rounded bg-white">
                  <action.icon className="w-4 h-4 text-sona-teal" />
                </div>
                <span className="text-sm text-sona-dark-teal font-medium flex-1">{action.label}</span>
                <ArrowRight className="w-4 h-4 text-sona-stone-400 group-hover:text-sona-teal transition-colors" />
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
