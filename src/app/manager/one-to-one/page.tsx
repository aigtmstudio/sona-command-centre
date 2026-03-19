'use client'

import { useState } from 'react'
import StatCard from '@/components/shared/StatCard'
import Card from '@/components/shared/Card'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import Badge from '@/components/shared/Badge'
import { getAes, getBdrs, getTeamMember } from '@/data/team'
import { getDealsByAe } from '@/data/deals'
import { formatCurrency, cn } from '@/lib/utils'
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Phone,
  Mail,
  Calendar,
  Linkedin,
  Lightbulb,
  PlayCircle,
  MessageSquare,
} from 'lucide-react'

const aes = getAes()
const bdrs = getBdrs()
const allReports = [...bdrs, ...aes]

interface ActivityWeek {
  calls: number
  emails: number
  meetings: number
  linkedin: number
}

const activityData: Record<string, ActivityWeek[]> = {
  'ae-1': [
    { calls: 18, emails: 32, meetings: 6, linkedin: 8 },
    { calls: 22, emails: 28, meetings: 5, linkedin: 12 },
    { calls: 15, emails: 35, meetings: 7, linkedin: 6 },
    { calls: 20, emails: 30, meetings: 8, linkedin: 10 },
  ],
  'ae-2': [
    { calls: 14, emails: 25, meetings: 4, linkedin: 5 },
    { calls: 16, emails: 22, meetings: 5, linkedin: 7 },
    { calls: 12, emails: 28, meetings: 3, linkedin: 4 },
    { calls: 18, emails: 26, meetings: 6, linkedin: 8 },
  ],
  'ae-3': [
    { calls: 12, emails: 20, meetings: 5, linkedin: 4 },
    { calls: 10, emails: 18, meetings: 4, linkedin: 6 },
    { calls: 14, emails: 24, meetings: 6, linkedin: 5 },
    { calls: 11, emails: 22, meetings: 5, linkedin: 7 },
  ],
  'ae-4': [
    { calls: 8, emails: 15, meetings: 3, linkedin: 2 },
    { calls: 10, emails: 18, meetings: 2, linkedin: 4 },
    { calls: 7, emails: 12, meetings: 3, linkedin: 3 },
    { calls: 9, emails: 16, meetings: 4, linkedin: 5 },
  ],
  'bdr-1': [
    { calls: 45, emails: 38, meetings: 2, linkedin: 15 },
    { calls: 50, emails: 42, meetings: 1, linkedin: 18 },
    { calls: 38, emails: 35, meetings: 2, linkedin: 12 },
    { calls: 48, emails: 40, meetings: 1, linkedin: 16 },
  ],
  'bdr-2': [
    { calls: 42, emails: 35, meetings: 2, linkedin: 12 },
    { calls: 38, emails: 32, meetings: 3, linkedin: 14 },
    { calls: 44, emails: 38, meetings: 2, linkedin: 10 },
    { calls: 40, emails: 36, meetings: 1, linkedin: 15 },
  ],
  'bdr-3': [
    { calls: 30, emails: 25, meetings: 1, linkedin: 8 },
    { calls: 28, emails: 22, meetings: 1, linkedin: 6 },
    { calls: 32, emails: 28, meetings: 0, linkedin: 10 },
    { calls: 25, emails: 20, meetings: 2, linkedin: 7 },
  ],
  'bdr-4': [
    { calls: 55, emails: 45, meetings: 3, linkedin: 20 },
    { calls: 52, emails: 42, meetings: 2, linkedin: 18 },
    { calls: 58, emails: 48, meetings: 3, linkedin: 22 },
    { calls: 50, emails: 40, meetings: 1, linkedin: 19 },
  ],
}

