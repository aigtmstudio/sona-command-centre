'use client'

import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Users,
  Lightbulb,
  FileText,
  Target,
  Shield,
  BarChart3,
  Linkedin,
  Globe,
  Mic,
  TrendingUp,
  ExternalLink,
  Star,
  Zap,
  BookOpen,
  Award,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import { accounts } from '@/data/accounts'
import { getContactsByAccount } from '@/data/contacts'
import { getCompetitorByName } from '@/data/competitors'
import { cn } from '@/lib/utils'

// Mock insights per account
const accountInsights: Record<string, { text: string; source: string; icon: 'linkedin' | 'web' | 'gong' | 'hubspot' }[]> = {
  'acc-1': [
    { text: 'Claire Matthews (VP HR) publicly posted about scheduling pain points across 500+ locations — signals active problem awareness.', source: 'LinkedIn', icon: 'linkedin' },
    { text: 'Burger King UK experienced 22% YoY increase in agency spend, indicating scheduling inefficiency and labour cost pressure.', source: 'Gong Notes', icon: 'gong' },
    { text: 'Tom Reynolds (Ops Director) attended two Sona demos and described the product as "exactly what we need" — strong champion signal.', source: 'Gong', icon: 'gong' },
    { text: 'Fourth (current system) had a 12-hour outage last week affecting multiple chains. Burger King likely impacted.', source: 'Web Intel', icon: 'web' },
  ],
  'acc-5': [
    { text: 'Marcus Webb (COO) posted about labour costs being at "breaking point" — public acknowledgement of scheduling challenges.', source: 'LinkedIn', icon: 'linkedin' },
    { text: 'Wagamama is outgrowing Deputy at 150+ sites. SMB tool cannot handle enterprise complexity.', source: 'Discovery Notes', icon: 'gong' },
    { text: 'COO registered for Sona hospitality roundtable dinner on April 10 — high intent signal.', source: 'HubSpot', icon: 'hubspot' },
    { text: 'Wagamama cited £1.8M labour cost overrun last year during initial discovery call.', source: 'Gong', icon: 'gong' },
  ],
}

const contentAssets = [
  { title: 'How Loungers Saved £1.4M with Sona Scheduling', type: 'Case Study', relevance: 95, vertical: 'hospitality' },
  { title: 'Enterprise Scheduling for Multi-Site Restaurants', type: 'Whitepaper', relevance: 88, vertical: 'hospitality' },
  { title: 'Fourth to Sona Migration Guide', type: 'One-Pager', relevance: 82, vertical: 'hospitality' },
]

const outreachAngles: Record<string, { title: string; evidence: string; approach: string }[]> = {
  'acc-1': [
    { title: 'Fourth Instability Angle', evidence: "Fourth's 12-hour outage last week impacted scheduling for multiple chains. Their preparation for sale means R&D investment has flatlined.", approach: 'Reference the outage impact, position Sona as the modern alternative with 99.99% uptime SLA and dedicated migration support from Fourth.' },
    { title: 'Labour Cost Pressure', evidence: "22% YoY agency spend increase. Claire Matthews posted about scheduling being 'painful' across 500+ locations.", approach: "Lead with ROI — Loungers saved £1.4M after switching from Fourth. Offer a scheduling cost audit to quantify Burger King's potential savings." },
    { title: 'Champion Momentum', evidence: 'Tom Reynolds has attended two demos and is actively pushing internally. He described Sona as "exactly what we need".', approach: "Arm Tom with an internal business case template. Offer to do a joint presentation to Claire Matthews (VP HR) — Tom can facilitate the intro." },
    { title: 'Competitive Displacement Window', evidence: "Fourth is preparing for sale, support quality has collapsed (72+ hour ticket resolution), and their mobile app is rated 2.1 stars.", approach: "Share the 'Why Chains Are Leaving Fourth' competitive brief. Reference 3 major chains that switched in the last 6 months." },
  ],
  'acc-5': [
    { title: 'Outgrown Deputy', evidence: "Deputy is an SMB tool — Wagamama has 150+ sites and is dealing with manual processes at scale.", approach: "Position the transition from SMB to enterprise scheduling. Show how Sona handles multi-site complexity that Deputy can't." },
    { title: 'COO as Champion', evidence: "Marcus Webb is publicly vocal about labour cost issues and has registered for the Sona roundtable dinner.", approach: "Prepare a personalised briefing for the roundtable. Follow up with an exclusive 1-1 demo focused on demand-based scheduling." },
    { title: 'Cost Quantification', evidence: "£1.8M labour cost overrun cited by COO. High agency reliance across 150+ sites.", approach: "Build a custom ROI model for Wagamama. Show projected savings with demand-based scheduling vs. current manual approach." },
    { title: 'CFO Engagement Gap', evidence: "Helen Park (CFO) controls budget but hasn't been engaged yet. Her data is stale in our CRM.", approach: "Enrich CFO contact data via Cognism. Prepare a finance-focused one-pager on ROI and payback period to share through Marcus." },
  ],
}

