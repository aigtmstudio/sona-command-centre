'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Loader2,
  Mic,
  ArrowDown,
  Hash,
  CheckSquare,
  HelpCircle,
  Database,
  ClipboardList,
  Calendar,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { cn } from '@/lib/utils'

const fieldUpdates = [
  { field: 'MEDDIC - Champion', oldValue: 'Empty', newValue: 'Marcus Webb (COO)', changed: true },
  { field: 'MEDDIC - Metrics', oldValue: 'Low', newValue: 'Medium', changed: true },
  { field: 'MEDDIC - Identify Pain', oldValue: 'Medium', newValue: 'High', changed: true },
  { field: 'Stage', oldValue: 'S2-Discovery', newValue: 'S2-Discovery', changed: false },
  { field: 'Next Step', oldValue: '—', newValue: 'Demo scheduled for March 25', changed: true },
  { field: 'Next Step Date', oldValue: '—', newValue: '2026-03-25', changed: true },
]

const tasks = [
  { label: 'Send Deputy migration guide to Marcus Webb', due: '2026-03-20', assigned: 'Sarah Bennett' },
  { label: 'Prepare Wagamama-specific scheduling mockup for demo', due: '2026-03-24', assigned: 'Sarah Bennett' },
  { label: 'Loop in SE for technical deep-dive on API integrations', due: '2026-03-21', assigned: 'Sarah Bennett' },
]

const recentHistory = [
  { date: '2026-03-17', deal: 'Burger King - Enterprise Rollout', meeting: 'Solution Demo', status: 'completed' },
  { date: '2026-03-16', deal: 'Barchester - Full Platform', meeting: 'Discovery Call #2', status: 'completed' },
  { date: '2026-03-15', deal: 'Wagamama - Scheduling Platform', meeting: 'Discovery Call', status: 'completed' },
  { date: '2026-03-13', deal: 'Loungers - Scheduling + Payroll', meeting: 'Proposal Review', status: 'completed' },
  { date: '2026-03-05', deal: 'Tortilla - Hospitality Suite', meeting: 'Initial Discovery', status: 'completed' },
]