const gongFlags: Record<string, { text: string; severity: 'high' | 'medium' | 'low' }[]> = {
  'ae-1': [
    { text: 'Low discovery depth on Burger King call (score: 42/100)', severity: 'high' },
    { text: 'Talk ratio 65% AE on Tortilla call — too high', severity: 'medium' },
    { text: 'No committed next steps on Barchester call', severity: 'high' },
  ],
  'ae-2': [
    { text: 'Strong discovery on Loungers call (score: 88/100)', severity: 'low' },
    { text: 'HC-One call had no pain confirmation questions', severity: 'medium' },
    { text: 'Pret call lacked competitive positioning', severity: 'medium' },
  ],
  'ae-3': [
    { text: 'Wagamama demo overran by 15 mins — tighten structure', severity: 'medium' },
    { text: 'Caring Homes call: excellent multi-threading questions', severity: 'low' },
    { text: 'Metropolitan Care: missed budget qualification opportunity', severity: 'high' },
  ],
  'ae-4': [
    { text: 'Five Guys discovery: only 2 open-ended questions asked', severity: 'high' },
    { text: 'Talk ratio 70% AE on intro call — needs improvement', severity: 'high' },
    { text: 'Good use of social proof in follow-up call', severity: 'low' },
  ],
  'bdr-1': [
    { text: 'Cold call opening: 3/5 calls had strong hooks', severity: 'low' },
    { text: 'Email personalisation score: 62/100 — room to improve', severity: 'medium' },
    { text: 'Burger King gatekeeper handling was excellent', severity: 'low' },
  ],
  'bdr-2': [
    { text: 'Voicemail messages need stronger CTA', severity: 'medium' },
    { text: 'LinkedIn outreach getting strong response rates', severity: 'low' },
    { text: 'Tortilla follow-up cadence too slow (5 days between touches)', severity: 'medium' },
  ],
  'bdr-3': [
    { text: 'Call volume below team average — consistency needed', severity: 'high' },
    { text: 'Email open rates strong but reply rate below 5%', severity: 'medium' },
    { text: 'Needs to improve objection handling on pricing queries', severity: 'high' },
  ],
  'bdr-4': [
    { text: 'Excellent multi-channel sequencing pattern', severity: 'low' },
    { text: "Nando's outreach: strong research-led messaging", severity: 'low' },
    { text: 'Should use more vertical-specific case studies in emails', severity: 'medium' },
  ],
}

const lastOneToOneActions: Record<string, { text: string; done: boolean }[]> = {
  'ae-1': [
    { text: 'Follow up with Barchester HR Director', done: false },
    { text: 'Update Tortilla MEDDIC fields', done: false },
    { text: 'Send Burger King proposal deck for review', done: true },
    { text: 'Schedule Nando\'s discovery prep with BDR', done: true },
  ],
  'ae-2': [
    { text: 'Chase Loungers legal team on contract review', done: true },
    { text: 'Prepare HC-One multi-threading strategy', done: false },
    { text: 'Update Pret pipeline value after discovery', done: false },
    { text: 'Complete Loungers ROI calculator', done: true },
  ],
  'ae-3': [
    { text: 'Book second demo for Wagamama with IT lead', done: true },
    { text: 'Send Metropolitan Care pilot proposal', done: false },
    { text: 'Update Caring Homes close date in HubSpot', done: true },
    { text: 'Review Wagamama competitive positioning', done: false },
  ],
  'ae-4': [
    { text: 'Complete discovery prep for Five Guys', done: false },
    { text: 'Attend MEDDIC training session', done: true },
    { text: 'Shadow James on a Loungers call', done: false },
    { text: 'Read Planday competitive battle card', done: true },
  ],
  'bdr-1': [
    { text: 'Increase daily call volume to 50+', done: false },
    { text: 'Personalise Burger King email sequence', done: true },
    { text: 'Research Nando\'s org chart', done: true },
    { text: 'Book 3 meetings this week minimum', done: false },
  ],
  'bdr-2': [
    { text: 'Tighten follow-up cadence to 2 days max', done: false },
    { text: 'Complete LinkedIn outreach for Tortilla contacts', done: true },
    { text: 'Share Five Guys intel with David', done: true },
    { text: 'Hit 10 meetings this month target', done: false },
  ],
  'bdr-3': [
    { text: 'Attend objection handling workshop', done: false },
    { text: 'Increase daily call volume to 40+', done: false },
    { text: 'Review email templates with Ollie', done: true },
    { text: 'Book 2 social care vertical meetings', done: true },
  ],
  'bdr-4': [
    { text: 'Use vertical case studies in 80%+ of emails', done: false },
    { text: 'Complete competitive intel quiz', done: true },
    { text: 'Maintain 50+ calls per day streak', done: true },
    { text: 'Mentor Thomas on cold calling technique', done: true },
  ],
}

