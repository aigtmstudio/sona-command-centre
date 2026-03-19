'use client'

import { useState } from 'react'
import {
  Upload,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  Filter,
  UserCheck,
  Database,
  Brain,
  Mail,
  BarChart3,
  ArrowDown,
  Circle,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import { cn } from '@/lib/utils'

const events = [
  { id: 'evt-past-1', name: 'Social Care Leaders Roundtable — March 5', date: 'Mar 5, 2026' },
  { id: 'evt-past-2', name: 'Hospitality Tech Summit — Feb 20', date: 'Feb 20, 2026' },
  { id: 'evt-past-3', name: 'Future of Work Webinar — Feb 12', date: 'Feb 12, 2026' },
]

const pipelineStages = [
  {
    id: 'raw',
    label: 'Raw Leads',
    icon: Upload,
    total: 89,
    description: '89 attendees uploaded from event delegate list',
    segments: [{ label: 'Uploaded', value: 89, color: 'bg-sona-stone-400/40' }],
    totalWidth: 89,
  },
  {
    id: 'scored',
    label: 'ICP Scored',
    icon: Brain,
    total: 89,
    description: '52 qualified ICP match, 37 unqualified',
    segments: [
      { label: 'Qualified', value: 52, color: 'bg-teal-500' },
      { label: 'Unqualified', value: 37, color: 'bg-sona-stone-400/30' },
    ],
    totalWidth: 89,
  },
  {
    id: 'enriched',
    label: 'Enriched',
    icon: Database,
    total: 52,
    description: '48 enriched, 4 pending enrichment',
    segments: [
      { label: 'Cognism', value: 32, color: 'bg-sona-dark-teal' },
      { label: 'Full Enrich', value: 12, color: 'bg-purple-500' },
      { label: 'Rocket Reach', value: 4, color: 'bg-cyan-500' },
      { label: 'Pending', value: 4, color: 'bg-amber-500/50' },
    ],
    totalWidth: 52,
  },
  {
    id: 'crm',
    label: 'CRM Updated',
    icon: UserCheck,
    total: 48,
    description: '41 new contacts created, 7 existing contacts updated',
    segments: [
      { label: 'New Contacts', value: 41, color: 'bg-sona-dark-teal' },
      { label: 'Updated Existing', value: 7, color: 'bg-indigo-400' },
    ],
    totalWidth: 48,
  },
  {
    id: 'assigned',
    label: 'BDR Assigned',
    icon: Users,
    total: 41,
    description: 'Distributed across 4 BDRs based on vertical expertise',
    segments: [
      { label: 'Max', value: 12, color: 'bg-sky-500' },
      { label: 'Joey', value: 10, color: 'bg-teal-500' },
      { label: 'Thomas', value: 8, color: 'bg-purple-500' },
      { label: 'Harry', value: 11, color: 'bg-amber-500' },
    ],
    totalWidth: 41,
  },
  {
    id: 'followup',
    label: 'Follow-up Status',
    icon: Mail,
    total: 41,
    description: '28 contacted, 8 pending, 5 overdue',
    segments: [
      { label: 'Contacted', value: 28, color: 'bg-teal-500' },
      { label: 'Pending', value: 8, color: 'bg-amber-500' },
      { label: 'Overdue', value: 5, color: 'bg-red-500' },
    ],
    totalWidth: 41,
  },
]

const tasks = [
  { id: 't1', task: 'Upload delegate list to CRM', owner: 'Emma Davies', status: 'complete' as const, dueDate: 'Mar 6' },
  { id: 't2', task: 'Enrich all new contacts', owner: 'Lily Chen', status: 'complete' as const, dueDate: 'Mar 7' },
  { id: 't3', task: 'Assign leads to BDRs', owner: 'Emma Davies', status: 'complete' as const, dueDate: 'Mar 7' },
  { id: 't4', task: 'Send follow-up sequences', owner: 'Ryan Cooper', status: 'in-progress' as const, dueDate: 'Mar 10' },
  { id: 't5', task: 'Collect team event feedback', owner: 'Emma Davies', status: 'in-progress' as const, dueDate: 'Mar 12' },
  { id: 't6', task: 'Update event ROI tracker', owner: 'Lily Chen', status: 'pending' as const, dueDate: 'Mar 14' },
  { id: 't7', task: 'Repurpose event content for blog', owner: 'Ryan Cooper', status: 'pending' as const, dueDate: 'Mar 19' },
  { id: 't8', task: 'Post event photos to LinkedIn', owner: 'Lily Chen', status: 'pending' as const, dueDate: 'Mar 20' },
]

const followUpContacts = [
  { id: 'f1', bdr: 'Max Chen', contact: 'Patricia Holmes', company: 'Barchester Healthcare', status: 'Contacted', daysSinceEvent: 14 },
  { id: 'f2', bdr: 'Max Chen', contact: 'Simon Clarke', company: 'HC-One', status: 'Contacted', daysSinceEvent: 14 },
  { id: 'f3', bdr: 'Joey Palmer', contact: 'Karen Whitfield', company: 'Brunelcare', status: 'Contacted', daysSinceEvent: 14 },
  { id: 'f4', bdr: 'Joey Palmer', contact: 'David Lewis', company: 'Care UK', status: 'Pending', daysSinceEvent: 14 },
  { id: 'f5', bdr: 'Thomas Wright', contact: 'Angela Brooks', company: 'Four Seasons Health Care', status: 'Overdue', daysSinceEvent: 14 },
  { id: 'f6', bdr: 'Thomas Wright', contact: 'Mark Henderson', company: 'Voyage Care', status: 'Contacted', daysSinceEvent: 14 },
  { id: 'f7', bdr: 'Harry Morrison', contact: 'Lisa Cooper', company: 'Anchor Hanover', status: 'Contacted', daysSinceEvent: 14 },
  { id: 'f8', bdr: 'Harry Morrison', contact: 'James Morton', company: 'Hallmark Care Homes', status: 'Overdue', daysSinceEvent: 14 },
  { id: 'f9', bdr: 'Max Chen', contact: 'Claire Ashworth', company: 'MHA', status: 'Pending', daysSinceEvent: 14 },
  { id: 'f10', bdr: 'Joey Palmer', contact: 'Rachel Price', company: 'Bupa Care Services', status: 'Contacted', daysSinceEvent: 14 },
]

const statusConfig = {
  'Contacted': { variant: 'success' as const, icon: CheckCircle2 },
  'Pending': { variant: 'warning' as const, icon: Clock },
  'Overdue': { variant: 'danger' as const, icon: AlertTriangle },
}

const taskStatusConfig = {
  complete: { label: 'Complete', variant: 'success' as const },
  'in-progress': { label: 'In Progress', variant: 'warning' as const },
  pending: { label: 'Pending', variant: 'default' as const },
}

export default function PostEventPage() {
  const [selectedEvent, setSelectedEvent] = useState('evt-past-1')
  const [taskStates, setTaskStates] = useState(tasks.map((t) => t.status))

  const toggleTask = (index: number) => {
    setTaskStates((prev) => {
      const next = [...prev]
      if (next[index] === 'pending') next[index] = 'in-progress'
      else if (next[index] === 'in-progress') next[index] = 'complete'
      else next[index] = 'pending'
      return next
    })
  }

  const maxWidth = 89 // largest total for bar scaling

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-sona-teal" />
            Post-Event Pipeline Machine
          </h1>
          <p className="text-sona-stone-400 mt-1">
            Track event leads from upload to follow-up.
          </p>
        </div>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="bg-sona-stone-100 border border-sona-stone-200 rounded px-3 py-2 text-sm text-sona-dark-teal focus:outline-none focus:border-sona-teal/50"
        >
          {events.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      {/* Pipeline Visualization */}
      <Card>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-6">Pipeline Flow</h2>
        <div className="space-y-1">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <div key={stage.id}>
                <div className="flex items-center gap-4 p-3 rounded hover:bg-sona-stone-100 transition-colors">
                  {/* Stage info */}
                  <div className="w-44 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-sona-stone-100">
                        <Icon className="w-4 h-4 text-sona-teal" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-sona-dark-teal">{stage.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bar visualization */}
                  <div className="flex-1">
                    <div className="flex h-8 rounded overflow-hidden bg-sona-stone-100">
                      {stage.segments.map((seg, i) => (
                        <div
                          key={i}
                          className={cn('h-full flex items-center justify-center text-xs font-medium text-white transition-all relative group', seg.color)}
                          style={{ width: `${(seg.value / maxWidth) * 100}%` }}
                          title={`${seg.label}: ${seg.value}`}
                        >
                          {seg.value >= 5 && (
                            <span className="text-[11px] ">{seg.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="w-80 shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {stage.segments.map((seg, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-xs text-sona-stone-400">
                          <span className={cn('w-2 h-2 rounded-sm', seg.color)} />
                          {seg.label}: {seg.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {idx < pipelineStages.length - 1 && (
                  <div className="flex items-center pl-[76px]">
                    <ArrowDown className="w-4 h-4 text-sona-border" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Task Manager + Follow-up Tracker */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Task Manager */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-sona-dark-teal">Post-Event Tasks</h2>
            <div className="flex items-center gap-2 text-xs text-sona-stone-400">
              <span className="text-sona-teal font-medium">{taskStates.filter((s) => s === 'complete').length}</span> complete
              <span className="mx-1">/</span>
              <span className="text-amber-600 font-medium">{taskStates.filter((s) => s === 'in-progress').length}</span> in progress
              <span className="mx-1">/</span>
              <span className="font-medium">{taskStates.filter((s) => s === 'pending').length}</span> pending
            </div>
          </div>
          <div className="space-y-1">
            {tasks.map((task, idx) => {
              const status = taskStates[idx]
              const config = taskStatusConfig[status]
              return (
                <button
                  key={task.id}
                  onClick={() => toggleTask(idx)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded text-left transition-colors',
                    'hover:bg-sona-stone-100/50',
                    status === 'complete' && 'opacity-60'
                  )}
                >
                  {status === 'complete' ? (
                    <CheckCircle2 className="w-4 h-4 text-sona-teal shrink-0" />
                  ) : status === 'in-progress' ? (
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-sona-stone-400 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      'text-sm',
                      status === 'complete' ? 'text-sona-stone-400 line-through' : 'text-sona-dark-teal'
                    )}>
                      {task.task}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-sona-stone-400">{task.owner}</span>
                    <Badge variant={config.variant} className="text-[10px]">{config.label}</Badge>
                    <span className="text-xs text-sona-stone-400 w-14 text-right">{task.dueDate}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Follow-up Tracker */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-sona-dark-teal">Follow-up Tracker</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-teal-500" /> Contacted</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-500" /> Pending</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500" /> Overdue</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sona-stone-200">
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-3">BDR</th>
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-3">Contact</th>
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-3">Company</th>
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-3">Status</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-3">Days</th>
                </tr>
              </thead>
              <tbody>
                {followUpContacts.map((c) => {
                  const config = statusConfig[c.status as keyof typeof statusConfig]
                  return (
                    <tr key={c.id} className="border-b border-sona-stone-200 last:border-0 hover:bg-sona-stone-100 transition-colors">
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={c.bdr} size="sm" />
                          <span className="text-xs text-sona-stone-400">{c.bdr.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3 text-sm text-sona-dark-teal">{c.contact}</td>
                      <td className="py-2.5 pr-3 text-sm text-sona-stone-400">{c.company}</td>
                      <td className="py-2.5 pr-3">
                        <Badge variant={config.variant} dot>{c.status}</Badge>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={cn(
                          'text-xs font-medium',
                          c.status === 'Overdue' ? 'text-red-600' : 'text-sona-stone-400'
                        )}>
                          {c.daysSinceEvent}d
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
