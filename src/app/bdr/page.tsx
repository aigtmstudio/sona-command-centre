'use client'

import { useState } from 'react'
import {
  Calendar,
  Zap,
  Users,
  AlertCircle,
  Rocket,
  Search,
  FileText,
  Linkedin,
  Globe,
  Mic,
  MessageSquare,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  Download,
  Briefcase,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import StatCard from '@/components/shared/StatCard'
import Badge from '@/components/shared/Badge'
import ProgressBar from '@/components/shared/ProgressBar'
import { getRecentSignals } from '@/data/signals'
import { accounts } from '@/data/accounts'
import { relativeTime } from '@/lib/utils'

const signalTypeEmoji: Record<string, string> = {
  linkedin_post: '💼',
  content_download: '📥',
  gong_mention: '🎙️',
  website_visit: '🌐',
  event_registration: '🎟️',
  competitor_news: '⚔️',
  hiring_signal: '👤',
  job_change: '🔄',
  slack_mention: '💬',
  funding_round: '💰',
}

const calendarItems = [
  { time: '9:00 AM', title: 'Team Standup', type: 'internal', duration: '30 min' },
  { time: '11:00 AM', title: 'Discovery Call — Wagamama', type: 'external', duration: '45 min' },
  { time: '3:00 PM', title: 'Follow-up — Barchester Healthcare', type: 'external', duration: '30 min' },
]

export default function BdrHQPage() {
  const [hoveredSignal, setHoveredSignal] = useState<string | null>(null)
  const recentSignals = getRecentSignals(5)

  const highSignalAccounts = accounts.filter(
    (a) => a.compositeScore >= 80
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">
          BDR HQ — Max Chen&apos;s Dashboard
        </h1>
        <p className="text-sona-stone-400 mt-1">
          Thursday, 19 March 2026 — Week 12 of Q1
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Meetings Booked"
          value="6 / 12"
          change={-8}
          changeLabel="vs target pace"
          icon={Calendar}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="Accounts in Rotation"
          value="30"
          change={12}
          changeLabel="vs last month"
          icon={Users}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="High Signals This Week"
          value="8"
          change={33}
          changeLabel="vs last week"
          icon={Zap}
          iconColor="text-amber-600"
        />
        <StatCard
          label="Pending Follow-ups"
          value="5"
          change={-20}
          changeLabel="vs yesterday"
          icon={AlertCircle}
          iconColor="text-red-600"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-4 h-4 text-sona-teal" />
          <h2 className="text-sm font-semibold text-sona-dark-teal">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-sona-dark-teal hover:bg-sona-dark-teal/80 text-white text-sm font-medium px-4 py-2.5 rounded transition-colors">
            <Sparkles className="w-4 h-4" />
            Start Morning Briefing
          </button>
          <button className="flex items-center gap-2 bg-sona-stone-100 hover:bg-sona-stone-100 text-sona-dark-teal text-sm font-medium px-4 py-2.5 rounded border border-sona-stone-200 transition-colors">
            <Search className="w-4 h-4" />
            Review Priority Accounts
          </button>
          <button className="flex items-center gap-2 bg-sona-stone-100 hover:bg-sona-stone-100 text-sona-dark-teal text-sm font-medium px-4 py-2.5 rounded border border-sona-stone-200 transition-colors">
            <FileText className="w-4 h-4" />
            Generate Handover Pack
          </button>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signal Feed */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-sona-dark-teal">Recent Signals</h2>
              </div>
              <Badge variant="info">{recentSignals.length} new</Badge>
            </div>
            <div className="space-y-1">
              {recentSignals.map((signal) => {
                const account = accounts.find((a) => a.id === signal.accountId)
                return (
                  <div
                    key={signal.id}
                    className={`flex items-start gap-3 p-3 rounded transition-colors cursor-pointer ${
                      hoveredSignal === signal.id
                        ? 'bg-sona-stone-100'
                        : 'hover:bg-sona-stone-100/50'
                    }`}
                    onMouseEnter={() => setHoveredSignal(signal.id)}
                    onMouseLeave={() => setHoveredSignal(null)}
                  >
                    <span className="text-lg mt-0.5 shrink-0">
                      {signalTypeEmoji[signal.type] || '📡'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-sona-dark-teal truncate">
                          {signal.title}
                        </span>
                        <Badge
                          variant={
                            signal.strength === 'high'
                              ? 'success'
                              : signal.strength === 'medium'
                              ? 'warning'
                              : 'default'
                          }
                          dot
                        >
                          {signal.strength}
                        </Badge>
                      </div>
                      <p className="text-xs text-sona-stone-400 truncate">
                        {account?.name} — {signal.source}
                      </p>
                    </div>
                    <span className="text-xs text-sona-stone-400 whitespace-nowrap mt-0.5">
                      {relativeTime(signal.timestamp)}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Today's Calendar */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sona-teal" />
                <h2 className="text-sm font-semibold text-sona-dark-teal">Today&apos;s Calendar</h2>
              </div>
              <span className="text-xs text-sona-stone-400">3 items</span>
            </div>
            <div className="space-y-3">
              {calendarItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded bg-sona-stone-100/50 border border-sona-stone-200"
                >
                  <div className="text-center shrink-0 w-16">
                    <div className="text-sm font-semibold text-sona-dark-teal">{item.time}</div>
                    <div className="text-[10px] text-sona-stone-400">{item.duration}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-sona-dark-teal">{item.title}</div>
                    <Badge
                      variant={item.type === 'external' ? 'info' : 'outline'}
                      className="mt-1"
                    >
                      {item.type === 'external' ? 'External Call' : 'Internal'}
                    </Badge>
                  </div>
                  <ChevronRight className="w-4 h-4 text-sona-stone-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </Card>

          {/* Target Progress */}
          <Card className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-sona-teal" />
              <h2 className="text-sm font-semibold text-sona-dark-teal">Monthly Target</h2>
            </div>
            <ProgressBar
              value={6}
              max={12}
              label="Meetings Booked"
              showFraction
              color="bg-sona-dark-teal"
            />
            <p className="text-xs text-amber-600 mt-3">
              You&apos;re 2 days behind pace. Focus on high-signal accounts to catch up.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
