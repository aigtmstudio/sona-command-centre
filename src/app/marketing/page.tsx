'use client'

import { useState } from 'react'
import {
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Zap,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  BarChart3,
  Search,
  UserPlus,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import StatCard from '@/components/shared/StatCard'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import { cn } from '@/lib/utils'

const upcomingEvents = [
  {
    id: 'evt-1',
    name: 'AI for Frontline Workforce Webinar',
    date: 'Mar 28, 2026',
    daysAway: 9,
    type: 'Webinar',
    registered: 124,
    status: 'Live soon',
    statusVariant: 'success' as const,
    description: 'Webinar on AI-powered scheduling for frontline teams. Strong registration numbers.',
  },
  {
    id: 'evt-2',
    name: 'Hospitality Leaders Summit',
    date: 'Apr 10, 2026',
    daysAway: 22,
    type: 'Conference',
    registered: null,
    status: 'Delegate list pending',
    statusVariant: 'warning' as const,
    description: 'Key hospitality vertical event. Nando\'s COO confirmed attending.',
  },
  {
    id: 'evt-3',
    name: 'Social Care Innovation Conference',
    date: 'May 15, 2026',
    daysAway: 57,
    type: 'Conference',
    registered: null,
    status: 'Planning phase',
    statusVariant: 'info' as const,
    description: 'Annual social care event. Booth + speaking slot confirmed.',
  },
]

const recentMQLs = [
  { id: 'mql-1', name: 'Claire Matthews', company: 'Burger King UK', source: 'Webinar', date: 'Mar 18', status: 'New', statusVariant: 'info' as const },
  { id: 'mql-2', name: 'Tom Harding', company: 'Compass Group', source: 'Content Download', date: 'Mar 17', status: 'Assigned', statusVariant: 'success' as const },
  { id: 'mql-3', name: 'Sophie Price', company: 'Brunelcare', source: 'Website Demo', date: 'Mar 16', status: 'Assigned', statusVariant: 'success' as const },
  { id: 'mql-4', name: 'Mark Stevens', company: 'Hobbycraft', source: 'Content Download', date: 'Mar 15', status: 'Contacted', statusVariant: 'purple' as const },
  { id: 'mql-5', name: 'Rachel Green', company: 'Loungers Group', source: 'Event', date: 'Mar 14', status: 'Qualified', statusVariant: 'success' as const },
]

const quickActions = [
  { id: 'prep', label: 'Prep for Event', icon: Calendar, description: 'Prepare delegate intelligence for upcoming events' },
  { id: 'process', label: 'Process Event Leads', icon: UserPlus, description: 'Score, enrich, and assign post-event leads' },
  { id: 'content', label: 'Content Gap Analysis', icon: Search, description: 'Identify missing content based on call themes' },
]

export default function MarketingHQPage() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sona-dark-teal flex items-center gap-3">
            Marketing HQ
            <span className="text-sona-stone-400 font-normal text-lg">— Emma Davies</span>
          </h1>
          <p className="text-sona-stone-400 mt-1">
            Thursday, 19 March 2026 — Q1 Week 12
          </p>
        </div>
        <Avatar name="Emma Davies" size="lg" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="MQLs This Month"
          value="34"
          change={18}
          changeLabel="vs last month"
          icon={Users}
          iconColor="text-sona-teal"
        />
        <StatCard
          label="Pipeline Sourced"
          value="£420K"
          change={12}
          changeLabel="vs last quarter"
          icon={TrendingUp}
          iconColor="text-sona-success"
        />
        <StatCard
          label="Events This Quarter"
          value="6"
          change={50}
          changeLabel="vs Q4"
          icon={Calendar}
          iconColor="text-violet-600"
        />
        <StatCard
          label="Content Engagement"
          value="+24%"
          change={24}
          changeLabel="vs last month"
          icon={FileText}
          iconColor="text-amber-600"
        />
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sona-dark-teal flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sona-teal" />
            Upcoming Events
          </h2>
          <span className="text-sm text-sona-stone-400">3 events scheduled</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              hover
              className={cn(
                'transition-all',
                hoveredEvent === event.id && 'border-sona-teal/40'
              )}
            >
              <div
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={event.statusVariant} dot>
                    {event.status}
                  </Badge>
                  <span className="text-xs text-sona-stone-400">{event.type}</span>
                </div>
                <h3 className="text-sm font-semibold text-sona-dark-teal mb-1">{event.name}</h3>
                <p className="text-xs text-sona-stone-400 mb-3">{event.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-sona-stone-200">
                  <div className="flex items-center gap-1.5 text-xs text-sona-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    {event.date}
                    <span className="text-sona-teal ml-1">({event.daysAway}d away)</span>
                  </div>
                  {event.registered && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Users className="w-3.5 h-3.5 text-sona-success" />
                      <span className="text-sona-success font-medium">{event.registered} registered</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent MQLs */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sona-dark-teal flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Recent MQLs
          </h2>
          <span className="text-sm text-sona-stone-400">34 this month</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sona-stone-200">
                <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-4">Name</th>
                <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-4">Company</th>
                <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-4">Source</th>
                <th className="text-left text-xs font-medium text-sona-stone-400 pb-3 pr-4">Date</th>
                <th className="text-left text-xs font-medium text-sona-stone-400 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMQLs.map((mql) => (
                <tr key={mql.id} className="border-b border-sona-stone-200 last:border-0 hover:bg-sona-stone-100/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={mql.name} size="sm" />
                      <span className="text-sm font-medium text-sona-dark-teal">{mql.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-sona-stone-400">{mql.company}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline">{mql.source}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-sm text-sona-stone-400">{mql.date}</td>
                  <td className="py-3">
                    <Badge variant={mql.statusVariant}>{mql.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card key={action.id} hover>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-teal-50">
                    <Icon className="w-5 h-5 text-sona-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-sona-dark-teal mb-1">{action.label}</h3>
                    <p className="text-xs text-sona-stone-400">{action.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-sona-stone-400 mt-1 shrink-0" />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
