'use client'

import { useState, useMemo } from 'react'
import {
  ChevronDown,
  FileText,
  Users,
  Building2,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Linkedin,
  Send,
  Loader2,
  Sparkles,
  AlertTriangle,
  Calendar,
  Zap,
  X,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import { deals, getDealsByAccount } from '@/data/deals'
import { accounts, getAccount } from '@/data/accounts'
import { getContactsByAccount } from '@/data/contacts'
import { getSignalsByAccount } from '@/data/signals'
import { getTeamMember } from '@/data/team'
import { cn, formatCurrency, relativeTime } from '@/lib/utils'
import type { MeddicConfidence, Deal } from '@/types'

const meddicLabels: Record<string, string> = {
  metrics: 'Metrics',
  economic_buyer: 'Economic Buyer',
  decision_criteria: 'Decision Criteria',
  decision_process: 'Decision Process',
  identify_pain: 'Identify Pain',
  champion: 'Champion',
}

const confidenceColors: Record<MeddicConfidence, { bg: string; text: string; ring: string }> = {
  high: { bg: 'bg-teal-500/15', text: 'text-sona-teal', ring: 'ring-emerald-500/30' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-600', ring: 'ring-amber-500/30' },
  low: { bg: 'bg-red-500/15', text: 'text-red-600', ring: 'ring-red-500/30' },
  none: { bg: 'bg-sona-stone-100', text: 'text-sona-stone-400', ring: 'ring-sona-border' },
}

const sentimentConfig: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline'; label: string }> = {
  champion: { variant: 'success', label: 'Champion' },
  positive: { variant: 'info', label: 'Positive' },
  neutral: { variant: 'outline', label: 'Neutral' },
  blocker: { variant: 'danger', label: 'Blocker' },
  unknown: { variant: 'outline', label: 'Unknown' },
}

// Mock conversation history
const mockTouchpoints: Record<string, { date: string; type: string; icon: typeof Phone; summary: string; by: string }[]> = {
  'deal-1': [
    { date: '2026-03-17', type: 'Demo Call', icon: Phone, summary: 'Product demo for Tom Reynolds (Ops Director). Showed scheduling module for multi-site. Tom said "This is exactly what we need." Next: Intro to HR Director.', by: 'Max Chen' },
    { date: '2026-03-14', type: 'Email', icon: Mail, summary: 'Sent Loungers case study to Tom Reynolds. Follow-up to discovery call. Attached ROI calculator.', by: 'Max Chen' },
    { date: '2026-03-10', type: 'Discovery Call', icon: Phone, summary: 'Initial discovery with Tom Reynolds. Confirmed Fourth pain points: 72+ hr support tickets, dated UX, poor mobile app. Budget cycle starts April.', by: 'Max Chen' },
    { date: '2026-03-05', type: 'LinkedIn', icon: Linkedin, summary: 'Connected with Claire Matthews (VP HR) on LinkedIn. She accepted but no response to message yet.', by: 'Max Chen' },
    { date: '2026-02-28', type: 'Outbound Email', icon: Mail, summary: 'Cold outreach to Tom Reynolds referencing Fourth outage and Loungers migration success story. Got a reply within 2 hours.', by: 'Max Chen' },
  ],
  'deal-3': [
    { date: '2026-03-18', type: 'Proposal Sent', icon: FileText, summary: 'Formal proposal sent to Rachel Green (COO) and Mark Williams (CFO). Includes 3-year pricing, Sage integration scope, and implementation timeline.', by: 'James Cooper' },
    { date: '2026-03-15', type: 'Demo Call', icon: Phone, summary: 'Final demo with full buying committee (COO, CFO, Head of HR). All three engaged. CFO asked detailed ROI questions. Positive meeting.', by: 'James Cooper' },
    { date: '2026-03-10', type: 'Email', icon: Mail, summary: 'Sent compliance documentation and Sage integration spec to Dan Foster (Head of HR).', by: 'James Cooper' },
    { date: '2026-03-02', type: 'Discovery Call', icon: Phone, summary: 'Deep dive on payroll integration with CFO. Confirmed Sage as payroll system. Quantified 20 hours/week on manual reconciliation.', by: 'Max Chen' },
  ],
}

const recommendedNextSteps: Record<string, string[]> = {
  'deal-1': [
    'Schedule HR Director (Claire Matthews) demo — Tom Reynolds to facilitate the introduction by Friday',
    'Send personalised ROI model showing projected savings based on 500+ locations and current Fourth costs',
    'Prepare competitive brief: "Why Chains Are Leaving Fourth" with 3 recent migration case studies',
    'Map procurement process: Identify who else needs to be involved beyond Ops and HR',
  ],
  'deal-3': [
    'Follow up Wednesday for proposal feedback from CFO',
    'Prepare for legal review — have contract templates ready for their legal team',
    'Schedule reference call with existing Sona customer in hospitality (similar size)',
    'Confirm board presentation date for >£200K spend approval',
  ],
}

export default function HandoverPackPage() {
  const [selectedDealId, setSelectedDealId] = useState('deal-1')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  const activeDeals = deals.filter((d) => !d.stage.startsWith('Closed'))
  const selectedDeal = deals.find((d) => d.id === selectedDealId)!
  const account = getAccount(selectedDeal.accountId)!
  const dealContacts = getContactsByAccount(selectedDeal.accountId)
  const dealSignals = getSignalsByAccount(selectedDeal.accountId)
  const ae = getTeamMember(selectedDeal.assignedAe)
  const touchpoints = mockTouchpoints[selectedDealId] || mockTouchpoints['deal-1']
  const nextSteps = recommendedNextSteps[selectedDealId] || recommendedNextSteps['deal-1']

  const handleGenerate = () => {
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-sona-stone-200 rounded px-5 py-3 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-sona-teal shrink-0" />
          <span className="text-sm text-sona-dark-teal">{toast.message}</span>
          <button onClick={() => setToast(null)}>
            <X className="w-4 h-4 text-sona-stone-400" />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">AE Handover Pack</h1>
        <p className="text-sona-stone-400 mt-1">
          Auto-generated handover documents for seamless BDR-to-AE transitions.
        </p>
      </div>

      {/* Controls */}
      <Card className="!p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Deal Selector */}
          <div className="relative min-w-[320px]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-sona-stone-100 border border-sona-stone-200 rounded px-4 py-2.5 text-sm text-sona-dark-teal hover:border-sona-teal/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sona-stone-400" />
                <span>{selectedDeal.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-sona-stone-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-sona-stone-200 rounded max-h-64 overflow-y-auto">
                {activeDeals.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDealId(d.id)
                      setDropdownOpen(false)
                      setGenerated(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-sona-stone-100 transition-colors',
                      d.id === selectedDealId ? 'text-sona-teal bg-sona-dark-teal/5' : 'text-sona-dark-teal'
                    )}
                  >
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-sona-stone-400">
                      {d.stage} — {formatCurrency(d.value)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 bg-sona-dark-teal hover:bg-sona-dark-teal/80 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Pack...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Pack
              </>
            )}
          </button>

          {generated && (
            <Badge variant="success" dot>Pack Generated</Badge>
          )}
        </div>
      </Card>

      {/* Handover Document */}
      <div className="space-y-6">
        {/* Account Summary */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-sona-teal" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Account Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Company</div>
              <div className="text-sm font-semibold text-sona-dark-teal">{account.name}</div>
            </div>
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Vertical</div>
              <div className="text-sm text-sona-dark-teal capitalize">{account.vertical.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Employees</div>
              <div className="text-sm text-sona-dark-teal">{account.employeeCount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Current System</div>
              <div className="text-sm text-sona-dark-teal">{account.currentSystem}</div>
            </div>
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Deal Value</div>
              <div className="text-sm font-semibold text-sona-dark-teal">{formatCurrency(selectedDeal.value)}</div>
            </div>
            <div>
              <div className="text-xs text-sona-stone-400 mb-1">Close Date</div>
              <div className="text-sm text-sona-dark-teal">{new Date(selectedDeal.closeDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          {/* Key Signals */}
          <div className="mt-4 pt-4 border-t border-sona-stone-200">
            <div className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider mb-2">Key Signals</div>
            <div className="flex flex-wrap gap-2">
              {dealSignals.slice(0, 4).map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center gap-1.5 bg-sona-stone-100/50 rounded-sm px-3 py-1"
                >
                  <Zap className={cn('w-3 h-3', signal.strength === 'high' ? 'text-sona-teal' : 'text-amber-600')} />
                  <span className="text-xs text-sona-stone-400">{signal.title}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Buying Committee */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-violet-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Buying Committee</h2>
            <Badge variant="outline">{dealContacts.length} contacts</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dealContacts.map((contact) => {
              const sc = sentimentConfig[contact.sentiment]
              return (
                <div
                  key={contact.id}
                  className="flex items-start gap-3 p-3 bg-sona-stone-100/50 rounded"
                >
                  <Avatar name={contact.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-sona-dark-teal">{contact.name}</div>
                    <div className="text-xs text-sona-stone-400">{contact.role}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={sc.variant} className="text-[10px]">{sc.label}</Badge>
                      {contact.engagementScore > 0 && (
                        <span className="text-[10px] text-sona-stone-400">
                          Engagement: {contact.engagementScore}/100
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Conversation History */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-sona-teal" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Conversation History</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-sona-border" />
            <div className="space-y-4">
              {touchpoints.map((tp, i) => {
                const Icon = tp.icon
                return (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className="w-9 h-9 rounded-sm bg-sona-stone-100 border border-sona-stone-200 flex items-center justify-center shrink-0 z-10">
                      <Icon className="w-4 h-4 text-sona-teal" />
                    </div>
                    <div className="min-w-0 flex-1 pb-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-sona-dark-teal">{tp.type}</span>
                        <span className="text-xs text-sona-stone-400">{relativeTime(tp.date)}</span>
                      </div>
                      <p className="text-sm text-sona-stone-400 leading-relaxed">
                        {tp.summary}
                      </p>
                      <div className="text-xs text-sona-stone-400 mt-1">
                        by <span className="text-sona-teal">{tp.by}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* MEDDIC Pre-fill */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-semibold text-sona-dark-teal">MEDDIC Assessment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedDeal.meddic.map((m) => {
              const cc = confidenceColors[m.confidence]
              return (
                <div
                  key={m.field}
                  className={cn(
                    'p-4 rounded border ring-1',
                    cc.bg,
                    cc.ring,
                    'border-transparent'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-sona-stone-400 uppercase tracking-wider">
                      {meddicLabels[m.field]}
                    </span>
                    <Badge
                      variant={
                        m.confidence === 'high'
                          ? 'success'
                          : m.confidence === 'medium'
                          ? 'warning'
                          : m.confidence === 'low'
                          ? 'danger'
                          : 'outline'
                      }
                    >
                      {m.confidence}
                    </Badge>
                  </div>
                  <p className="text-sm text-sona-dark-teal leading-relaxed">{m.notes}</p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Recommended Next Steps */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="w-5 h-5 text-sona-teal" />
            <h2 className="text-base font-semibold text-sona-dark-teal">Recommended Next Steps</h2>
          </div>
          <div className="space-y-2">
            {nextSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-sona-stone-100/50 rounded"
              >
                <div className="w-6 h-6 rounded-sm bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-sona-teal">{i + 1}</span>
                </div>
                <p className="text-sm text-sona-dark-teal leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => showToast('Handover pack posted to #ae-handovers in Slack')}
            className="flex items-center gap-2 bg-sona-stone-100 hover:bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            <Send className="w-4 h-4" />
            Post to Slack
          </button>
          <button
            onClick={() => showToast('Handover pack attached to deal in HubSpot')}
            className="flex items-center gap-2 bg-sona-stone-100 hover:bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            <FileText className="w-4 h-4" />
            Attach to HubSpot
          </button>
        </div>
      </div>
    </div>
  )
}
