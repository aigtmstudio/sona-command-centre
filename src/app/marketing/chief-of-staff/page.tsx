'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  MessageCircle,
  Calendar,
  BarChart3,
  FileText,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  CheckSquare,
  Square,
  ChevronRight,
  Zap,
  Users,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
  component?: 'briefing' | 'event-roi' | 'content-performance'
}

const quickActions = [
  { label: 'Event ROI', id: 'event-roi', icon: BarChart3 },
  { label: 'Content Performance', id: 'content-performance', icon: FileText },
  { label: 'Campaign Calendar', id: 'campaign-calendar', icon: Calendar },
  { label: 'Weekly Review', id: 'weekly-review', icon: Clock },
]

const initialChecklist = [
  { id: 'c1', text: 'Finalise webinar slide deck for "AI for Frontline Workforce" (Mar 28)', done: false },
  { id: 'c2', text: 'Chase Hospitality Leaders Summit for delegate list', done: false },
  { id: 'c3', text: 'Review post-event follow-up sequence with Ryan', done: false },
]

const upcomingCampaigns = [
  { name: 'AI for Frontline Workforce Webinar', date: 'Mar 28', type: 'Webinar', status: 'Prep' },
  { name: 'Hospitality Leaders Summit', date: 'Apr 10', type: 'Conference', status: 'Planning' },
  { name: 'Spring Content Campaign', date: 'Apr 1-30', type: 'Content', status: 'In Progress' },
]

const eventROIData = [
  { event: 'Future of Work Webinar', date: 'Feb 12', leads: 67, pipeline: '£85K', closedWon: '£12K', roi: '340%' },
  { event: 'Hospitality Tech Summit', date: 'Feb 20', leads: 42, pipeline: '£120K', closedWon: '£0', roi: 'TBD' },
  { event: 'Social Care Roundtable', date: 'Mar 5', leads: 89, pipeline: '£210K', closedWon: '£0', roi: 'TBD' },
  { event: 'AI in Scheduling Webinar', date: 'Jan 15', leads: 53, pipeline: '£65K', closedWon: '£28K', roi: '560%' },
]

const contentPerformanceData = [
  { title: 'Hospitality ROI Calculator', type: 'Tool', views: 342, shares: 28, meetings: 8 },
  { title: 'Loungers Case Study', type: 'Case Study', views: 286, shares: 22, meetings: 5 },
  { title: 'Social Care Scheduling Guide', type: 'Whitepaper', views: 215, shares: 15, meetings: 4 },
  { title: 'Fourth Migration Guide', type: 'One-Pager', views: 178, shares: 31, meetings: 6 },
  { title: 'Frontline App Comparison', type: 'Blog', views: 156, shares: 12, meetings: 2 },
]

export default function MarketingChiefOfStaffPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: 'briefing',
      timestamp: new Date().toISOString(),
      component: 'briefing',
    },
  ])
  const [checklist, setChecklist] = useState(initialChecklist)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg])
  }

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'event-roi') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Show me the event ROI breakdown.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: 'event-roi',
          timestamp: new Date().toISOString(),
          component: 'event-roi',
        })
      }, 1200)
    } else if (actionId === 'content-performance') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Show me top performing content assets.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: 'content-performance',
          timestamp: new Date().toISOString(),
          component: 'content-performance',
        })
      }, 1200)
    } else if (actionId === 'campaign-calendar') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'What\'s on the campaign calendar?',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `Here's your campaign calendar for the next 6 weeks, Emma:\n\nMar 28 — AI for Frontline Workforce Webinar\n124 registered, target 150. Slide deck needs finalising. Ryan is handling promotion. Reminder emails scheduled for Mar 25 and Mar 27.\n\nApr 1-30 — Spring Content Campaign\nTheme: "The True Cost of Manual Scheduling". 3 blog posts, 1 whitepaper, LinkedIn ad campaign. Budget: £1,200. Lily is leading content creation.\n\nApr 10 — Hospitality Leaders Summit\nConference sponsorship + speaking slot. Delegate list not yet received. Pre-event intelligence prep needed. Budget: £3,500.\n\nMay 15 — Social Care Innovation Conference\nBooth + panel participation confirmed. Planning phase — content brief due Apr 15.\n\nOverall Q1 event spend: £8,200 of £12,000 budget (68% used).`,
          timestamp: new Date().toISOString(),
        })
      }, 1500)
    } else if (actionId === 'weekly-review') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Give me the weekly marketing review.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `Here's your Week 12 marketing review, Emma:\n\nMQLs this week: 9 (34 MTD, tracking to 42 for March — 24% above target)\nPipeline sourced: £95K this week (£420K QTD)\nContent published: 2 blog posts, 1 case study update\nSocial engagement: +18% LinkedIn impressions, 3 posts with >100 interactions\n\nHighlights:\n- Social Care Roundtable post-event leads are converting well — 28 of 41 contacted\n- Webinar registrations for Mar 28 hit 124 (83% of target)\n- Loungers case study driving strong engagement from hospitality prospects\n\nAreas to focus:\n- Hospitality Leaders Summit delegate list still outstanding — chase organisers\n- Post-event follow-up sequences have 5 overdue contacts — sync with BDR team\n- Content gap analysis shows zero CFO-targeted content — prioritise whitepaper\n\nTeam pulse:\n- Lily: On track, managing enrichment and social content\n- Ryan: Slightly stretched — webinar prep + post-event sequences running parallel`,
          timestamp: new Date().toISOString(),
        })
      }, 1500)
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMsg)
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      addMessage({
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Great question, Emma. Based on the latest data:\n\nThe marketing-sourced pipeline is performing well this quarter at £420K (26% of total company pipeline of £1.6M). Events are your strongest channel — the Social Care Roundtable alone generated £210K in pipeline from 89 leads.\n\nFor the upcoming webinar, I'd recommend:\n1. Boost registration with a LinkedIn ad targeting hospitality HR directors — we're 26 short of the 150 target\n2. Prepare a post-webinar nurture sequence with the hospitality ROI calculator as the lead magnet\n3. Brief the BDR team on expected MQLs so they're ready for same-day follow-up\n\nWant me to draft the LinkedIn ad copy or the post-webinar nurture sequence?`,
        timestamp: new Date().toISOString(),
      })
    }, 2000)
  }

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.component === 'briefing') {
      return (
        <div className="space-y-5">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Good morning, Emma! Here&apos;s your marketing briefing for Thursday, 19 March.
          </p>

          {/* Today's Deadlines */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-sona-dark-teal">Today&apos;s Deadlines</span>
            </div>
            <p className="text-sm text-sona-stone-400">
              Webinar slide deck due — <span className="text-sona-dark-teal font-medium">&quot;AI for Frontline Workforce&quot;</span> (Mar 28, 9 days away)
            </p>
          </div>

          {/* Overnight Activity */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-sona-dark-teal">Overnight Activity</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="info" className="text-[10px]">Registrations</Badge>
                <span className="text-sona-dark-teal">4 new event registrations</span>
                <span className="text-xs text-sona-stone-400">(webinar now at 124)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="purple" className="text-[10px]">Downloads</Badge>
                <span className="text-sona-dark-teal">2 content downloads</span>
                <span className="text-xs text-sona-stone-400">(hospitality case study)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="success" className="text-[10px]">Demo Request</Badge>
                <span className="text-sona-dark-teal">1 demo request from website</span>
                <span className="text-xs text-sona-stone-400">(Compass Group)</span>
              </div>
            </div>
          </div>

          {/* Campaign Calendar */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Upcoming Campaigns</span>
            </div>
            <div className="space-y-2">
              {upcomingCampaigns.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-sona-stone-100 rounded p-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-sona-dark-teal">{c.name}</div>
                    <div className="text-xs text-sona-stone-400">{c.date}</div>
                  </div>
                  <Badge variant="outline">{c.type}</Badge>
                  <Badge variant={c.status === 'In Progress' ? 'success' : c.status === 'Prep' ? 'warning' : 'info'}>{c.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Contribution */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Pipeline Contribution</span>
            </div>
            <p className="text-sm text-sona-stone-400">
              Marketing-sourced pipeline this quarter: <span className="text-sona-dark-teal font-bold">£420K</span> <span className="text-sona-teal">(26% of total)</span>
            </p>
            <ProgressBar value={420} max={500} label="Q1 Target: £500K" showFraction={false} color="bg-emerald-400" className="mt-3" />
            <div className="flex justify-between text-xs text-sona-stone-400 mt-1">
              <span>£420K sourced</span>
              <span>£500K target</span>
            </div>
          </div>

          {/* Action Items */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Outstanding Tasks</span>
            </div>
            <div className="space-y-1.5">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="w-full flex items-start gap-2.5 p-2 rounded hover:bg-sona-stone-100 transition-colors text-left"
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-sona-teal mt-0.5 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-sona-stone-400 mt-0.5 shrink-0" />
                  )}
                  <span
                    className={cn(
                      'text-sm',
                      item.done ? 'text-sona-stone-400 line-through' : 'text-sona-dark-teal'
                    )}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (msg.component === 'event-roi') {
      return (
        <div className="space-y-4">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Here&apos;s the event ROI breakdown for this quarter, Emma:
          </p>
          <div className="bg-sona-stone-100 rounded p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sona-stone-200">
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-2 pr-3">Event</th>
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-2 pr-3">Date</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2 pr-3">Leads</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2 pr-3">Pipeline</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2 pr-3">Closed Won</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2">ROI</th>
                </tr>
              </thead>
              <tbody>
                {eventROIData.map((row, i) => (
                  <tr key={i} className="border-b border-sona-stone-200 last:border-0">
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal">{row.event}</td>
                    <td className="py-2 pr-3 text-xs text-sona-stone-400">{row.date}</td>
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal text-right">{row.leads}</td>
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal text-right">{row.pipeline}</td>
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal text-right">{row.closedWon}</td>
                    <td className="py-2 text-sm text-right">
                      <span className={row.roi === 'TBD' ? 'text-sona-stone-400' : 'text-sona-teal font-medium'}>
                        {row.roi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-sona-stone-400">
            Total leads generated: <span className="text-sona-dark-teal font-medium">251</span> | Total pipeline: <span className="text-sona-dark-teal font-medium">£480K</span> | Closed won: <span className="text-sona-teal font-medium">£40K</span>
          </p>
        </div>
      )
    }

    if (msg.component === 'content-performance') {
      return (
        <div className="space-y-4">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Here are your top 5 content assets by sales team usage this month:
          </p>
          <div className="bg-sona-stone-100 rounded p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sona-stone-200">
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-2 pr-3">Asset</th>
                  <th className="text-left text-xs font-medium text-sona-stone-400 pb-2 pr-3">Type</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2 pr-3">Views</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2 pr-3">Sales Shares</th>
                  <th className="text-right text-xs font-medium text-sona-stone-400 pb-2">Meetings Attributed</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformanceData.map((row, i) => (
                  <tr key={i} className="border-b border-sona-stone-200 last:border-0">
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal">{row.title}</td>
                    <td className="py-2 pr-3">
                      <Badge variant="outline">{row.type}</Badge>
                    </td>
                    <td className="py-2 pr-3 text-sm text-sona-stone-400 text-right">{row.views}</td>
                    <td className="py-2 pr-3 text-sm text-sona-dark-teal text-right font-medium">{row.shares}</td>
                    <td className="py-2 text-sm text-right">
                      <span className="text-sona-teal font-medium">{row.meetings}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-sona-stone-400">
            The hospitality ROI calculator is your best performing asset — it&apos;s been shared by sales 28 times and attributed to 8 meetings. Consider creating a social care version.
          </p>
        </div>
      )
    }

    // Regular text message
    return (
      <div className="text-sm text-sona-dark-teal leading-relaxed whitespace-pre-line">
        {msg.content}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-sona-teal" />
          Marketing Chief of Staff
        </h1>
        <p className="text-sona-stone-400 mt-1">
          Your AI-powered marketing companion for briefings, event ROI, and campaign intelligence.
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-3',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-sm bg-teal-100 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-sona-teal" />
              </div>
            )}
            <div
              className={cn(
                'rounded px-4 py-3 max-w-[85%]',
                msg.role === 'user'
                  ? 'bg-sona-dark-teal text-white'
                  : 'bg-white border border-sona-stone-200'
              )}
            >
              {renderMessageContent(msg)}
            </div>
            {msg.role === 'user' && (
              <Avatar name="Emma Davies" size="sm" className="mt-1" />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-sm bg-teal-100 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-sona-teal" />
            </div>
            <div className="bg-white border border-sona-stone-200 rounded px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-sona-stone-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-sm bg-sona-stone-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-sm bg-sona-stone-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap gap-2 py-3 border-t border-sona-stone-200">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex items-center gap-1.5 bg-white border border-sona-stone-200 hover:border-sona-teal/30 text-sm text-sona-stone-400 hover:text-sona-dark-teal px-3 py-1.5 rounded-sm transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          )
        })}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-2 pb-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Ask your Marketing Chief of Staff anything..."
          className="flex-1 bg-white border border-sona-stone-200 rounded px-4 py-3 text-sm text-sona-dark-teal placeholder:text-sona-stone-400 focus:outline-none focus:border-sona-teal/50"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="w-10 h-10 rounded bg-sona-dark-teal hover:bg-sona-dark-teal/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}
