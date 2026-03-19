'use client'

import { useState } from 'react'
import {
  Building2,
  Globe,
  Users,
  TrendingUp,
  Newspaper,
  Linkedin,
  Mail,
  Calendar,
  Package,
  FileText,
  Phone,
  ChevronRight,
  ChevronDown,
  Target,
  Handshake,
  Network,
  LayoutList,
  DollarSign,
  CheckCircle2,
  Lightbulb,
  Video,
  BookOpen,
  Gift,
  Sparkles,
  Presentation,
  PenTool,
  Megaphone,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import Tabs from '@/components/shared/Tabs'
import SonaDiamond from '@/components/shared/SonaDiamond'
import { cn } from '@/lib/utils'

const targetAccounts = [
  { id: 'nandos', name: "Nando's UK" },
  { id: 'burger-king', name: 'Burger King UK' },
  { id: 'mitchells', name: 'Mitchells & Butlers' },
  { id: 'compass', name: 'Compass Group UK' },
]

const abmTabs = [
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'ideas', label: 'Ideas Lab' },
  { id: 'engagement', label: 'Engagement Map' },
  { id: 'connections', label: 'Connections' },
  { id: 'campaign', label: 'Campaign Plan' },
]

// Intelligence data
const companyOverview = {
  name: "Nando's UK",
  vertical: 'Hospitality (QSR)',
  employees: '8,500+',
  revenue: '£1.2B (Global)',
  hq: 'London, UK',
  website: 'nandos.co.uk',
  currentSystem: 'Fourth',
  locations: '450+ UK restaurants',
}

const strategicPriorities = [
  {
    id: 'cost',
    label: 'Operational cost reduction',
    detail: 'Targeting 15% operational savings by end of 2026. Labour is their single biggest cost line.',
    icon: TrendingUp,
  },
  {
    id: 'digital',
    label: 'Digital transformation of operations',
    detail: 'Investing in mobile-first tools for restaurant staff and managers. Piloting scheduling apps.',
    icon: Globe,
  },
  {
    id: 'expansion',
    label: 'Rapid site expansion',
    detail: '30 new UK locations planned for 2026. Need scalable workforce ops to support growth.',
    icon: Building2,
  },
]

const recentNews = [
  { date: 'Mar 12, 2026', title: "Nando's announces 30 new UK restaurant openings for 2026", source: 'Restaurant Magazine' },
  { date: 'Feb 28, 2026', title: "Nando's COO James Whitfield speaks at QSR conference on operational efficiency", source: 'QSR Media' },
  { date: 'Feb 15, 2026', title: "Nando's pilots mobile scheduling app for restaurant managers", source: 'The Caterer' },
]

const stakeholders = [
  { name: 'James Whitfield', role: 'Chief Operating Officer', status: 'Identified', statusVariant: 'success' as const, persona: 'C-Suite', notes: 'Registered for April Hospitality Leaders Summit. Key decision maker.' },
  { name: 'Helen Park', role: 'VP People & Culture', status: 'Identified', statusVariant: 'success' as const, persona: 'HR Director', notes: 'Posted on LinkedIn about frontline staff engagement challenges.' },
  { name: 'CFO', role: 'Finance Director', status: 'Needs Discovery', statusVariant: 'warning' as const, persona: 'Finance Director', notes: 'Name unknown. Need to identify for ROI conversation.' },
  { name: 'IT Director', role: 'Technology', status: 'Needs Discovery', statusVariant: 'warning' as const, persona: 'IT Director', notes: 'Name unknown. Key for integration and security evaluation.' },
]

// Ideas data — tied to strategic priorities
const webinarIdeas = [
  {
    title: 'The real cost of manual scheduling at scale',
    priority: 'cost',
    persona: 'COO / Finance Director',
    format: 'Panel webinar (45 min)',
    description: "Panel with Loungers COO + Sona data team. Shows how multi-site operators quantify scheduling waste — agency overspend, overtime leakage, manager hours lost. Directly addresses Nando's 15% cost reduction target.",
    hook: "Nando's COO has spoken publicly about operational efficiency — invite him as a panellist, not an attendee. Flatters and engages simultaneously.",
  },
  {
    title: 'Mobile-first workforce management: lessons from 3 QSR chains',
    priority: 'digital',
    persona: 'COO / IT Director',
    format: 'Fireside chat (30 min)',
    description: "Three Sona customers share their mobile rollout journey — what worked, what didn't, adoption rates. Directly mirrors Nando's mobile scheduling pilot.",
    hook: "Nando's is already piloting mobile scheduling tools. Position Sona as the next step beyond their current pilot — show what mature mobile WFM looks like.",
  },
  {
    title: 'Scaling workforce operations: how fast-growing chains avoid the ops bottleneck',
    priority: 'expansion',
    persona: 'COO / HR Director',
    format: 'Workshop (60 min)',
    description: "Interactive workshop for operators planning 20+ new sites. Covers hiring ramp models, scheduling templates for new sites, and how AI demand forecasting prevents overstaffing during launch periods.",
    hook: "30 new Nando's locations = 1,500+ new staff to schedule. This directly addresses their growth pain before it becomes a crisis.",
  },
]

