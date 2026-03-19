'use client'

import { useState } from 'react'
import {
  Phone,
  Video,
  ChevronDown,
  Target,
  MessageSquare,
  Shield,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  XCircle,
  Mic,
  TrendingUp,
  Lightbulb,
  Users,
  Building2,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { cn } from '@/lib/utils'

const upcomingMeetings = [
  {
    id: 'meeting-1',
    label: 'Wagamama Discovery - March 25',
    account: 'Wagamama',
    stage: 'S2-Discovery',
    contacts: ['Marcus Webb (COO)', 'James Liu (IT Director)'],
    objectives: [
      'Quantify the scheduling overhead across 150+ sites to build ROI case',
      'Map the buying committee — identify CFO engagement path',
      'Understand Deputy limitations and migration concerns',
    ],
    questions: [
      'What does your current scheduling process look like across 150+ sites?',
      'How much time does each site manager spend on scheduling per week?',
      'What was the tipping point that made you look beyond Deputy?',
      'Who else in the business would need to sign off on a platform change?',
      'What does a successful first 90 days look like for you with a new system?',
    ],
    objections: [
      {
        objection: '"We\'re not sure we have budget until H2"',
        response: 'Understood. Many of our clients start with a scoping phase in Q2 so they can present a fully costed business case for H2 budget approval. Shall we work on the numbers together?',
      },
      {
        objection: '"Deputy is fine for most sites, it\'s just the bigger ones that struggle"',
        response: 'That\'s a common pattern. The issue is that complexity compounds — what\'s manageable at 80 sites becomes critical at 150+. We can show you exactly where the scaling breaks happen.',
      },
      {
        objection: '"We don\'t want to disrupt operations during peak season"',
        response: 'We hear that a lot. Our phased rollout approach means you can go live with 5-10 pilot sites first, learn, then scale. Loungers did exactly this and saw zero disruption.',
      },
    ],
    assets: [
      { name: 'Loungers Case Study — Hospitality Scheduling', type: 'Case Study' },
      { name: 'Deputy to Sona Migration Guide', type: 'Migration Guide' },
      { name: 'ROI Calculator — Multi-Site Hospitality', type: 'Tool' },
    ],
  },
  {
    id: 'meeting-2',
    label: 'Barchester Deep Dive - March 22',
    account: 'Barchester Healthcare',
    stage: 'S2-Discovery',
    contacts: ['Patricia Holmes (Group HR Director)', 'Steve Clarke (Regional Director)'],
    objectives: [
      'Map the full decision process including procurement RFP timeline',
      'Understand Allocate pain points in detail for displacement strategy',
      'Get Patricia to commit to a technical evaluation workshop',
    ],
    questions: [
      'How does Allocate currently handle CQC compliance reporting across your 250+ homes?',
      'What does the procurement process look like for a platform change of this scale?',
      'How are your regional directors currently handling scheduling exceptions?',
      'What would a successful pilot look like for Barchester?',
      'What is the Allocate contract renewal timeline, and what would it take to not renew?',
    ],
    objections: [
      {
        objection: '"Allocate is embedded across all our homes — switching cost is huge"',
        response: 'We\'ve migrated providers with 200+ homes before. Our dedicated migration team handles data transfer, staff training, and parallel running. The typical switchover takes 6-8 weeks per region.',
      },
      {
        objection: '"We need to go through an RFP process"',
        response: 'Absolutely. We\'re experienced with formal procurement. We can provide your team with all the documentation needed for the RFP, including security assessments, compliance certifications, and reference contacts.',
      },
      {
        objection: '"We\'re worried about staff adoption — our carers aren\'t tech-savvy"',
        response: 'This is exactly where Sona shines. Our mobile-first design was tested with frontline care staff. At Caring Homes, we achieved 89% adoption in the first 4 weeks. The app is simpler than WhatsApp.',
      },
    ],
    assets: [
      { name: 'Allocate Displacement Battle Card', type: 'Battle Card' },
      { name: 'Social Care Compliance One-Pager', type: 'One-Pager' },
      { name: 'Barchester-Specific ROI Projections', type: 'ROI Model' },
    ],
  },
  {
    id: 'meeting-3',
    label: 'Caring Homes Validation - March 20',
    account: 'Caring Homes',
    stage: 'S3-Solution',
    contacts: ['John Peters (Managing Director)', 'Sarah Chen (Operations Manager)'],
    objectives: [
      'Validate the solution design meets all CQC requirements',
      'Confirm the business case numbers Sarah will present to the board',
      'Secure verbal commitment to proceed pending board approval',
    ],
    questions: [
      'Does the solution we\'ve designed cover all your CQC compliance requirements?',
      'Are there any gaps in the ROI model we built together?',
      'What questions do you expect the board to ask on Monday?',
      'Is there anything that could derail the board decision?',
      'What does the implementation timeline look like from your side?',
    ],
    objections: [
      {
        objection: '"The board might want to see a competitor comparison"',
        response: 'Happy to provide that. We can put together a detailed feature comparison against CoolCare and any other systems they want to evaluate. We\'re confident in a side-by-side.',
      },
      {
        objection: '"We might need a longer pilot period"',
        response: 'We\'re flexible on pilot duration. 3 months is standard, but we can extend to 6 months with a clear success criteria framework. The key is defining what "success" means upfront.',
      },
      {
        objection: '"Finance Director wants to see payback within 12 months"',
        response: 'Based on the numbers we\'ve modelled, you\'re looking at an 8-month payback with agency cost reduction alone. Add scheduling efficiency gains and it\'s closer to 6 months.',
      },
    ],
    assets: [
      { name: 'Caring Homes — Custom ROI Analysis', type: 'ROI Model' },
      { name: 'CoolCare vs Sona Feature Comparison', type: 'Battle Card' },
      { name: 'Board Presentation Template', type: 'Presentation' },
    ],
  },
]

const pastCalls = [
  {
    id: 'call-1',
    label: 'Burger King Demo - March 14',
    discoveryDepth: 78,
    talkRatio: { ae: 35, prospect: 65 },
    nextStepsCommitted: true,
    meddicBefore: { metrics: 'medium', economic_buyer: 'low', decision_criteria: 'medium', decision_process: 'none', identify_pain: 'high', champion: 'high' },
    meddicAfter: { metrics: 'high', economic_buyer: 'medium', decision_criteria: 'high', decision_process: 'low', identify_pain: 'high', champion: 'high' },
    coaching: [
      'Great job digging into the scheduling pain — you quantified the cost impact effectively (£2.1M annual overhead)',
      'Strong demo flow. Tom Reynolds was visibly engaged throughout the multi-site management section.',
      'Consider asking about the decision process earlier — you only covered it in the last 5 minutes.',
      'The ROI slide landed well. Next time, try asking the prospect to validate the numbers rather than presenting them.',
    ],
  },
  {
    id: 'call-2',
    label: 'Loungers Proposal Review - March 13',
    discoveryDepth: 85,
    talkRatio: { ae: 30, prospect: 70 },
    nextStepsCommitted: true,
    meddicBefore: { metrics: 'high', economic_buyer: 'medium', decision_criteria: 'high', decision_process: 'medium', identify_pain: 'high', champion: 'high' },
    meddicAfter: { metrics: 'high', economic_buyer: 'high', decision_criteria: 'high', decision_process: 'high', identify_pain: 'high', champion: 'high' },
    coaching: [
      'Excellent call. You let the CFO lead the conversation, which built trust and uncovered new budget details.',
      'Rachel Green (champion) set up the intro to legal perfectly — great multi-threading.',
      'Your handling of the payroll integration question was spot-on with the Sage-specific example.',
      'This is a model call — use this recording as training material for the team.',
    ],
  },
  {
    id: 'call-3',
    label: 'Tortilla Discovery - March 5',
    discoveryDepth: 42,
    talkRatio: { ae: 55, prospect: 45 },
    nextStepsCommitted: false,
    meddicBefore: { metrics: 'none', economic_buyer: 'none', decision_criteria: 'none', decision_process: 'none', identify_pain: 'low', champion: 'none' },
    meddicAfter: { metrics: 'low', economic_buyer: 'none', decision_criteria: 'low', decision_process: 'none', identify_pain: 'medium', champion: 'low' },
    coaching: [
      'You talked 55% of the call — try to keep it below 40% in discovery. The prospect needs more space to share.',
      'Good identification of the Harri shift-swapping frustration, but you jumped to solution too quickly.',
      'No economic buyer identified and no committed next step — these are critical gaps to address.',
      'Try starting the next call with "Last time you mentioned shift-swapping issues — can you tell me more about the business impact?"',
    ],
  },
]

const confidenceLabelMap: Record<string, string> = {
  metrics: 'M', economic_buyer: 'E', decision_criteria: 'D',
  decision_process: 'D', identify_pain: 'I', champion: 'C',
}

export default function DiscoveryCoachPage() {
  const [activeTab, setActiveTab] = useState<'pre-call' | 'post-call'>('pre-call')
  const [selectedMeeting, setSelectedMeeting] = useState(upcomingMeetings[0].id)
  const [selectedCall, setSelectedCall] = useState(pastCalls[0].id)

  const meeting = upcomingMeetings.find((m) => m.id === selectedMeeting)!
  const call = pastCalls.find((c) => c.id === selectedCall)!

  const depthColor = call.discoveryDepth >= 70 ? 'text-sona-teal' : call.discoveryDepth >= 40 ? 'text-amber-600' : 'text-red-600'
  const depthBg = call.discoveryDepth >= 70 ? 'border-emerald-400' : call.discoveryDepth >= 40 ? 'border-amber-400' : 'border-red-400'

  return (
    <div className="min-h-screen bg-sona-bg p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Discovery & Demo Coach</h1>
        <p className="text-sona-stone-400 mt-1">AI-powered call preparation and review</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-sona-stone-100 rounded p-1 w-fit">
        <button
          onClick={() => setActiveTab('pre-call')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition-colors',
            activeTab === 'pre-call' ? 'bg-white text-sona-dark-teal' : 'text-sona-stone-400 hover:text-sona-dark-teal'
          )}
        >
          <Phone className="w-4 h-4" /> Pre-Call Prep
        </button>
        <button
          onClick={() => setActiveTab('post-call')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition-colors',
            activeTab === 'post-call' ? 'bg-white text-sona-dark-teal' : 'text-sona-stone-400 hover:text-sona-dark-teal'
          )}
        >
          <Video className="w-4 h-4" /> Post-Call Review
        </button>
      </div>

      {/* Pre-Call Prep */}
      {activeTab === 'pre-call' && (
        <div className="space-y-5">
          {/* Meeting Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-sona-stone-400">Upcoming Meeting:</label>
            <div className="relative">
              <select
                value={selectedMeeting}
                onChange={(e) => setSelectedMeeting(e.target.value)}
                className="appearance-none bg-white border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 pr-10 focus:outline-none focus:border-sona-teal"
              >
                {upcomingMeetings.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sona-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Briefing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Account Context */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-sona-teal" />
                <h3 className="text-base font-semibold text-sona-dark-teal">Account Context</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-sona-stone-400">Company</span>
                  <span className="text-sona-dark-teal">{meeting.account}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sona-stone-400">Deal Stage</span>
                  <Badge variant="info">{meeting.stage}</Badge>
                </div>
                <div>
                  <span className="text-sona-stone-400 block mb-1.5">Key Contacts Attending</span>
                  <div className="space-y-1">
                    {meeting.contacts.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sona-teal" />
                        <span className="text-sona-dark-teal">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Call Objectives */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-sona-teal" />
                <h3 className="text-base font-semibold text-sona-dark-teal">Call Objectives</h3>
              </div>
              <div className="space-y-3">
                {meeting.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-sm bg-teal-500/20 text-sona-teal flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-sona-dark-teal">{obj}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Discovery Questions */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base font-semibold text-sona-dark-teal">Discovery Questions</h3>
              </div>
              <div className="space-y-3">
                {meeting.questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded bg-sona-stone-100">
                    <span className="text-xs text-cyan-600 font-mono mt-0.5">Q{i + 1}</span>
                    <p className="text-sm text-sona-dark-teal">&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Potential Objections */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-semibold text-sona-dark-teal">Potential Objections</h3>
              </div>
              <div className="space-y-4">
                {meeting.objections.map((obj, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-sm font-medium text-amber-600">{obj.objection}</p>
                    <p className="text-sm text-sona-dark-teal pl-3 border-l-2 border-sona-teal">{obj.response}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Relevant Assets */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-violet-600" />
              <h3 className="text-base font-semibold text-sona-dark-teal">Relevant Assets</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {meeting.assets.map((asset, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded bg-sona-stone-100 hover:bg-sona-stone-100 cursor-pointer transition-colors">
                  <FileText className="w-4 h-4 text-sona-teal shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-sona-dark-teal truncate">{asset.name}</p>
                    <p className="text-xs text-sona-stone-400">{asset.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Post-Call Review */}
      {activeTab === 'post-call' && (
        <div className="space-y-5">
          {/* Call Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-sona-stone-400">Past Call:</label>
            <div className="relative">
              <select
                value={selectedCall}
                onChange={(e) => setSelectedCall(e.target.value)}
                className="appearance-none bg-white border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 pr-10 focus:outline-none focus:border-sona-teal"
              >
                {pastCalls.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sona-stone-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {/* Discovery Depth Score */}
            <Card className="flex flex-col items-center justify-center">
              <p className="text-sm text-sona-stone-400 mb-3">Discovery Depth</p>
              <div className={cn('relative w-28 h-28 rounded-sm border-4 flex items-center justify-center', depthBg)}>
                <div className="text-center">
                  <span className={cn('text-3xl font-bold', depthColor)}>{call.discoveryDepth}</span>
                  <span className={cn('text-sm', depthColor)}>/100</span>
                </div>
              </div>
              <Badge
                variant={call.discoveryDepth >= 70 ? 'success' : call.discoveryDepth >= 40 ? 'warning' : 'danger'}
                className="mt-3"
              >
                {call.discoveryDepth >= 70 ? 'Strong' : call.discoveryDepth >= 40 ? 'Moderate' : 'Needs Work'}
              </Badge>
            </Card>

            {/* Talk Ratio */}
            <Card className="flex flex-col justify-center">
              <p className="text-sm text-sona-stone-400 mb-3 flex items-center gap-2">
                <Mic className="w-4 h-4" /> Talk Ratio
              </p>
              <div className="w-full h-8 rounded overflow-hidden flex">
                <div
                  className={cn('h-full flex items-center justify-center text-xs font-medium', call.talkRatio.ae > 45 ? 'bg-red-500' : 'bg-sona-dark-teal')}
                  style={{ width: `${call.talkRatio.ae}%` }}
                >
                  AE {call.talkRatio.ae}%
                </div>
                <div className="h-full bg-teal-500 flex items-center justify-center text-xs font-medium text-white" style={{ width: `${call.talkRatio.prospect}%` }}>
                  Prospect {call.talkRatio.prospect}%
                </div>
              </div>
              <p className={cn('text-xs mt-2', call.talkRatio.ae <= 40 ? 'text-sona-teal' : 'text-amber-600')}>
                {call.talkRatio.ae <= 40 ? 'Good balance — prospect led' : 'Consider letting the prospect talk more'}
              </p>
            </Card>

            {/* Next Steps */}
            <Card className="flex flex-col justify-center">
              <p className="text-sm text-sona-stone-400 mb-3">Next Steps Committed</p>
              <div className="flex items-center gap-3">
                {call.nextStepsCommitted ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-sona-teal" />
                    <div>
                      <p className="text-lg font-bold text-sona-teal">Yes</p>
                      <p className="text-xs text-sona-stone-400">Clear next step agreed</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-10 h-10 text-red-600" />
                    <div>
                      <p className="text-lg font-bold text-red-600">No</p>
                      <p className="text-xs text-red-600">Action needed: schedule follow-up</p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* MEDDIC Progression */}
            <Card>
              <p className="text-sm text-sona-stone-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> MEDDIC Progression
              </p>
              <div className="space-y-2">
                {Object.keys(call.meddicBefore).map((field) => {
                  const before = call.meddicBefore[field as keyof typeof call.meddicBefore]
                  const after = call.meddicAfter[field as keyof typeof call.meddicAfter]
                  const levels = ['none', 'low', 'medium', 'high']
                  const beforeIdx = levels.indexOf(before)
                  const afterIdx = levels.indexOf(after)
                  const improved = afterIdx > beforeIdx
                  const same = afterIdx === beforeIdx

                  return (
                    <div key={field} className="flex items-center gap-2 text-sm">
                      <span className="w-4 font-bold text-sona-stone-400">{confidenceLabelMap[field]}</span>
                      <Badge variant={
                        before === 'high' ? 'success' : before === 'medium' ? 'warning' : before === 'low' ? 'danger' : 'default'
                      } className="text-[10px] w-14 justify-center">{before}</Badge>
                      {improved ? (
                        <ArrowUpRight className="w-4 h-4 text-sona-teal" />
                      ) : same ? (
                        <Minus className="w-4 h-4 text-sona-stone-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <Badge variant={
                        after === 'high' ? 'success' : after === 'medium' ? 'warning' : after === 'low' ? 'danger' : 'default'
                      } className="text-[10px] w-14 justify-center">{after}</Badge>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Coaching Suggestions */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-semibold text-sona-dark-teal">Coaching Suggestions</h3>
            </div>
            <div className="space-y-3">
              {call.coaching.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded bg-sona-stone-100">
                  <div className="w-6 h-6 rounded-sm bg-amber-500/20 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-sona-dark-teal">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
