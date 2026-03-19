'use client'

import { useState } from 'react'
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ChevronRight,
  User,
  Mail,
  Clock,
  ExternalLink,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import { getDealsByAe } from '@/data/deals'
import { getAccount } from '@/data/accounts'
import { getContactsByAccount } from '@/data/contacts'
import { formatCurrency, relativeTime, cn } from '@/lib/utils'
import type { Deal, MeddicConfidence } from '@/types'

const AE_ID = 'ae-1'

const meddicLabels: Record<string, string> = {
  metrics: 'Metrics',
  economic_buyer: 'Economic Buyer',
  decision_criteria: 'Decision Criteria',
  decision_process: 'Decision Process',
  identify_pain: 'Identify Pain',
  champion: 'Champion',
}

const meddicLetters: Record<string, string> = {
  metrics: 'M',
  economic_buyer: 'E',
  decision_criteria: 'D',
  decision_process: 'D',
  identify_pain: 'I',
  champion: 'C',
}

const confidenceVariant: Record<MeddicConfidence, 'success' | 'warning' | 'danger' | 'default'> = {
  high: 'success',
  medium: 'warning',
  low: 'danger',
  none: 'default',
}

const sentimentColors: Record<string, string> = {
  champion: 'bg-emerald-400',
  positive: 'bg-blue-400',
  neutral: 'bg-gray-400',
  blocker: 'bg-red-400',
  unknown: 'bg-gray-600',
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'stakeholders', label: 'Stakeholders' },
  { id: 'meddic', label: 'MEDDIC' },
  { id: 'risks', label: 'Risks' },
  { id: 'timeline', label: 'Timeline' },
]

function getTimelineMilestones(deal: Deal) {
  const milestones = [
    { label: 'First Contact', date: deal.createdDate, status: 'complete' as const },
    { label: 'Discovery Call', date: '2026-01-28', status: 'complete' as const },
    { label: 'Solution Demo', date: '2026-02-15', status: deal.stage === 'S1-Qualified' ? 'pending' as const : 'complete' as const },
    { label: 'Proposal Sent', date: '2026-03-05', status: ['S1-Qualified', 'S2-Discovery', 'S3-Solution'].includes(deal.stage) ? 'pending' as const : 'complete' as const },
    { label: 'Negotiation', date: '2026-03-20', status: deal.stage === 'S5-Negotiation' ? 'active' as const : 'pending' as const },
    { label: 'Closed Won', date: deal.closeDate, status: 'pending' as const },
  ]

  // Mark the right active step
  const stageIndex: Record<string, number> = {
    'S1-Qualified': 0,
    'S2-Discovery': 1,
    'S3-Solution': 2,
    'S4-Proposal': 3,
    'S5-Negotiation': 4,
  }
  const activeIdx = stageIndex[deal.stage] ?? 0
  return milestones.map((m, i) => ({
    ...m,
    status: i < activeIdx ? 'complete' as const : i === activeIdx ? 'active' as const : 'pending' as const,
  }))
}

