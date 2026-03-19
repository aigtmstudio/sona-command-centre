'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  BarChart3,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  Target,
  Lightbulb,
  PoundSterling,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { cn, formatCurrency } from '@/lib/utils'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
}

const stageData = [
  { label: 'S1', value: 880000, color: 'bg-sky-500', width: '100%' },
  { label: 'S2', value: 680000, color: 'bg-cyan-500', width: '77%' },
  { label: 'S3', value: 570000, color: 'bg-amber-500', width: '65%' },
  { label: 'S4', value: 220000, color: 'bg-orange-500', width: '25%' },
  { label: 'S5', value: 0, color: 'bg-teal-500', width: '0%' },
]

const quickActions = [
  { id: 'pipeline-coaching', label: 'Pipeline Coaching', icon: Target },
  { id: 'weekly-planning', label: 'Weekly Planning', icon: Calendar },
  { id: 'time-allocation', label: 'Time Allocation', icon: Clock },
  { id: 'friday-review', label: 'Friday Review', icon: BarChart3 },
]

const morningBriefing = `Good morning, Sarah. Here's your daily briefing for Wednesday, 19 March 2026.

**Pipeline Snapshot**
Your total pipeline sits at £850K against a £400K quarterly target — that's 2.1x coverage, which is healthy. Weighted forecast is £215K.

**Stage Breakdown**
[STAGE_BARS]

**Today's Meetings (3)**
• **10:00 AM** — Discovery Call with Wagamama (Marcus Webb, COO + James Liu, IT Director). Focus on quantifying scheduling overhead across 150+ sites.
• **2:00 PM** — Follow-up with Loungers (Rachel Green, COO). Proposal feedback expected. Legal review should start this week.
• **4:30 PM** — Internal Prep for Barchester deep-dive (next Tuesday). Prepare Allocate displacement case study.

**At-Risk Deals**
• ⚠️ **Tortilla** — No contact in 12 days. Deal may be going cold. Economic Buyer and Decision Process are completely unknown. Recommend: Re-engage Lisa Park today with the hospitality case study.
• ⚠️ **HC-One** — Single-threaded through IT Director only. No committed next meeting date. Recommend: Chase Raj Mehta for intro to Head of Operations.

**Follow-ups Due**
• Anchor Hanover — Need to re-engage with new COO (David Brown). Craft personalised outreach today.
• Nando's — BDR (Harry) to identify HR Director. Check in on progress.

What would you like to dig into?`

const pipelineCoachingResponse = `Here's your deal-by-deal pipeline assessment:

**Burger King — £350K (S3-Solution)** ✅
Strong deal. MEDDIC is solid with high confidence on Metrics, Pain, and Champion. Key risk: single-threaded through Ops Director. Action: Get the HR Director (Claire Matthews) into a meeting before the next stage gate.

**Barchester — £450K (S2-Discovery)** 🟡
High-value but early stage. Competitor threat from Civica and budget not confirmed for FY27. The discovery call next Tuesday is critical — you need to map the full procurement process and get Patricia Holmes committed to an evaluation timeline.

**Tortilla — £180K (S2-Discovery)** 🔴
This deal is at serious risk. 28 days in stage with no contact for 12 days. MEDDIC gaps everywhere — no Economic Buyer, no Decision Process. You need to re-engage immediately or consider deprioritising.

**Nando's — £500K (S1-Qualified)** 🟡
Massive potential but extremely early. Zero MEDDIC coverage. This is a 12-18 month play. Don't over-invest time here at the expense of deals that can close this quarter.

**Anchor Hanover — £320K (S1-Qualified)** 🔴
No committed next step. New COO (David Brown) needs to be engaged from scratch. Research his background at Bupa and craft a personalised approach. This could be a great deal if you can build the relationship.

**Overall Assessment:** Your pipeline is top-heavy with early-stage deals. Focus this week on advancing Burger King to S4 and re-engaging Tortilla before it dies.`

