'use client'

import { useState } from 'react'
import Card from '@/components/shared/Card'
import Avatar from '@/components/shared/Avatar'
import ProgressBar from '@/components/shared/ProgressBar'
import Badge from '@/components/shared/Badge'
import Tabs from '@/components/shared/Tabs'
import {
  BookOpen,
  Brain,
  GraduationCap,
  Trophy,
  CheckCircle2,
  Circle,
  XCircle,
  ArrowRight,
  Flame,
  Medal,
} from 'lucide-react'

// Quiz Data
interface QuizData {
  id: string
  title: string
  questions: number
  time: string
  completion: number
  items: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }[]
}

const quizzes: QuizData[] = [
  {
    id: 'product',
    title: 'Product Knowledge',
    questions: 3,
    time: '5 min',
    completion: 72,
    items: [
      {
        question: "What is Sona's primary differentiator against Fourth in the hospitality market?",
        options: [
          'Lower price point across all tiers',
          'Modern mobile-first UX with real-time scheduling and superior support responsiveness',
          'More integrations with POS systems',
          'Larger customer base in the UK',
        ],
        correct: 1,
        explanation: "Sona's key differentiator against Fourth is the modern, mobile-first user experience combined with real-time scheduling capabilities and dramatically better support response times. Fourth's legacy platform and declining support quality are the most common pain points.",
      },
      {
        question: 'Which of the following is NOT a core module in the Sona platform?',
        options: [
          'Workforce scheduling & rota management',
          'Payroll integration & reconciliation',
          'Recruitment & applicant tracking',
          'Compliance & reporting dashboard',
        ],
        correct: 2,
        explanation: 'Sona does not offer a recruitment/ATS module. The core platform covers scheduling, payroll integration, compliance reporting, and workforce management. Knowing this boundary helps set correct expectations with prospects.',
      },
      {
        question: 'What is the typical implementation timeline for a mid-market Sona deployment (50-200 sites)?',
        options: [
          '1-2 weeks',
          '4-6 weeks with phased rollout',
          '3-6 months',
          '12+ months',
        ],
        correct: 1,
        explanation: 'Mid-market deployments typically complete in 4-6 weeks with a phased site rollout. This is a significant competitive advantage over Fourth (3-6 months) and Allocate (6-12 months). Use this in proposals.',
      },
    ],
  },
  {
    id: 'competitive',
    title: 'Competitive Intel',
    questions: 3,
    time: '5 min',
    completion: 58,
    items: [
      {
        question: "What is Fourth's biggest weakness that Sona should exploit in competitive deals?",
        options: [
          'Their pricing is too high for SMBs',
          'Declining support quality and slow response times post-acquisition',
          'They lack mobile capabilities entirely',
          "They don't serve the hospitality vertical",
        ],
        correct: 1,
        explanation: "Since Fourth's acquisition, their support team has been restructured and response times have increased significantly. Multiple prospects cite 48-72 hour support response times. This is Sona's strongest displacement angle.",
      },
      {
        question: 'When competing against Deputy in the hospitality space, what is the key messaging angle?',
        options: [
          'Sona is cheaper than Deputy',
          'Deputy lacks basic scheduling features',
          'Sona offers enterprise-grade compliance and multi-site management that Deputy lacks at scale',
          'Deputy is not available in the UK',
        ],
        correct: 2,
        explanation: 'Deputy works well for single-site or small chains but struggles with enterprise compliance requirements, complex multi-site scheduling rules, and UK-specific regulations. Position Sona as the enterprise upgrade path.',
      },
      {
        question: 'In social care, what is the main displacement angle against Allocate?',
        options: [
          'Sona has more features overall',
          'Allocate does not support CQC compliance',
          'Allocate is a legacy system with poor UX, and staff adoption is a major pain point',
          'Sona is the only cloud-based solution',
        ],
        correct: 2,
        explanation: "Allocate's legacy interface drives low staff adoption rates, which creates compliance gaps and frustration. Sona's modern mobile-first approach dramatically improves staff engagement and reduces scheduling admin time by 60%+.",
      },
    ],
  },
  {
    id: 'objection',
    title: 'Objection Handling',
    questions: 3,
    time: '5 min',
    completion: 45,
    items: [
      {
        question: 'A prospect says "We\'re locked into a 3-year contract with Fourth." What is the best response?',
        options: [
          'Offer to wait until the contract ends',
          'Suggest they break the contract — the ROI justifies the penalty',
          'Acknowledge the timeline, offer a pilot alongside Fourth, and position for renewal — quantify the cost of waiting',
          'Offer a heavy discount to offset exit fees',
        ],
        correct: 2,
        explanation: 'The best approach is to respect their commitment while making the cost of inaction tangible. A parallel pilot builds evidence for the switch. Calculate the annual cost of Fourth\'s inefficiencies to create urgency for renewal planning.',
      },
      {
        question: 'How should you handle "Sona is too small / too new for our enterprise needs"?',
        options: [
          'Emphasise that Sona is growing fast',
          'Pivot to customer references of similar size, highlight the dedicated support model, and offer SLAs with penalties',
          'Agree and suggest they revisit in a year',
          'Offer a longer contract term for security',
        ],
        correct: 1,
        explanation: 'Address the concern directly with proof: reference similar-size customers (Loungers, Burger King), highlight the named account manager model, and offer enterprise SLAs. Smaller vendor = more attention and faster innovation.',
      },
      {
        question: 'A CFO says "We can\'t justify this spend right now." What should you do?',
        options: [
          'Immediately offer a discount',
          'Build an ROI business case showing payback period and total cost of current solution, including hidden costs',
          'Suggest a free trial period',
          'Ask them to revisit next quarter',
        ],
        correct: 1,
        explanation: 'Never lead with discounts. Instead, build a compelling ROI case: current scheduling admin hours x cost, agency spend reduction, compliance risk cost, and staff retention improvement. Most Sona deals show 6-9 month payback.',
      },
    ],
  },
]