const peerComparisons = [
  { company: 'Loungers Group', result: 'Migrated from Fourth in 6 weeks. Now saving £1.4M annually. 89% staff satisfaction with Sona scheduling.', status: 'Customer' },
  { company: 'Caring Homes', result: 'Reduced agency reliance by 30% after implementing Sona. CQC compliance automated. Board approved full rollout.', status: 'Late-stage' },
  { company: 'Five Guys UK', result: 'New HR Director exploring modern WFM solutions. Previously implemented modern scheduling at Deliveroo.', status: 'Early-stage' },
]

const sourceIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  web: Globe,
  gong: Mic,
  hubspot: BarChart3,
}

export default function OutreachIntelligencePage() {
  const [selectedAccountId, setSelectedAccountId] = useState('acc-1')
  const [selectedContactId, setSelectedContactId] = useState<string>('')
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false)
  const [expandedAngles, setExpandedAngles] = useState<Set<number>>(new Set([0]))

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId)!
  const accountContacts = getContactsByAccount(selectedAccountId)
  const selectedContact = accountContacts.find((c) => c.id === selectedContactId) || accountContacts[0]
  const competitor = getCompetitorByName(selectedAccount.currentSystem)
  const insights = accountInsights[selectedAccountId] || accountInsights['acc-1']
  const angles = outreachAngles[selectedAccountId] || outreachAngles['acc-1']

  const toggleAngle = (idx: number) => {
    const next = new Set(expandedAngles)
    if (next.has(idx)) {
      next.delete(idx)
    } else {
      next.add(idx)
    }
    setExpandedAngles(next)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Outreach Intelligence</h1>
        <p className="text-sona-stone-400 mt-1">
          AI-generated briefing packs with insights, content, and angles for every prospect.
        </p>
      </div>

      {/* Selectors */}
      <Card className="!p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Account Selector */}
          <div className="relative min-w-[260px]">
            <button
              onClick={() => { setAccountDropdownOpen(!accountDropdownOpen); setContactDropdownOpen(false) }}
              className="w-full flex items-center justify-between bg-sona-stone-100 border border-sona-stone-200 rounded px-4 py-2.5 text-sm text-sona-dark-teal hover:border-sona-teal/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sona-stone-400" />
                <span>{selectedAccount.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-sona-stone-400" />
            </button>
            {accountDropdownOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-sona-stone-200 rounded max-h-64 overflow-y-auto">
                {accounts.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedAccountId(a.id)
                      setSelectedContactId('')
                      setAccountDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-sona-stone-100 transition-colors',
                      a.id === selectedAccountId ? 'text-sona-teal bg-sona-dark-teal/5' : 'text-sona-dark-teal'
                    )}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact Selector */}
          <div className="relative min-w-[260px]">
            <button
              onClick={() => { setContactDropdownOpen(!contactDropdownOpen); setAccountDropdownOpen(false) }}
              className="w-full flex items-center justify-between bg-sona-stone-100 border border-sona-stone-200 rounded px-4 py-2.5 text-sm text-sona-dark-teal hover:border-sona-teal/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sona-stone-400" />
                <span>{selectedContact?.name || 'Select contact'}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-sona-stone-400" />
            </button>
            {contactDropdownOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-sona-stone-200 rounded max-h-64 overflow-y-auto">
                {accountContacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedContactId(c.id)
                      setContactDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-sona-stone-100 transition-colors',
                      c.id === selectedContactId ? 'text-sona-teal bg-sona-dark-teal/5' : 'text-sona-dark-teal'
                    )}
                  >
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-sona-stone-400">{c.role}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Briefing Pack Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Key Insights</h2>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => {
              const SourceIcon = sourceIcons[insight.icon] || Globe
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-sona-stone-100/50 rounded"
                >
                  <SourceIcon className="w-4 h-4 text-sona-teal mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-sona-dark-teal leading-relaxed">{insight.text}</p>
                    <span className="text-[10px] text-sona-stone-400 mt-1 inline-block">
                      Source: {insight.source}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Relevant Content */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-sona-teal" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Relevant Content</h2>
          </div>
          <div className="space-y-3">
            {contentAssets.map((asset, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-sona-stone-100/50 rounded"
              >
                <FileText className="w-5 h-5 text-sona-stone-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-sona-dark-teal">{asset.title}</div>
                  <div className="text-xs text-sona-stone-400 mt-0.5">
                    <Badge variant="outline" className="mr-2">{asset.type}</Badge>
                  </div>
                  <div className="mt-2">
                    <ProgressBar
                      value={asset.relevance}
                      max={100}
                      label="Relevance"
                      color={
                        asset.relevance >= 90
                          ? 'bg-emerald-400'
                          : asset.relevance >= 80
                          ? 'bg-sona-dark-teal'
                          : 'bg-amber-400'
                      }
                      size="sm"
                    />
                  </div>
                </div>
                <span className="text-lg font-bold text-sona-dark-teal">{asset.relevance}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Outreach Angles */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Outreach Angles</h2>
          </div>
          <div className="space-y-2">
            {angles.map((angle, i) => {
              const isExpanded = expandedAngles.has(i)
              return (
                <div
                  key={i}
                  className={cn(
                    'border rounded overflow-hidden transition-colors',
                    isExpanded
                      ? 'border-sona-teal/30 bg-sona-stone-100'
                      : 'border-sona-stone-200 bg-sona-stone-100 hover:bg-sona-stone-100'
                  )}
                >
                  <button
                    onClick={() => toggleAngle(i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-sm bg-teal-50 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-sona-teal">{i + 1}</span>
                      </div>
                      <span className="text-sm font-semibold text-sona-dark-teal">{angle.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-sona-stone-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-sona-stone-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 space-y-3">
                      <div>
                        <div className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider mb-1">
                          Supporting Evidence
                        </div>
                        <p className="text-sm text-sona-stone-400 leading-relaxed">
                          {angle.evidence}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider mb-1">
                          Suggested Approach
                        </div>
                        <p className="text-sm text-sona-dark-teal leading-relaxed">
                          {angle.approach}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Competitor Context */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Competitor Context</h2>
          </div>
          {competitor ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-sona-dark-teal">
                    Current System: {competitor.name}
                  </div>
                  <div className="text-xs text-sona-stone-400 mt-0.5">
                    {competitor.positioning}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-sona-teal">
                    {competitor.winRate}%
                  </div>
                  <div className="text-[10px] text-sona-stone-400">Win Rate</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider mb-2">
                  Why They Might Switch
                </div>
                <p className="text-sm text-sona-dark-teal leading-relaxed">
                  {competitor.displacementAngle}
                </p>
              </div>

              <div>
                <div className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider mb-2">
                  Key Proof Points
                </div>
                <ul className="space-y-1.5">
                  {competitor.keyProofPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-sona-stone-400">
                      <Award className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-sm text-sona-stone-400 py-4 text-center">
              No competitor intelligence available for {selectedAccount.currentSystem}.
            </div>
          )}
        </Card>

        {/* Peer Comparison */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-violet-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Peer Comparison</h2>
          </div>
          <p className="text-xs text-sona-stone-400 mb-4">
            Here&apos;s what similar operators are doing:
          </p>
          <div className="space-y-3">
            {peerComparisons.map((peer, i) => (
              <div
                key={i}
                className="p-3 bg-sona-stone-100/50 rounded"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-sona-dark-teal">
                    {peer.company}
                  </span>
                  <Badge
                    variant={
                      peer.status === 'Customer'
                        ? 'success'
                        : peer.status === 'Late-stage'
                        ? 'info'
                        : 'outline'
                    }
                  >
                    {peer.status}
                  </Badge>
                </div>
                <p className="text-xs text-sona-stone-400 leading-relaxed">
                  {peer.result}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
