import type { Contact } from '@/types'

export const contacts: Contact[] = [
  // Burger King contacts
  { id: 'con-1', accountId: 'acc-1', name: 'Claire Matthews', role: 'VP Human Resources', persona: 'HR Director', email: 'c.matthews@burgerking.co.uk', phone: '+44 7700 900123', linkedinUrl: 'linkedin.com/in/clairematthews', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-10', sentiment: 'neutral', engagementScore: 45 },
  { id: 'con-2', accountId: 'acc-1', name: 'Tom Reynolds', role: 'Operations Director', persona: 'Operations Director', email: 't.reynolds@burgerking.co.uk', phone: '+44 7700 900124', linkedinUrl: 'linkedin.com/in/tomreynolds', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-17', sentiment: 'champion', engagementScore: 92 },
  { id: 'con-3', accountId: 'acc-1', name: 'David Chen', role: 'IT Director', persona: 'IT Director', email: 'd.chen@burgerking.co.uk', phone: '', linkedinUrl: 'linkedin.com/in/davidchen', enrichmentStatus: 'verified', enrichmentSource: 'Full Enrich', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },
  { id: 'con-4', accountId: 'acc-1', name: 'Rebecca Foster', role: 'CFO', persona: 'Finance Director', email: '', phone: '', linkedinUrl: 'linkedin.com/in/rebeccafoster', enrichmentStatus: 'missing', enrichmentSource: 'LinkedIn', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },

  // Tortilla contacts
  { id: 'con-5', accountId: 'acc-2', name: 'Lisa Park', role: 'Head of People', persona: 'HR Director', email: 'lisa.park@tortilla.co.uk', phone: '+44 7700 900125', linkedinUrl: 'linkedin.com/in/lisapark', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-05', sentiment: 'positive', engagementScore: 55 },
  { id: 'con-6', accountId: 'acc-2', name: 'Marco Silva', role: 'Operations Manager', persona: 'Operations Director', email: 'm.silva@tortilla.co.uk', phone: '+44 7700 900126', linkedinUrl: 'linkedin.com/in/marcosilva', enrichmentStatus: 'verified', enrichmentSource: 'Full Enrich', lastContacted: '2026-02-28', sentiment: 'neutral', engagementScore: 30 },

  // Loungers contacts
  { id: 'con-7', accountId: 'acc-3', name: 'Rachel Green', role: 'Chief Operating Officer', persona: 'C-Suite', email: 'r.green@loungers.co.uk', phone: '+44 7700 900127', linkedinUrl: 'linkedin.com/in/rachelgreen', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-18', sentiment: 'champion', engagementScore: 95 },
  { id: 'con-8', accountId: 'acc-3', name: 'Mark Williams', role: 'Chief Financial Officer', persona: 'Finance Director', email: 'm.williams@loungers.co.uk', phone: '+44 7700 900128', linkedinUrl: 'linkedin.com/in/markwilliams', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-18', sentiment: 'positive', engagementScore: 78 },
  { id: 'con-9', accountId: 'acc-3', name: 'Dan Foster', role: 'Head of HR', persona: 'HR Director', email: 'd.foster@loungers.co.uk', phone: '+44 7700 900129', linkedinUrl: 'linkedin.com/in/danfoster', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-15', sentiment: 'positive', engagementScore: 70 },

  // Wagamama contacts
  { id: 'con-10', accountId: 'acc-5', name: 'Marcus Webb', role: 'Chief Operating Officer', persona: 'C-Suite', email: 'm.webb@wagamama.com', phone: '+44 7700 900130', linkedinUrl: 'linkedin.com/in/marcuswebb', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-15', sentiment: 'champion', engagementScore: 88 },
  { id: 'con-11', accountId: 'acc-5', name: 'Helen Park', role: 'Chief Financial Officer', persona: 'Finance Director', email: '', phone: '', linkedinUrl: 'linkedin.com/in/helenpark', enrichmentStatus: 'stale', enrichmentSource: 'Rocket Reach', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },
  { id: 'con-12', accountId: 'acc-5', name: 'James Liu', role: 'IT Director', persona: 'IT Director', email: 'j.liu@wagamama.com', phone: '+44 7700 900131', linkedinUrl: 'linkedin.com/in/jamesliu', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-10', sentiment: 'neutral', engagementScore: 35 },

  // Barchester contacts
  { id: 'con-13', accountId: 'acc-9', name: 'Patricia Holmes', role: 'Group HR Director', persona: 'HR Director', email: 'p.holmes@barchester.com', phone: '+44 7700 900132', linkedinUrl: 'linkedin.com/in/patriciaholmes', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-16', sentiment: 'positive', engagementScore: 60 },
  { id: 'con-14', accountId: 'acc-9', name: 'Steve Clarke', role: 'Regional Director', persona: 'Operations Director', email: 's.clarke@barchester.com', phone: '+44 7700 900133', linkedinUrl: 'linkedin.com/in/steveclarke', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-16', sentiment: 'champion', engagementScore: 82 },
  { id: 'con-15', accountId: 'acc-9', name: 'Angela Morrison', role: 'Finance Director', persona: 'Finance Director', email: 'a.morrison@barchester.com', phone: '', linkedinUrl: 'linkedin.com/in/angelamorrison', enrichmentStatus: 'verified', enrichmentSource: 'Full Enrich', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },

  // HC-One contacts
  { id: 'con-16', accountId: 'acc-10', name: 'Raj Mehta', role: 'IT Director', persona: 'IT Director', email: 'r.mehta@hc-one.co.uk', phone: '+44 7700 900134', linkedinUrl: 'linkedin.com/in/rajmehta', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-14', sentiment: 'positive', engagementScore: 50 },
  { id: 'con-17', accountId: 'acc-10', name: 'Susan Walker', role: 'Chief People Officer', persona: 'HR Director', email: '', phone: '', linkedinUrl: 'linkedin.com/in/susanwalker', enrichmentStatus: 'pending', enrichmentSource: 'Cognism', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },

  // Caring Homes contacts
  { id: 'con-18', accountId: 'acc-11', name: 'John Peters', role: 'Managing Director', persona: 'C-Suite', email: 'j.peters@caringhomes.org', phone: '+44 7700 900135', linkedinUrl: 'linkedin.com/in/johnpeters', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-17', sentiment: 'champion', engagementScore: 90 },
  { id: 'con-19', accountId: 'acc-11', name: 'Sarah Chen', role: 'Operations Manager', persona: 'Operations Director', email: 's.chen@caringhomes.org', phone: '+44 7700 900136', linkedinUrl: 'linkedin.com/in/sarachen', enrichmentStatus: 'verified', enrichmentSource: 'Full Enrich', lastContacted: '2026-03-17', sentiment: 'champion', engagementScore: 88 },

  // Five Guys contacts
  { id: 'con-20', accountId: 'acc-7', name: 'Jessica Adams', role: 'HR Director', persona: 'HR Director', email: 'j.adams@fiveguys.co.uk', phone: '', linkedinUrl: 'linkedin.com/in/jessicaadams', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '', sentiment: 'unknown', engagementScore: 10 },

  // Anchor Hanover contacts
  { id: 'con-21', accountId: 'acc-13', name: 'David Brown', role: 'Chief Operating Officer', persona: 'C-Suite', email: '', phone: '', linkedinUrl: 'linkedin.com/in/davidbrown', enrichmentStatus: 'pending', enrichmentSource: 'Cognism', lastContacted: '', sentiment: 'unknown', engagementScore: 0 },

  // Metropolitan Care contacts
  { id: 'con-22', accountId: 'acc-14', name: 'Mike Taylor', role: 'Chief Executive Officer', persona: 'C-Suite', email: 'm.taylor@metropolitancare.co.uk', phone: '+44 7700 900137', linkedinUrl: 'linkedin.com/in/miketaylor', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-02-20', sentiment: 'positive', engagementScore: 55 },
  { id: 'con-23', accountId: 'acc-14', name: 'Amy Watson', role: 'Head of Digital', persona: 'IT Director', email: 'a.watson@metropolitancare.co.uk', phone: '+44 7700 900138', linkedinUrl: 'linkedin.com/in/amywatson', enrichmentStatus: 'verified', enrichmentSource: 'Cognism', lastContacted: '2026-03-08', sentiment: 'champion', engagementScore: 75 },
]

export const getContact = (id: string) => contacts.find((c) => c.id === id)
export const getContactsByAccount = (accountId: string) => contacts.filter((c) => c.accountId === accountId)
export const getChampions = () => contacts.filter((c) => c.sentiment === 'champion')