const coachingSuggestions: Record<string, { title: string; description: string }[]> = {
  'ae-1': [
    { title: 'Improve Discovery Depth', description: 'Sarah\'s Burger King call scored 42/100 on discovery. Suggest practising the "3 Whys" technique to uncover deeper pain before jumping to solutions.' },
    { title: 'Balance Talk Ratio', description: 'Talk ratio is trending high (65%). Coach on active listening and using open-ended questions to let prospects share more.' },
    { title: 'Next Steps Discipline', description: 'Two recent calls ended without committed next steps. Reinforce the habit of locking in dates before ending every call.' },
  ],
  'ae-2': [
    { title: 'Multi-Threading Strategy', description: 'HC-One and Pret are both single-threaded. James should map stakeholders and plan multi-thread approach for both accounts.' },
    { title: 'Competitive Positioning', description: 'Pret call lacked competitive angles. Review Fourth displacement playbook together and role-play key differentiators.' },
    { title: 'Build on Loungers Success', description: 'The Loungers approach has been exemplary — use this as a case study for how James approaches the earlier-stage deals.' },
  ],
  'ae-3': [
    { title: 'Demo Time Management', description: 'Wagamama demo overran by 15 minutes. Work on structuring demos with clear time blocks and agenda upfront.' },
    { title: 'Budget Qualification', description: 'Metropolitan Care call missed a budget qualification moment. Practice budget conversation frameworks before next call.' },
    { title: 'Celebrate Multi-Threading', description: 'Excellent work on Caring Homes stakeholder engagement. Share this approach with the wider team.' },
  ],
  'ae-4': [
    { title: 'Discovery Question Framework', description: 'David asked only 2 open-ended questions in the Five Guys call. Review SPIN questioning technique and prepare a discovery script.' },
    { title: 'Reduce Talk Ratio', description: '70% talk ratio is significantly above target. Practice the "pause and listen" technique — aim for 40/60 split.' },
    { title: 'Build Pipeline Coverage', description: 'Pipeline coverage is lowest on the team. Work on prospecting strategy and coordinate with BDRs for more qualified meetings.' },
  ],
  'bdr-1': [
    { title: 'Email Personalisation', description: 'Personalisation score of 62/100 suggests room for more account-specific research. Spend 5 minutes per email researching the prospect.' },
    { title: 'Consistency Focus', description: 'Call volume fluctuates week to week. Establish a daily routine with fixed prospecting blocks.' },
    { title: 'Leverage Gatekeeper Skills', description: 'Max handles gatekeepers well — consider sharing techniques with Thomas who struggles here.' },
  ],
  'bdr-2': [
    { title: 'Follow-Up Cadence', description: '5-day gaps between touches is too long. Tighten to 2-day cadence to maintain momentum with prospects.' },
    { title: 'Voicemail Strategy', description: 'Voicemails need stronger CTAs. Practice 30-second voicemails with a clear reason for calling back.' },
    { title: 'Path to AE', description: 'Joey is performing well and shows AE potential. Discuss career development and shadowing opportunities.' },
  ],
  'bdr-3': [
    { title: 'Volume and Consistency', description: 'Thomas\'s call volume is the lowest on the team. Address any blockers and set incremental daily targets.' },
    { title: 'Objection Handling', description: 'Pricing objection handling needs work. Role-play the top 5 objections and practice responses.' },
    { title: 'Confidence Building', description: 'Focus on small wins to build confidence. Pair with Harry for a day of joint prospecting.' },
  ],
  'bdr-4': [
    { title: 'Case Study Usage', description: 'Harry\'s emails would convert better with more vertical-specific social proof. Build a quick-reference sheet of case studies by vertical.' },
    { title: 'Mentoring Role', description: 'Harry is a strong performer. Formalise a mentoring arrangement with Thomas to help lift the whole team.' },
    { title: 'Maintain Peak Performance', description: 'Harry is on track for a record month. Discuss what\'s working well and how to sustain it without burnout.' },
  ],
}

const bdrStats: Record<string, { meetings: number; callVolume: number; conversionRate: number }> = {
  'bdr-1': { meetings: 6, callVolume: 181, conversionRate: 3.3 },
  'bdr-2': { meetings: 8, callVolume: 164, conversionRate: 4.9 },
  'bdr-3': { meetings: 4, callVolume: 115, conversionRate: 3.5 },
  'bdr-4': { meetings: 9, callVolume: 215, conversionRate: 4.2 },
}

