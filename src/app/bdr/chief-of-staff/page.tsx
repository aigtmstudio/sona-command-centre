'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  BarChart3,
  TrendingUp,
  Calendar,
  CheckSquare,
  Square,
  Zap,
  Target,
  Clock,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  MessageCircle,
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
  component?: 'briefing' | 'projections' | 'whatif'
}

const quickActions = [
  { label: 'Show Projections', id: 'projections', icon: BarChart3 },
  { label: 'What-If Analysis', id: 'whatif', icon: SlidersHorizontal },
  { label: 'Afternoon Check-in', id: 'afternoon', icon: Clock },
  { label: 'Weekly Review', id: 'weekly', icon: Calendar },
]

const priorityAccounts = [
  { name: 'Burger King UK', score: 92, signal: 'HR Director posted about scheduling pain' },
  { name: 'Loungers Group', score: 88, signal: 'CFO engaged on ROI discussion' },
  { name: 'Barchester Healthcare', score: 85, signal: 'Allocate contract renewal in 8 months' },
]

const initialChecklist = [
  { id: 'c1', text: 'Follow up Barchester Healthcare — Patricia Holmes re: discovery call #2', done: false },
  { id: 'c2', text: 'Prepare Wagamama discovery call materials for 11am', done: false },
  { id: 'c3', text: 'Enrich 3 missing contacts for Five Guys UK buying committee', done: false },
  { id: 'c4', text: 'Send Loungers case study to Tortilla (Lisa Park) — re-engagement sequence', done: false },
]

