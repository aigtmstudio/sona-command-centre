'use client'

import { useState } from 'react'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Avatar from '@/components/shared/Avatar'
import Badge from '@/components/shared/Badge'
import { getAes, getBdrs } from '@/data/team'
import {
  ShieldCheck,
  AlertCircle,
  Clock,
  Copy,
  Link2,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const aes = getAes()
const bdrs = getBdrs()
const allReps = [...aes, ...bdrs]

interface RepHygiene {
  id: string
  name: string
  role: string
  score: number
  missingFields: number
  staleRecords: number
  duplicates: number
}

const repHygiene: RepHygiene[] = [
  { id: 'ae-1', name: 'Sarah Bennett', role: 'AE', score: 68, missingFields: 5, staleRecords: 2, duplicates: 1 },
  { id: 'ae-2', name: 'James Cooper', role: 'AE', score: 82, missingFields: 2, staleRecords: 1, duplicates: 0 },
  { id: 'ae-3', name: 'Priya Patel', role: 'AE', score: 78, missingFields: 3, staleRecords: 1, duplicates: 1 },
  { id: 'ae-4', name: 'David Kim', role: 'AE', score: 62, missingFields: 4, staleRecords: 2, duplicates: 0 },
  { id: 'bdr-1', name: 'Max Chen', role: 'BDR', score: 75, missingFields: 3, staleRecords: 0, duplicates: 0 },
  { id: 'bdr-2', name: 'Joey Palmer', role: 'BDR', score: 80, missingFields: 2, staleRecords: 1, duplicates: 0 },
  { id: 'bdr-3', name: 'Thomas Wright', role: 'BDR', score: 65, missingFields: 3, staleRecords: 1, duplicates: 1 },
  { id: 'bdr-4', name: 'Harry Morrison', role: 'BDR', score: 85, missingFields: 1, staleRecords: 0, duplicates: 0 },
]

interface HygieneIssue {
  id: string
  severity: 'high' | 'medium'
  memberId: string
  memberName: string
  issueType: 'Missing Field' | 'Stale Data' | 'Duplicate' | 'Attribution Gap'
  entityName: string
  description: string
  suggestedAction: string
}

const issues: HygieneIssue[] = [
  { id: '1', severity: 'high', memberId: 'ae-1', memberName: 'Sarah Bennett', issueType: 'Missing Field', entityName: 'Tortilla deal', description: 'Missing Economic Buyer field — no budget holder identified', suggestedAction: 'Completing this will strengthen your next deal review' },
  { id: '2', severity: 'high', memberId: 'ae-1', memberName: 'Sarah Bennett', issueType: 'Stale Data', entityName: 'Barchester deal', description: 'Close date passed without update — needs re-forecasting', suggestedAction: 'Updating this keeps your forecast accurate for the team' },
  { id: '3', severity: 'high', memberId: 'ae-4', memberName: 'David Kim', issueType: 'Missing Field', entityName: 'Five Guys deal', description: 'No MEDDIC fields populated — zero qualification data', suggestedAction: 'Even early notes help track deal progression over time' },
  { id: '4', severity: 'medium', memberId: 'ae-1', memberName: 'Sarah Bennett', issueType: 'Missing Field', entityName: 'Nando\'s deal', description: 'Missing next steps field — no committed action recorded', suggestedAction: 'Recording next steps helps the team follow up effectively' },
  { id: '5', severity: 'high', memberId: 'ae-3', memberName: 'Priya Patel', issueType: 'Attribution Gap', entityName: 'Wagamama deal', description: 'No marketing attribution source — campaign ROI untrackable', suggestedAction: 'Adding source helps the marketing team understand what\'s working' },
  { id: '6', severity: 'medium', memberId: 'ae-2', memberName: 'James Cooper', issueType: 'Stale Data', entityName: 'HC-One deal', description: 'Contact phone number marked as unverified for 30+ days', suggestedAction: 'A quick verify keeps your outreach channels reliable' },
  { id: '7', severity: 'medium', memberId: 'bdr-3', memberName: 'Thomas Wright', issueType: 'Duplicate', entityName: 'Anchor Hanover contact', description: 'David Brown appears as two separate contacts with different emails', suggestedAction: 'Merging duplicates prevents confusion in your outreach' },
  { id: '8', severity: 'medium', memberId: 'ae-1', memberName: 'Sarah Bennett', issueType: 'Missing Field', entityName: 'Burger King deal', description: 'Decision process notes incomplete — approval chain unclear', suggestedAction: 'This insight is critical for accurate close date forecasting' },
  { id: '9', severity: 'high', memberId: 'ae-4', memberName: 'David Kim', issueType: 'Missing Field', entityName: 'Five Guys contact', description: 'New HR Director contact missing LinkedIn URL and phone', suggestedAction: 'Complete contact details help with multi-channel outreach' },
  { id: '10', severity: 'medium', memberId: 'bdr-1', memberName: 'Max Chen', issueType: 'Attribution Gap', entityName: 'Burger King meeting', description: 'Meeting source not linked to outbound campaign', suggestedAction: 'Attribution tracking helps justify BDR investment to leadership' },
  { id: '11', severity: 'medium', memberId: 'ae-3', memberName: 'Priya Patel', issueType: 'Stale Data', entityName: 'Metropolitan Care deal', description: 'Last activity 11 days ago — engagement trending cold', suggestedAction: 'A quick check-in email keeps the relationship warm' },
  { id: '12', severity: 'high', memberId: 'ae-4', memberName: 'David Kim', issueType: 'Attribution Gap', entityName: 'Five Guys opportunity', description: 'Lead source marked as "unknown" — cannot attribute to channel', suggestedAction: 'Ask the BDR how this lead was generated and update the source' },
  { id: '13', severity: 'medium', memberId: 'bdr-2', memberName: 'Joey Palmer', issueType: 'Stale Data', entityName: 'Tortilla contact', description: 'Lisa Park email bounced — needs updated contact info', suggestedAction: 'Check LinkedIn for an updated email or find an alternative contact' },
  { id: '14', severity: 'medium', memberId: 'ae-3', memberName: 'Priya Patel', issueType: 'Duplicate', entityName: 'Caring Homes contact', description: 'Sarah Chen exists as two records with slightly different spellings', suggestedAction: 'Merge these to maintain a clean timeline of interactions' },
  { id: '15', severity: 'medium', memberId: 'bdr-3', memberName: 'Thomas Wright', issueType: 'Missing Field', entityName: 'New lead', description: 'Three new contacts added without company size or vertical tags', suggestedAction: 'Enriching leads upfront helps with routing and prioritisation' },
]

const weeklyTrend = [
  { week: 'W1', score: 68, change: 0 },
  { week: 'W2', score: 71, change: 3 },
  { week: 'W3', score: 70, change: -1 },
  { week: 'W4', score: 74, change: 4 },
]

type SortField = 'score' | 'missingFields' | 'staleRecords' | 'duplicates'
type SortDir = 'asc' | 'desc'

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-sona-success'
  if (score >= 70) return 'text-sona-warning'
  return 'text-sona-danger'
}