const tofuContentIdeas = [
  {
    title: '"The QSR labour cost report 2026"',
    priority: 'cost',
    format: 'Research report',
    persona: 'COO / Finance Director',
    description: 'Original research benchmarking labour costs, agency spend, and scheduling efficiency across UK QSR chains. Include anonymised data from Sona customers. Gate behind email.',
    personalisation: "Produce a Nando's-specific appendix: \"What these benchmarks mean for a 450-site operator\" with projected savings based on their employee count and typical QSR agency spend.",
    icon: BarChart3,
  },
  {
    title: '"From spreadsheets to AI: the frontline digital playbook"',
    priority: 'digital',
    format: 'Interactive guide',
    persona: 'IT Director / COO',
    description: "Step-by-step maturity model for frontline digital transformation. Where most hospitality operators are today → where leaders are → what the next 12 months look like with AI scheduling.",
    personalisation: "Create a Nando's-branded version that maps their current state (Fourth + pilot mobile app) to the maturity model. Show the gap between where they are and where Sona customers sit.",
    icon: BookOpen,
  },
  {
    title: '"The hidden cost of opening 30 sites without AI scheduling"',
    priority: 'expansion',
    format: 'Blog post / LinkedIn article',
    persona: 'COO / HR Director',
    description: "Short, punchy thought leadership piece about the workforce ops challenges of rapid expansion. Uses real numbers: average hiring ramp time, schedule error rates at new sites, agency dependency in first 90 days.",
    personalisation: "Reference Nando's expansion plans (public knowledge from Restaurant Magazine). Position as insight from operators who've been through rapid growth with Sona.",
    icon: PenTool,
  },
  {
    title: '"AI scheduling in QSR: hype vs. reality"',
    priority: 'digital',
    format: 'Whitepaper',
    persona: 'COO / IT Director',
    description: "Cuts through AI buzzwords. Shows what AI actually does in scheduling today — demand forecasting, optimal shift generation, fatigue management — with real before/after data from hospitality deployments.",
    personalisation: "Include a section: \"What AI scheduling would look like for a chain with 450+ UK sites\" using Nando's-scale numbers without naming them directly.",
    icon: Sparkles,
  },
]

const personalisedAssets = [
  {
    title: 'Nando\'s-specific ROI model',
    baseAsset: 'Sona ROI Calculator',
    persona: 'Finance Director / COO',
    priority: 'cost',
    changes: 'Pre-populate with 8,500 employees, 450 sites, QSR-typical agency rates (18% of labour). Show 3-year projection against their 15% cost reduction target.',
  },
  {
    title: 'Fourth → Sona migration one-pager',
    baseAsset: 'Fourth Displacement Battle Card',
    persona: 'IT Director / COO',
    priority: 'digital',
    changes: "Tailor to Nando's scale: 450 sites, phased migration approach, Fourth-specific data export process. Include Loungers migration timeline as social proof.",
  },
  {
    title: 'Hospitality enterprise case study collection',
    baseAsset: 'Customer Case Studies',
    persona: 'COO / HR Director',
    priority: 'cost',
    changes: 'Bundle the 3 most relevant case studies (Loungers, Wagamama, Five Guys) with a cover page: "How operators like you reduced labour costs with Sona." Annotate each with comparable metrics.',
  },
  {
    title: '"Scaling to 500 sites" workforce playbook',
    baseAsset: 'Enterprise Deployment Guide',
    persona: 'COO / IT Director',
    priority: 'expansion',
    changes: "Rebrand as Nando's-specific deployment plan. Show phased rollout: pilot 10 sites → region → national. Include timeline, resource requirements, and risk mitigations.",
  },
]

