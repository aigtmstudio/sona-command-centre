export type Vertical = 'hospitality' | 'social-care' | 'retail'

export type DealStage = 'S1-Qualified' | 'S2-Discovery' | 'S3-Solution' | 'S4-Proposal' | 'S5-Negotiation' | 'Closed Won' | 'Closed Lost'

export type Persona = 'HR Director' | 'Operations Director' | 'Finance Director' | 'IT Director' | 'C-Suite' | 'Champion' | 'Other'

export type Sentiment = 'champion' | 'positive' | 'neutral' | 'blocker' | 'unknown'

export type EnrichmentSource = 'Cognism' | 'Full Enrich' | 'Rocket Reach' | 'LinkedIn' | 'Manual'

export type EnrichmentStatus = 'verified' | 'stale' | 'missing' | 'pending'

export type SignalType = 'website_visit' | 'content_download' | 'linkedin_post' | 'job_change' | 'funding_round' | 'hiring_signal' | 'gong_mention' | 'slack_mention' | 'competitor_news' | 'event_registration'

export type SignalStrength = 'high' | 'medium' | 'low'

export type MeddicField = 'metrics' | 'economic_buyer' | 'decision_criteria' | 'decision_process' | 'identify_pain' | 'champion'

export type MeddicConfidence = 'none' | 'low' | 'medium' | 'high'

export type TeamRole = 'BDR' | 'AE' | 'Marketing' | 'BDR Manager' | 'AE Manager' | 'Head of Sales'

export type RiskType = 'stalled' | 'single_threaded' | 'missing_meddic' | 'no_next_steps' | 'competitor_threat' | 'budget_risk'

export type HygieneIssueType = 'missing_field' | 'stale_data' | 'duplicate' | 'attribution_gap' | 'thin_notes'

export interface Account {
  id: string
  name: string
  vertical: Vertical
  employeeCount: number
  currentSystem: string
  website: string
  hqLocation: string
  annualRevenue: string
  compositeScore: number
  tier: 1 | 2 | 3
  status: 'active' | 're-engage' | 'new'
  assignedBdr: string
  assignedAe: string
  hubspotLastUpdated: string
  description: string
}

export interface Contact {
  id: string
  accountId: string
  name: string
  role: string
  persona: Persona
  email: string
  phone: string
  linkedinUrl: string
  enrichmentStatus: EnrichmentStatus
  enrichmentSource: EnrichmentSource
  lastContacted: string
  sentiment: Sentiment
  engagementScore: number
}

export interface MeddicScore {
  field: MeddicField
  confidence: MeddicConfidence
  notes: string
}

export interface Deal {
  id: string
  accountId: string
  name: string
  value: number
  stage: DealStage
  closeDate: string
  probability: number
  assignedAe: string
  createdDate: string
  lastActivity: string
  daysInStage: number
  meddic: MeddicScore[]
  risks: Risk[]
  nextSteps: string
  competitorDisplacing: string
}

export interface Risk {
  type: RiskType
  description: string
  severity: 'high' | 'medium' | 'low'
}

export interface Signal {
  id: string
  accountId: string
  type: SignalType
  title: string
  detail: string
  source: string
  timestamp: string
  strength: SignalStrength
}

export interface TeamMember {
  id: string
  name: string
  role: TeamRole
  team: string
  monthlyTarget: number
  quarterlyTarget: number
  currentPipeline: number
  meetingsBooked: number
  activitiesThisWeek: number
  avatar?: string
}

export interface CallRecord {
  id: string
  dealId: string
  contactId: string
  date: string
  duration: number
  type: 'discovery' | 'demo' | 'follow-up' | 'negotiation'
  talkRatio: number
  discoveryDepth: number
  nextStepsSet: boolean
  summary: string
  coachingNotes: string[]
  meddicUpdates: Partial<Record<MeddicField, string>>
}

export interface Activity {
  id: string
  teamMemberId: string
  type: 'call' | 'email' | 'linkedin' | 'meeting' | 'note' | 'task'
  description: string
  accountId?: string
  dealId?: string
  timestamp: string
}

export interface EventDelegate {
  id: string
  name: string
  company: string
  role: string
  employeeCount: number
  vertical: Vertical | 'other'
  icpScore: number
  tier: 1 | 2 | 3
  existingContact: boolean
  existingDeal: boolean
  email: string
  briefing?: string
}

export interface ContentAsset {
  id: string
  title: string
  type: 'case-study' | 'one-pager' | 'battle-card' | 'blog' | 'whitepaper' | 'roi-calculator'
  vertical?: Vertical
  competitor?: string
  persona?: Persona
  url: string
  usageCount: number
}

export interface Competitor {
  id: string
  name: string
  verticals: Vertical[]
  positioning: string
  weaknesses: string[]
  displacementAngle: string
  winRate: number
  keyProofPoints: string[]
}

export interface HygieneIssue {
  id: string
  type: HygieneIssueType
  teamMemberId: string
  entityType: 'deal' | 'contact' | 'company'
  entityName: string
  field?: string
  description: string
  severity: 'high' | 'medium' | 'low'
  suggestedAction: string
}

export interface QuizQuestion {
  id: string
  category: 'product' | 'methodology' | 'competitor' | 'vertical' | 'objection'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface BriefingMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
  components?: BriefingComponent[]
}

export interface BriefingComponent {
  type: 'stat-card' | 'progress-bar' | 'action-list' | 'chart' | 'deal-cards' | 'projection'
  data: Record<string, unknown>
}