// MEDDIC Scenarios
interface Scenario {
  id: string
  title: string
  description: string
  options: { text: string; isCorrect: boolean; feedback: string }[]
}

const scenarios: Scenario[] = [
  {
    id: 's1',
    title: 'Missing Economic Buyer',
    description: "You've had 3 calls with the Ops Director but haven't engaged the Economic Buyer. Discovery is deep but decision process is unclear. What do you prioritise?",
    options: [
      { text: 'A) Schedule more discovery calls with the Ops Director', isCorrect: false, feedback: "More discovery won't solve the gap. You need access to the decision maker to progress this deal." },
      { text: 'B) Ask your champion to intro you to the Economic Buyer', isCorrect: true, feedback: "Correct. Leveraging your champion to access the Economic Buyer is the MEDDIC-aligned approach. You have strong Identified Pain and a Champion — now use them to reach the person who controls budget." },
      { text: 'C) Send a proposal to move things forward', isCorrect: false, feedback: "Sending a proposal without Economic Buyer engagement is a common mistake. You'll likely get stuck in 'internal review' limbo." },
      { text: 'D) Involve your manager for an executive-to-executive intro', isCorrect: false, feedback: "This can work but should be a secondary strategy. First, try through your champion — it's a warmer path and tests their internal influence." },
    ],
  },
  {
    id: 's2',
    title: 'Stalled Deal with Competitor Threat',
    description: "A social care deal worth £380K has been in S2-Discovery for 3 weeks. You've learned that Civica is also being evaluated. Your champion says the team likes Sona but the board wants to see both options. What's your move?",
    options: [
      { text: 'A) Offer a significant discount to close quickly', isCorrect: false, feedback: "Discounting this early signals desperation and devalues your solution. The board hasn't even seen you yet — compete on value, not price." },
      { text: "B) Request a meeting with the board to present Sona's unique value", isCorrect: false, feedback: "You're thinking right about access, but going directly to the board without preparation could backfire. You need to arm your champion first." },
      { text: 'C) Arm your champion with a comparison framework that highlights your advantages, and coach them on presenting to the board', isCorrect: true, feedback: "Correct. Equip your champion to be your internal salesperson. A competitive comparison they present carries more weight than one you deliver. Include proof points specific to their use case." },
      { text: 'D) Focus on deepening discovery to find more pain points', isCorrect: false, feedback: "Discovery is important but you're already 3 weeks in. The competitive threat means you need to act on influencing the evaluation criteria, not just finding more pain." },
    ],
  },
  {
    id: 's3',
    title: 'Unclear Decision Process',
    description: "You're in S3-Solution with a hospitality chain. The COO loves your demo, the IT lead has approved the technical requirements, but when you ask about next steps, everyone says 'we need to discuss internally.' You've asked twice and gotten the same response. What do you do?",
    options: [
      { text: 'A) Send a follow-up email asking again about the decision process', isCorrect: false, feedback: "You've already asked twice. A third email risks being annoying and shows you're not reading the room. Change your approach." },
      { text: 'B) Ask your champion directly: "Who else needs to be involved, and what does the approval process look like?" Map it together.', isCorrect: true, feedback: "Correct. Instead of asking the group, have a 1:1 with your champion and map the decision process together. Ask specifically: who signs off, what's the budget approval threshold, and what internal steps happen before a vendor is selected." },
      { text: 'C) Send a proposal to force a decision', isCorrect: false, feedback: "Forcing a proposal when the process is unclear often leads to it sitting in someone's inbox. You need to understand the process before you can influence it." },
      { text: 'D) Wait for them to come back to you — they said they need to discuss internally', isCorrect: false, feedback: "Waiting is almost never the right answer in sales. You'll lose momentum and give the prospect time to go cold or engage competitors." },
    ],
  },
]