const timeAllocationResponse = `Here's your time allocation analysis for the past 2 weeks:

**Time Spend vs Pipeline Value**

| Deal | % of Your Time | % of Pipeline | Verdict |
|------|---------------|---------------|---------|
| Burger King (£350K) | 25% | 19% | ✅ Well-balanced |
| Barchester (£450K) | 20% | 24% | ✅ Could use more |
| Tortilla (£180K) | 5% | 10% | 🔴 Under-invested |
| Nando's (£500K) | 15% | 27% | 🟡 Over-invested for S1 |
| Anchor Hanover (£320K) | 5% | 17% | 🔴 Needs attention |
| Admin / Internal | 30% | — | 🟡 High |

**Key Insight:** You're spending 15% of your time on Nando's which is worth 27% of pipeline but only has 5% probability. That's 15% of your week on a deal worth £25K weighted. Meanwhile, Tortilla (£45K weighted) and Anchor Hanover (£32K weighted) are getting almost no attention.

**Recommendation:** Shift 10% of your Nando's time to Tortilla and Anchor Hanover this week. Nando's is a BDR-led deal at this stage — Harry should be driving first contact. Your energy is better spent on deals you can influence right now.

Also: 30% admin time is high. Use the Admin Assistant module to automate post-meeting CRM updates — that alone could save you 3-4 hours per week.`

const weeklyPlanningResponse = `Here's your recommended weekly plan for 19-23 March:

**Monday (Today)**
• 10:00 — Wagamama Discovery Call (prep in Discovery Coach)
• 14:00 — Loungers Follow-up (proposal feedback)
• 16:30 — Barchester prep session (internal)
• End of day: Re-engage Tortilla (send Lisa Park the hospitality case study + suggest a call)

**Tuesday**
• AM — Barchester Discovery Call #2 with Patricia Holmes
• PM — Anchor Hanover outreach: Research David Brown (new COO), draft personalised email
• Chase Raj Mehta (HC-One) for intro to Head of Ops

**Wednesday**
• AM — Follow up on Loungers legal review timeline
• PM — Nando's: Check in with Harry (BDR) on outreach progress
• Prepare Wagamama demo materials for March 25

**Thursday**
• AM — Pipeline review with Kate Harrison (AE Manager)
• PM — Asset prep: Generate Wagamama-specific one-pager and scheduling mockup
• Follow up on any open action items

**Friday**
• AM — CRM hygiene: Update all deal stages and MEDDIC scores
• PM — Weekly reflection and planning for next week
• Send Barchester the Allocate displacement case study

**Priority Stack:**
1. Wagamama discovery (today) — highest impact meeting this week
2. Tortilla re-engagement (today) — save this deal before it's too late
3. Barchester deep-dive (Tuesday) — advance the largest deal
4. Anchor Hanover outreach (Tuesday) — start building the COO relationship`

const fridayReviewResponse = `Here's your weekly review for the week of 12-19 March:

**Wins This Week** 🎉
• Burger King demo went well — Tom Reynolds highly engaged, Gong sentiment 92/100
• Loungers proposal sent — strong MEDDIC across all fields, CFO engaged
• Caring Homes on track — Sarah Chen presenting to board on Monday

**Pipeline Movement**
• Burger King: S2 → S3 (+£350K at S3)
• No other stage progressions this week

**Metrics**
• Calls made: 8
• Emails sent: 23
• Meetings held: 6
• MEDDIC fields updated: 12
• New contacts engaged: 2

**Concerns** ⚠️
• Tortilla hasn't moved in 28 days — needs immediate action
• HC-One still single-threaded — risk increasing
• No deals in S5 (Negotiation) — need to push Loungers forward

**Next Week Focus**
Your biggest leverage point next week is the Wagamama discovery call on March 25. If you can quantify the pain and map the buying committee, this could be a fast-moving deal given the COO's enthusiasm.

Second priority: Save Tortilla. If you can't re-engage by Wednesday, consider whether to deprioritise and reallocate time.

Overall: Good week on execution, but pipeline progression was slower than ideal. Push for at least one stage advancement next week.`

