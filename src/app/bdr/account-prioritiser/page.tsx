'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Users,
  Zap,
  Globe,
  Linkedin,
  Mic,
  Download,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  AlertTriangle,
  DollarSign,
  Calendar,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import { accounts } from '@/data/accounts'
import { getSignalsByAccount } from '@/data/signals'
import { getContactsByAccount } from '@/data/contacts'
import { getTeamMember } from '@/data/team'
import { cn, formatNumber, relativeTime, daysAgo } from '@/lib/utils'
import type { Vertical } from '@/types'

const verticalColors: Record<string, { bg: string; text: string; label: string }> = {
  hospitality: { bg: 'bg-sky-50', text: 'text-sona-dark-teal', label: 'Hospitality' },
  'social-care': { bg: 'bg-teal-50', text: 'text-sona-teal', label: 'Social Care' },
  retail: { bg: 'bg-purple-50', text: 'text-violet-600', label: 'Retail' },
}

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'info'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  're-engage': { variant: 'warning', label: 'Re-engage' },
  new: { variant: 'info', label: 'New' },
}

const signalTypeIcons: Record<string, { icon: typeof Zap; color: string }> = {
  linkedin_post: { icon: Linkedin, color: 'text-sona-dark-teal' },
  content_download: { icon: Download, color: 'text-sona-teal' },
  gong_mention: { icon: Mic, color: 'text-violet-600' },
  website_visit: { icon: Globe, color: 'text-cyan-600' },
  event_registration: { icon: Calendar, color: 'text-amber-600' },
  competitor_news: { icon: AlertTriangle, color: 'text-red-600' },
  hiring_signal: { icon: Users, color: 'text-pink-600' },
  job_change: { icon: Briefcase, color: 'text-orange-600' },
  slack_mention: { icon: MessageSquare, color: 'text-indigo-600' },
  funding_round: { icon: DollarSign, color: 'text-green-600' },
}

const verticalFilters = [
  { key: 'all', label: 'All Verticals' },
  { key: 'hospitality', label: 'Hospitality' },
  { key: 'social-care', label: 'Social Care' },
  { key: 'retail', label: 'Retail' },
]