// Onboarding Modules
interface OnboardingModule {
  title: string
  progress: number
  total: number
  topics: { name: string; done: boolean }[]
}

const onboardingModules: OnboardingModule[] = [
  {
    title: 'Sona Product',
    progress: 85,
    total: 4,
    topics: [
      { name: 'Platform overview & core modules', done: true },
      { name: 'Scheduling engine deep dive', done: true },
      { name: 'Payroll integration & compliance', done: true },
      { name: 'API & integrations ecosystem', done: false },
    ],
  },
  {
    title: 'Sales Methodology (MEDDIC)',
    progress: 70,
    total: 4,
    topics: [
      { name: 'MEDDIC framework foundations', done: true },
      { name: 'Identifying & validating Champions', done: true },
      { name: 'Economic Buyer engagement tactics', done: true },
      { name: 'Decision Process mapping workshop', done: false },
    ],
  },
  {
    title: 'Vertical Deep Dives',
    progress: 45,
    total: 4,
    topics: [
      { name: 'Hospitality market landscape', done: true },
      { name: 'Social care regulations & CQC', done: true },
      { name: 'Retail workforce management trends', done: false },
      { name: 'Cross-vertical positioning', done: false },
    ],
  },
  {
    title: 'Competitive Landscape',
    progress: 60,
    total: 3,
    topics: [
      { name: 'Fourth displacement playbook', done: true },
      { name: 'Allocate & Civica battle cards', done: true },
      { name: 'Deputy & Planday competitive positioning', done: false },
    ],
  },
  {
    title: 'Objection Handling',
    progress: 30,
    total: 4,
    topics: [
      { name: 'Pricing & budget objections', done: true },
      { name: 'Contract & switching cost concerns', done: false },
      { name: 'Enterprise readiness questions', done: false },
      { name: 'ROI & business case frameworks', done: false },
    ],
  },
]

// Leaderboard
interface LeaderboardEntry {
  id: string
  name: string
  score: number
  quizzesCompleted: number
  streak: string
}