export default function AccountPlannerPage() {
  const allDeals = getDealsByAe(AE_ID).filter((d) => !d.stage.startsWith('Closed'))
  const sortedDeals = [...allDeals].sort((a, b) => b.value - a.value)
  const [selectedDealId, setSelectedDealId] = useState(sortedDeals[0]?.id || '')
  const [activeTab, setActiveTab] = useState('overview')

  const selectedDeal = sortedDeals.find((d) => d.id === selectedDealId) || sortedDeals[0]
  const account = selectedDeal ? getAccount(selectedDeal.accountId) : null
  const contacts = account ? getContactsByAccount(account.id) : []

  const stageVariant: Record<string, 'info' | 'warning' | 'success' | 'purple' | 'danger'> = {
    'S1-Qualified': 'info',
    'S2-Discovery': 'info',
    'S3-Solution': 'warning',
    'S4-Proposal': 'purple',
    'S5-Negotiation': 'success',
  }

  return (
    <div className="min-h-screen bg-sona-bg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sona-dark-teal">Account Planner</h1>
        <p className="text-sona-stone-400 mt-1">Deep-dive into your deals and accounts</p>
      </div>

      <div className="flex gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel - Deal List */}
        <div className="w-[30%] shrink-0 overflow-y-auto space-y-2 pr-2">
          {sortedDeals.map((deal) => {
            const dealAccount = getAccount(deal.accountId)
            const isSelected = deal.id === selectedDealId
            return (
              <div
                key={deal.id}
                onClick={() => { setSelectedDealId(deal.id); setActiveTab('overview') }}
                className={cn(
                  'p-4 rounded border cursor-pointer transition-all',
                  isSelected
                    ? 'bg-white border-sona-teal/50 ring-1 ring-sona-teal/20'
                    : 'bg-white border-sona-stone-200 hover:border-sona-teal/30'
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-sona-dark-teal leading-tight">{deal.name}</p>
                  <ChevronRight className={cn('w-4 h-4 shrink-0 ml-2', isSelected ? 'text-sona-teal' : 'text-sona-stone-400')} />
                </div>
                <p className="text-xs text-sona-stone-400 mb-3">{dealAccount?.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-sona-dark-teal">{formatCurrency(deal.value)}</span>
                  <Badge variant={stageVariant[deal.stage] || 'default'}>{deal.stage}</Badge>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Panel - Deal Detail */}
        <div className="flex-1 overflow-y-auto">
          {selectedDeal && account ? (
            <Card className="h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-sona-dark-teal">{selectedDeal.name}</h2>
                  <p className="text-sm text-sona-stone-400">{account.name} &middot; {account.vertical}</p>
                </div>
                <Badge variant={stageVariant[selectedDeal.stage] || 'default'} className="text-sm px-3 py-1">
                  {selectedDeal.stage}
                </Badge>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-sona-stone-100 rounded p-1 mb-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'px-3 py-2 rounded text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-white text-sona-dark-teal'
                        : 'text-sona-stone-400 hover:text-sona-dark-teal'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  {/* Company Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded bg-sona-stone-100">
                      <h3 className="text-sm font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sona-teal" /> Company Info
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Vertical</span>
                          <span className="text-sona-dark-teal capitalize">{account.vertical}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Employees</span>
                          <span className="text-sona-dark-teal">{account.employeeCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Revenue</span>
                          <span className="text-sona-dark-teal">{account.annualRevenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">HQ</span>
                          <span className="text-sona-dark-teal flex items-center gap-1"><MapPin className="w-3 h-3" />{account.hqLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Website</span>
                          <span className="text-sona-teal flex items-center gap-1"><Globe className="w-3 h-3" />{account.website}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Current System</span>
                          <Badge variant="warning">{account.currentSystem}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded bg-sona-stone-100">
                      <h3 className="text-sm font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-sona-teal" /> Deal Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Deal Value</span>
                          <span className="text-sona-dark-teal font-bold">{formatCurrency(selectedDeal.value)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Stage</span>
                          <Badge variant={stageVariant[selectedDeal.stage] || 'default'}>{selectedDeal.stage}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Close Date</span>
                          <span className="text-sona-dark-teal">{new Date(selectedDeal.closeDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Probability</span>
                          <span className="text-sona-dark-teal">{selectedDeal.probability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Days in Stage</span>
                          <span className={cn('text-sona-dark-teal', selectedDeal.daysInStage > 20 ? 'text-amber-600' : '')}>{selectedDeal.daysInStage} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sona-stone-400">Displacing</span>
                          <Badge variant="danger">{selectedDeal.competitorDisplacing}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="p-4 rounded bg-sona-stone-100">
                    <h3 className="text-sm font-semibold text-sona-dark-teal mb-2">Next Steps</h3>
                    <p className="text-sm text-sona-dark-teal">{selectedDeal.nextSteps}</p>
                  </div>
                </div>
              )}

              {activeTab === 'stakeholders' && (
                <div className="space-y-4">
                  {contacts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="p-4 rounded bg-sona-stone-100 border border-sona-stone-200">
                          <div className="flex items-start gap-3">
                            <Avatar name={contact.name} size="lg" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-sona-dark-teal">{contact.name}</p>
                                <span className={cn('w-2 h-2 rounded-sm', sentimentColors[contact.sentiment])} title={contact.sentiment} />
                              </div>
                              <p className="text-xs text-sona-stone-400">{contact.role}</p>
                              <Badge variant={contact.sentiment === 'champion' ? 'success' : contact.sentiment === 'blocker' ? 'danger' : 'default'} className="mt-1">
                                {contact.persona}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            <ProgressBar
                              value={contact.engagementScore}
                              max={100}
                              label="Engagement"
                              size="sm"
                              color={contact.engagementScore > 70 ? 'bg-teal-500' : contact.engagementScore > 40 ? 'bg-amber-500' : 'bg-red-500'}
                            />
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-sona-stone-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />{contact.email || 'No email'}
                              </span>
                              <span className="text-sona-stone-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{contact.lastContacted ? relativeTime(contact.lastContacted) : 'Never'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sona-stone-400 text-sm">No contacts found for this account.</p>
                  )}

                  {/* Empty persona slots */}
                  {(() => {
                    const existingPersonas = new Set(contacts.map((c) => c.persona))
                    const allPersonas = ['HR Director', 'Operations Director', 'Finance Director', 'IT Director', 'C-Suite']
                    const missing = allPersonas.filter((p) => !existingPersonas.has(p as any))
                    if (missing.length === 0) return null
                    return (
                      <div>
                        <h3 className="text-sm font-semibold text-sona-stone-400 mb-3">Missing Personas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {missing.map((persona) => (
                            <div key={persona} className="p-4 rounded border-2 border-dashed border-sona-stone-200 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-sm bg-sona-stone-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-sona-stone-400" />
                              </div>
                              <div>
                                <p className="text-sm text-sona-stone-400">{persona}</p>
                                <p className="text-xs text-sona-stone-400/60">Not yet identified</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {activeTab === 'meddic' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDeal.meddic.map((field) => (
                    <div key={field.field} className="p-4 rounded bg-sona-stone-100 border border-sona-stone-200">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded flex items-center justify-center text-lg font-bold shrink-0',
                          field.confidence === 'high' ? 'bg-teal-500/20 text-sona-teal' :
                          field.confidence === 'medium' ? 'bg-amber-500/20 text-amber-600' :
                          field.confidence === 'low' ? 'bg-red-500/20 text-red-600' :
                          'bg-gray-500/20 text-gray-400'
                        )}>
                          {meddicLetters[field.field]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-sona-dark-teal">{meddicLabels[field.field]}</h4>
                            <Badge variant={confidenceVariant[field.confidence]}>
                              {field.confidence}
                            </Badge>
                          </div>
                          <p className="text-xs text-sona-stone-400 leading-relaxed">{field.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-3">
                  {selectedDeal.risks.length > 0 ? (
                    selectedDeal.risks.map((risk, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-4 rounded border',
                          risk.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                          risk.severity === 'medium' ? 'bg-amber-500/5 border-amber-500/20' :
                          'bg-sona-stone-100 border-sona-stone-200'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className={cn(
                            'w-5 h-5 shrink-0 mt-0.5',
                            risk.severity === 'high' ? 'text-red-600' :
                            risk.severity === 'medium' ? 'text-amber-600' :
                            'text-sona-stone-400'
                          )} />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-sona-dark-teal capitalize">{risk.type.replace(/_/g, ' ')}</span>
                              <Badge variant={risk.severity === 'high' ? 'danger' : risk.severity === 'medium' ? 'warning' : 'default'}>
                                {risk.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-sona-stone-400">{risk.description}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 p-6 rounded bg-teal-500/5 border border-emerald-500/20">
                      <CheckCircle2 className="w-6 h-6 text-sona-teal" />
                      <div>
                        <p className="text-sm font-medium text-sona-teal">No risks identified</p>
                        <p className="text-xs text-sona-stone-400">This deal is tracking well with no current concerns.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="relative pl-6">
                  {getTimelineMilestones(selectedDeal).map((milestone, idx, arr) => (
                    <div key={idx} className="relative pb-8 last:pb-0">
                      {/* Connecting line */}
                      {idx < arr.length - 1 && (
                        <div className={cn(
                          'absolute left-[-16px] top-6 w-0.5 h-full',
                          milestone.status === 'complete' ? 'bg-teal-500' : 'bg-sona-border'
                        )} />
                      )}
                      {/* Circle */}
                      <div className="absolute left-[-22px] top-1">
                        {milestone.status === 'complete' ? (
                          <CheckCircle2 className="w-5 h-5 text-sona-teal" />
                        ) : milestone.status === 'active' ? (
                          <div className="w-5 h-5 rounded-sm border-2 border-sona-teal bg-teal-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-sm bg-sona-dark-teal" />
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-sona-border" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="ml-3">
                        <p className={cn(
                          'text-sm font-medium',
                          milestone.status === 'complete' ? 'text-sona-teal' :
                          milestone.status === 'active' ? 'text-sona-dark-teal' :
                          'text-sona-stone-400'
                        )}>
                          {milestone.label}
                        </p>
                        <p className="text-xs text-sona-stone-400 mt-0.5">
                          {new Date(milestone.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        {milestone.status === 'active' && (
                          <Badge variant="info" className="mt-2">Current Stage</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <p className="text-sona-stone-400">Select a deal from the left panel</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
