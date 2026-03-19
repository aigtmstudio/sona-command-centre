# Sona GTM Command Centre — Build Spec
*For use with Claude Code — initialise repo and scaffold from this document*

---

## What this is

A modular AI command centre for Sona's GTM team. Four role-based modules, each containing purpose-built sub-modules that connect to Sona's existing tech stack (HubSpot, Gong, Granola, Slack, Notion, LinkedIn Sales Nav, Cognism, Full Enrich, Lemlist, Canva, Gmail & Gcal). The command centre is the single interface the GTM team opens every morning.

## What Sona is (context for all AI agents)

Sona is a workforce management platform for frontline workers (scheduling, payroll, billing, comms, LMS) with an agentic AI layer and an internal app builder called Forge. ~$15M ARR targeting $25M in 2026. Average deal ~$200K. Two core verticals: social care (UK, established market leader) and hospitality (UK, fast-growing). Entering retail (UK) and US hospitality in 2026.

**CRM:** HubSpot (data quality is poor — treat as unreliable without validation - aim to re-enrich/validate before usage where a record is over 6 months old)
**Call intelligence:** Gong
**Meeting notes:** Granola
**Comms:** Slack (heavy use — significant deal context lives here)
**Contact data:** Cognism (primary), Full Enrich (HubSpot-embedded), Rocket Reach (inconsistent)
**Outbound orchestration:** Lemlist (trial phase)
**Sales methodology:** MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion)

**ICP:** Companies with 250+ frontline employees. Sweet spot 2,000–5,000 employees. Verticals: social care, hospitality, retail. Want to improve their large enterprise (10k+ employees) success

**Buying personas (priority order):**
1. HR Director / VP HR
2. Operations Director
3. Finance Director / CFO
4. IT / Digital Transformation Director
5. C-suite (CEO/COO)

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│                   SONA COMMAND CENTRE                        │
│                                                             │
│  Shared services layer:                                     │
│  ┌─────────┐ ┌──────┐ ┌────────┐ ┌───────┐ ┌───────────┐  │
│  │ HubSpot │ │ Gong │ │Granola │ │ Slack │ │ Cognism/Full Enrich │ │ Notion │  │
│  └─────────┘ └──────┘ └────────┘ └───────┘ └───────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  KNOWLEDGE LAYER                      │   │
│  │  Sona playbook · Product knowledge · Competitor       │   │
│  │  intel (needs improving/pulling from multiple sources) · Case studies · Vertical context · ICP rules  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────┐ ┌────────┐ ┌───────────┐ ┌────────────┐   │
│  │  BDR HQ    │ │ AE HQ  │ │ MKTG HQ   │ │ MANAGER HQ │   │
│  │            │ │        │ │           │ │            │   │
│  │ 5 modules  │ │5 modules││ 5 modules │ │ 4 modules  │   │
│  └────────────┘ └────────┘ └───────────┘ └────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Module 1: BDR HQ

The daily operating system for the BDR team. Designed around a BDR who manages ~30 priority accounts on a monthly rotation, runs outbound across email, phone, and LinkedIn, and hands qualified meetings to AEs.

### 1.1 Account Prioritiser

**Purpose:** Replace gut-feel account selection with signal-driven prioritisation.

**What it does:**
- Ingests trigger signals from multiple sources: HubSpot activity (website visits, content downloads, form fills), LinkedIn (job changes, company news, funding rounds, hiring signals), Gong (existing call history with the account), Slack (any mentions of the account across deal channels)
- Scores and ranks the BDR's assigned accounts by outreach readiness using a composite signal score
- Surfaces the *why* behind each recommendation — not just "call this account" but "call this account because their HR Director just posted about scheduling pain on LinkedIn and they downloaded the hospitality case study last week"
- Refreshes weekly; allows manual override and pinning
- Distinguishes between net-new prospecting accounts and re-engagement accounts (went dark, previously unresponsive)

**Data sources:** HubSpot, LinkedIn Sales Nav, Gong, Slack, Notion, web scraping (company news)

**Key design constraint:** The 30-account rotation system (introduced by Ollie, BDR Team Lead) is the operating rhythm. This module works within it, not against it.