const leaderboard: LeaderboardEntry[] = [
  { id: 'bdr-4', name: 'Harry Morrison', score: 920, quizzesCompleted: 12, streak: '7 days' },
  { id: 'ae-2', name: 'James Cooper', score: 875, quizzesCompleted: 11, streak: '5 days' },
  { id: 'bdr-2', name: 'Joey Palmer', score: 840, quizzesCompleted: 10, streak: '4 days' },
  { id: 'ae-1', name: 'Sarah Bennett', score: 780, quizzesCompleted: 9, streak: '3 days' },
  { id: 'ae-3', name: 'Priya Patel', score: 720, quizzesCompleted: 8, streak: '2 days' },
  { id: 'bdr-1', name: 'Max Chen', score: 680, quizzesCompleted: 7, streak: '1 day' },
  { id: 'ae-4', name: 'David Kim', score: 610, quizzesCompleted: 6, streak: '0 days' },
  { id: 'bdr-3', name: 'Thomas Wright', score: 540, quizzesCompleted: 5, streak: '0 days' },
]

function getRankStyle(rank: number): { bg: string; text: string; icon: string } {
  if (rank === 1) return { bg: 'bg-amber-50 border-amber-500/30', text: 'text-amber-600', icon: 'text-amber-600' }
  if (rank === 2) return { bg: 'bg-slate-400/10 border-slate-400/30', text: 'text-slate-300', icon: 'text-slate-300' }
  if (rank === 3) return { bg: 'bg-orange-600/10 border-orange-600/30', text: 'text-orange-600', icon: 'text-orange-600' }
  return { bg: 'bg-sona-stone-100 border-sona-stone-200', text: 'text-sona-stone-400', icon: 'text-sona-stone-400' }
}

const tabList = [
  { id: 'quizzes', label: 'Quizzes', badge: 3 },
  { id: 'meddic', label: 'MEDDIC Scenarios', badge: 3 },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'leaderboard', label: 'Leaderboard' },
]

