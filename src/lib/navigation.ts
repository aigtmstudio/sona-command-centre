import {
  Target,
  Users,
  Brain,
  FileText,
  MessageSquare,
  BarChart3,
  Search,
  Lightbulb,
  ArrowRightLeft,
  Bot,
  BookOpen,
  Presentation,
  ClipboardList,
  Factory,
  Calendar,
  Megaphone,
  TrendingUp,
  Layers,
  ShieldCheck,
  GraduationCap,
  Settings,
  Plug,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

export interface NavSection {
  label: string
  href: string
  icon: LucideIcon
  color: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    label: 'BDR HQ',
    href: '/bdr',
    icon: Target,
    color: 'text-blue-400',
    items: [
      { label: 'Account Prioritiser', href: '/bdr/account-prioritiser', icon: BarChart3, badge: 5 },
      { label: 'Contact Discovery', href: '/bdr/contact-discovery', icon: Search },
      { label: 'Outreach Intelligence', href: '/bdr/outreach-intelligence', icon: Lightbulb },
      { label: 'AE Handover Pack', href: '/bdr/handover-pack', icon: ArrowRightLeft },
      { label: 'Chief of Staff', href: '/bdr/chief-of-staff', icon: Bot, badge: 1 },
    ],
  },
  {
    label: 'AE HQ',
    href: '/ae',
    icon: Presentation,
    color: 'text-emerald-400',
    items: [
      { label: 'Account Planner', href: '/ae/account-planner', icon: BookOpen, badge: 3 },
      { label: 'Discovery Coach', href: '/ae/discovery-coach', icon: Brain },
      { label: 'Admin Assistant', href: '/ae/admin-assistant', icon: ClipboardList, badge: 2 },
      { label: 'Asset Factory', href: '/ae/asset-factory', icon: Factory },
      { label: 'Chief of Staff', href: '/ae/chief-of-staff', icon: Bot, badge: 1 },
    ],
  },
  {
    label: 'Marketing HQ',
    href: '/marketing',
    icon: Megaphone,
    color: 'text-purple-400',
    items: [
      { label: 'Pre-Event Intel', href: '/marketing/pre-event', icon: Calendar },
      { label: 'Post-Event Pipeline', href: '/marketing/post-event', icon: TrendingUp },
      { label: 'Content Intelligence', href: '/marketing/content-intelligence', icon: Layers },
      { label: 'ABM Workshop', href: '/marketing/abm-workshop', icon: Target },
      { label: 'Chief of Staff', href: '/marketing/chief-of-staff', icon: Bot },
    ],
  },
  {
    label: 'Manager HQ',
    href: '/manager',
    icon: Users,
    color: 'text-amber-400',
    items: [
      { label: '1:1 Prep & Coaching', href: '/manager/one-to-one', icon: MessageSquare },
      { label: 'Data Hygiene', href: '/manager/data-hygiene', icon: ShieldCheck, badge: 12 },
      { label: 'Enablement Engine', href: '/manager/enablement', icon: GraduationCap },
      { label: 'Team Performance', href: '/manager/performance', icon: BarChart3 },
    ],
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: Settings,
    color: 'text-sona-stone-400',
    items: [
      { label: 'Playbooks', href: '/admin/playbooks', icon: BookOpen, badge: 3 },
      { label: 'Integrations', href: '/admin/integrations', icon: Plug },
    ],
  },
]