export default function AdminAssistantPage() {
  const [confirmed, setConfirmed] = useState(false)
  const [allApproved, setAllApproved] = useState(false)

  const handleConfirm = (yes: boolean) => {
    if (yes) setConfirmed(true)
  }

  const handleApproveAll = () => {
    setAllApproved(true)
  }

  const getStepStatus = (step: number) => {
    if (allApproved) return 'complete'
    if (step === 1) return 'complete'
    if (step === 2) return confirmed ? 'complete' : 'active'
    if (step >= 3 && confirmed) return 'active'
    return 'pending'
  }

  return (
    <div className="min-h-screen bg-sona-bg p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Admin Assistant</h1>
        <p className="text-sona-stone-400 mt-1">Post-meeting automation — CRM updates, follow-ups, and Slack summaries</p>
      </div>

      {/* Success Banner */}
      {allApproved && (
        <div className="p-4 rounded bg-teal-50 border border-emerald-500/30 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
          <div>
            <p className="text-sm font-medium text-sona-teal">All actions executed successfully</p>
            <p className="text-xs text-sona-teal/70">Slack update sent, HubSpot fields updated, and 3 tasks created.</p>
          </div>
        </div>
      )}

      {/* Step Pipeline */}
      <div className="space-y-0">
        {/* Step 1 - Transcript Received */}
        <div className="relative">
          <Card className="border-l-4 border-l-emerald-500">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-teal-50">
                <Mic className="w-5 h-5 text-sona-teal" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-sona-dark-teal">Step 1: Transcript Received</h3>
                  <Badge variant="success" dot dotColor="bg-emerald-400">Complete</Badge>
                </div>
                <p className="text-sm text-sona-stone-400">Wagamama Discovery Call — March 15, 2026</p>
                <p className="text-xs text-sona-stone-400 mt-1">Source: Granola &middot; Duration: 47 minutes &middot; Participants: Sarah Bennett, Marcus Webb, James Liu</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
            </div>
          </Card>
          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 text-sona-border" />
          </div>
        </div>

        {/* Step 2 - Deal Confirmation */}
        <div className="relative">
          <Card className={cn('border-l-4', confirmed ? 'border-l-emerald-500' : 'border-l-sona-teal')}>
            <div className="flex items-start gap-4">
              <div className={cn('p-2.5 rounded', confirmed ? 'bg-teal-50' : 'bg-teal-50')}>
                <HelpCircle className={cn('w-5 h-5', confirmed ? 'text-sona-teal' : 'text-sona-teal')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-sona-dark-teal">Step 2: Deal Confirmation</h3>
                  {confirmed ? (
                    <Badge variant="success" dot dotColor="bg-emerald-400">Confirmed</Badge>
                  ) : (
                    <Badge variant="info" dot dotColor="bg-sona-dark-teal">Action Required</Badge>
                  )}
                </div>
                <p className="text-sm text-sona-dark-teal mt-2">
                  Is this about the <span className="text-sona-dark-teal font-medium">Wagamama — Scheduling Platform</span> deal?
                </p>
                {!confirmed && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleConfirm(true)}
                      className="px-4 py-2 bg-sona-dark-teal text-white text-sm font-medium rounded hover:bg-sona-dark-teal/80 transition-colors"
                    >
                      Yes, correct
                    </button>
                    <button
                      onClick={() => handleConfirm(false)}
                      className="px-4 py-2 bg-sona-stone-100 text-sona-stone-400 text-sm font-medium rounded border border-sona-stone-200 hover:text-sona-dark-teal transition-colors"
                    >
                      No, different deal
                    </button>
                  </div>
                )}
              </div>
              {confirmed ? (
                <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-sm border-2 border-sona-teal flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-sona-dark-teal" />
                </div>
              )}
            </div>
          </Card>
          <div className="flex justify-center py-1">
            <ArrowDown className={cn('w-5 h-5', confirmed ? 'text-sona-border' : 'text-sona-border/40')} />
          </div>
        </div>

        {/* Step 3 - Slack Update Preview */}
        <div className="relative">
          <Card className={cn(
            'border-l-4 transition-all duration-500',
            getStepStatus(3) === 'complete' ? 'border-l-emerald-500' :
            getStepStatus(3) === 'active' ? 'border-l-sona-teal' : 'border-l-sona-stone-200 opacity-60'
          )}>
            <div className="flex items-start gap-4">
              <div className={cn('p-2.5 rounded', confirmed ? 'bg-teal-50' : 'bg-sona-stone-100')}>
                <Hash className={cn('w-5 h-5', confirmed ? 'text-sona-teal' : 'text-sona-stone-400')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-sona-dark-teal">Step 3: Slack Update Preview</h3>
                  {allApproved ? (
                    <Badge variant="success" dot dotColor="bg-emerald-400">Sent</Badge>
                  ) : confirmed ? (
                    <Badge variant="info" dot dotColor="bg-sona-dark-teal">Ready to Send</Badge>
                  ) : (
                    <Badge variant="default">Pending</Badge>
                  )}
                </div>

                {confirmed && (
                  <div className="mt-3 rounded bg-[#1a1d21] border border-[#383838] p-4">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#383838]">
                      <Hash className="w-4 h-4 text-[#b9bbbe]" />
                      <span className="text-sm font-medium text-[#b9bbbe]">ae-deal-updates</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-sona-dark-teal font-medium">Wagamama — Discovery Call Update (March 15)</p>

                      <div>
                        <p className="text-[#b9bbbe] font-medium text-xs uppercase tracking-wide mb-1">Key Takeaways</p>
                        <ul className="text-[#dcddde] space-y-0.5 text-sm">
                          <li>&#8226; COO (Marcus Webb) confirmed £1.8M labour cost overrun — strong pain point</li>
                          <li>&#8226; Outgrowing Deputy across 150+ sites, especially for multi-site scheduling</li>
                          <li>&#8226; IT Director (James Liu) open to API integration discussion</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-[#b9bbbe] font-medium text-xs uppercase tracking-wide mb-1">Next Steps</p>
                        <ul className="text-[#dcddde] space-y-0.5 text-sm">
                          <li>&#8226; Demo scheduled for March 25 with COO + IT Lead</li>
                          <li>&#8226; Prepare Wagamama-specific scheduling mockup</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-[#b9bbbe] font-medium text-xs uppercase tracking-wide mb-1">Action Items</p>
                        <ul className="text-[#dcddde] space-y-0.5 text-sm">
                          <li>&#8226; Sarah: Send Deputy migration guide to Marcus</li>
                          <li>&#8226; Sarah: Prepare demo with Wagamama-specific data</li>
                          <li>&#8226; Sarah: Loop in SE for API technical deep-dive</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {allApproved ? (
                <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
              ) : confirmed ? (
                <Loader2 className="w-6 h-6 text-sona-teal shrink-0 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-sona-border shrink-0" />
              )}
            </div>
          </Card>
          <div className="flex justify-center py-1">
            <ArrowDown className={cn('w-5 h-5', confirmed ? 'text-sona-border' : 'text-sona-border/40')} />
          </div>
        </div>

        {/* Step 4 - HubSpot Field Updates */}
        <div className="relative">
          <Card className={cn(
            'border-l-4 transition-all duration-500',
            getStepStatus(4) === 'complete' ? 'border-l-emerald-500' :
            getStepStatus(4) === 'active' ? 'border-l-sona-teal' : 'border-l-sona-stone-200 opacity-60'
          )}>
            <div className="flex items-start gap-4">
              <div className={cn('p-2.5 rounded', confirmed ? 'bg-orange-50' : 'bg-sona-stone-100')}>
                <Database className={cn('w-5 h-5', confirmed ? 'text-orange-600' : 'text-sona-stone-400')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-sona-dark-teal">Step 4: HubSpot Field Updates</h3>
                  {allApproved ? (
                    <Badge variant="success" dot dotColor="bg-emerald-400">Updated</Badge>
                  ) : confirmed ? (
                    <Badge variant="warning" dot dotColor="bg-amber-400">Ready to Apply</Badge>
                  ) : (
                    <Badge variant="default">Pending</Badge>
                  )}
                </div>

                {confirmed && (
                  <div className="mt-3 overflow-hidden rounded border border-sona-stone-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-sona-stone-100">
                          <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2">Field</th>
                          <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2">Old Value</th>
                          <th className="text-center text-xs text-sona-stone-400 font-medium px-4 py-2"></th>
                          <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2">New Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldUpdates.map((update, i) => (
                          <tr key={i} className={cn('border-t border-sona-stone-200', update.changed ? '' : 'opacity-50')}>
                            <td className="px-4 py-2.5 text-sona-dark-teal font-medium">{update.field}</td>
                            <td className="px-4 py-2.5 text-sona-stone-400">{update.oldValue}</td>
                            <td className="px-4 py-2.5 text-center">
                              {update.changed ? (
                                <span className="text-sona-teal text-xs">&rarr;</span>
                              ) : (
                                <span className="text-sona-stone-400 text-xs">=</span>
                              )}
                            </td>
                            <td className={cn('px-4 py-2.5', update.changed ? 'text-sona-teal font-medium' : 'text-sona-stone-400')}>
                              {update.newValue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {allApproved ? (
                <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
              ) : confirmed ? (
                <Loader2 className="w-6 h-6 text-sona-teal shrink-0 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-sona-border shrink-0" />
              )}
            </div>
          </Card>
          <div className="flex justify-center py-1">
            <ArrowDown className={cn('w-5 h-5', confirmed ? 'text-sona-border' : 'text-sona-border/40')} />
          </div>
        </div>

        {/* Step 5 - Tasks Created */}
        <div className="relative">
          <Card className={cn(
            'border-l-4 transition-all duration-500',
            getStepStatus(5) === 'complete' ? 'border-l-emerald-500' :
            getStepStatus(5) === 'active' ? 'border-l-sona-teal' : 'border-l-sona-stone-200 opacity-60'
          )}>
            <div className="flex items-start gap-4">
              <div className={cn('p-2.5 rounded', confirmed ? 'bg-purple-50' : 'bg-sona-stone-100')}>
                <ClipboardList className={cn('w-5 h-5', confirmed ? 'text-violet-600' : 'text-sona-stone-400')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-sona-dark-teal">Step 5: Tasks Created</h3>
                  {allApproved ? (
                    <Badge variant="success" dot dotColor="bg-emerald-400">Created</Badge>
                  ) : confirmed ? (
                    <Badge variant="purple" dot dotColor="bg-purple-400">Ready to Create</Badge>
                  ) : (
                    <Badge variant="default">Pending</Badge>
                  )}
                </div>

                {confirmed && (
                  <div className="mt-3 space-y-2">
                    {tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded bg-sona-stone-100">
                        <CheckSquare className={cn('w-4 h-4 shrink-0', allApproved ? 'text-sona-teal' : 'text-sona-stone-400')} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-sona-dark-teal">{task.label}</p>
                          <p className="text-xs text-sona-stone-400">{task.assigned}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-sona-stone-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(task.due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {allApproved ? (
                <CheckCircle2 className="w-6 h-6 text-sona-teal shrink-0" />
              ) : confirmed ? (
                <Loader2 className="w-6 h-6 text-sona-teal shrink-0 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-sona-border shrink-0" />
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Approve All Button */}
      {confirmed && !allApproved && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleApproveAll}
            className="flex items-center gap-2 px-6 py-3 bg-sona-dark-teal text-white font-medium rounded hover:bg-sona-dark-teal/80 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Approve & Execute All
          </button>
        </div>
      )}

      {/* Recent Automation History */}
      <Card>
        <h3 className="text-base font-semibold text-sona-dark-teal mb-4">Recent Automation History</h3>
        <div className="overflow-hidden rounded border border-sona-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sona-stone-100">
                <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2.5">Date</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2.5">Deal</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2.5">Meeting</th>
                <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.map((row, i) => (
                <tr key={i} className="border-t border-sona-stone-200 hover:bg-sona-stone-100/50 transition-colors">
                  <td className="px-4 py-3 text-sona-stone-400">
                    {new Date(row.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3 text-sona-dark-teal font-medium">{row.deal}</td>
                  <td className="px-4 py-3 text-sona-dark-teal">{row.meeting}</td>
                  <td className="px-4 py-3">
                    <Badge variant="success" dot dotColor="bg-emerald-400">
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