export default function OneToOnePage() {
  const [selectedId, setSelectedId] = useState('ae-1')
  const member = getTeamMember(selectedId)!
  const isAe = member.role === 'AE'
  const deals = isAe ? getDealsByAe(selectedId) : []
  const activities = activityData[selectedId] || []
  const flags = gongFlags[selectedId] || []
  const actions = lastOneToOneActions[selectedId] || []
  const suggestions = coachingSuggestions[selectedId] || []

  const maxActivity = Math.max(
    ...activities.flatMap((w) => [w.calls, w.emails, w.meetings * 5, w.linkedin])
  )

  const dealsWon = isAe ? Math.floor(Math.random() * 3) + 1 : 0
  const avgDealSize = isAe && deals.length > 0 ? deals.reduce((s, d) => s + d.value, 0) / deals.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
          <div className="p-2 rounded bg-purple-50">
            <Users className="w-6 h-6 text-violet-600" />
          </div>
          1:1 Prep &amp; Coaching Engine
        </h1>
        <p className="text-sona-stone-400 mt-1">Prepare data-driven 1:1s with your team</p>
      </div>

      <div className="flex gap-6">
        {/* Left Panel — Team Selector */}
        <div className="w-64 shrink-0 space-y-2">
          <h3 className="text-sm font-medium text-sona-stone-400 mb-3 uppercase tracking-wider">Your Reports</h3>
          {allReports.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setSelectedId(rep.id)}
              className={`w-full flex items-center gap-3 p-3 rounded border transition-all text-left ${
                selectedId === rep.id
                  ? 'bg-white border-teal-500/40'
                  : 'bg-white/50 border-sona-stone-200 hover:border-sona-stone-200 hover:bg-white'
              }`}
            >
              <Avatar name={rep.name} size="sm" />
              <div>
                <p className={`text-sm font-medium ${selectedId === rep.id ? 'text-sona-dark-teal' : 'text-sona-stone-400'}`}>
                  {rep.name}
                </p>
                <p className="text-xs text-sona-stone-400">{rep.role}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Panel — Prep Document */}
        <div className="flex-1 space-y-6">
          {/* Member Header */}
          <Card>
            <div className="flex items-center gap-4">
              <Avatar name={member.name} size="lg" />
              <div>
                <h2 className="text-xl font-bold text-sona-dark-teal">{member.name}</h2>
                <p className="text-sona-stone-400">{member.role} &middot; {member.team}</p>
              </div>
              <div className="ml-auto">
                <Badge variant="info">1:1 Prep</Badge>
              </div>
            </div>
          </Card>

          {/* Pipeline Health / BDR Stats */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sona-teal" />
              {isAe ? 'Pipeline Health' : 'Activity Summary'}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {isAe ? (
                <>
                  <StatCard
                    label="Current Pipeline"
                    value={formatCurrency(member.currentPipeline)}
                    change={8}
                    changeLabel="vs last month"
                  />
                  <StatCard
                    label="Deals Won This Quarter"
                    value={dealsWon}
                    change={dealsWon > 1 ? 50 : -25}
                    changeLabel="vs target"
                  />
                  <StatCard
                    label="Average Deal Size"
                    value={formatCurrency(Math.round(avgDealSize))}
                  />
                </>
              ) : (
                <>
                  <StatCard
                    label="Meetings Booked"
                    value={bdrStats[selectedId]?.meetings || member.meetingsBooked}
                    change={bdrStats[selectedId]?.meetings >= 8 ? 15 : -10}
                    changeLabel="vs target pace"
                  />
                  <StatCard
                    label="Call Volume (Month)"
                    value={bdrStats[selectedId]?.callVolume || 0}
                  />
                  <StatCard
                    label="Conversion Rate"
                    value={`${bdrStats[selectedId]?.conversionRate || 0}%`}
                    change={bdrStats[selectedId]?.conversionRate > 4 ? 8 : -5}
                    changeLabel="vs team avg"
                  />
                </>
              )}
            </div>
          </div>

          {/* Activity Trends */}
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sona-teal" />
              Activity Trends (Last 4 Weeks)
            </h3>
            <div className="grid grid-cols-4 gap-8">
              {[
                { key: 'calls' as const, label: 'Calls', icon: Phone, color: 'bg-sky-300' },
                { key: 'emails' as const, label: 'Emails', icon: Mail, color: 'bg-violet-300' },
                { key: 'meetings' as const, label: 'Meetings', icon: Calendar, color: 'bg-teal-300' },
                { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin, color: 'bg-sky-300' },
              ].map(({ key, label, icon: Icon, color }) => {
                const weekValues = activities.map((w) => w[key])
                const localMax = Math.max(...weekValues, 1)
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-3.5 h-3.5 text-sona-stone-400" strokeWidth={1.5} />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">{label}</span>
                    </div>
                    <div className="flex items-end gap-2" style={{ height: '100px' }}>
                      {activities.map((week, i) => {
                        const val = week[key]
                        const pct = (val / localMax) * 100
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <span className="font-mono text-[10px] text-sona-stone-400 mb-1">{val}</span>
                            <div className="w-full flex-1 flex flex-col justify-end">
                              <div
                                className={cn('w-full', color)}
                                style={{ height: `${Math.max(pct, 8)}%`, borderRadius: '2px' }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-sona-stone-400 mt-1">W{i + 1}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Target Progress */}
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3">Target Progress</h3>
            {isAe ? (
              <>
                <ProgressBar
                  value={member.currentPipeline}
                  max={member.quarterlyTarget}
                  label="Pipeline vs Quota"
                  showFraction
                  color={member.currentPipeline >= member.quarterlyTarget * 0.7 ? 'bg-sona-success' : 'bg-sona-warning'}
                  size="lg"
                />
                <p className={`text-sm mt-2 ${member.currentPipeline >= member.quarterlyTarget * 0.7 ? 'text-sona-success' : 'text-sona-warning'}`}>
                  {member.currentPipeline >= member.quarterlyTarget * 0.7
                    ? 'Ahead of pace — strong pipeline coverage'
                    : `Behind pace — needs ${formatCurrency(member.quarterlyTarget - member.currentPipeline)} more pipeline`}
                </p>
              </>
            ) : (
              <>
                <ProgressBar
                  value={member.meetingsBooked}
                  max={member.monthlyTarget}
                  label="Meetings vs Monthly Target"
                  showFraction
                  color={member.meetingsBooked >= member.monthlyTarget * 0.7 ? 'bg-sona-success' : 'bg-sona-warning'}
                  size="lg"
                />
                <p className={`text-sm mt-2 ${member.meetingsBooked >= member.monthlyTarget * 0.7 ? 'text-sona-success' : 'text-sona-warning'}`}>
                  {member.meetingsBooked >= member.monthlyTarget * 0.7
                    ? 'Ahead of pace — maintain momentum'
                    : `Behind pace — needs ${member.monthlyTarget - member.meetingsBooked} more meetings in 12 days`}
                </p>
              </>
            )}
          </Card>

          {/* Deal Risks (AEs only) */}
          {isAe && deals.length > 0 && (
            <Card>
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-sona-warning" />
                Deal Risks
              </h3>
              <div className="space-y-3">
                {deals.filter(d => d.risks.length > 0 || d.daysInStage > 15).map((deal) => (
                  <div key={deal.id} className="p-3 bg-sona-stone-100 rounded border border-sona-stone-200">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <span className="text-sona-dark-teal font-medium text-sm">{deal.name}</span>
                        <span className="text-sona-stone-400 text-sm ml-2">{formatCurrency(deal.value)}</span>
                      </div>
                      <Badge variant={deal.risks.some(r => r.severity === 'high') ? 'danger' : 'warning'}>
                        {deal.stage}
                      </Badge>
                    </div>
                    {deal.risks.map((risk, i) => (
                      <p key={i} className="text-sm text-sona-stone-400 mt-1">
                        <span className={risk.severity === 'high' ? 'text-red-600' : 'text-amber-600'}>!</span> {risk.description}
                      </p>
                    ))}
                    {deal.daysInStage > 15 && (
                      <p className="text-sm text-amber-600 mt-1">
                        Stalled {deal.daysInStage} days in {deal.stage}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Gong Coaching Flags */}
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-600" />
              Gong Coaching Flags
            </h3>
            <div className="space-y-2">
              {flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-sona-stone-100 rounded">
                  <div className={`w-2 h-2 rounded-sm mt-1.5 shrink-0 ${
                    flag.severity === 'high' ? 'bg-red-400' : flag.severity === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <span className="text-sm text-sona-stone-400">{flag.text}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions from Last 1:1 */}
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sona-teal" />
              Actions from Last 1:1
            </h3>
            <div className="space-y-2">
              {actions.map((action, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-sona-stone-100 rounded">
                  {action.done ? (
                    <CheckCircle2 className="w-4 h-4 text-sona-success shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-sona-stone-400 shrink-0" />
                  )}
                  <span className={`text-sm ${action.done ? 'text-sona-stone-400 line-through' : 'text-sona-dark-teal'}`}>
                    {action.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Coaching Suggestions */}
          <Card>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-sona-warning" />
              Coaching Suggestions
            </h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, i) => (
                <div key={i} className="p-3 bg-sona-stone-100 rounded border border-sona-stone-200">
                  <h4 className="text-sona-dark-teal font-medium text-sm mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-sona-stone-400">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Start 1:1 Button */}
          <button className="w-full py-3 bg-sona-dark-teal hover:bg-sona-dark-teal/90 text-white font-semibold rounded transition-colors flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Start 1:1
          </button>
        </div>
      </div>
    </div>
  )
}