export default function ChiefOfStaffPage() {
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
  const [callVolume, setCallVolume] = useState(40)
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
    if (actionId === 'projections') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Show me my meeting projections for this month.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: 'projections',
          timestamp: new Date().toISOString(),
          component: 'projections',
        })
      }, 1200)
    } else if (actionId === 'whatif') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Run a what-if analysis on my call volume.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: 'whatif',
          timestamp: new Date().toISOString(),
          component: 'whatif',
        })
      }, 1200)
    } else if (actionId === 'afternoon') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Give me an afternoon check-in.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `Here's your afternoon check-in, Max.\n\nYou've completed 2 of 4 morning tasks — nice work on the Wagamama prep. Your discovery call went well (45 min, strong engagement from COO).\n\nRemaining today:\n- Barchester follow-up at 3pm — make sure to reference the Allocate contract timeline\n- Enrich Five Guys contacts before EOD\n- Send Tortilla re-engagement email\n\nYou've made 12 calls today and sent 8 emails. That's solid activity. One more meeting booked would put you ahead of daily pace.`,
          timestamp: new Date().toISOString(),
        })
      }, 1500)
    } else if (actionId === 'weekly') {
      addMessage({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: 'Show me my weekly review.',
        timestamp: new Date().toISOString(),
      })
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `Here's your Week 12 review, Max.\n\nMeetings booked this week: 2 (Wagamama discovery, Barchester follow-up)\nTotal for March: 6 / 12 target\nCalls made: 87 this week (17.4/day average)\nEmails sent: 42\nLinkedIn touches: 15\n\nHighlights:\n- Burger King deal advancing — Tom Reynolds is championing internally\n- Loungers deal in proposal stage (James Cooper handling AE side)\n- 2 new inbound leads: Hobbycraft + Brunelcare\n\nAreas to focus:\n- Tortilla has gone dark (12 days no contact) — needs re-engagement\n- Five Guys buying committee incomplete — enrich contacts\n- Call volume slightly below target — aim for 20/day next week\n\nOverall: You're performing well on activity but need 6 more meetings in 12 days to hit target. Focus on high-signal accounts for best conversion.`,
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
        content: `That's a great question, Max. Based on your current pipeline and activity data, here's what I'd suggest:\n\nFocus your outreach on the high-signal accounts this afternoon — Burger King and Barchester both have strong intent signals that are time-sensitive. For Burger King, Tom Reynolds is ready to make the intro to Claire Matthews, so a quick follow-up email could accelerate that.\n\nFor Barchester, the Allocate contract renewal window gives you 8 months, but starting the deeper discovery now will pay off. Patricia Holmes responded well to the initial conversation.\n\nWant me to draft the follow-up emails for either of these accounts?`,
        timestamp: new Date().toISOString(),
      })
    }, 2000)
  }

  const projectedMeetings = Math.round((callVolume / 20) * 5 * 0.05 * 4)

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.component === 'briefing') {
      return (
        <div className="space-y-5">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Good morning, Max! Here&apos;s your daily briefing for Thursday, 19 March.
          </p>

          {/* Target Progress */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Monthly Target Progress</span>
            </div>
            <ProgressBar
              value={6}
              max={12}
              label="Meetings Booked"
              showFraction
              color="bg-sona-dark-teal"
            />
            <p className="text-xs text-amber-600 mt-2">
              You&apos;re 2 days behind pace. You need 6 meetings in the remaining 12 business days (0.5/day).
            </p>
          </div>

          {/* Priority Accounts */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-sona-dark-teal">Top 3 Priority Accounts</span>
            </div>
            <div className="space-y-2">
              {priorityAccounts.map((acct) => (
                <div
                  key={acct.name}
                  className="flex items-center gap-3 bg-sona-stone-100 rounded p-3"
                >
                  <span
                    className={cn(
                      'inline-flex items-center justify-center w-8 h-8 rounded-sm text-xs font-bold',
                      acct.score >= 90
                        ? 'bg-teal-500/15 text-sona-teal'
                        : acct.score >= 80
                        ? 'bg-teal-500/15 text-sona-teal'
                        : 'bg-amber-500/15 text-amber-600'
                    )}
                  >
                    {acct.score}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-sona-dark-teal">{acct.name}</div>
                    <div className="text-xs text-sona-stone-400">{acct.signal}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-sona-stone-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Overnight Leads */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold text-sona-dark-teal">Overnight Leads</span>
            </div>
            <p className="text-sm text-sona-stone-400">
              2 new inbound leads assigned to you:
            </p>
            <ul className="mt-2 space-y-1">
              <li className="text-sm text-sona-dark-teal flex items-center gap-2">
                <Badge variant="purple" className="text-[10px]">Content Download</Badge>
                <span>Hobbycraft</span>
                <span className="text-xs text-sona-stone-400">— HR Director downloaded retail workforce guide</span>
              </li>
              <li className="text-sm text-sona-dark-teal flex items-center gap-2">
                <Badge variant="info" className="text-[10px]">Webinar Attendee</Badge>
                <span>Brunelcare</span>
                <span className="text-xs text-sona-stone-400">— IT Director attended scheduling webinar</span>
              </li>
            </ul>
          </div>

          {/* Calendar */}
          <div className="bg-sona-stone-100 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Today&apos;s Calendar</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-sona-stone-400 w-16">9:00 AM</span>
                <span className="text-sona-dark-teal">Team standup</span>
                <Badge variant="outline" className="text-[10px]">Internal</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-sona-stone-400 w-16">11:00 AM</span>
                <span className="text-sona-dark-teal">Wagamama discovery call</span>
                <Badge variant="info" className="text-[10px]">External</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-sona-stone-400 w-16">3:00 PM</span>
                <span className="text-sona-dark-teal">Barchester follow-up</span>
                <Badge variant="info" className="text-[10px]">External</Badge>
              </div>
            </div>
          </div>

          {/* Action Checklist */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="w-4 h-4 text-sona-teal" />
              <span className="text-sm font-semibold text-sona-dark-teal">Today&apos;s Action Items</span>
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
                      item.done
                        ? 'text-sona-stone-400 line-through'
                        : 'text-sona-dark-teal'
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

    if (msg.component === 'projections') {
      return (
        <div className="space-y-4">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Here are your meeting projections for March, Max:
          </p>
          <div className="bg-sona-stone-100 rounded p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 rounded p-3">
                <div className="text-xs text-sona-stone-400 mb-1">Current Pace</div>
                <div className="text-lg font-bold text-sona-dark-teal">40 calls/week</div>
                <div className="text-xs text-sona-stone-400">5% conversion rate</div>
              </div>
              <div className="bg-white/50 rounded p-3">
                <div className="text-xs text-sona-stone-400 mb-1">Projected Result</div>
                <div className="text-lg font-bold text-amber-600">8 meetings</div>
                <div className="text-xs text-red-600">4 short of target</div>
              </div>
            </div>
            <div className="border-t border-sona-stone-200 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-sona-teal" />
                <span className="text-sm font-medium text-sona-dark-teal">Recommendation</span>
              </div>
              <p className="text-sm text-sona-stone-400">
                Increase call volume by <span className="text-sona-dark-teal font-semibold">15 calls/week</span> to project <span className="text-sona-teal font-semibold">11 meetings</span> this month. Alternatively, focus on higher-signal accounts to improve conversion from 5% to 7%.
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (msg.component === 'whatif') {
      return (
        <div className="space-y-4">
          <p className="text-sm text-sona-dark-teal leading-relaxed">
            Adjust the call volume slider to see projected meeting outcomes:
          </p>
          <div className="bg-sona-stone-100 rounded p-4 space-y-4">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-sona-stone-400">Weekly Call Volume</span>
                <span className="text-sm font-bold text-sona-dark-teal">{callVolume} calls/week</span>
              </div>
              <input
                type="range"
                min={20}
                max={80}
                value={callVolume}
                onChange={(e) => setCallVolume(Number(e.target.value))}
                className="w-full h-2 bg-sona-stone-100 rounded-sm appearance-none cursor-pointer accent-sona-teal"
              />
              <div className="flex justify-between text-xs text-sona-stone-400 mt-1">
                <span>20</span>
                <span>40 (current)</span>
                <span>60</span>
                <span>80</span>
              </div>
            </div>

            {/* Projections */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/50 rounded p-3 text-center">
                <div className="text-xs text-sona-stone-400 mb-1">Daily Calls</div>
                <div className="text-lg font-bold text-sona-dark-teal">
                  {Math.round(callVolume / 5)}
                </div>
              </div>
              <div className="bg-white/50 rounded p-3 text-center">
                <div className="text-xs text-sona-stone-400 mb-1">Projected Meetings</div>
                <div
                  className={cn(
                    'text-lg font-bold',
                    projectedMeetings >= 12
                      ? 'text-sona-teal'
                      : projectedMeetings >= 10
                      ? 'text-amber-600'
                      : 'text-red-600'
                  )}
                >
                  {projectedMeetings}
                </div>
              </div>
              <div className="bg-white/50 rounded p-3 text-center">
                <div className="text-xs text-sona-stone-400 mb-1">vs Target</div>
                <div
                  className={cn(
                    'text-lg font-bold',
                    projectedMeetings >= 12
                      ? 'text-sona-teal'
                      : 'text-red-600'
                  )}
                >
                  {projectedMeetings >= 12 ? '+' : ''}{projectedMeetings - 12}
                </div>
              </div>
            </div>

            <ProgressBar
              value={projectedMeetings}
              max={12}
              label="Projected vs Target"
              showFraction
              color={
                projectedMeetings >= 12
                  ? 'bg-emerald-400'
                  : projectedMeetings >= 10
                  ? 'bg-amber-400'
                  : 'bg-red-400'
              }
            />
          </div>
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
          BDR Chief of Staff
        </h1>
        <p className="text-sona-stone-400 mt-1">
          Your AI-powered daily companion for briefings, projections, and coaching.
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
              <Avatar name="Max Chen" size="sm" className="mt-1" />
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
          placeholder="Ask your Chief of Staff anything..."
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
