'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Users,
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Sparkles,
  Upload,
  ArrowRight,
  Zap,
  UserPlus,
  Shield,
} from 'lucide-react'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Avatar from '@/components/shared/Avatar'
import { accounts } from '@/data/accounts'
import { getContactsByAccount, contacts } from '@/data/contacts'
import { cn } from '@/lib/utils'
import type { Persona, Contact } from '@/types'

const personaSlots: Persona[] = [
  'HR Director',
  'Operations Director',
  'Finance Director',
  'IT Director',
  'C-Suite',
]

const sentimentConfig: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline'; label: string }> = {
  champion: { variant: 'success', label: 'Champion' },
  positive: { variant: 'info', label: 'Positive' },
  neutral: { variant: 'outline', label: 'Neutral' },
  blocker: { variant: 'danger', label: 'Blocker' },
  unknown: { variant: 'outline', label: 'Unknown' },
}

const enrichmentSources = ['Cognism', 'Full Enrich', 'Rocket Reach', 'LinkedIn'] as const

const enrichmentSourceColors: Record<string, string> = {
  Cognism: 'text-sona-dark-teal bg-sky-50',
  'Full Enrich': 'text-sona-teal bg-teal-50',
  'Rocket Reach': 'text-orange-600 bg-orange-50',
  LinkedIn: 'text-cyan-600 bg-cyan-50',
  Manual: 'text-sona-stone-400 bg-sona-stone-100',
}

// Mock enrichment waterfall data per contact
function getEnrichmentWaterfall(contact: Contact) {
  const source = contact.enrichmentSource
  return enrichmentSources.map((s) => ({
    source: s,
    found: s === source || (contact.enrichmentStatus === 'verified' && ['Cognism', 'Full Enrich'].includes(s) && enrichmentSources.indexOf(s) <= enrichmentSources.indexOf(source as typeof enrichmentSources[number])),
    checked: true,
  }))
}

