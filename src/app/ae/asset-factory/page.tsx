'use client'

import { useState, useMemo } from 'react'
import {
  FileText,
  Swords,
  ListChecks,
  Calculator,
  FileBarChart,
  Download,
  Share2,
  ChevronDown,
  Check,
  X,
  Building2,
  Star,
  BarChart3,
  Zap,
  Shield,
  Users,
  Clock,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import { accounts } from '@/data/accounts'
import { competitors } from '@/data/competitors'
import { formatCurrency, cn } from '@/lib/utils'

type AssetType = 'one-pager' | 'battle-card' | 'mutual-action-plan' | 'roi-calculator' | 'executive-summary'

const assetTypes: { id: AssetType; label: string; icon: typeof FileText }[] = [
  { id: 'one-pager', label: 'One-Pager', icon: FileText },
  { id: 'battle-card', label: 'Battle Card', icon: Swords },
  { id: 'mutual-action-plan', label: 'Mutual Action Plan', icon: ListChecks },
  { id: 'roi-calculator', label: 'ROI Calculator', icon: Calculator },
  { id: 'executive-summary', label: 'Executive Summary', icon: FileBarChart },
]

const verticalBullets: Record<string, string[]> = {
  hospitality: [
    'AI-powered demand forecasting reduces overstaffing by 12%',
    'Mobile-first shift management for multi-site restaurant operations',
    'Seamless integration with POS, payroll, and HR systems',
  ],
  'social-care': [
    'Built-in CQC compliance with automated audit trails',
    'Mobile-first scheduling designed for frontline care staff',
    'Real-time shift updates and intelligent gap-filling',
  ],
  retail: [
    'Demand-based scheduling aligned with footfall patterns',
    'Cross-store staff sharing and availability management',
    'Holiday accrual and Working Time Directive compliance',
  ],
}

const verticalModules: Record<string, string[]> = {
  hospitality: ['Multi-Site Scheduling', 'Demand Forecasting', 'Shift Swap & Open Shifts', 'Payroll Integration'],
  'social-care': ['CQC Compliance Engine', 'Care Rota Management', 'Agency Staff Tracker', 'Mobile Care App'],
  retail: ['Store Scheduling', 'Footfall Forecasting', 'Labour Budget Control', 'Staff Availability'],
}

const verticalProof: Record<string, { company: string; result: string }> = {
  hospitality: { company: 'Loungers Group', result: 'Saved £1.4M annually with 92% manager satisfaction across 200+ sites. Migrated from Fourth in 6 weeks with zero scheduling downtime.' },
  'social-care': { company: 'Caring Homes', result: 'Reduced agency spend by 30% and achieved 89% staff app adoption in the first 4 weeks. CQC compliance gaps eliminated.' },
  retail: { company: 'Industry Average', result: 'Retail clients see 12% reduction in overstaffing and 20% improvement in schedule accuracy within 3 months of go-live.' },
}

const verticalImpact: Record<string, { metric: string; value: string }[]> = {
  hospitality: [
    { metric: 'Labour Cost Reduction', value: '8-15%' },
    { metric: 'Agency Spend Reduction', value: '20-35%' },
    { metric: 'Manager Time Saved', value: '5+ hrs/week' },
  ],
  'social-care': [
    { metric: 'Agency Spend Reduction', value: '25-40%' },
    { metric: 'CQC Compliance Score', value: '+15 points' },
    { metric: 'Staff App Adoption', value: '>85%' },
  ],
  retail: [
    { metric: 'Overstaffing Reduction', value: '10-15%' },
    { metric: 'Schedule Accuracy', value: '+20%' },
    { metric: 'Payroll Processing Time', value: '-60%' },
  ],
}

export default function AssetFactoryPage() {
  const [selectedType, setSelectedType] = useState<AssetType>('one-pager')
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id)
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(competitors[0].id)

  // ROI Calculator state
  const [employeeCount, setEmployeeCount] = useState(3000)
  const [annualLabourCost, setAnnualLabourCost] = useState(45000000)
  const [agencyPct, setAgencyPct] = useState(15)
  const [weeklySchedulingHours, setWeeklySchedulingHours] = useState(4)

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId)!
  const selectedCompetitor = competitors.find((c) => c.id === selectedCompetitorId)!
  const vertical = selectedAccount.vertical

  const roiCalc = useMemo(() => {
    const agencySpend = annualLabourCost * (agencyPct / 100)
    const agencyReduction = agencySpend * 0.3
    const schedulingManagers = Math.ceil(employeeCount / 50)
    const schedulingSavings = schedulingManagers * weeklySchedulingHours * 52 * 25
    const totalSavings = agencyReduction + schedulingSavings
    const annualCost = employeeCount * 30
    const payback = totalSavings > 0 ? Math.round((annualCost / totalSavings) * 12) : 0
    const threeYearROI = totalSavings > 0 ? Math.round(((totalSavings * 3 - annualCost * 3) / (annualCost * 3)) * 100) : 0
    return { agencyReduction, schedulingSavings, totalSavings, annualCost, payback, threeYearROI }
  }, [employeeCount, annualLabourCost, agencyPct, weeklySchedulingHours])

  const battleCardFeatures = [
    { feature: 'Mobile App Rating', sona: '4.7 stars', competitor: selectedCompetitor.name === 'Fourth' ? '2.1 stars' : '3.2 stars', sonaWins: true },
    { feature: 'Implementation Time', sona: '4-8 weeks', competitor: selectedCompetitor.name === 'Allocate' ? '12-18 months' : '8-12 weeks', sonaWins: true },
    { feature: 'UK Compliance Built-in', sona: true, competitor: ['Fourth', 'Allocate', 'Civica'].includes(selectedCompetitor.name), sonaWins: !['Civica'].includes(selectedCompetitor.name) },
    { feature: 'AI-Powered Scheduling', sona: true, competitor: false, sonaWins: true },
    { feature: 'Demand Forecasting', sona: true, competitor: selectedCompetitor.name === 'Fourth', sonaWins: selectedCompetitor.name !== 'Fourth' },
    { feature: '24/7 UK Support', sona: true, competitor: ['Fourth', 'Allocate'].includes(selectedCompetitor.name) ? false : true, sonaWins: !['Fourth', 'Allocate'].includes(selectedCompetitor.name) ? false : true },
  ]

  return (
    <div className="min-h-screen bg-sona-bg p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">In-Deal Asset Factory</h1>
        <p className="text-sona-stone-400 mt-1">Generate personalised sales collateral for any deal</p>
      </div>

      {/* Asset Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {assetTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={cn(
              'p-4 rounded border text-center transition-all',
              selectedType === type.id
                ? 'bg-teal-50 border-sona-teal/50 ring-1 ring-sona-teal/20'
                : 'bg-white border-sona-stone-200 hover:border-sona-teal/30'
            )}
          >
            <type.icon className={cn('w-6 h-6 mx-auto mb-2', selectedType === type.id ? 'text-sona-teal' : 'text-sona-stone-400')} />
            <p className={cn('text-sm font-medium', selectedType === type.id ? 'text-sona-dark-teal' : 'text-sona-stone-400')}>{type.label}</p>
          </button>
        ))}
      </div>

      {/* Configuration Panel */}
      <Card>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-sona-stone-400 mb-1.5">Account</label>
            <div className="relative">
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full appearance-none bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 pr-10 focus:outline-none focus:border-sona-teal"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sona-stone-400 pointer-events-none" />
            </div>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-xs text-sona-stone-400 mb-1.5">Vertical</label>
            <div className="px-4 py-2.5 bg-sona-stone-100 border border-sona-stone-200 rounded text-sm text-sona-dark-teal capitalize">
              {vertical}
            </div>
          </div>
          {selectedType === 'battle-card' && (
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-sona-stone-400 mb-1.5">Competitor</label>
              <div className="relative">
                <select
                  value={selectedCompetitorId}
                  onChange={(e) => setSelectedCompetitorId(e.target.value)}
                  className="w-full appearance-none bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 pr-10 focus:outline-none focus:border-sona-teal"
                >
                  {competitors.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sona-stone-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Preview Panel */}
      {selectedType === 'one-pager' && (
        <Card className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-sona-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-sona-dark-teal flex items-center justify-center text-white font-bold text-sm">S</div>
              <div>
                <p className="text-lg font-bold text-sona-dark-teal">Sona</p>
                <p className="text-xs text-sona-stone-400">Workforce Management Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-sona-stone-400">Prepared for</p>
              <p className="text-base font-semibold text-sona-dark-teal">{selectedAccount.name}</p>
            </div>
          </div>

          {/* Why Sona */}
          <div>
            <h3 className="text-base font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-sona-teal" />
              Why Sona for <span className="capitalize">{vertical}</span>
            </h3>
            <div className="space-y-2">
              {(verticalBullets[vertical] || verticalBullets['hospitality']).map((bullet, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sona-teal mt-0.5 shrink-0" />
                  <p className="text-sm text-sona-dark-teal">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Modules */}
          <div>
            <h3 className="text-base font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-600" />
              Key Modules
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(verticalModules[vertical] || verticalModules['hospitality']).map((mod, i) => (
                <div key={i} className="p-3 rounded bg-sona-stone-100 text-center">
                  <p className="text-sm font-medium text-sona-dark-teal">{mod}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof Points */}
          <div>
            <h3 className="text-base font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              Proof Points
            </h3>
            <div className="p-4 rounded bg-sona-stone-100 border-l-4 border-l-sona-teal">
              <p className="text-sm font-medium text-sona-dark-teal mb-1">{(verticalProof[vertical] || verticalProof['hospitality']).company}</p>
              <p className="text-sm text-sona-dark-teal">{(verticalProof[vertical] || verticalProof['hospitality']).result}</p>
            </div>
          </div>

          {/* Expected Impact */}
          <div>
            <h3 className="text-base font-semibold text-sona-dark-teal mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sona-teal" />
              Expected Impact
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {(verticalImpact[vertical] || verticalImpact['hospitality']).map((item, i) => (
                <div key={i} className="p-4 rounded bg-sona-stone-100 text-center">
                  <p className="text-2xl font-bold text-sona-teal">{item.value}</p>
                  <p className="text-xs text-sona-stone-400 mt-1">{item.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {selectedType === 'battle-card' && (
        <Card className="space-y-6">
          <div className="text-center pb-4 border-b border-sona-stone-200">
            <h2 className="text-lg font-bold text-sona-dark-teal">Sona vs {selectedCompetitor.name}</h2>
            <p className="text-sm text-sona-stone-400">Competitive displacement analysis for {selectedAccount.name}</p>
          </div>

          {/* Feature Comparison */}
          <div className="overflow-hidden rounded border border-sona-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sona-stone-100">
                  <th className="text-left text-xs text-sona-stone-400 font-medium px-4 py-3">Feature</th>
                  <th className="text-center text-xs font-medium px-4 py-3 text-sona-teal">Sona</th>
                  <th className="text-center text-xs font-medium px-4 py-3 text-sona-stone-400">{selectedCompetitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {battleCardFeatures.map((row, i) => (
                  <tr key={i} className="border-t border-sona-stone-200">
                    <td className="px-4 py-3 text-sona-dark-teal">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof row.sona === 'boolean' ? (
                        row.sona ? <Check className="w-5 h-5 text-sona-teal mx-auto" /> : <X className="w-5 h-5 text-red-600 mx-auto" />
                      ) : (
                        <span className="text-sona-teal font-medium">{row.sona}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor ? <Check className="w-5 h-5 text-sona-teal mx-auto" /> : <X className="w-5 h-5 text-red-600 mx-auto" />
                      ) : (
                        <span className="text-sona-stone-400">{row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Differentiators */}
          <div>
            <h3 className="text-base font-semibold text-sona-dark-teal mb-3">Key Differentiators</h3>
            <div className="space-y-2">
              {selectedCompetitor.weaknesses.slice(0, 3).map((w, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-sona-teal mt-0.5 shrink-0" />
                  <p className="text-sm text-sona-dark-teal">{w}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Displacement Angle */}
          <div className="p-4 rounded bg-teal-50 border border-sona-teal/20">
            <h3 className="text-sm font-semibold text-sona-teal mb-2">Displacement Angle</h3>
            <p className="text-sm text-sona-dark-teal">{selectedCompetitor.displacementAngle}</p>
          </div>

          {/* Win Rate */}
          <div className="flex items-center gap-4 p-4 rounded bg-sona-stone-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-sona-teal">{selectedCompetitor.winRate}%</p>
              <p className="text-xs text-sona-stone-400">Win Rate vs {selectedCompetitor.name}</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {selectedCompetitor.keyProofPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-sona-teal mt-0.5 shrink-0" />
                  <p className="text-xs text-sona-dark-teal">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {selectedType === 'roi-calculator' && (
        <Card className="space-y-6">
          <h2 className="text-lg font-bold text-sona-dark-teal">ROI Calculator — {selectedAccount.name}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-sona-stone-400 uppercase tracking-wider">Inputs</h3>

              <div>
                <label className="block text-sm text-sona-dark-teal mb-1.5">Employee Count</label>
                <input
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="w-full bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 focus:outline-none focus:border-sona-teal"
                />
              </div>

              <div>
                <label className="block text-sm text-sona-dark-teal mb-1.5">Current Annual Labour Cost</label>
                <input
                  type="number"
                  value={annualLabourCost}
                  onChange={(e) => setAnnualLabourCost(Number(e.target.value))}
                  className="w-full bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 focus:outline-none focus:border-sona-teal"
                />
                <p className="text-xs text-sona-stone-400 mt-1">{formatCurrency(annualLabourCost)}</p>
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-sona-dark-teal mb-1.5">
                  <span>Agency Spend (%)</span>
                  <span className="text-sona-dark-teal font-medium">{agencyPct}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={agencyPct}
                  onChange={(e) => setAgencyPct(Number(e.target.value))}
                  className="w-full accent-sona-teal"
                />
                <div className="flex justify-between text-xs text-sona-stone-400">
                  <span>0%</span>
                  <span>40%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-sona-dark-teal mb-1.5">Weekly Scheduling Hours per Manager</label>
                <input
                  type="number"
                  value={weeklySchedulingHours}
                  onChange={(e) => setWeeklySchedulingHours(Number(e.target.value))}
                  className="w-full bg-sona-stone-100 border border-sona-stone-200 text-sona-dark-teal text-sm rounded px-4 py-2.5 focus:outline-none focus:border-sona-teal"
                />
              </div>
            </div>

            {/* Calculated Outputs */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-sona-stone-400 uppercase tracking-wider">Projected Results</h3>

              <div className="p-5 rounded bg-teal-50 border border-emerald-500/20 text-center">
                <p className="text-sm text-sona-teal mb-1">Projected Annual Savings</p>
                <p className="text-4xl font-bold text-sona-teal">{formatCurrency(roiCalc.totalSavings)}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-sona-stone-400">
                  <span>Agency: {formatCurrency(roiCalc.agencyReduction)}</span>
                  <span>&middot;</span>
                  <span>Scheduling: {formatCurrency(roiCalc.schedulingSavings)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded bg-sona-stone-100 text-center">
                  <Clock className="w-6 h-6 text-sona-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-sona-dark-teal">{roiCalc.payback} mo</p>
                  <p className="text-xs text-sona-stone-400">Payback Period</p>
                </div>
                <div className="p-4 rounded bg-sona-stone-100 text-center">
                  <BarChart3 className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-sona-dark-teal">{roiCalc.threeYearROI}%</p>
                  <p className="text-xs text-sona-stone-400">3-Year ROI</p>
                </div>
              </div>

              <div className="p-4 rounded bg-sona-stone-100">
                <p className="text-xs text-sona-stone-400 mb-1">Annual Platform Cost (est.)</p>
                <p className="text-lg font-bold text-sona-dark-teal">{formatCurrency(roiCalc.annualCost)}</p>
                <p className="text-xs text-sona-stone-400">Based on {employeeCount} employees at ~£30/employee/year</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {(selectedType === 'mutual-action-plan' || selectedType === 'executive-summary') && (
        <Card className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-sona-stone-100 flex items-center justify-center mx-auto mb-4">
              {selectedType === 'mutual-action-plan' ? (
                <ListChecks className="w-8 h-8 text-sona-stone-400" />
              ) : (
                <FileBarChart className="w-8 h-8 text-sona-stone-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-sona-dark-teal mb-2">
              {selectedType === 'mutual-action-plan' ? 'Mutual Action Plan' : 'Executive Summary'}
            </h3>
            <p className="text-sm text-sona-stone-400 max-w-md">
              This asset type is coming soon. The AI engine is being trained on historical {selectedType === 'mutual-action-plan' ? 'deal progression data' : 'executive briefings'} to generate personalised content for {selectedAccount.name}.
            </p>
            <Badge variant="info" className="mt-4">Coming Soon</Badge>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-sona-stone-200 text-sona-dark-teal text-sm font-medium rounded hover:bg-sona-stone-100 transition-colors">
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-sona-dark-teal text-white text-sm font-medium rounded hover:bg-sona-dark-teal/80 transition-colors">
          <Share2 className="w-4 h-4" /> Share via Slack
        </button>
      </div>
    </div>
  )
}