---

### 1.2 Contact Discovery & Enrichment Engine

**Purpose:** Eliminate the manual Cognism → HubSpot chain that eats hours of every PG day.

**What it does:**
- Given a target account, maps the likely buying committee: HR Director, Ops Director, Finance Director, IT lead, plus potential champions and blockers
- Runs a waterfall enrichment across Cognism → Full Enrich → Rocket Reach → LinkedIn to find verified contact details (email, phone, LinkedIn URL)..auto push to other providers (prospeo, leadmagic, exa only if required)
- Validates data freshness — flags contacts who have changed roles in the last 90 days
- Pushes enriched contacts to HubSpot with correct attribution, account assignment, and persona tagging
- Allows bulk runs (e.g. "enrich top 10 priority accounts") or single-account deep dives
- Shows the BDR the buying committee map visually: who we have, who we're missing, confidence level on each contact

**Data sources:** Cognism, Full Enrich, Rocket Reach, LinkedIn Sales Nav, HubSpot

**Key design constraint:** Max (BDR AI Champion) has identified that AI-generated outreach is detectable. This module finds people — it does not auto-send anything. Contacts are enriched and loaded; outreach is a separate, human-driven step.

---

### 1.3 Outreach Intelligence

**Purpose:** Arm BDRs with sharp, relevant angles for every outreach touchpoint — without writing the message for them.

**What it does:**
- For a selected account and contact, generates a briefing pack containing:
  - **Key insights:** What's happening at this company right now (recent news, strategic priorities from annual reports or LinkedIn, regulatory changes in their vertical)
  - **Relevant content:** Which Sona case studies, blog posts, or assets map to this account's situation (e.g. "they're a hospitality chain with 3,000 staff — share the Loungers case study")
  - **Outreach angles:** 3–5 specific hooks the BDR could use, grounded in real signals, not generic templates. E.g. "Their COO just posted about labour costs — lead with the ROI calculator" or "They're a 4th customer — lead with the migration story"
  - **Competitor context:** What system they're likely running today (based on vertical, company size, any intel in HubSpot/Gong/Slack), and what the displacement angle is
  - **Peer comparison hooks:** "Here's what a similar operator is doing with Sona" — the #1 conversion driver in hospitality
- Does NOT write the email or LinkedIn message. Provides the ingredients. The BDR writes the outreach.

**Data sources:** HubSpot, Gong, Slack, web search, Sona content library, knowledge base

**Key design constraint:** Per Max's insight — AI-personalised messages are detectable. This module provides intelligence and angles; the human writes the message. AI-drafts-human-edits at most.

---

### 1.4 AE Handover Pack

**Purpose:** Ensure every meeting handed to an AE comes with full context, not a calendar invite and a prayer.

**What it does:**
- When a BDR qualifies a meeting, they trigger the handover module
- Auto-generates a structured handover document containing:
  - **Account summary:** Company overview, employee count, vertical, current tech stack (if known), key signals that triggered outreach
  - **Buying committee map:** Who we've spoken to, who we haven't, org chart (if available), likely decision-making structure
  - **Conversation history:** Summary of all BDR touchpoints — calls (from Gong), emails, LinkedIn messages, notes from Slack
  - **MEDDIC pre-fill:** What we know so far against each MEDDIC field (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) — highlighting gaps the AE needs to fill in discovery
  - **Recommended next steps:** Suggested discovery questions, assets to share, who else to bring into the conversation
- Posts the handover pack to the relevant Slack deal channel and attaches it to the HubSpot deal record
- Sends a notification to the assigned AE

**Data sources:** HubSpot, Gong, Slack, Granola, Cognism, scraping

---

### 1.5 BDR Chief of Staff (Second Brain)

**Purpose:** A daily operating partner that keeps each BDR on track against their targets.

**What it does:**
- **Morning briefing:** Every morning, surfaces a personalised rundown:
  - Where the BDR stands against their monthly meeting-set target (e.g. "You've booked 6 of your 12 target meetings. You're 3 days ahead / 2 days behind pace.")
  - Today's priority actions based on the Account Prioritiser
  - Any inbound leads assigned overnight that need follow-up
  - Calendar review: meetings today, prep needed
  - Outstanding tasks and follow-ups from yesterday