const directMailIdeas = [
  {
    title: '"The real cost of a peri-peri chicken" infographic box',
    priority: 'cost',
    recipient: 'James Whitfield (COO)',
    description: 'Custom-printed box containing an infographic breaking down the hidden labour costs in every Nando\'s meal served — scheduling overhead, agency markup, overtime leakage. Inside: a handwritten note + iPad preloaded with their personalised ROI model.',
    estimatedCost: '£180',
    timing: 'Week 2 — before event, to create conversation starter',
  },
  {
    title: '"Your next 30 sites" planning kit',
    priority: 'expansion',
    recipient: 'Helen Park (VP People & Culture)',
    description: 'Premium stationery box with a custom-bound "Workforce Scaling Playbook" (physical version of the personalised asset above), a Sona-branded Moleskine notebook, and a card: "Opening 30 sites is exciting. Making sure each one is perfectly staffed from day one — that\'s where we come in."',
    estimatedCost: '£95',
    timing: 'Week 3 — just before event for maximum recall',
  },
  {
    title: 'The "Fourth is failing" survival kit',
    priority: 'digital',
    recipient: 'James Whitfield (COO)',
    description: 'Tongue-in-cheek "Emergency Scheduling Kit": branded stress ball, a mock "incident report" showing Fourth\'s recent outages with Sona\'s uptime stats on the reverse, and a QR code linking to the Loungers migration case study. Bold, memorable, makes a point.',
    estimatedCost: '£65',
    timing: 'Week 1 — conversation opener, ideally after next Fourth outage',
  },
]

const workshopIdeas = [
  {
    title: 'Private scheduling efficiency audit',
    priority: 'cost',
    format: 'In-person workshop (2 hours)',
    attendees: 'COO + 2-3 regional managers',
    description: "Offer Nando's a complimentary 2-hour session where Sona's team audits their current scheduling process at 3 representative sites. Present findings with benchmarks against similar QSR operators. No pitch — pure insight.",
    outcome: 'Builds trust, generates account-specific data Sona can reference in proposals, gives Nando\'s team real value regardless of purchase decision.',
  },
  {
    title: 'AI workforce planning breakfast briefing',
    priority: 'digital',
    format: 'Breakfast event (90 min)',
    attendees: 'COO + IT Director + VP People',
    description: 'Exclusive 8-person breakfast for QSR C-suite — Nando\'s gets 3 seats. Sona presents 15 minutes of data, then facilitated roundtable on AI adoption challenges. Peer learning format, not a sales pitch.',
    outcome: 'Gets multiple Nando\'s stakeholders in one room. Cross-pollinates with other QSR leaders who are already Sona customers.',
  },
]

// Engagement Map data
const channels = [
  {
    id: 'linkedin', name: 'LinkedIn', icon: Linkedin, status: 'Not started', statusColor: 'text-sona-stone-400', bgColor: 'bg-sona-stone-100',
    suggestedAction: "Connect with James Whitfield and Helen Park. Engage with Nando's company page content.",
  },
  {
    id: 'email', name: 'Email', icon: Mail, status: 'Not started', statusColor: 'text-sona-stone-400', bgColor: 'bg-sona-stone-100',
    suggestedAction: 'Send personalised thought leadership on QSR scheduling efficiency.',
  },
  {
    id: 'events', name: 'Events', icon: Calendar, status: 'COO registered for April event', statusColor: 'text-sona-teal', bgColor: 'bg-teal-50',
    suggestedAction: 'Prepare pre-event outreach and personalised briefing for meeting at Hospitality Leaders Summit.',
  },
  {
    id: 'direct-mail', name: 'Direct Mail', icon: Package, status: 'Not started', statusColor: 'text-sona-stone-400', bgColor: 'bg-sona-stone-100',
    suggestedAction: "Send 'The real cost of peri-peri' infographic box to COO office — conversation starter before April event.",
  },
  {
    id: 'content', name: 'Content', icon: FileText, status: 'Industry report sent', statusColor: 'text-amber-600', bgColor: 'bg-amber-50',
    suggestedAction: "Follow up on QSR industry report engagement. Send Nando's-specific ROI appendix next.",
  },
  {
    id: 'phone', name: 'Phone', icon: Phone, status: 'Not started', statusColor: 'text-sona-stone-400', bgColor: 'bg-sona-stone-100',
    suggestedAction: 'BDR outreach after event meeting. Reference specific conversation points from summit.',
  },
]