export default function ContactDiscoveryPage() {
  const [selectedAccountId, setSelectedAccountId] = useState('acc-1')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [enrichingAll, setEnrichingAll] = useState(false)
  const [enrichedContacts, setEnrichedContacts] = useState<Set<string>>(new Set())
  const [pushedContacts, setPushedContacts] = useState<Set<string>>(new Set())

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId)!
  const accountContacts = getContactsByAccount(selectedAccountId)

  const contactsByPersona = useMemo(() => {
    const map = new Map<Persona, Contact | null>()
    personaSlots.forEach((p) => map.set(p, null))
    accountContacts.forEach((c) => {
      if (personaSlots.includes(c.persona)) {
        map.set(c.persona, c)
      }
    })
    return map
  }, [accountContacts, selectedAccountId])

  const handleBulkEnrich = () => {
    setEnrichingAll(true)
    setTimeout(() => {
      setEnrichingAll(false)
      const newSet = new Set(enrichedContacts)
      accountContacts.forEach((c) => newSet.add(c.id))
      setEnrichedContacts(newSet)
    }, 2000)
  }

  const handlePushToHubspot = (contactId: string) => {
    setPushedContacts((prev) => new Set(prev).add(contactId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sona-dark-teal">Contact Discovery & Enrichment</h1>
        <p className="text-sona-stone-400 mt-1">
          Map the buying committee and enrich contact data for target accounts.
        </p>
      </div>

      {/* Controls */}
      <Card className="!p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Account Selector */}
          <div className="relative min-w-[280px]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-sona-stone-100 border border-sona-stone-200 rounded px-4 py-2.5 text-sm text-sona-dark-teal hover:border-sona-teal/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sona-stone-400" />
                <span>{selectedAccount.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-sona-stone-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-sona-stone-200 rounded max-h-64 overflow-y-auto">
                {accounts.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedAccountId(a.id)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-sona-stone-100 transition-colors',
                      a.id === selectedAccountId
                        ? 'text-sona-teal bg-sona-dark-teal/5'
                        : 'text-sona-dark-teal'
                    )}
                  >
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-sona-stone-400">
                      {a.vertical} — {a.employeeCount.toLocaleString()} employees
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleBulkEnrich}
            disabled={enrichingAll}
            className="flex items-center gap-2 bg-sona-dark-teal hover:bg-sona-dark-teal/80 disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded transition-colors"
          >
            {enrichingAll ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-sm animate-spin" />
                Enriching...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Bulk Enrich Top 10
              </>
            )}
          </button>
        </div>
      </Card>

      {/* Buying Committee Map */}
      <div>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-sona-teal" />
          Buying Committee Map — {selectedAccount.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {personaSlots.map((persona) => {
            const contact = contactsByPersona.get(persona)
            if (contact) {
              const sc = sentimentConfig[contact.sentiment]
              const isPushed = pushedContacts.has(contact.id)
              return (
                <Card key={persona} className="relative">
                  <div className="text-[10px] font-medium text-sona-stone-400 uppercase tracking-wider mb-3">
                    {persona}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar name={contact.name} size="md" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-sona-dark-teal truncate">
                        {contact.name}
                      </div>
                      <div className="text-xs text-sona-stone-400 truncate">
                        {contact.role}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-sona-stone-400" />
                      {contact.email ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-sona-dark-teal truncate max-w-[130px]">
                            {contact.email}
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-sona-teal shrink-0" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-red-600">Missing</span>
                          <XCircle className="w-3 h-3 text-red-600 shrink-0" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-sona-stone-400" />
                      {contact.phone ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-sona-dark-teal">{contact.phone}</span>
                          <CheckCircle2 className="w-3 h-3 text-sona-teal shrink-0" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-red-600">Missing</span>
                          <XCircle className="w-3 h-3 text-red-600 shrink-0" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-sona-stone-400" />
                      <a
                        href={`https://${contact.linkedinUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-sona-teal hover:text-sona-teal truncate"
                      >
                        Profile
                        <ExternalLink className="w-2.5 h-2.5 inline ml-1" />
                      </a>
                    </div>
                  </div>

                  {/* Badges Row */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span
                      className={cn(
                        'text-[10px] font-medium px-1.5 py-0.5 rounded-sm',
                        enrichmentSourceColors[contact.enrichmentSource] || enrichmentSourceColors.Manual
                      )}
                    >
                      {contact.enrichmentSource}
                    </span>
                    <Badge variant={sc.variant} className="text-[10px]">
                      {sc.label}
                    </Badge>
                  </div>

                  {/* Push to HubSpot */}
                  <button
                    onClick={() => handlePushToHubspot(contact.id)}
                    disabled={isPushed}
                    className={cn(
                      'w-full text-xs font-medium py-1.5 rounded transition-colors',
                      isPushed
                        ? 'bg-teal-50 text-sona-teal cursor-default'
                        : 'bg-sona-stone-100 hover:bg-sona-stone-100 text-sona-stone-400 hover:text-sona-dark-teal border border-sona-stone-200'
                    )}
                  >
                    {isPushed ? 'Pushed to HubSpot' : 'Push to HubSpot'}
                  </button>
                </Card>
              )
            }

            // Empty slot
            return (
              <div
                key={persona}
                className="border-2 border-dashed border-sona-stone-200 rounded p-5 flex flex-col items-center justify-center text-center min-h-[240px]"
              >
                <div className="w-10 h-10 rounded-sm bg-sona-stone-100 flex items-center justify-center mb-3">
                  <UserPlus className="w-5 h-5 text-sona-stone-400" />
                </div>
                <div className="text-sm text-sona-stone-400 mb-1">
                  No {persona} identified
                </div>
                <button className="mt-2 flex items-center gap-1 text-xs text-sona-teal hover:text-sona-teal transition-colors font-medium">
                  <Search className="w-3 h-3" />
                  Discover
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Enrichment Waterfall */}
      <div>
        <h2 className="text-lg font-semibold text-sona-dark-teal mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          Enrichment Waterfall
        </h2>
        <Card>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] gap-4 pb-2 border-b border-sona-stone-200">
              <div className="text-xs font-medium text-sona-stone-400 uppercase">Contact</div>
              <div className="grid grid-cols-4 gap-2">
                {enrichmentSources.map((source) => (
                  <div
                    key={source}
                    className="text-xs font-medium text-sona-stone-400 text-center uppercase"
                  >
                    {source}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {accountContacts.map((contact) => {
              const waterfall = getEnrichmentWaterfall(contact)
              return (
                <div
                  key={contact.id}
                  className="grid grid-cols-[200px_1fr] gap-4 items-center"
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={contact.name} size="sm" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-sona-dark-teal truncate">
                        {contact.name}
                      </div>
                      <div className="text-xs text-sona-stone-400 truncate">
                        {contact.role}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {waterfall.map((step, i) => (
                      <div key={step.source} className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          {step.found ? (
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-sona-teal" />
                              <span className="text-xs text-sona-teal">Found</span>
                            </div>
                          ) : step.checked ? (
                            <div className="flex items-center gap-1.5">
                              <XCircle className="w-4 h-4 text-red-600/60" />
                              <span className="text-xs text-red-600/60">No data</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-sona-stone-400/40" />
                              <span className="text-xs text-sona-stone-400/40">Pending</span>
                            </div>
                          )}
                          {i < enrichmentSources.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-sona-border ml-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {accountContacts.length === 0 && (
              <div className="text-center py-8 text-sona-stone-400">
                No contacts found for this account. Use the Discover feature above to find contacts.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