- **Activity analysis and forward projection:**
  - Pulls historical activity data: emails sent, calls made, LinkedIn touches, meetings booked, conversion rates at each stage
  - Projects forward: "At your current pace of 40 calls/week with a 5% conversion rate, you'll finish the month at 8 meetings — 4 short of target"
  - Suggests specific behavioural adjustments: "If you increase call volume by 15 calls/week, your projection moves to 11 meetings" or "Your email-to-meeting rate is 2x your call rate this month — consider shifting 30 minutes from calls to targeted email sequences"
  - Allows the BDR to interrogate the model: "What if I focus only on hospitality accounts?" / "What happens if my call conversion improves to 7%?"
- **Afternoon check-in:** Mid-afternoon nudge — what's done, what's still open, any blockers
- **Weekly review:** Friday summary — what moved, what didn't, patterns to watch, wins to celebrate

**Data sources:** HubSpot (activity + pipeline data), Gong (call data)/Granola, calendar, Slack

**Key design constraint:** This must feel like a coach, not a surveillance tool. Tone is supportive and forward-looking. It's the BDR's personal tool — managers cannot see it (they have their own module).

---

## Module 2: AE HQ

The daily operating system for account executives. Designed around an AE managing a portfolio of 20–40 active opportunities across different stages, running discovery calls, demos (with Solutions Consultants), and complex multi-stakeholder deal cycles.

### 2.1 Account Planner

**Purpose:** Give every AE a structured, living account plan for their priority deals.

**What it does:**
- For each active opportunity, maintains a dynamic account plan that pulls from all available data:
  - **Company intelligence:** Financial performance, strategic priorities, recent news, regulatory environment, competitive landscape
  - **Stakeholder map:** All known contacts, their roles, their sentiment (from Gong call analysis), engagement history, who's the champion, who's the blocker, who's missing
  - **MEDDIC scorecard:** Live assessment of each MEDIC field with confidence levels. Highlights gaps: "No Economic Buyer identified" or "Decision Criteria unclear — needs clarification in next call"
  - **Competitive positioning:** What system they're on today, why Sona wins against that competitor, displacement playbook for that specific competitor
  - **Deal timeline:** Key milestones, decision dates, procurement process, contract renewal dates (critical for social care RFP cycles)
  - **Risk flags:** Deals going cold (no activity in X days), single-threaded (only one contact engaged), missing MEDDIC fields, stalled stages, no committed next steps
- Account plans update automatically as new data comes in (calls logged/recorded, emails sent, Slack discussions)
- Allows the AE to add manual context and strategic notes

**Data sources:** HubSpot, Gong, Slack, Granola, web search, Notion/Sona knowledge base

---

### 2.2 Discovery & Demo Coach

**Purpose:** Help AEs prepare for and improve from every customer conversation.

**What it does:**

