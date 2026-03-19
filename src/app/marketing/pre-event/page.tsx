'use client'

import { useState } from 'react'
import {
  Upload,
  Users,
  Crown,
  Star,
  ChevronDown,
  ChevronUp,
  Building2,
  Target,
  MessageSquare,
  Award,
  CheckCircle2,
  XCircle,
  MapPin,
  Briefcase,
  FileText,
  Lightbulb,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import Tabs from '@/components/shared/Tabs'
import { cn } from '@/lib/utils'

const events = [
  { id: 'evt-1', name: 'AI for Frontline Workforce Webinar', date: 'Mar 28, 2026' },
  { id: 'evt-2', name: 'Hospitality Leaders Summit', date: 'Apr 10, 2026' },
  { id: 'evt-3', name: 'Social Care Innovation Conference', date: 'May 15, 2026' },
]

interface Delegate {
  id: string
  name: string
  company: string
  role: string
  employeeCount: number
  vertical: string
  icpScore: number
  tier: 1 | 2 | 3
  inCRM: boolean
  briefing: {
    context: string
    painPoints: string[]
    conversationOpeners: string[]
    proofPoints: string[]
  }
}

const delegates: Delegate[] = [
  // Tier 1 - ICP match, high priority (8)
  {
    id: 'd-1', name: 'James Whitfield', company: 'Nando\'s UK', role: 'Chief Operating Officer', employeeCount: 8500,
    vertical: 'Hospitality', icpScore: 95, tier: 1, inCRM: true,
    briefing: {
      context: 'Nando\'s is undergoing a digital transformation of restaurant operations. Currently using Fourth for scheduling but experiencing significant support issues and UI frustration.',
      painPoints: ['Manager time spent on scheduling exceeds 8 hours/week per location', 'Fourth support tickets averaging 72+ hour resolution', 'Agency costs up 23% YoY due to scheduling inefficiencies'],
      conversationOpeners: ['Ask about their digital transformation roadmap for 2026', 'Reference the recent restaurant expansion plans and staffing challenges', 'Discuss how AI scheduling is helping similar QSR chains reduce agency spend by 30%'],
      proofPoints: ['Loungers migrated from Fourth in 6 weeks with zero scheduling downtime', 'Wagamama reduced agency costs by 31% in first quarter on Sona'],
    },
  },
  {
    id: 'd-2', name: 'Sarah Mitchell', company: 'Pizza Hut UK', role: 'VP People & Culture', employeeCount: 6200,
    vertical: 'Hospitality', icpScore: 92, tier: 1, inCRM: false,
    briefing: {
      context: 'Pizza Hut UK recently announced a cost reduction program. Their workforce management is fragmented across multiple legacy systems.',
      painPoints: ['Fragmented WFM systems across 300+ locations', 'Compliance concerns with WTD regulations across part-time staff', 'High turnover rate (180%) driving constant onboarding overhead'],
      conversationOpeners: ['Reference their recent cost reduction announcement and how workforce optimisation fits', 'Ask about their biggest challenge managing part-time workforce compliance', 'Discuss how unified scheduling reduces manager admin by 60%'],
      proofPoints: ['Burger King UK consolidated 3 scheduling tools into Sona in 8 weeks', 'Our mobile app rated 4.7 stars — staff adoption typically hits 90% in week 1'],
    },
  },
  {
    id: 'd-3', name: 'David Chen', company: 'Compass Group UK', role: 'Director of Operations', employeeCount: 12000,
    vertical: 'Hospitality', icpScore: 91, tier: 1, inCRM: true,
    briefing: {
      context: 'Compass Group is the UK\'s largest contract catering company. They\'re reviewing their workforce management stack as part of a broader procurement exercise.',
      painPoints: ['Managing 12,000+ employees across hundreds of client sites', 'Current system lacks mobile-first capability for frontline staff', 'Payroll integration issues causing late payments and staff dissatisfaction'],
      conversationOpeners: ['Ask about their procurement timeline and key decision criteria', 'Reference the mobile-first challenge — our app handles multi-site staff seamlessly', 'Discuss how AI-powered demand forecasting reduces over/under-staffing'],
      proofPoints: ['Multi-site clients see 25% reduction in scheduling admin', 'Real-time payroll sync eliminates late payment issues'],
    },
  },
  {
    id: 'd-4', name: 'Emma Richardson', company: 'Whitbread', role: 'Head of Workforce Planning', employeeCount: 9800,
    vertical: 'Hospitality', icpScore: 89, tier: 1, inCRM: false,
    briefing: {
      context: 'Whitbread (Premier Inn, Beefeater) is investing heavily in operational efficiency. They\'ve publicly stated workforce optimisation is a 2026 priority.',
      painPoints: ['Scheduling complexity across hotel and restaurant operations', 'Seasonal demand variations causing chronic over/under-staffing', 'Manager burnout from manual scheduling processes'],
      conversationOpeners: ['Reference their annual report mention of workforce optimisation as a strategic priority', 'Ask how they currently handle seasonal demand planning', 'Discuss AI scheduling\'s ability to predict demand patterns'],
      proofPoints: ['Hospitality clients see 35% reduction in scheduling time', 'AI demand forecasting reduces over-staffing by 18% on average'],
    },
  },
  {
    id: 'd-5', name: 'Marcus Webb', company: 'Wagamama', role: 'Chief Operating Officer', employeeCount: 4200,
    vertical: 'Hospitality', icpScore: 88, tier: 1, inCRM: true,
    briefing: {
      context: 'Wagamama is an existing Sona customer and strong advocate. Marcus has offered to make introductions to other hospitality leaders at the event.',
      painPoints: ['N/A - existing customer and champion', 'Looking to expand Sona usage to new locations', 'Interested in AI scheduling features on roadmap'],
      conversationOpeners: ['Thank Marcus for advocacy and discuss expansion timeline', 'Brief him on who else is attending that he could introduce us to', 'Discuss the AI scheduling roadmap and early access program'],
      proofPoints: ['Wagamama saw 31% agency cost reduction in Q1', 'Staff app adoption hit 94% within 2 weeks'],
    },
  },
  {
    id: 'd-6', name: 'Laura Thompson', company: 'Five Guys UK', role: 'HR Director', employeeCount: 3800,
    vertical: 'Hospitality', icpScore: 86, tier: 1, inCRM: true,
    briefing: {
      context: 'Five Guys is in early discovery with Sona. Laura has attended a previous webinar and downloaded the hospitality case study. Currently on Deputy.',
      painPoints: ['Deputy lacks UK-specific compliance features (WTD)', 'Rapid expansion plans requiring scalable scheduling', 'Mobile app adoption among younger workforce is critical'],
      conversationOpeners: ['Follow up on the case study download — what resonated?', 'Ask about their expansion timeline and how scheduling scales with it', 'Reference our Deputy displacement wins and migration simplicity'],
      proofPoints: ['Deputy to Sona migration typically takes 4 weeks', 'Our WTD compliance engine is UK-built and regulation-current'],
    },
  },
  {
    id: 'd-7', name: 'Robert Kline', company: 'Mitchells & Butlers', role: 'Group Operations Director', employeeCount: 14000,
    vertical: 'Hospitality', icpScore: 84, tier: 1, inCRM: false,
    briefing: {
      context: 'Mitchells & Butlers operates 1,700+ pubs, bars and restaurants. They\'re the largest UK managed pub company and a significant logo target.',
      painPoints: ['Massive scale — 14,000 employees across 1,700 venues', 'Legacy scheduling system with poor mobile experience', 'High agency costs across seasonal peaks'],
      conversationOpeners: ['Ask about their current scheduling approach at scale', 'Discuss how Sona handles multi-brand, multi-site operations', 'Reference the Loungers success story — similar pub/restaurant model'],
      proofPoints: ['Loungers (similar model) migrated 3,200 employees in 6 weeks', 'Multi-brand customers manage all brands from single dashboard'],
    },
  },
  {
    id: 'd-8', name: 'Priya Sharma', company: 'The Restaurant Group', role: 'People Director', employeeCount: 5600,
    vertical: 'Hospitality', icpScore: 82, tier: 1, inCRM: false,
    briefing: {
      context: 'TRG (Wagamama\'s parent company, also owns Frankie & Benny\'s, Brunning & Price). Could be a strategic expansion of the Wagamama relationship.',
      painPoints: ['Inconsistent workforce management across different brands', 'Need to demonstrate ROI on HR technology investments', 'Staff retention a major challenge across casual dining brands'],
      conversationOpeners: ['Reference the Wagamama success and ask about group-wide rollout potential', 'Discuss the ROI calculator and how other multi-brand groups justify investment', 'Ask about their retention strategy and how scheduling flexibility impacts it'],
      proofPoints: ['Wagamama (TRG subsidiary) already seeing 31% agency cost reduction', 'Multi-brand rollout discount available for group-wide deployment'],
    },
  },
  // Tier 2 - Existing relationships (5)
  {
    id: 'd-9', name: 'Rachel Green', company: 'Loungers Group', role: 'COO', employeeCount: 3200,
    vertical: 'Hospitality', icpScore: 75, tier: 2, inCRM: true,
    briefing: {
      context: 'Existing Sona customer. Key reference and advocate. Well-connected in hospitality industry.', painPoints: [], conversationOpeners: ['Discuss expansion and referral opportunities'], proofPoints: [],
    },
  },
  {
    id: 'd-10', name: 'Tom Reynolds', company: 'Burger King UK', role: 'Head of Operations', employeeCount: 4500,
    vertical: 'Hospitality', icpScore: 72, tier: 2, inCRM: true,
    briefing: {
      context: 'Active deal in S3-Solution stage. Tom is our internal champion. Meeting at event is chance to advance deal.', painPoints: [], conversationOpeners: ['Discuss next steps in the evaluation process'], proofPoints: [],
    },
  },
  {
    id: 'd-11', name: 'Kate Williams', company: 'Tortilla', role: 'Operations Manager', employeeCount: 1800,
    vertical: 'Hospitality', icpScore: 68, tier: 2, inCRM: true,
    briefing: {
      context: 'Re-engagement target. Previously went dark but recent content download suggests renewed interest.', painPoints: [], conversationOpeners: ['Ask what prompted renewed interest in scheduling solutions'], proofPoints: [],
    },
  },
  {
    id: 'd-12', name: 'Ahmed Hassan', company: 'Prezzo', role: 'Finance Director', employeeCount: 2200,
    vertical: 'Hospitality', icpScore: 65, tier: 2, inCRM: true,
    briefing: {
      context: 'Met at previous event. Expressed interest in ROI calculator. Finance-led evaluation.', painPoints: [], conversationOpeners: ['Follow up on ROI calculator discussion'], proofPoints: [],
    },
  },
  {
    id: 'd-13', name: 'Jenny Morris', company: 'Dishoom', role: 'Head of People', employeeCount: 1500,
    vertical: 'Hospitality', icpScore: 62, tier: 2, inCRM: false,
    briefing: {
      context: 'Fast-growing restaurant group known for strong culture. Good brand logo target.', painPoints: [], conversationOpeners: ['Discuss how scheduling flexibility supports their culture-first approach'], proofPoints: [],
    },
  },
  // Tier 3 - Non-ICP (7)
  {
    id: 'd-14', name: 'Michael Brown', company: 'Hilton UK', role: 'Regional HR Manager', employeeCount: 22000,
    vertical: 'Hospitality', icpScore: 45, tier: 3, inCRM: false,
    briefing: { context: 'Enterprise hotel chain. Too large for current ICP but worth a conversation.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-15', name: 'Lisa Chang', company: 'OpenTable', role: 'Product Director', employeeCount: 800,
    vertical: 'other', icpScore: 30, tier: 3, inCRM: false,
    briefing: { context: 'Technology company, not a scheduling buyer. Potential partnership angle.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-16', name: 'Paul Newman', company: 'Fourth Analytics', role: 'Sales Director', employeeCount: 500,
    vertical: 'other', icpScore: 20, tier: 3, inCRM: false,
    briefing: { context: 'Competitor employee. Useful for competitive intelligence gathering.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-17', name: 'Sarah Dalton', company: 'QSR Media', role: 'Editor', employeeCount: 50,
    vertical: 'other', icpScore: 25, tier: 3, inCRM: false,
    briefing: { context: 'Industry press. Worth building relationship for PR opportunities.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-18', name: 'Chris Wright', company: 'FoodService Consulting', role: 'Consultant', employeeCount: 30,
    vertical: 'other', icpScore: 28, tier: 3, inCRM: false,
    briefing: { context: 'Industry consultant. Could be a referral source but not a direct buyer.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-19', name: 'Angela Price', company: 'UK Hospitality', role: 'Policy Director', employeeCount: 120,
    vertical: 'other', icpScore: 22, tier: 3, inCRM: false,
    briefing: { context: 'Trade body representative. Good for industry knowledge and networking.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
  {
    id: 'd-20', name: 'Kevin O\'Brien', company: 'Hospitality Recruitment Ltd', role: 'Managing Director', employeeCount: 75,
    vertical: 'other', icpScore: 18, tier: 3, inCRM: false,
    briefing: { context: 'Recruitment agency. Not a target customer but understands industry pain points.', painPoints: [], conversationOpeners: [], proofPoints: [] },
  },
]

const tierTabs = [
  { id: 'tier1', label: 'Tier 1', badge: 8 },
  { id: 'tier2', label: 'Tier 2', badge: 5 },
  { id: 'tier3', label: 'Tier 3', badge: 7 },
  { id: 'all', label: 'All', badge: 20 },
]

const battlePlan = {
  mustMeet: ['James Whitfield — Nando\'s COO', 'Sarah Mitchell — Pizza Hut VP People', 'David Chen — Compass Group Ops', 'Robert Kline — Mitchells & Butlers', 'Priya Sharma — The Restaurant Group'],
  talkingPoints: [
    'AI-powered scheduling reduces manager admin by 60% — live demo on tablet',
    'Fourth migration program — zero downtime, 6-week typical timeline',
    'ROI calculator showing average 30% agency cost reduction in first quarter',
  ],
  assets: [
    'Hospitality case study one-pager (Loungers + Wagamama)',
    'ROI calculator loaded on iPad with pre-filled hospitality benchmarks',
  ],
}

export default function PreEventPage() {
  const [selectedEvent, setSelectedEvent] = useState('evt-2')
  const [expandedDelegate, setExpandedDelegate] = useState<string | null>(null)

  const filterDelegates = (tabId: string) => {
    if (tabId === 'all') return delegates
    const tierMap: Record<string, 1 | 2 | 3> = { tier1: 1, tier2: 2, tier3: 3 }
    return delegates.filter((d) => d.tier === tierMap[tabId])
  }

  const verticalColor = (v: string) => {
    switch (v) {
      case 'Hospitality': return 'warning'
      case 'Social Care': return 'success'
      case 'Retail': return 'purple'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-2">
          <Target className="w-6 h-6 text-sona-teal" />
          Pre-Event Intelligence
        </h1>
        <p className="text-sona-stone-400 mt-1">
          Prepare delegate intelligence and briefings for upcoming events.
        </p>
      </div>

      {/* Event Selector + Upload Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <label className="text-xs font-medium text-sona-stone-400 mb-2 block">Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-sona-stone-100 border border-sona-stone-200 rounded px-3 py-2.5 text-sm text-sona-dark-teal focus:outline-none focus:border-sona-teal/50"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>{e.name} — {e.date}</option>
            ))}
          </select>
        </Card>

        <Card className="lg:col-span-2">
          <div className="border-2 border-dashed border-sona-stone-200 rounded p-6 text-center hover:border-sona-teal/30 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-sona-stone-400 mx-auto mb-2" />
            <p className="text-sm text-sona-dark-teal font-medium">Drop delegate list here</p>
            <p className="text-xs text-sona-stone-400 mt-1">Supports CSV, XLSX, or PDF. Max 10MB.</p>
          </div>
        </Card>
      </div>

      {/* Stats Bar */}
      <Card className="!p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sona-teal" />
              <span className="text-sm text-sona-dark-teal font-semibold">142 delegates</span>
            </div>
            <div className="h-4 w-px bg-sona-border" />
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sona-teal font-medium">28</span>
                <span className="text-sona-stone-400">Tier 1</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sona-dark-teal" />
                <span className="text-sona-teal font-medium">45</span>
                <span className="text-sona-stone-400">Tier 2</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sona-stone-400" />
                <span className="text-sona-stone-400 font-medium">69</span>
                <span className="text-sona-stone-400">Tier 3</span>
              </span>
            </div>
            <div className="h-4 w-px bg-sona-border" />
            <span className="text-sm text-sona-stone-400">
              <span className="text-violet-600 font-medium">34</span> already in CRM
            </span>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Delegate Table */}
        <div className="xl:col-span-3">
          <Tabs tabs={tierTabs} defaultTab="tier1">
            {(activeTab) => {
              const filtered = filterDelegates(activeTab)
              return (
                <Card className="!p-0 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-sona-stone-200 bg-sona-stone-100/50">
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">Name</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">Company</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">Role</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">Employees</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">Vertical</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">ICP Score</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4">In CRM</th>
                          <th className="text-left text-xs font-medium text-sona-stone-400 p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((d) => (
                          <>
                            <tr
                              key={d.id}
                              className={cn(
                                'border-b border-sona-stone-200 hover:bg-sona-stone-100 transition-colors',
                                expandedDelegate === d.id && 'bg-sona-stone-100'
                              )}
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2.5">
                                  <Avatar name={d.name} size="sm" />
                                  <span className="text-sm font-medium text-sona-dark-teal">{d.name}</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-sona-stone-400">{d.company}</td>
                              <td className="p-4 text-sm text-sona-stone-400">{d.role}</td>
                              <td className="p-4 text-sm text-sona-stone-400">{d.employeeCount.toLocaleString()}</td>
                              <td className="p-4">
                                <Badge variant={verticalColor(d.vertical) as 'warning' | 'success' | 'purple' | 'default'}>{d.vertical}</Badge>
                              </td>
                              <td className="p-4">
                                <span className={cn(
                                  'inline-flex items-center justify-center w-10 h-7 rounded text-xs font-bold',
                                  d.icpScore >= 80 ? 'bg-teal-500/15 text-sona-teal' :
                                  d.icpScore >= 60 ? 'bg-sona-dark-teal/15 text-sona-teal' :
                                  d.icpScore >= 40 ? 'bg-amber-500/15 text-amber-600' :
                                  'bg-sona-stone-100 text-sona-stone-400'
                                )}>
                                  {d.icpScore}
                                </span>
                              </td>
                              <td className="p-4">
                                {d.inCRM ? (
                                  <CheckCircle2 className="w-4 h-4 text-sona-teal" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-sona-stone-400" />
                                )}
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => setExpandedDelegate(expandedDelegate === d.id ? null : d.id)}
                                  className="flex items-center gap-1 text-xs text-sona-teal hover:text-sona-teal/80 transition-colors font-medium"
                                >
                                  {expandedDelegate === d.id ? 'Hide' : 'View Briefing'}
                                  {expandedDelegate === d.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>
                              </td>
                            </tr>
                            {expandedDelegate === d.id && d.briefing.context && (
                              <tr key={`${d.id}-briefing`}>
                                <td colSpan={8} className="p-0">
                                  <div className="bg-sona-stone-100 border-t border-b border-sona-teal/20 p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                      {/* Company Context */}
                                      <div>
                                        <div className="flex items-center gap-2 mb-2">
                                          <Building2 className="w-4 h-4 text-sona-teal" />
                                          <span className="text-xs font-semibold text-sona-dark-teal uppercase tracking-wider">Company Context</span>
                                        </div>
                                        <p className="text-sm text-sona-stone-400 leading-relaxed">{d.briefing.context}</p>
                                      </div>

                                      {/* Pain Points */}
                                      {d.briefing.painPoints.length > 0 && (
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            <Target className="w-4 h-4 text-red-600" />
                                            <span className="text-xs font-semibold text-sona-dark-teal uppercase tracking-wider">Likely Pain Points</span>
                                          </div>
                                          <ul className="space-y-1.5">
                                            {d.briefing.painPoints.map((p, i) => (
                                              <li key={i} className="text-sm text-sona-stone-400 flex items-start gap-2">
                                                <span className="text-red-600 mt-1 shrink-0">-</span>
                                                {p}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {/* Conversation Openers */}
                                      {d.briefing.conversationOpeners.length > 0 && (
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="w-4 h-4 text-amber-600" />
                                            <span className="text-xs font-semibold text-sona-dark-teal uppercase tracking-wider">Conversation Openers</span>
                                          </div>
                                          <ul className="space-y-1.5">
                                            {d.briefing.conversationOpeners.map((c, i) => (
                                              <li key={i} className="text-sm text-sona-stone-400 flex items-start gap-2">
                                                <span className="text-amber-600 mt-1 shrink-0">-</span>
                                                {c}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {/* Proof Points */}
                                      {d.briefing.proofPoints.length > 0 && (
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-4 h-4 text-sona-teal" />
                                            <span className="text-xs font-semibold text-sona-dark-teal uppercase tracking-wider">Sona Proof Points</span>
                                          </div>
                                          <ul className="space-y-1.5">
                                            {d.briefing.proofPoints.map((pp, i) => (
                                              <li key={i} className="text-sm text-sona-stone-400 flex items-start gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-sona-teal mt-0.5 shrink-0" />
                                                {pp}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )
            }}
          </Tabs>
        </div>

        {/* Battle Plan Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-sona-teal" />
              <h3 className="text-sm font-semibold text-sona-dark-teal">Event Battle Plan</h3>
            </div>

            {/* Must-Meet List */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-sona-stone-400 uppercase tracking-wider">Must-Meet List</span>
              </div>
              <ol className="space-y-2">
                {battlePlan.mustMeet.map((name, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-sm bg-teal-100 text-sona-teal text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-sona-dark-teal">{name}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Talking Points */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-sona-teal" />
                <span className="text-xs font-semibold text-sona-stone-400 uppercase tracking-wider">Key Talking Points</span>
              </div>
              <ul className="space-y-2">
                {battlePlan.talkingPoints.map((point, i) => (
                  <li key={i} className="text-sm text-sona-stone-400 leading-relaxed flex items-start gap-2">
                    <Star className="w-3 h-3 text-sona-teal mt-1 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Assets to Bring */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-semibold text-sona-stone-400 uppercase tracking-wider">Assets to Bring</span>
              </div>
              <ul className="space-y-2">
                {battlePlan.assets.map((asset, i) => (
                  <li key={i} className="text-sm text-sona-stone-400 leading-relaxed flex items-start gap-2">
                    <FileText className="w-3 h-3 text-violet-600 mt-1 shrink-0" />
                    {asset}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