export default function AccountPrioritiserPage() {
  const [verticalFilter, setVerticalFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const filtered = useMemo(() => {
    let result = [...accounts].sort((a, b) => b.compositeScore - a.compositeScore)
    if (verticalFilter !== 'all') {
      result = result.filter((a) => a.vertical === verticalFilter)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.currentSystem.toLowerCase().includes(q) ||
          a.hqLocation.toLowerCase().includes(q)
      )
    }
    return result
  }, [verticalFilter, searchQuery])

  const highSignalCount = accounts.filter((a) => a.compositeScore >= 80).length
  const reEngageCount = accounts.filter((a) => a.status === 're-engage').length

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Account Prioritiser</h1>
        <p className="text-sona-stone-400 mt-1">
          AI-scored account ranking based on ICP fit, intent signals, and engagement.
        </p>
      </div>

      {/* Filter Bar */}
      <Card className="!p-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-sona-stone-100 rounded p-1">
            {verticalFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setVerticalFilter(f.key)}
                className={cn(
                  'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                  verticalFilter === f.key
                    ? 'bg-white text-sona-dark-teal'
                    : 'text-sona-stone-400 hover:text-sona-dark-teal'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sona-stone-400" />
            <input
              type="text"
              placeholder="Search accounts, systems, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sona-stone-100 border border-sona-stone-200 rounded pl-9 pr-4 py-2 text-sm text-sona-dark-teal placeholder:text-sona-stone-400 focus:outline-none focus:border-sona-teal/50"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-sona-dark-teal hover:bg-sona-dark-teal/80 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
            Refresh Scores
          </button>
        </div>
      </Card>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 text-sm text-sona-stone-400">
        <span>
          <span className="text-sona-dark-teal font-semibold">{filtered.length}</span> accounts in rotation
        </span>
        <span className="text-sona-border">|</span>
        <span>
          <span className="text-sona-teal font-semibold">{highSignalCount}</span> with high signals
        </span>
        <span className="text-sona-border">|</span>
        <span>
          <span className="text-amber-600 font-semibold">{reEngageCount}</span> re-engagement
        </span>
      </div>

      {/* Account Table */}
      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-[48px_1fr_100px_80px_120px_100px_80px_80px] gap-3 px-5 py-2 text-xs font-medium text-sona-stone-400 uppercase tracking-wider">
          <div>Rank</div>
          <div>Account</div>
          <div>Employees</div>
          <div>Score</div>
          <div>Signals</div>
          <div>Status</div>
          <div>BDR</div>
          <div>Last Touch</div>
        </div>

        {/* Table Rows */}
        {filtered.map((account, index) => {
          const signals = getSignalsByAccount(account.id)
          const contacts = getContactsByAccount(account.id)
          const bdr = getTeamMember(account.assignedBdr)
          const vc = verticalColors[account.vertical]
          const sc = statusConfig[account.status]
          const isExpanded = expandedAccount === account.id
          const daysSinceTouch = account.hubspotLastUpdated
            ? daysAgo(account.hubspotLastUpdated)
            : 999

          // Get unique signal types for icons
          const signalTypes = [...new Set(signals.map((s) => s.type))]

          return (
            <div key={account.id}>
              <Card
                hover
                onClick={() =>
                  setExpandedAccount(isExpanded ? null : account.id)
                }
                className={cn(
                  '!p-0 overflow-hidden transition-all',
                  isExpanded && 'border-sona-teal/40'
                )}
              >
                <div className="grid grid-cols-[48px_1fr_100px_80px_120px_100px_80px_80px] gap-3 items-center px-5 py-3.5">
                  {/* Rank */}
                  <div className="text-sm font-bold text-sona-stone-400">
                    #{index + 1}
                  </div>

                  {/* Account Name + Vertical */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-sona-dark-teal truncate">
                        {account.name}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-medium px-1.5 py-0.5 rounded-sm',
                          vc.bg,
                          vc.text
                        )}
                      >
                        {vc.label}
                      </span>
                    </div>
                    <div className="text-xs text-sona-stone-400 mt-0.5 truncate">
                      {account.currentSystem} — {account.hqLocation}
                    </div>
                  </div>

                  {/* Employees */}
                  <div className="text-sm text-sona-stone-400">
                    {formatNumber(account.employeeCount)}
                  </div>

                  {/* Composite Score */}
                  <div>
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-10 h-10 rounded-sm text-sm font-bold',
                        account.compositeScore >= 80
                          ? 'bg-teal-500/15 text-sona-teal ring-1 ring-emerald-500/30'
                          : account.compositeScore >= 60
                          ? 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30'
                          : 'bg-red-500/15 text-red-600 ring-1 ring-red-500/30'
                      )}
                    >
                      {account.compositeScore}
                    </span>
                  </div>

                  {/* Signal Count + Icons */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-sona-dark-teal">
                      {signals.length}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {signalTypes.slice(0, 3).map((type) => {
                        const st = signalTypeIcons[type]
                        if (!st) return null
                        const Icon = st.icon
                        return (
                          <Icon
                            key={type}
                            className={cn('w-3 h-3', st.color)}
                          />
                        )
                      })}
                      {signalTypes.length > 3 && (
                        <span className="text-[10px] text-sona-stone-400">
                          +{signalTypes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge variant={sc.variant} dot>
                      {sc.label}
                    </Badge>
                  </div>

                  {/* BDR Avatar */}
                  <div>
                    {bdr && <Avatar name={bdr.name} size="sm" />}
                  </div>

                  {/* Days Since Touch */}
                  <div
                    className={cn(
                      'text-sm',
                      daysSinceTouch > 14
                        ? 'text-red-600'
                        : daysSinceTouch > 7
                        ? 'text-amber-600'
                        : 'text-sona-stone-400'
                    )}
                  >
                    {daysSinceTouch}d
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex justify-center pb-1">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-sona-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-sona-border" />
                  )}
                </div>
              </Card>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="mt-1 bg-white/60 border border-sona-teal/20 rounded p-5 space-y-5">
                  {/* Why This Account */}
                  <div>
                    <h3 className="text-sm font-semibold text-sona-dark-teal mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Why This Account
                    </h3>
                    <p className="text-sm text-sona-stone-400 leading-relaxed">
                      {account.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-sona-stone-400">
                      <span>Revenue: <span className="text-sona-dark-teal font-medium">{account.annualRevenue}</span></span>
                      <span>Tier: <span className="text-sona-dark-teal font-medium">{account.tier}</span></span>
                      <span>Current System: <span className="text-sona-dark-teal font-medium">{account.currentSystem}</span></span>
                    </div>
                  </div>

                  {/* Signal Timeline */}
                  <div>
                    <h3 className="text-sm font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sona-teal" />
                      Signal Timeline
                    </h3>
                    {signals.length > 0 ? (
                      <div className="space-y-2">
                        {signals.map((signal) => {
                          const st = signalTypeIcons[signal.type]
                          const Icon = st?.icon || Zap
                          return (
                            <div
                              key={signal.id}
                              className="flex items-start gap-3 p-3 bg-sona-stone-100/50 rounded"
                            >
                              <Icon
                                className={cn(
                                  'w-4 h-4 mt-0.5 shrink-0',
                                  st?.color || 'text-sona-stone-400'
                                )}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-sona-dark-teal">
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
                                  >
                                    {signal.strength}
                                  </Badge>
                                </div>
                                <p className="text-xs text-sona-stone-400 mt-0.5">
                                  {signal.detail}
                                </p>
                              </div>
                              <span className="text-xs text-sona-stone-400 whitespace-nowrap">
                                {relativeTime(signal.timestamp)}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-sona-stone-400">
                        No recent signals detected for this account.
                      </p>
                    )}
                  </div>

                  {/* Contact Count + Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-sona-stone-200">
                    <div className="flex items-center gap-2 text-sm text-sona-stone-400">
                      <Users className="w-4 h-4" />
                      <span>
                        <span className="text-sona-dark-teal font-medium">
                          {contacts.length}
                        </span>{' '}
                        contacts identified
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 text-sm text-sona-teal hover:text-sona-teal transition-colors">
                        <Users className="w-3.5 h-3.5" />
                        View Contacts
                      </button>
                      <span className="text-sona-border">|</span>
                      <button className="flex items-center gap-1.5 text-sm text-sona-teal hover:text-sona-teal transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        Generate Briefing
                      </button>
                      <span className="text-sona-border">|</span>
                      <button className="flex items-center gap-1.5 text-sm text-sona-teal hover:text-sona-teal transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        Create Handover
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