export default function ChiefOfStaffPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: morningBriefing,
      timestamp: '09:00 AM',
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [...prev, { id: Date.now().toString(), role, content, timestamp }])
  }

  const handleQuickAction = (actionId: string) => {
    const labelMap: Record<string, string> = {
      'pipeline-coaching': 'Pipeline Coaching',
      'weekly-planning': 'Weekly Planning',
      'time-allocation': 'Time Allocation',
      'friday-review': 'Friday Review',
    }
    const responseMap: Record<string, string> = {
      'pipeline-coaching': pipelineCoachingResponse,
      'weekly-planning': weeklyPlanningResponse,
      'time-allocation': timeAllocationResponse,
      'friday-review': fridayReviewResponse,
    }

    addMessage('user', labelMap[actionId])
    setTimeout(() => {
      addMessage('assistant', responseMap[actionId])
    }, 500)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    addMessage('user', userMsg)

    setTimeout(() => {
      addMessage(
        'assistant',
        `Great question. Based on your current pipeline and activity data, here's what I'd suggest:\n\nFor "${userMsg}" — I'd recommend focusing on the deals with the highest weighted value and nearest close dates. Your Loungers deal (£220K, 70% probability) is your best bet for this quarter. The Wagamama discovery call today could also be a game-changer if you nail the pain quantification.\n\nWant me to go deeper on any specific deal or topic?`
      )
    }, 800)
  }

  const renderContent = (content: string) => {
    if (content.includes('[STAGE_BARS]')) {
      const parts = content.split('[STAGE_BARS]')
      return (
        <>
          {renderMarkdown(parts[0])}
          <div className="my-3 space-y-2">
            {stageData.map((stage) => (
              <div key={stage.label} className="flex items-center gap-3">
                <span className="text-xs text-sona-stone-400 w-6">{stage.label}</span>
                <div className="flex-1 bg-sona-stone-100 rounded-sm h-4 overflow-hidden">
                  <div
                    className={cn('h-full rounded-sm transition-all', stage.color)}
                    style={{ width: stage.value > 0 ? `${Math.max((stage.value / 880000) * 100, 5)}%` : '0%' }}
                  />
                </div>
                <span className="text-xs text-sona-dark-teal w-16 text-right">{formatCurrency(stage.value)}</span>
              </div>
            ))}
          </div>
          {renderMarkdown(parts[1])}
        </>
      )
    }
    return renderMarkdown(content)
  }

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    return (
      <div className="space-y-1">
        {lines.map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="text-sm font-semibold text-sona-dark-teal mt-3 first:mt-0">{line.replace(/\*\*/g, '')}</p>
          }
          if (line.includes('**')) {
            const parts = line.split(/(\*\*.*?\*\*)/)
            return (
              <p key={i} className="text-sm text-sona-dark-teal">
                {parts.map((part, j) =>
                  part.startsWith('**') && part.endsWith('**') ? (
                    <span key={j} className="font-semibold text-sona-dark-teal">{part.replace(/\*\*/g, '')}</span>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            )
          }
          if (line.startsWith('• ') || line.startsWith('- ')) {
            return <p key={i} className="text-sm text-sona-dark-teal pl-2">{line}</p>
          }
          if (line.startsWith('| ')) {
            // Simple table rendering
            const cells = line.split('|').filter(Boolean).map((c) => c.trim())
            if (cells.every((c) => c.match(/^-+$/))) return null
            return (
              <div key={i} className="flex gap-2 text-xs font-mono">
                {cells.map((cell, j) => (
                  <span key={j} className={cn('flex-1', j === 0 ? 'text-sona-dark-teal' : 'text-sona-stone-400')}>
                    {cell}
                  </span>
                ))}
              </div>
            )
          }
          if (line.trim() === '') return <div key={i} className="h-1" />
          return <p key={i} className="text-sm text-sona-dark-teal">{line}</p>
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sona-bg flex flex-col" style={{ height: '100vh' }}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-sona-dark-teal">AE Chief of Staff</h1>
            <p className="text-sona-stone-400 mt-1">Your AI-powered sales co-pilot</p>
          </div>
          <Badge variant="info" className="text-sm px-3 py-1">
            <Bot className="w-4 h-4 mr-1" /> AI Assistant
          </Badge>
        </div>

        {/* Quick Action Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-sona-stone-200 rounded text-sm text-sona-dark-teal hover:border-sona-teal/30 hover:text-sona-dark-teal transition-all"
            >
              <action.icon className="w-4 h-4 text-sona-teal" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-sona-teal" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded p-4',
                msg.role === 'user'
                  ? 'bg-sona-dark-teal text-white'
                  : 'bg-white border border-sona-stone-200'
              )}
            >
              {msg.role === 'assistant' ? renderContent(msg.content) : (
                <p className="text-sm">{msg.content}</p>
              )}
              <p className={cn('text-xs mt-2', msg.role === 'user' ? 'text-sona-stone-200' : 'text-sona-stone-400')}>
                {msg.timestamp}
              </p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded bg-teal-500/20 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-sona-teal" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-6 pt-3 border-t border-sona-stone-200 bg-sona-bg">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your pipeline, deals, or strategy..."
            className="flex-1 bg-white border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-3 focus:outline-none focus:border-sona-teal placeholder:text-sona-stone-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              'p-3 rounded transition-colors',
              input.trim()
                ? 'bg-sona-dark-teal text-white hover:bg-sona-dark-teal/80'
                : 'bg-sona-stone-100 text-sona-stone-400'
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
