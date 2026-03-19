import type { Signal } from '@/types'

export const signals: Signal[] = [
  // Burger King signals
  {
    id: 'sig-1',
    accountId: 'acc-1',
    type: 'linkedin_post',
    title: 'HR Director posted about scheduling challenges',
    detail: 'Claire Matthews (VP HR, Burger King UK) posted: "Managing schedules across 500+ locations shouldn\'t still be this painful in 2026. Time for a change."',
    source: 'LinkedIn',
    timestamp: '2026-03-17T09:30:00Z',
    strength: 'high',
  },
  {
    id: 'sig-2',
    accountId: 'acc-1',
    type: 'content_download',
    title: 'Downloaded hospitality enterprise case study',
    detail: 'Contact from burgerking.co.uk email downloaded "How Loungers Saved £1.4M with Sona Scheduling"',
    source: 'HubSpot',
    timestamp: '2026-03-15T14:20:00Z',
    strength: 'high',
  },
  {
    id: 'sig-3',
    accountId: 'acc-1',
    type: 'gong_mention',
    title: 'Positive sentiment in latest demo call',
    detail: 'Tom Reynolds (Ops Director) said "This is exactly what we need" during product demo. Gong sentiment score: 92/100.',
    source: 'Gong',
    timestamp: '2026-03-14T11:00:00Z',
    strength: 'high',
  },
  // Tortilla signals
  {
    id: 'sig-4',
    accountId: 'acc-2',
    type: 'content_download',
    title: 'Downloaded hospitality case study',
    detail: 'Lisa Park downloaded "Sona for Fast-Casual Restaurants" one-pager from marketing email.',
    source: 'HubSpot',
    timestamp: '2026-03-13T16:45:00Z',
    strength: 'medium',
  },
  {
    id: 'sig-5',
    accountId: 'acc-2',
    type: 'website_visit',
    title: 'Visited pricing page twice',
    detail: 'Two visits to sona.ai/pricing from Tortilla IP range in the last 5 days.',
    source: 'HubSpot',
    timestamp: '2026-03-12T10:15:00Z',
    strength: 'medium',
  },
  // Loungers signals
  {
    id: 'sig-6',
    accountId: 'acc-3',
    type: 'gong_mention',
    title: 'CFO engaged on ROI discussion',
    detail: 'Mark Williams (CFO) joined the call and asked detailed questions about payroll integration savings.',
    source: 'Gong',
    timestamp: '2026-03-18T10:00:00Z',
    strength: 'high',
  },
  // Wagamama signals
  {
    id: 'sig-7',
    accountId: 'acc-5',
    type: 'linkedin_post',
    title: 'COO posted about labour costs',
    detail: 'Marcus Webb (COO) posted: "Labour costs in hospitality are at breaking point. We need smarter scheduling, not more spreadsheets."',
    source: 'LinkedIn',
    timestamp: '2026-03-14T08:00:00Z',
    strength: 'high',
  },
  {
    id: 'sig-8',
    accountId: 'acc-5',
    type: 'event_registration',
    title: 'COO registered for Sona hospitality event',
    detail: 'Marcus Webb registered for "AI-Powered Workforce Management" roundtable dinner on April 10.',
    source: 'HubSpot',
    timestamp: '2026-03-10T12:00:00Z',
    strength: 'high',
  },
  // Barchester signals
  {
    id: 'sig-9',
    accountId: 'acc-9',
    type: 'competitor_news',
    title: 'Allocate contract renewal approaching',
    detail: 'Intelligence suggests Barchester\'s Allocate contract renews in November 2026. 8-month window to displace.',
    source: 'Slack',
    timestamp: '2026-03-16T09:00:00Z',
    strength: 'high',
  },
  {
    id: 'sig-10',
    accountId: 'acc-9',
    type: 'hiring_signal',
    title: 'Hiring Digital Transformation Manager',
    detail: 'Barchester posted role: "Digital Transformation Manager - Care Technology" on LinkedIn. Signals system change appetite.',
    source: 'LinkedIn',
    timestamp: '2026-03-12T07:30:00Z',
    strength: 'medium',
  },
  // HC-One signals
  {
    id: 'sig-11',
    accountId: 'acc-10',
    type: 'slack_mention',
    title: 'Deal context shared in #social-care channel',
    detail: 'James Cooper shared: "HC-One IT Director confirmed they\'re evaluating alternatives to Allocate. Timing could be good."',
    source: 'Slack',
    timestamp: '2026-03-14T15:30:00Z',
    strength: 'medium',
  },
  // Five Guys signals
  {
    id: 'sig-12',
    accountId: 'acc-7',
    type: 'job_change',
    title: 'New HR Director appointed',
    detail: 'Five Guys UK appointed new HR Director (Jessica Adams) 2 months ago. Previously at Deliveroo where she implemented modern WFM.',
    source: 'LinkedIn',
    timestamp: '2026-03-01T08:00:00Z',
    strength: 'high',
  },
  // Pret signals
  {
    id: 'sig-13',
    accountId: 'acc-6',
    type: 'website_visit',
    title: 'Pricing page visits detected',
    detail: 'Two unique visitors from Pret A Manger IP range visited sona.ai/pricing in the last 30 days.',
    source: 'HubSpot',
    timestamp: '2026-03-08T11:00:00Z',
    strength: 'medium',
  },
  // Anchor Hanover signals
  {
    id: 'sig-14',
    accountId: 'acc-13',
    type: 'job_change',
    title: 'New COO appointed',
    detail: 'David Brown appointed as COO at Anchor Hanover. Previously at Bupa where he led a major tech transformation.',
    source: 'LinkedIn',
    timestamp: '2026-02-18T09:00:00Z',
    strength: 'high',
  },
  // Metropolitan Care signals
  {
    id: 'sig-15',
    accountId: 'acc-14',
    type: 'event_registration',
    title: 'Head of Digital attended Sona webinar',
    detail: 'Amy Watson attended "Modernising Social Care Scheduling" webinar. Asked 3 questions during Q&A.',
    source: 'HubSpot',
    timestamp: '2026-02-20T14:00:00Z',
    strength: 'high',
  },
  // Pets at Home signals
  {
    id: 'sig-16',
    accountId: 'acc-16',
    type: 'event_registration',
    title: 'Registered for retail workforce event',
    detail: 'HR Operations Manager from Pets at Home registered for upcoming "Retail Workforce Innovation" event.',
    source: 'HubSpot',
    timestamp: '2026-03-05T10:00:00Z',
    strength: 'medium',
  },
  // Nando's signals
  {
    id: 'sig-17',
    accountId: 'acc-4',
    type: 'competitor_news',
    title: 'Fourth experiencing major service disruption',
    detail: 'Fourth reported 12-hour outage affecting scheduling for multiple restaurant chains. Multiple complaints on social media.',
    source: 'Web',
    timestamp: '2026-03-11T06:00:00Z',
    strength: 'high',
  },
  // Caring Homes signals
  {
    id: 'sig-18',
    accountId: 'acc-11',
    type: 'gong_mention',
    title: 'Strong buying signal in discovery call',
    detail: 'John Peters (MD) said: "If you can guarantee CQC compliance, I\'ll push this through the board myself."',
    source: 'Gong',
    timestamp: '2026-03-10T14:00:00Z',
    strength: 'high',
  },
  // General industry signals
  {
    id: 'sig-19',
    accountId: 'acc-12',
    type: 'funding_round',
    title: 'Brunelcare received £5M transformation grant',
    detail: 'Brunelcare announced a £5M digital transformation grant from their local authority partnership.',
    source: 'Web',
    timestamp: '2026-03-07T08:00:00Z',
    strength: 'high',
  },
  {
    id: 'sig-20',
    accountId: 'acc-15',
    type: 'linkedin_post',
    title: 'Hobbycraft HR Director discussing workforce challenges',
    detail: 'Posted about seasonal staffing difficulties and the need for better forecasting tools.',
    source: 'LinkedIn',
    timestamp: '2026-03-09T11:30:00Z',
    strength: 'medium',
  },
]

export const getSignalsByAccount = (accountId: string) =>
  signals.filter((s) => s.accountId === accountId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

export const getRecentSignals = (n: number = 10) =>
  [...signals].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, n)

export const getHighStrengthSignals = () => signals.filter((s) => s.strength === 'high')