**Pre-call prep:**
- Before any scheduled call, generates a briefing:
  - What we know about this account and contact (from account plan)
  - Objectives for this call (based on deal stage and MEDDIC gaps)
  - Suggested discovery questions — specifically targeting areas where information is thin
  - Potential objections and how to handle them (from Sona's objection-handling playbook)
  - Relevant case studies or proof points to reference
- For demo calls: highlights which product modules are most relevant to this prospect's pain points, suggests demo flow

**Post-call review:**
- Ingests the Gong/Granola transcript after the call
- Analyses against a coaching framework:
  - **Discovery depth:** Did the AE get beyond surface-level answers? Did they reframe and dig at least three times on each pain point? (This is a specific coaching priority identified by Kate, AE Manager)
  - **MEDDIC progression:** What new MEDDIC information was uncovered? What's still missing?
  - **Talk ratio:** How much did the AE talk vs. listen?
  - **Next steps:** Were clear, committed next steps established?
  - **Risk signals:** Any concerns raised by the prospect? Any buying signals missed?
- Generates a post-call summary with coaching suggestions — not a grade, but a "here's what went well and here's what to explore next time"

**Data sources:** Gong (transcripts), Granola (notes), HubSpot (deal context), calendar, Notion/Sona playbook, Slack (previous related notes/questions)

**Key design constraint:** Per Kate's insight — AI summaries can mask shallow discovery. This module must be honest about discovery quality, not just produce polished summaries. Flag when a call was surface-level, don't polish it.
If a deal doesn't progress, but contains account insights, these must be logged and codified in a consistent, easy to find and utilise/surface way.

---

### 2.3 Admin Assistant (Post-Meeting Automation)

**Purpose:** Automate the post-meeting admin that eats 30–60 minutes of an AE's day after every call. Based on Harry's existing "Admin Saver" build.

**What it does:**
- After every meeting (triggered by Granola transcript completion):
  1. Reads the Granola/Gong transcript
  2. Confirms the deal with the AE (quick approval step — "Is this about the Burger King deal? Yes/No")
  3. Posts a structured update to the relevant Slack deal channel — focused on strategic context, key takeaways, and next steps (not a wall of text)
  4. Updates HubSpot fields: MEDDIC fields (Champion, Pain, Decision Criteria etc.), tech stack mentions, deal stage progression, next step date, any new contacts mentioned
  5. Checks recent Slack posts in the deal channel before posting — avoids duplicate information
  6. Logs the meeting in HubSpot with a clean summary
  7. Creates any follow-up tasks in the AE's task list with due dates or sets them as a small task block in the calendar

**Data sources:** Granola, Gong, Slack, HubSpot

**Key design constraint:** Always requires AE confirmation before posting/updating. Never fully autonomous. The AE must review and approve. (But could be done in their own Slack or email for ease)

---

### 2.4 In-Deal Asset Factory

**Purpose:** Allow AEs to create polished deal assets on the fly without waiting for marketing or design.

**What it does:**
- Generates deal-specific assets from templates, populated with real account and deal data:
  - **One-pagers:** Tailored to the prospect's vertical, size, and pain points. Shows relevant modules, proof points, case studies, and ROI indicators
  - **Battle cards:** Competitive displacement cards for the specific competitor the prospect is evaluating or migrating from (Fourth, Harry, Allocate, Civica, etc.)
  - **Mutual action plans (MAPs):** Shared timeline documents for complex deals — what happens when, who's responsible, key milestones to close. Could be interactive or simple based on the AEs need
  - **Mini mockups:** Simple visual representations of "here's what Sona would look like for your team" — scheduling views, dashboard examples, tailored to their employee count and vertical
  - **ROI calculators:** Interactive calculators that take the prospect's inputs (employee count, current labour costs, scheduling overhead, agency spend) and output projected savings with Sona. Must be based on real evidence taken from prevoius conversations or shared materials + relevant case studies.
  - **Executive summaries:** For deals where the AE needs to get a document in front of the CFO or CEO who isn't in the sales process — a clean one-page strategic summary of why Sona, tailored to that exec's priorities
- All assets are on-brand and consistent
- Assets can be generated mid-conversation ("I need a one-pager for a 3,000-employee hospitality chain migrating from 4th") or pre-built as part of deal prep

**Data sources:** Sona brand templates, HubSpot (deal data), Sona product knowledge base, competitor intel, Canva

---

### 2.5 AE Chief of Staff (Second Brain)

**Purpose:** A strategic operating partner that helps AEs prioritise their time, manage their pipeline, and stay ahead of risks.

**What it does:**
- **Morning briefing:**
  - Pipeline snapshot: total pipeline value, deals by stage, weighted forecast, gap to quota
  - Today's meetings with quick-reference prep (from Discovery & Demo Coach)
  - Deals needing attention: stalled, at risk, approaching decision date, missing next steps
  - Outstanding follow-ups and commitments from previous days
  - Any new inbound activity on existing deals (prospect visited pricing page, downloaded content, etc.)
- **Pipeline coaching:**
  - "You have £850K in pipeline against a £400K quarterly target — but £500K of that is in Stage 1. You need to progress 3 deals to Stage 3 this week to stay on pace."
  - Identifies deals at risk of slipping: "The Tortilla deal hasn't had contact in 12 days — is this stalled?"
  - If pipeline coverage is thin: "Your pipeline-to-quota ratio is 1.8x — below the 3x benchmark. Consider reactivating outbound to these 5 accounts that showed interest last quarter."
- **Weekly planning:**
  - Helps the AE plan their week by deal priority, not just calendar order
  - Suggests time allocation: "You're spending 40% of your week on a deal that's 10% of your pipeline — is that the right balance?"
- **Friday review:**
  - What moved forward, what didn't, what's the honest forecast for the month/quarter

**Data sources:** HubSpot (pipeline + activity), Gong (call data), Slack, calendar

---

## Module 3: Marketing HQ

The operating system for the marketing team. Designed around a small, events-heavy marketing function (2–3 people) that drives demand primarily through field events, owned events, content, and ABM.

### 3.1 Pre-Event Intelligence

**Purpose:** Turn delegate lists into actionable intelligence packs before every event.

**What it does:**
- When a delegate list lands (often 48 hours before the event, sometimes less):
  1. Ingests the list (CSV, spreadsheet, or manual entry)
  2. Enriches each attendee: company, role, employee count, vertical, ICP match score
  3. Cross-references with HubSpot: existing contact? existing deal? previous engagement?
  4. Prioritises attendees into tiers: Tier 1 (must-meet, ICP match, no existing relationship), Tier 2 (existing relationship, nurture opportunity), Tier 3 (non-ICP, low priority)
  5. For Tier 1 contacts, generates a mini briefing: company context, likely pain points, suggested conversation openers, relevant Sona proof points
  6. Produces a printable one-page event battle plan: who to find, what to say, what to leave behind
  7. Distributes the pack to attending team members via Slack

**Data sources:** Event delegate list, HubSpot, Cognizant, LinkedIn, web search

**Key design constraint:** GDPR-aware. Only enriches contacts where legitimate interest exists (B2B context, professional data). Flags any contacts where enrichment shouldn't occur.

---

### 3.2 Post-Event Pipeline Machine

**Purpose:** Ensure every event attendee is fully enriched, properly attributed, and routed for follow-up within 24 hours — not 2 weeks.

**What it does:**
- After an event, the marketer uploads the attendee/lead list (or it's pulled from the event platform)
- Runs the full enrichment pipeline:
  1. **ICP scoring:** Filters attendees by vertical, employee count, role match
  2. **Data enrichment:** Company details, contact details, LinkedIn profiles via waterfall (Cognizant → Full Enrich → Rocket Reach)
  3. **HubSpot record creation/update:** Creates new contacts, updates existing ones, applies correct attribution (event source, campaign, date)
  4. **Deduplication:** Checks against existing HubSpot records to avoid duplicates
  5. **BDR routing:** Assigns qualified contacts to the correct BDR based on vertical and account ownership
  6. **Follow-up trigger:** Notifies the assigned BDR with context: "Met at [event], discussed [topic], priority: high"
- Tracks follow-up completion: did the BDR reach out within 48 hours? Did the contact engage?

**Post-event project manager mode:**
- Creates a checklist of all post-event tasks (enrichment, CRM updates, follow-up sequences, content repurposing, attribution tagging)
- Tracks completion across team members
- Sends daily nudges until all tasks are closed

**Data sources:** Event platforms, HubSpot, Cognizant, Full Enrich, Slack

**Key design constraint:** Syncs with BDR HQ — BDRs see event-sourced leads appear in their Account Prioritiser with event context attached.

---

### 3.3 Content & Campaign Intelligence

**Purpose:** Surface what the market is asking for so marketing can create content that actually resonates.

**What it does:**
- **Sales call theme mining:** Connects to Gong and analyses recent sales calls across the team. Identifies:
  - Recurring pain points prospects are raising (e.g. "agency costs keep coming up in 60% of hospitality calls this month")
  - Questions prospects are asking that Sona doesn't have content for (content gaps)
  - Objections that are appearing more frequently (signals for battle card updates or new content)
  - Language and terminology prospects use (so marketing content matches buyer vocabulary, not internal jargon)
- **Collateral gap analysis:** Cross-references the topics being discussed in sales conversations with the existing content library. Highlights: "We have no case study for a care provider migrating from Allocate" or "No ROI content targeting CFOs"
- **Event and webinar ideation:** Based on trending themes in calls, suggests owned event topics and webinar themes. E.g. "AI in scheduling is coming up in 40% of calls — consider an 'AI for Frontline Workforce' webinar"
- **Competitive content monitoring:** Flags when competitors are being mentioned more frequently, or when a new competitor enters the conversation

**Data sources:** Gong (call transcripts), Sona content library, HubSpot (deal data), web search (competitor monitoring)

---

### 3.4 ABM Workshop

**Purpose:** Help the marketing team plan and execute account-based campaigns for key target accounts.

**What it does:**
- For a selected target account (or cluster of accounts), helps brainstorm and plan:
  - **Account intelligence:** Deep company research, key stakeholders, strategic priorities, recent news, trigger events
  - **Engagement mapping:** Where are we today? Who have we reached? What channels have been tried? What's worked?
  - **Connection strategy:** How to get warm introductions — mutual connections, event overlap, partner relationships, customer advocates who know someone there
  - **Campaign planning:** Suggests multi-channel ABM plays: personalised direct mail (via ReachDesk), targeted LinkedIn content, executive dinner invitations, personalised one-pagers, bespoke webinar invitations
  - **Content personalisation:** Takes existing Sona content and tailors it to the specific account — "Here's the hospitality case study rewritten to emphasise the scheduling pain points that [Target Company] is likely experiencing"
- Tracks engagement across channels for each target account
- Syncs with BDR HQ and AE HQ — ensures the ABM activity is visible to the BDR and AE assigned to the account

**Data sources:** HubSpot, LinkedIn, Slack, ReachDesk, Sona content library, web search

---

### 3.5 Marketing Chief of Staff (Second Brain)

**Purpose:** Help the marketing team plan their time around pipeline goals, not just campaign calendars.

**What it does:**
- **Morning briefing:**
  - Today's deadlines and priorities
  - Meetings and prep needed
  - Outstanding tasks from yesterday
  - Any overnight activity: new MQLs, event registrations, content engagement spikes
- **Pipeline-linked planning:**
  - Marketing contribution to pipeline: what's been sourced, what's been influenced, current gap to target
  - Event ROI tracking: for each event attended/hosted, how many contacts were generated, how many became pipeline, how many closed
  - Content performance: which assets are being shared by sales, which are gathering dust
- **Campaign calendar management:**
  - Upcoming events, content deadlines, campaign launches — all in one view
  - Proactive alerts: "The hospitality roundtable is in 3 weeks — delegate outreach should start this week"
- **Weekly review:**
  - What moved, what's coming next, any fires to put out

**Data sources:** HubSpot (marketing analytics), event platforms, calendar, Slack

---

## Module 4: Manager HQ

The operating system for sales managers and leadership. Designed around a first-line manager (like Kate) who manages 5–7 AEs or a BDR team lead (like Ollie) who manages 6–7 BDRs.

### 4.1 One-to-One Prep & Coaching Engine

**Purpose:** Make every 1:1 meeting data-informed, action-tracked, and coaching-focused.

**What it does:**

**Before the 1:1:**
- Auto-generates a prep document for each direct report, pulling from:
  - **Pipeline health:** Current pipeline value, stage distribution, movement since last 1:1, deals won/lost
  - **Activity metrics:** Calls made, emails sent, meetings booked, conversion rates — trended over time, not just snapshot
  - **Deal risks:** Stalled deals, single-threaded deals, deals missing MEDDIC fields, deals past expected close date
  - **Target progress:** Where they are vs. monthly/quarterly target, pace to close the gap
  - **Gong insights:** Flagged calls (low discovery depth, missed next steps, talk ratio issues), coaching moments the manager should review
  - **Actions from last 1:1:** What was agreed, what was completed, what's still outstanding (pulled from Granola transcript of previous 1:1)
- Suggests coaching topics: "Joey's discovery depth score has dropped — review the Burger King call from Tuesday" or "Thomas has 3 deals stalled in Stage 2 — discuss what's blocking progression"

**After the 1:1:**
- Granola captures the conversation
- Extracts action items and commitments
- Logs them for tracking in the next 1:1
- Closes the accountability loop automatically

**Data sources:** HubSpot, Gong, Granola, Slack, calendar

**Key design constraint:** Per Kate's philosophy — this augments the manager, it doesn't replace them. The manager brings judgment, empathy, and context. The tool brings data and saves prep time.

---

### 4.2 CRM & Data Hygiene Monitor

**Purpose:** Proactively identify and flag gaps in CRM data so the team stays clean without a monthly audit.

**What it does:**
- Runs continuous hygiene checks across the team's HubSpot data:
  - **Missing fields:** Deals without MEDIC fields populated, contacts without role/persona tags, companies without employee count or vertical
  - **Stale data:** Contacts who haven't been touched in 90+ days, deals with no activity logged, companies with outdated information
  - **Attribution gaps:** Leads without source attribution, deals without marketing touchpoint tracking, events without proper campaign tagging
  - **Duplicate detection:** Duplicate contacts, companies, or deals
  - **Note quality:** Deals where call notes are missing or suspiciously thin (possible AI-fill without substance)
- Generates a weekly hygiene report for the manager with specific actions: "3 of Joey's deals are missing Champion — flag in 1:1" or "12 contacts from last month's event still don't have source attribution"
- Can send gentle nudges to individual reps: "Hey, your Tortilla deal is missing the Economic Buyer field — can you update this?"

**Data sources:** HubSpot

**Key design constraint:** Tone matters. This is a coach, not an auditor. Nudges are supportive ("this will help your deal review go smoother") not punitive.

---

### 4.3 Enablement & Knowledge Engine

**Purpose:** Ensure the team is scaling up on product, strategy, and methodology — and that knowledge sticks.

**What it does:**
- **Product knowledge quizzes:** Generates interactive quizzes on Sona's product modules, features, pricing, competitive positioning. Tracks individual and team scores over time.
- **Methodology reinforcement:** MEDDIC scenario exercises — "Here's a deal situation: what's the next best action?" with feedback and coaching
- **New starter acceleration:** Structured onboarding modules that walk new joiners through:
  - Sona's product (module by module)
  - The sales methodology (MEDIC)
  - Vertical-specific context (social care vs. hospitality vs. retail)
  - Key competitors and how to position against them
  - Common objections and how to handle them
- **Continuous improvement:**
  - After each win/loss, generates a brief learning summary: what worked, what didn't, what to take forward
  - Monthly knowledge assessment: "Here are the 3 areas where the team is weakest — consider a lunch-and-learn on [topic]"
  - Leaderboard (opt-in) for quiz scores and completion rates to create healthy competition
- **Content from the field:** Surfaces insights from Gong calls that could become training material: "Harry's Burger King pitch on AI scheduling scored highest on Gong sentiment — consider sharing this as a best-practice example"

**Data sources:** Sona product knowledge base, Gong, HubSpot (win/loss data), internal content

**Key design constraint:** Must be lightweight and engaging, not a mandatory compliance exercise. Short quizzes (5 minutes), scenario-based learning, gamification elements. The goal is knowledge confidence, not checkbox completion.

---

### 4.4 Team Performance Dashboard

**Purpose:** Give managers a single view of team health without fighting HubSpot.

**What it does:**
- **Real-time team overview:**
  - Pipeline by rep: value, stage distribution, movement
  - Activity by rep: calls, emails, meetings, trending vs. previous period
  - Target progress: where each rep is vs. quota, pace projection
  - Deal velocity: average time in each stage, by rep
  - Win rate: by rep, by vertical, by deal size
- **Trend analysis:**
  - Week-over-week and month-over-month trends
  - Early warning indicators: rep activity declining, pipeline coverage dropping, deal velocity slowing
- **Forecast view:**
  - Weighted pipeline by close date
  - Best case, commit, and worst case scenarios
  - Integrates with Gong forecast module data
- **Drill-down capability:**
  - Click into any rep to see their detailed pipeline, activity, and coaching history
  - Click into any deal to see the full account plan from AE HQ

**Data sources:** HubSpot, Gong, Slack

---

## Technical requirements

### Stack recommendation
- **Frontend:** React + TypeScript, Tailwind CSS
- **Backend:** Node.js or Python (FastAPI)
- **Database:** PostgreSQL (for state management, caching, user preferences)
- **AI layer:** Anthropic Claude API (claude-sonnet-4-20250514 for fast operations, claude-opus-4-6 for complex analysis)
- **Integrations:** HubSpot API, Gong API, Slack API, Google Calendar API, Granola API, LinkedIn (scraping or Sales Nav API if available), Cognizant API, Lemlist API
- **Auth:** SSO via company Google Workspace or similar
- **Hosting:** Vercel or similar

### Integration priorities (build order)
1. HubSpot (required for almost everything)
2. Slack (deal context, notifications, handovers)
3. Gong (call intelligence, coaching, themes)
4. Google Calendar (scheduling, daily briefings)
5. Granola (meeting notes, post-meeting automation)
6. Notion (knowledge base)
7. Cognism / enrichment tools (contact discovery)
8. LinkedIn (signals, enrichment) - likely via Apify to scrape v direct API integration
9. Lemlist (outbound orchestration)
10. Full Enrich
11. Other data scrapers/providers (exa, tavily, jina, leadmagic, prospeo)
12. ReachDesk (ABM direct mail)

### Key UX principles
0. **Must match their brand** See https://www.sona.ai/
1. **Single interface:** The team opens one thing in the morning. Not 8 tabs.
2. **Role-based views:** Each module shows only what's relevant to that role. No information overload.
3. **Proactive, not reactive:** The system surfaces what matters. The user doesn't have to go looking.
4. **Human-in-the-loop always:** Every action that touches a prospect (email, Slack post, CRM update) requires human approval. Nothing sends automatically.
5. **Conversational where it matters:** The Chief of Staff modules should feel like talking to a colleague, not reading a dashboard. Interactive, interrogable, supportive.
6. **Mobile-friendly:** BDRs and marketers at events need access on their phones.

---

## Build phases (suggested)

### Phase 1: Foundation (Weeks 1–4)
- Core app shell with role-based routing
- HubSpot + Slack + Calendar integrations
- BDR Chief of Staff (morning briefing)
- AE Admin Assistant (Harry's Admin Saver, productised)
- Manager 1:1 Prep (basic version)

### Phase 2: Intelligence (Weeks 5–8)
- Gong integration
- BDR Account Prioritiser
- AE Discovery & Demo Coach
- Manager CRM Hygiene Monitor
- Marketing Post-Event Pipeline Machine

### Phase 3: Enrichment & Assets (Weeks 9–12)
- Contact Discovery & Enrichment Engine
- BDR Outreach Intelligence
- AE In-Deal Asset Factory
- Marketing Pre-Event Intelligence
- AE Account Planner

### Phase 4: Strategic (Weeks 13–16)
- AE Chief of Staff
- Marketing Content & Campaign Intelligence
- Marketing ABM Workshop
- Marketing Chief of Staff
- Manager Enablement & Knowledge Engine
- Manager Team Performance Dashboard
- BDR AE Handover Pack

---

## Appendix: Sona-specific context to embed in the knowledge layer

The AI agents powering each module need access to a shared knowledge layer containing:

1. **Sona product knowledge:** All modules (scheduling, payroll, billing, comms, LMS, Forge, AI layer), pricing, deployment model
2. **Vertical playbooks:** Social care (RFP-driven, 5-year cycles, CQC compliance), Hospitality (faster sales cycle, peer comparison drives conversion), Retail (new market, awareness-first)
3. **Competitor intelligence:** 4th (collapsing support, prepping for sale), Harri (lost focus), Allocate, Civica, Access Group, CoolCare, Deputy, Plan Day
4. **MEDIC methodology:** Field definitions, good vs. bad examples, qualification criteria
5. **Buying personas:** Detailed profiles of HR Director, Ops Director, Finance Director, IT Director, C-suite — what they care about, how to reach them, what content resonates
6. **Case studies and proof points:** By vertical, by use case, by competitor displacement
7. **Objection handling:** Common objections and recommended responses
8. **Tone and brand guidelines:** How Sona communicates externally