function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-teal-50'
  if (score >= 70) return 'bg-amber-50'
  return 'bg-red-50'
}

function getIssueTypeBadge(type: HygieneIssue['issueType']): 'danger' | 'warning' | 'purple' | 'info' {
  switch (type) {
    case 'Missing Field': return 'danger'
    case 'Stale Data': return 'warning'
    case 'Duplicate': return 'purple'
    case 'Attribution Gap': return 'info'
  }
}

export default function DataHygienePage() {
  const [sortField, setSortField] = useState<SortField>('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir(field === 'score' ? 'desc' : 'asc')
    }
  }

  const sortedReps = [...repHygiene].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    return (a[sortField] - b[sortField]) * mul
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 text-sona-stone-400/50" />
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-sona-teal" /> : <ChevronDown className="w-3 h-3 text-sona-teal" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
          <div className="p-2 rounded bg-teal-50">
            <ShieldCheck className="w-6 h-6 text-sona-teal" />
          </div>
          CRM &amp; Data Hygiene Monitor
        </h1>
        <p className="text-sona-stone-400 mt-1">Track and improve data quality across the team</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Overall Score" value="74%" change={4} changeLabel="vs last week" icon={ShieldCheck} iconColor="text-sona-teal" />
        <StatCard label="Missing Fields" value="23" change={-3} changeLabel="vs last week" icon={AlertCircle} iconColor="text-red-600" />
        <StatCard label="Stale Records" value="8" change={-2} changeLabel="resolved this week" icon={Clock} iconColor="text-amber-600" />
        <StatCard label="Duplicates" value="3" icon={Copy} iconColor="text-violet-600" />
        <StatCard label="Attribution Gaps" value="5" change={1} changeLabel="new this week" icon={Link2} iconColor="text-sona-dark-teal" />
      </div>

      {/* By Rep Table */}
      <Card>
        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">By Rep Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sona-stone-200">
                <th className="text-left text-xs text-sona-stone-400 font-medium py-3 px-3">Rep</th>
                <th className="text-center text-xs text-sona-stone-400 font-medium py-3 px-3 cursor-pointer hover:text-sona-dark-teal" onClick={() => handleSort('score')}>
                  <span className="inline-flex items-center gap-1">Hygiene Score <SortIcon field="score" /></span>
                </th>
                <th className="text-center text-xs text-sona-stone-400 font-medium py-3 px-3 cursor-pointer hover:text-sona-dark-teal" onClick={() => handleSort('missingFields')}>
                  <span className="inline-flex items-center gap-1">Missing Fields <SortIcon field="missingFields" /></span>
                </th>
                <th className="text-center text-xs text-sona-stone-400 font-medium py-3 px-3 cursor-pointer hover:text-sona-dark-teal" onClick={() => handleSort('staleRecords')}>
                  <span className="inline-flex items-center gap-1">Stale Records <SortIcon field="staleRecords" /></span>
                </th>
                <th className="text-center text-xs text-sona-stone-400 font-medium py-3 px-3 cursor-pointer hover:text-sona-dark-teal" onClick={() => handleSort('duplicates')}>
                  <span className="inline-flex items-center gap-1">Duplicates <SortIcon field="duplicates" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReps.map((rep) => (
                <tr key={rep.id} className="border-b border-sona-stone-200 hover:bg-sona-stone-100/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={rep.name} size="sm" />
                      <div>
                        <p className="text-sm text-sona-dark-teal font-medium">{rep.name}</p>
                        <p className="text-xs text-sona-stone-400">{rep.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center justify-center w-12 h-7 rounded-sm text-sm font-bold ${getScoreColor(rep.score)} ${getScoreBg(rep.score)}`}>
                      {rep.score}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm ${rep.missingFields > 3 ? 'text-red-600 font-medium' : 'text-sona-stone-400'}`}>
                      {rep.missingFields}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm ${rep.staleRecords > 1 ? 'text-amber-600 font-medium' : 'text-sona-stone-400'}`}>
                      {rep.staleRecords}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm ${rep.duplicates > 0 ? 'text-violet-600 font-medium' : 'text-sona-stone-400'}`}>
                      {rep.duplicates}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Issue Feed + Weekly Trend */}
      <div className="grid grid-cols-3 gap-6">
        {/* Issue Feed */}
        <div className="col-span-2">
          <Card className="h-full">
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-sona-warning" />
              Issue Feed
              <span className="text-xs text-sona-stone-400 font-normal ml-1">({issues.length} issues)</span>
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {issues.map((issue) => (
                <div key={issue.id} className="p-3 bg-sona-stone-100 rounded border border-sona-stone-200">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${issue.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={issue.memberName} size="sm" />
                          <span className="text-xs text-sona-dark-teal font-medium">{issue.memberName}</span>
                        </div>
                        <Badge variant={getIssueTypeBadge(issue.issueType)}>{issue.issueType}</Badge>
                        <span className="text-xs text-sona-teal font-medium">{issue.entityName}</span>
                      </div>
                      <p className="text-sm text-sona-stone-400">{issue.description}</p>
                      <p className="text-xs text-sona-teal/80 mt-1 italic">{issue.suggestedAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Trend */}
        <div>
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Weekly Trend</h3>
            <div className="space-y-3">
              {weeklyTrend.map((week) => (
                <div key={week.week} className={`p-4 rounded border ${getScoreBg(week.score)} border-sona-stone-200`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sona-stone-400 font-medium">{week.week}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getScoreColor(week.score)}`}>{week.score}%</span>
                      {week.change > 0 ? (
                        <span className="flex items-center text-xs text-sona-success">
                          <ArrowUp className="w-3 h-3" />+{week.change}
                        </span>
                      ) : week.change < 0 ? (
                        <span className="flex items-center text-xs text-sona-danger">
                          <ArrowDown className="w-3 h-3" />{week.change}
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-sona-stone-400">
                          <Minus className="w-3 h-3" />0
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-2 w-full h-2 bg-sona-stone-100 rounded-sm overflow-hidden">
                    <div
                      className={`h-full rounded-sm transition-all ${week.score >= 80 ? 'bg-teal-500' : week.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${week.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