export default function EnablementPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [quizQuestion, setQuizQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number | null>>({})

  const currentQuiz = quizzes.find((q) => q.id === activeQuiz)

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (currentQuiz && quizQuestion < currentQuiz.items.length - 1) {
      setQuizQuestion(quizQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setActiveQuiz(null)
      setQuizQuestion(0)
      setSelectedAnswer(null)
    }
  }

  const handleScenarioAnswer = (scenarioId: string, answerIndex: number) => {
    setScenarioAnswers((prev) => ({ ...prev, [scenarioId]: answerIndex }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
          <div className="p-2 rounded bg-sky-50">
            <BookOpen className="w-6 h-6 text-sona-teal" />
          </div>
          Enablement &amp; Knowledge Engine
        </h1>
        <p className="text-sona-stone-400 mt-1">Sharpen skills, test knowledge, and track team growth</p>
      </div>

      <Tabs tabs={tabList} defaultTab="quizzes">
        {(activeTab) => (
          <>
            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div>
                {!activeQuiz ? (
                  <div className="grid grid-cols-3 gap-4">
                    {quizzes.map((quiz) => (
                      <Card key={quiz.id} hover onClick={() => { setActiveQuiz(quiz.id); setQuizQuestion(0); setSelectedAnswer(null); }}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded bg-teal-50">
                            <Brain className="w-5 h-5 text-sona-teal" />
                          </div>
                          <Badge variant="info">{quiz.time}</Badge>
                        </div>
                        <h3 className="text-sona-dark-teal font-semibold text-lg mb-1">{quiz.title}</h3>
                        <p className="text-sona-stone-400 text-sm mb-4">{quiz.questions} questions</p>
                        <ProgressBar
                          value={quiz.completion}
                          max={100}
                          label="Completion"
                          size="sm"
                          color={quiz.completion >= 70 ? 'bg-sona-success' : quiz.completion >= 50 ? 'bg-sona-warning' : 'bg-sona-dark-teal'}
                        />
                        <p className="text-xs text-sona-stone-400 mt-2">{quiz.completion}% complete</p>
                        <button className="mt-4 w-full py-2 bg-teal-50 hover:bg-teal-100 text-sona-teal font-medium rounded transition-colors text-sm flex items-center justify-center gap-2">
                          Start Quiz <ArrowRight className="w-4 h-4" />
                        </button>
                      </Card>
                    ))}
                  </div>
                ) : currentQuiz ? (
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-sona-dark-teal font-semibold text-lg">{currentQuiz.title}</h3>
                        <p className="text-sona-stone-400 text-sm">Question {quizQuestion + 1} of {currentQuiz.items.length}</p>
                      </div>
                      <button
                        onClick={() => { setActiveQuiz(null); setQuizQuestion(0); setSelectedAnswer(null); }}
                        className="text-sona-stone-400 hover:text-sona-dark-teal text-sm"
                      >
                        Exit Quiz
                      </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex gap-2 mb-6">
                      {currentQuiz.items.map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= quizQuestion ? 'bg-sona-dark-teal' : 'bg-sona-stone-100'}`} />
                      ))}
                    </div>

                    <p className="text-sona-dark-teal text-lg mb-6">{currentQuiz.items[quizQuestion].question}</p>

                    <div className="space-y-3">
                      {currentQuiz.items[quizQuestion].options.map((option, i) => {
                        const isSelected = selectedAnswer === i
                        const isCorrect = i === currentQuiz.items[quizQuestion].correct
                        const showResult = selectedAnswer !== null

                        let borderColor = 'border-sona-stone-200 hover:border-sona-teal/30'
                        let bgColor = 'bg-sona-stone-100'
                        if (showResult && isCorrect) {
                          borderColor = 'border-emerald-500/50'
                          bgColor = 'bg-teal-50'
                        } else if (showResult && isSelected && !isCorrect) {
                          borderColor = 'border-red-500/50'
                          bgColor = 'bg-red-50'
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => !showResult && handleQuizAnswer(i)}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded border transition-all ${borderColor} ${bgColor}`}
                          >
                            <div className="flex items-center gap-3">
                              {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-sona-success shrink-0" />}
                              {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-sona-danger shrink-0" />}
                              {!showResult && <Circle className="w-5 h-5 text-sona-stone-400 shrink-0" />}
                              <span className={`text-sm ${showResult && isCorrect ? 'text-sona-success font-medium' : showResult && isSelected ? 'text-red-600' : 'text-sona-dark-teal'}`}>
                                {option}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-6">
                        <div className={`p-4 rounded border ${selectedAnswer === currentQuiz.items[quizQuestion].correct ? 'bg-teal-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                          <p className={`text-sm font-medium mb-1 ${selectedAnswer === currentQuiz.items[quizQuestion].correct ? 'text-sona-success' : 'text-sona-warning'}`}>
                            {selectedAnswer === currentQuiz.items[quizQuestion].correct ? 'Correct!' : 'Not quite right'}
                          </p>
                          <p className="text-sm text-sona-stone-400">{currentQuiz.items[quizQuestion].explanation}</p>
                        </div>
                        <button
                          onClick={handleNextQuestion}
                          className="mt-4 px-6 py-2.5 bg-sona-dark-teal hover:bg-sona-dark-teal/90 text-sona-dark-teal font-medium rounded transition-colors flex items-center gap-2"
                        >
                          {quizQuestion < currentQuiz.items.length - 1 ? 'Next Question' : 'Finish Quiz'}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </Card>
                ) : null}
              </div>
            )}

            {/* MEDDIC Scenarios Tab */}
            {activeTab === 'meddic' && (
              <div className="space-y-6">
                {scenarios.map((scenario) => {
                  const answered = scenarioAnswers[scenario.id] !== undefined && scenarioAnswers[scenario.id] !== null
                  const selectedIdx = scenarioAnswers[scenario.id]
                  return (
                    <Card key={scenario.id}>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded bg-purple-50 shrink-0">
                          <Brain className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="text-sona-dark-teal font-semibold">{scenario.title}</h3>
                          <p className="text-sona-stone-400 text-sm mt-1">{scenario.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2 ml-11">
                        {scenario.options.map((opt, i) => {
                          let style = 'border-sona-stone-200 hover:border-sona-teal/30 bg-sona-stone-100'
                          if (answered && opt.isCorrect) {
                            style = 'border-emerald-500/50 bg-teal-50'
                          } else if (answered && selectedIdx === i && !opt.isCorrect) {
                            style = 'border-red-500/50 bg-red-50'
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => !answered && handleScenarioAnswer(scenario.id, i)}
                              disabled={answered}
                              className={`w-full text-left p-3 rounded border transition-all ${style}`}
                            >
                              <span className={`text-sm ${answered && opt.isCorrect ? 'text-sona-success font-medium' : answered && selectedIdx === i ? 'text-red-600' : 'text-sona-dark-teal'}`}>
                                {opt.text}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      {answered && (
                        <div className={`mt-4 ml-11 p-4 rounded border ${scenario.options[selectedIdx!].isCorrect ? 'bg-teal-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                          <p className={`text-sm font-medium mb-1 ${scenario.options[selectedIdx!].isCorrect ? 'text-sona-success' : 'text-sona-warning'}`}>
                            {scenario.options[selectedIdx!].isCorrect ? 'Great choice!' : 'Consider this...'}
                          </p>
                          <p className="text-sm text-sona-stone-400">{scenario.options[selectedIdx!].feedback}</p>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Onboarding Tab */}
            {activeTab === 'onboarding' && (
              <div className="space-y-4">
                {onboardingModules.map((mod) => (
                  <Card key={mod.title}>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded bg-teal-50 shrink-0">
                        <GraduationCap className="w-5 h-5 text-sona-teal" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sona-dark-teal font-semibold">{mod.title}</h3>
                          <span className={`text-sm font-bold ${mod.progress >= 80 ? 'text-sona-success' : mod.progress >= 50 ? 'text-sona-warning' : 'text-sona-teal'}`}>
                            {mod.progress}%
                          </span>
                        </div>
                        <ProgressBar
                          value={mod.progress}
                          max={100}
                          size="sm"
                          color={mod.progress >= 80 ? 'bg-sona-success' : mod.progress >= 50 ? 'bg-sona-warning' : 'bg-sona-dark-teal'}
                        />
                        <div className="mt-3 space-y-2">
                          {mod.topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              {topic.done ? (
                                <CheckCircle2 className="w-4 h-4 text-sona-success shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-sona-stone-400 shrink-0" />
                              )}
                              <span className={`text-sm ${topic.done ? 'text-sona-stone-400' : 'text-sona-dark-teal'}`}>{topic.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-3">
                {leaderboard.map((entry, i) => {
                  const rank = i + 1
                  const style = getRankStyle(rank)
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-4 p-4 rounded border transition-all ${style.bg}`}
                    >
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold text-lg ${style.text} ${rank <= 3 ? 'bg-current/10' : 'bg-sona-stone-100'}`}>
                        {rank <= 3 ? (
                          <Medal className={`w-5 h-5 ${style.icon}`} />
                        ) : (
                          <span className={style.text}>#{rank}</span>
                        )}
                      </div>
                      <Avatar name={entry.name} size="md" />
                      <div className="flex-1">
                        <p className={`font-semibold ${rank <= 3 ? 'text-sona-dark-teal' : 'text-sona-stone-400'}`}>{entry.name}</p>
                        <div className="flex items-center gap-3 text-xs text-sona-stone-400 mt-0.5">
                          <span>{entry.quizzesCompleted} quizzes</span>
                          {entry.streak !== '0 days' && (
                            <span className="flex items-center gap-1 text-orange-600">
                              <Flame className="w-3 h-3" /> {entry.streak}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${rank <= 3 ? 'text-sona-dark-teal' : 'text-sona-stone-400'}`}>{entry.score}</p>
                        <p className="text-xs text-sona-stone-400">points</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </Tabs>
    </div>
  )
}