// Connections data
const warmIntros = [
  {
    id: 'wi1',
    title: 'Via Loungers COO (Rachel Green)',
    detail: "Rachel knows Nando's Ops team from industry network. She's offered to make a warm introduction. Loungers is a strong Sona reference.",
    strength: 'Strong',
    strengthVariant: 'success' as const,
  },
  {
    id: 'wi2',
    title: 'Via Hospitality Leaders Summit',
    detail: 'James Whitfield (COO) registered for the April event. Direct face-to-face opportunity. Sona is sponsoring the drinks reception.',
    strength: 'Strong',
    strengthVariant: 'success' as const,
  },
  {
    id: 'wi3',
    title: 'Via customer advocate (Wagamama COO)',
    detail: "Marcus Webb (Wagamama COO) offered to make introductions to other QSR operators. Wagamama and Nando's share several industry connections.",
    strength: 'Medium',
    strengthVariant: 'warning' as const,
  },
]

// Campaign Plan data
const campaignTimeline = [
  { week: 'Week 1', items: ['LinkedIn connections + company engagement', 'Send "Fourth survival kit" direct mail', 'Publish QSR labour cost blog'] },
  { week: 'Week 2', items: ['Send "Real cost of peri-peri" box to COO', 'Personalised ROI model email to Helen Park', 'Share QSR report on LinkedIn (tag industry)'] },
  { week: 'Week 3', items: ['Pre-event outreach for April dinner', 'Send "30 sites" planning kit to VP People', 'Invite COO to scheduling audit workshop'] },
  { week: 'Week 4', items: ['Hospitality Leaders Summit — face-to-face', 'Host AI breakfast briefing (3 Nando\'s seats)', 'Introduce Rachel Green (Loungers) to James Whitfield'] },
  { week: 'Week 5', items: ['Post-event follow-up with personalised deck', 'Send Fourth migration one-pager', 'BDR call to book demo'] },
  { week: 'Week 6', items: ['Executive dinner invitation (COO + CFO)', 'Share "Scaling to 500 sites" playbook', 'Demo for COO + IT Director'] },
]

function PriorityTag({ priorityId }: { priorityId: string }) {
  const labels: Record<string, { label: string; variant: 'lime' | 'sky' | 'teal' }> = {
    cost: { label: 'Cost Reduction', variant: 'lime' },
    digital: { label: 'Digital Transformation', variant: 'sky' },
    expansion: { label: 'Site Expansion', variant: 'teal' },
  }
  const p = labels[priorityId]
  if (!p) return null
  return <Badge variant={p.variant}>{p.label}</Badge>
}

function ExpandableIdea({ title, children, defaultOpen = false }: { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-sona-stone-200 bg-white" style={{ borderRadius: '4px' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-sona-stone-50 transition-colors"
      >
        <div className="flex-1 min-w-0">{title}</div>
        {open ? <ChevronDown className="w-4 h-4 text-sona-stone-400 shrink-0 ml-3" strokeWidth={1.5} /> : <ChevronRight className="w-4 h-4 text-sona-stone-400 shrink-0 ml-3" strokeWidth={1.5} />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-sona-stone-200">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ABMWorkshopPage() {
  const [selectedAccount, setSelectedAccount] = useState('nandos')

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <SonaDiamond size={12} className="text-sona-teal" />
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-sona-teal">ABM Workshop</span>
          </div>
          <h1 className="text-2xl font-semibold text-sona-dark-teal">Nando&apos;s UK — account campaign</h1>
          <p className="text-sona-stone-400 font-light mt-1">
            Intelligence, creative ideas, and multi-channel campaign planning tied to account priorities.
          </p>
        </div>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="bg-sona-stone-100 border border-sona-stone-200 px-3 py-2 text-sm text-sona-dark-teal focus:outline-none focus:border-sona-teal/50"
          style={{ borderRadius: '4px' }}
        >
          {targetAccounts.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      {/* Priority pills */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400">Key priorities</span>
        {strategicPriorities.map((p) => (
          <PriorityTag key={p.id} priorityId={p.id} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs tabs={abmTabs} defaultTab="intelligence">
        {(activeTab) => (
          <div>
            {/* Intelligence Tab */}
            {activeTab === 'intelligence' && (
              <div className="space-y-6">
                {/* Company Overview */}
                <Card>
                  <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Company overview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Vertical', value: companyOverview.vertical },
                      { label: 'Employees', value: companyOverview.employees },
                      { label: 'Revenue', value: companyOverview.revenue },
                      { label: 'HQ', value: companyOverview.hq },
                      { label: 'Website', value: companyOverview.website },
                      { label: 'Current System', value: companyOverview.currentSystem },
                      { label: 'UK Locations', value: companyOverview.locations },
                      { label: 'Target Status', value: 'Tier 1' },
                    ].map((field, i) => (
                      <div key={i} className="p-3 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-sona-stone-400 mb-1">{field.label}</div>
                        <div className="text-sm font-medium text-sona-dark-teal">{field.value}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Strategic Priorities */}
                  <Card>
                    <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Strategic priorities</h2>
                    <div className="space-y-3">
                      {strategicPriorities.map((p) => {
                        const Icon = p.icon
                        return (
                          <div key={p.id} className="flex items-start gap-3 p-3 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
                            <Icon className="w-5 h-5 text-sona-teal shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-sona-dark-teal">{p.label}</span>
                                <PriorityTag priorityId={p.id} />
                              </div>
                              <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{p.detail}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>

                  {/* Recent News + Stakeholders */}
                  <div className="space-y-6">
                    <Card>
                      <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Recent news</h2>
                      <div className="space-y-3">
                        {recentNews.map((news, i) => (
                          <div key={i} className="p-3 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[11px] text-sona-stone-400">{news.date}</span>
                              <Badge variant="outline">{news.source}</Badge>
                            </div>
                            <p className="text-sm text-sona-dark-teal font-light leading-relaxed">{news.title}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card>
                      <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-4">Key stakeholders</h2>
                      <div className="space-y-3">
                        {stakeholders.map((s, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-sona-stone-100 border border-sona-stone-200" style={{ borderRadius: '4px' }}>
                            <Avatar name={s.name} size="sm" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-medium text-sona-dark-teal">{s.name}</span>
                                <Badge variant={s.statusVariant}>{s.status}</Badge>
                              </div>
                              <div className="font-mono text-[11px] text-sona-teal uppercase tracking-wider mb-1">{s.persona}</div>
                              <p className="text-xs text-sona-stone-400 font-light">{s.notes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Ideas Lab Tab */}
            {activeTab === 'ideas' && (
              <div className="space-y-8">
                <p className="text-sm text-sona-stone-400 font-light">
                  Campaign ideas generated from Nando&apos;s strategic priorities. Each idea is tied to a key priority and targeted at specific buying personas.
                </p>

                {/* Webinar & Event Themes */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SonaDiamond size={10} className="text-sona-teal" />
                    <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Webinar & event themes</h2>
                  </div>
                  <div className="space-y-3">
                    {webinarIdeas.map((idea, i) => (
                      <ExpandableIdea
                        key={i}
                        defaultOpen={i === 0}
                        title={
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <Video className="w-4 h-4 text-sona-teal shrink-0" strokeWidth={1.5} />
                              <span className="text-sm font-medium text-sona-dark-teal">{idea.title}</span>
                              <PriorityTag priorityId={idea.priority} />
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-sona-stone-400 font-mono ml-6">
                              <span>{idea.format}</span>
                              <span>·</span>
                              <span>{idea.persona}</span>
                            </div>
                          </div>
                        }
                      >
                        <div className="pt-3 space-y-3">
                          <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{idea.description}</p>
                          <div className="p-3 bg-lime-50 border border-lime-200" style={{ borderRadius: '4px' }}>
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="w-3.5 h-3.5 text-lime-700" strokeWidth={1.5} />
                              <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-lime-700">Nando&apos;s-specific hook</span>
                            </div>
                            <p className="text-sm text-lime-800 font-light leading-relaxed">{idea.hook}</p>
                          </div>
                        </div>
                      </ExpandableIdea>
                    ))}
                  </div>
                </section>

                {/* Workshop Ideas */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SonaDiamond size={10} className="text-sona-teal" />
                    <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Workshop & exclusive experiences</h2>
                  </div>
                  <div className="space-y-3">
                    {workshopIdeas.map((idea, i) => (
                      <ExpandableIdea
                        key={i}
                        title={
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <Presentation className="w-4 h-4 text-sona-teal shrink-0" strokeWidth={1.5} />
                              <span className="text-sm font-medium text-sona-dark-teal">{idea.title}</span>
                              <PriorityTag priorityId={idea.priority} />
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-sona-stone-400 font-mono ml-6">
                              <span>{idea.format}</span>
                              <span>·</span>
                              <span>{idea.attendees}</span>
                            </div>
                          </div>
                        }
                      >
                        <div className="pt-3 space-y-3">
                          <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{idea.description}</p>
                          <div className="p-3 bg-teal-50 border border-teal-200" style={{ borderRadius: '4px' }}>
                            <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-sona-teal mb-1">Expected outcome</div>
                            <p className="text-sm text-teal-800 font-light leading-relaxed">{idea.outcome}</p>
                          </div>
                        </div>
                      </ExpandableIdea>
                    ))}
                  </div>
                </section>

                {/* ToFu Content Ideas */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SonaDiamond size={10} className="text-sona-teal" />
                    <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Top-of-funnel content ideas</h2>
                  </div>
                  <div className="space-y-3">
                    {tofuContentIdeas.map((idea, i) => {
                      const Icon = idea.icon
                      return (
                        <ExpandableIdea
                          key={i}
                          title={
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Icon className="w-4 h-4 text-sona-teal shrink-0" strokeWidth={1.5} />
                                <span className="text-sm font-medium text-sona-dark-teal">{idea.title}</span>
                                <Badge variant="outline">{idea.format}</Badge>
                                <PriorityTag priorityId={idea.priority} />
                              </div>
                              <div className="font-mono text-[11px] text-sona-stone-400 ml-6">{idea.persona}</div>
                            </div>
                          }
                        >
                          <div className="pt-3 space-y-3">
                            <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{idea.description}</p>
                            <div className="p-3 bg-sky-50 border border-sky-200" style={{ borderRadius: '4px' }}>
                              <div className="flex items-center gap-2 mb-1">
                                <Target className="w-3.5 h-3.5 text-sky-700" strokeWidth={1.5} />
                                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-sky-700">Nando&apos;s personalisation</span>
                              </div>
                              <p className="text-sm text-sky-800 font-light leading-relaxed">{idea.personalisation}</p>
                            </div>
                          </div>
                        </ExpandableIdea>
                      )
                    })}
                  </div>
                </section>

                {/* Personalise Existing Assets */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SonaDiamond size={10} className="text-sona-teal" />
                    <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Personalise existing assets</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personalisedAssets.map((asset, i) => (
                      <Card key={i}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-sona-dark-teal">{asset.title}</span>
                          <PriorityTag priorityId={asset.priority} />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[11px] text-sona-stone-400">Base:</span>
                          <span className="font-mono text-[11px] text-sona-teal">{asset.baseAsset}</span>
                          <ArrowRight className="w-3 h-3 text-sona-stone-300" strokeWidth={1.5} />
                          <span className="font-mono text-[11px] text-sona-stone-400">{asset.persona}</span>
                        </div>
                        <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{asset.changes}</p>
                        <button className="mt-3 font-mono text-[11px] font-medium uppercase tracking-wider text-sona-teal hover:text-sona-dark-teal transition-colors">
                          Generate personalised version →
                        </button>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Direct Mail / Creative Gifting */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SonaDiamond size={10} className="text-sona-teal" />
                    <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Direct mail & creative gifting</h2>
                  </div>
                  <div className="space-y-3">
                    {directMailIdeas.map((idea, i) => (
                      <ExpandableIdea
                        key={i}
                        defaultOpen={i === 0}
                        title={
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <Gift className="w-4 h-4 text-amber-600 shrink-0" strokeWidth={1.5} />
                              <span className="text-sm font-medium text-sona-dark-teal">{idea.title}</span>
                              <PriorityTag priorityId={idea.priority} />
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-sona-stone-400 font-mono ml-6">
                              <span>To: {idea.recipient}</span>
                              <span>·</span>
                              <span>~{idea.estimatedCost}</span>
                              <span>·</span>
                              <span>{idea.timing}</span>
                            </div>
                          </div>
                        }
                      >
                        <div className="pt-3">
                          <p className="text-sm text-sona-stone-400 font-light leading-relaxed">{idea.description}</p>
                        </div>
                      </ExpandableIdea>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Engagement Map Tab */}
            {activeTab === 'engagement' && (
              <div className="space-y-4">
                <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">Multi-channel engagement map</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {channels.map((ch) => {
                    const Icon = ch.icon
                    return (
                      <Card key={ch.id}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn('p-2', ch.bgColor)} style={{ borderRadius: '4px' }}>
                            <Icon className={cn('w-4 h-4', ch.statusColor)} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-sona-dark-teal">{ch.name}</h3>
                            <span className={cn('font-mono text-[11px]', ch.statusColor)}>{ch.status}</span>
                          </div>
                        </div>
                        <div className="border-t border-sona-stone-200 pt-3 mt-1">
                          <div className="font-mono text-[10px] text-sona-stone-400 uppercase tracking-wider mb-1">Suggested next action</div>
                          <p className="text-xs text-sona-stone-400 font-light leading-relaxed">{ch.suggestedAction}</p>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400 mb-4">Warm introduction paths</h2>
                  <div className="space-y-3">
                    {warmIntros.map((intro) => (
                      <Card key={intro.id} hover>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Handshake className="w-4 h-4 text-sona-teal" strokeWidth={1.5} />
                              <h3 className="text-sm font-medium text-sona-dark-teal">{intro.title}</h3>
                              <Badge variant={intro.strengthVariant}>{intro.strength}</Badge>
                            </div>
                            <p className="text-sm text-sona-stone-400 font-light leading-relaxed ml-6">{intro.detail}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3">Mutual connections</h3>
                    <div className="font-mono text-2xl font-semibold text-sona-dark-teal mb-2">3</div>
                    <div className="space-y-2">
                      {[
                        'Sarah Bennett (AE) connected to Helen Park',
                        'Rob Sheridan (HoS) connected to James Whitfield',
                        'Emma Davies (Marketing) connected to Helen Park',
                      ].map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-sona-stone-400 font-light">
                          <span className="w-1.5 h-1.5 rounded-sm bg-sona-dark-teal shrink-0" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3">Event overlap</h3>
                    <div className="font-mono text-2xl font-semibold text-sona-dark-teal mb-2">2</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="success" dot>Confirmed</Badge>
                        <span className="text-sona-stone-400 font-light">Hospitality Leaders Summit — Apr 10</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="warning" dot>Likely</Badge>
                        <span className="text-sona-stone-400 font-light">QSR Innovation Conference — Jun 5</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Campaign Plan Tab */}
            {activeTab === 'campaign' && (
              <div className="space-y-6">
                <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-sona-stone-400">6-week campaign timeline</h2>

                <Card>
                  <div className="space-y-0">
                    {campaignTimeline.map((week, i) => (
                      <div key={i} className={cn('flex gap-4 py-4', i > 0 && 'border-t border-sona-stone-200')}>
                        <div className="w-16 shrink-0">
                          <span className="font-mono text-xs font-semibold text-sona-dark-teal">{week.week}</span>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {week.items.map((item, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-sona-stone-400 font-light">
                              <SonaDiamond size={8} className="text-sona-stone-300 shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3">Estimated budget</h3>
                    <div className="font-mono text-2xl font-semibold text-sona-dark-teal mb-3">£2,840</div>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Event sponsorship (drinks reception)', '£1,200'],
                        ['Direct mail (3 packages)', '£340'],
                        ['Executive dinner (contribution)', '£650'],
                        ['Content creation & promotion', '£350'],
                        ['Breakfast briefing (venue)', '£300'],
                      ].map(([item, cost], i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-sona-stone-400 font-light">{item}</span>
                          <span className="font-mono text-sm text-sona-dark-teal">{cost}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-sona-stone-400 mb-3">Success metrics</h3>
                    <div className="p-3 bg-sona-stone-100 border border-sona-stone-200 mb-3" style={{ borderRadius: '4px' }}>
                      <div className="font-mono text-[11px] text-sona-stone-400 uppercase tracking-wider mb-1">Primary goal</div>
                      <div className="text-sm font-medium text-sona-dark-teal">First meeting with decision maker within 8 weeks</div>
                    </div>
                    <div className="space-y-2">
                      {[
                        'LinkedIn connections with 2+ stakeholders',
                        'Face-to-face conversation at summit',
                        'Content engagement from COO or VP People',
                        'Demo request or meeting booked',
                        'Identify and engage CFO + IT Director',
                      ].map((metric, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-sona-stone-400 font-light">
                          <CheckCircle2 className="w-4 h-4 text-sona-stone-300 shrink-0" strokeWidth={1.5} />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </Tabs>
    </div>
  )
}
