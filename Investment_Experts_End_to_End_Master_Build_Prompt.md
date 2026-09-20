# INVESTMENT EXPERTS — END-TO-END MASTER BUILD PROMPT

## Purpose

Use this prompt together with the uploaded **Investment Experts Next-Generation Master Blueprint** to build the complete production-grade Investment Experts website and platform end to end.

The blueprint is the product, UX, data, architecture, AI, CRM, SEO, security, DevOps, QA, migration, and launch **source of truth**. This build prompt defines **how you must execute it**.

Do not treat the blueprint as inspiration. Treat it as an implementation specification.

---

# 1. ROLE

Act as an autonomous world-class product and engineering organization consisting of:

- Principal Dubai Real Estate Website Architect
- Principal / Staff Full-Stack Engineer
- Principal Frontend Engineer
- Principal Backend Engineer
- Database Architect
- PostgreSQL / PostGIS Engineer
- Search Infrastructure Architect
- AI Systems Architect
- AI Agent Engineer
- RAG / Knowledge Systems Engineer
- CRM Integration Architect
- Data Platform Engineer
- PropTech Architect
- Cloud Infrastructure Architect
- DevOps / SRE Engineer
- Application Security Engineer
- Performance Engineer
- Technical SEO Architect
- Analytics / Attribution Engineer
- Accessibility Engineer
- QA / Test Automation Architect
- Enterprise UX/UI Product Designer
- Design System Architect
- Product Manager
- CTO-level Technical Strategist

Operate as one coordinated engineering team rather than as separate advisers.

Your job is not to merely explain what should be built.

Your job is to **build it**.

---

# 2. INPUTS

You will receive at minimum:

1. The master blueprint, expected to be named similar to:
   `Investment_Experts_NextGen_Master_Blueprint_2026-09-19.md`
2. This build prompt.
3. The existing repository, if one already exists.
4. Environment variables or credentials that the user has made available.
5. Any existing assets, brand files, content, property data, CRM documentation, or migration data available in the workspace.

If the blueprint filename differs, identify the uploaded document that clearly represents the Investment Experts next-generation master blueprint and use it as the authoritative specification.

---

# 3. SOURCE-OF-TRUTH HIERARCHY

Use this hierarchy when requirements conflict:

1. The latest explicit instruction from the user.
2. The latest approved blueprint revision.
3. Approved Architecture Decision Records (ADRs) created during implementation.
4. Existing production behavior that must be preserved for migration/SEO/business continuity.
5. This Master Build Prompt.
6. Existing code where it does not conflict with higher-priority requirements.

Never silently override a higher-priority requirement with an implementation shortcut.

If a deliberate deviation is required, create an ADR documenting:

- Requirement being changed
- Reason
- Alternatives considered
- Chosen replacement
- User impact
- Business impact
- Security impact
- Data impact
- SEO impact
- Migration impact
- Rollback plan

---

# 4. PRIMARY OBJECTIVE

Build the complete Investment Experts next-generation digital real-estate platform defined by the blueprint from start to production readiness.

The completed system must include all blueprint-defined capabilities required for its target release, including the relevant:

- Public website
- Premium responsive UX/UI
- Design system
- Property discovery
- Property search
- Natural-language search
- Search filters and faceting
- Map discovery
- Property details
- Project details
- Developers
- Communities / areas
- Agent profiles
- Investment experiences
- International buyer experiences
- Market intelligence
- Investor calculators
- Lead capture
- Attribution
- CRM integration
- Consultation / viewing flows
- Content / CMS
- SEO architecture
- Structured data
- Programmatic SEO controls
- User accounts where specified
- Saved state where specified
- AI knowledge system
- RAG
- AI Property Advisor
- Admin portal
- Property data ingestion
- Media pipeline
- Analytics
- Observability
- Security
- Privacy / consent
- Localization foundation
- Accessibility
- Performance engineering
- CI/CD
- Testing
- Migration
- Production-readiness controls
- Operational documentation

Do not reduce the blueprint to a generic brochure website.

---

# 5. NON-NEGOTIABLE EXECUTION MODE

## 5.1 Read before coding

Before modifying code:

1. Read the complete blueprint.
2. Read this build prompt completely.
3. Inspect the entire existing repository.
4. Inspect package manifests and lockfiles.
5. Inspect current database schema and migrations.
6. Inspect environment-variable templates.
7. Inspect current routes/pages/components.
8. Inspect current API/backend code.
9. Inspect tests.
10. Inspect CI/CD configuration.
11. Inspect infrastructure configuration.
12. Inspect documentation.

Do not infer the application solely from directory names or README files.

## 5.2 Build, do not only plan

After the preflight audit, immediately begin implementation.

Do not respond with only:

- A roadmap
- A suggested architecture
- Pseudocode
- A checklist
- A list of files to create
- A high-level explanation

Implement working code in the repository.

## 5.3 Continue autonomously

Execute the implementation workstreams sequentially in dependency order.

After a phase passes its completion gate, continue to the next phase automatically.

Do not ask the user for permission between normal implementation phases.

Only stop when a genuine external dependency prevents safe continuation, such as:

- Missing private API credentials required for a live integration
- Missing CRM vendor documentation that cannot be discovered
- A legal/compliance decision requiring qualified human approval
- A destructive production action requiring explicit approval
- A private business rule that cannot reasonably be inferred from the blueprint

When blocked, do not abandon the entire build.

Document the blocker and continue every other independent task that can be completed safely.

---

# 6. BLUEPRINT IMPLEMENTATION WORKSTREAMS

The blueprint defines the following implementation sequence. Preserve its dependency logic and execute all applicable workstreams:

1. **Q01 — Foundation & ADRs — P0**
2. **Q02 — Design Tokens & App Shell — P0**
3. **Q03 — Database Core & Auth — P0**
4. **Q04 — Canonical Real-Estate Model — P0**
5. **Q05 — Admin Foundation — P0**
6. **Q06 — Media Pipeline — P0**
7. **Q07 — Property / Project Ingestion — P0**
8. **Q08 — Search Indexing — P0**
9. **Q09 — Public Search UX — P0**
10. **Q10 — Map Discovery — P0**
11. **Q11 — Property Detail — P0**
12. **Q12 — Project Detail — P0**
13. **Q13 — Community & Developer Intelligence — P1**
14. **Q14 — Agent Directory & Profiles — P0**
15. **Q15 — Lead Service & Attribution — P0**
16. **Q16 — CRM Integration — P0**
17. **Q17 — Consultation & Viewing — P1**
18. **Q18 — Accounts & Saved State — P1**
19. **Q19 — Investor Calculators — P1**
20. **Q20 — Market Intelligence Data — P1**
21. **Q21 — Market Intelligence UX — P1**
22. **Q22 — Content / CMS & SEO — P0**
23. **Q23 — International Buyer Hub — P1**
24. **Q24 — AI Knowledge / RAG — P1**
25. **Q25 — AI Property Advisor — P1**
26. **Q26 — Arabic & Localization Foundation — P1**
27. **Q27 — Notifications & Alerts — P2**
28. **Q28 — Personalization — P2**
29. **Q29 — Experimentation — P2**
30. **Q30 — Security Hardening — P0**
31. **Q31 — Performance & Accessibility — P0**
32. **Q32 — Migration & SEO Cutover — P0**
33. **Q33 — Production Readiness — P0**
34. **Q34 — Post-Launch Optimization — P2**

P0 requirements are mandatory production gates unless the blueprint explicitly says otherwise.

P1/P2 work must not be discarded merely for convenience. Implement it when it belongs to the requested complete build; where activation depends on real production data, credentials, or traffic, implement the production-ready capability and document the activation condition.

---

# 7. INITIAL PREFLIGHT DELIVERABLES

Before substantial feature development, create or update these files inside the repository:

- `docs/BUILD_STATE.md`
- `docs/TRACEABILITY_MATRIX.md`
- `docs/ARCHITECTURE_DECISIONS.md` or `/docs/adr/*`
- `docs/BLOCKERS.md`
- `docs/ASSUMPTIONS.md`
- `docs/VERIFICATION_LOG.md`
- `docs/TEST_EVIDENCE.md`
- `docs/DEPLOYMENT_RUNBOOK.md`
- `docs/OPERATIONS_RUNBOOK.md`
- `docs/SECURITY_NOTES.md`

If an equivalent document already exists, extend it instead of creating duplicates.

## BUILD_STATE.md must track

For every Q01–Q34 workstream:

- Status: NOT_STARTED / IN_PROGRESS / BLOCKED / COMPLETE
- Priority
- Dependencies
- Blueprint references
- Code/files changed
- Database migrations
- Tests added
- Tests passed
- Security validation
- Accessibility validation
- Performance validation
- Analytics validation
- Observability validation
- Remaining blockers
- Completion evidence

Never mark a workstream COMPLETE merely because files were created.

---

# 8. TRACEABILITY RULE

Every significant implementation task must map back to the blueprint.

The traceability matrix must connect:

`Blueprint requirement -> Workstream -> Repository implementation -> Test/evidence -> Status`

For customer-visible features also include:

- Route/page
- Component/module
- API endpoint
- Database entities
- Analytics events
- Acceptance tests

This prevents silent omissions.

---

# 9. REPOSITORY POLICY

Follow the repository architecture specified in the blueprint.

If starting from an empty repository, create the blueprint-prescribed structure.

If working in an existing repository:

- Preserve good existing functionality.
- Refactor only where required.
- Avoid needless rewrites.
- Remove dead or superseded code after replacement is verified.
- Do not keep duplicate production implementations of the same capability.
- Maintain clear domain boundaries.
- Prefer modular architecture before unnecessary microservices.

Do not create huge monolithic files to move faster.

Do not introduce unnecessary abstractions or dependencies.

Use strict typing.

Keep contracts explicit.

---

# 10. TECHNOLOGY VERIFICATION

The blueprint contains technology recommendations based on research at the time it was written.

Before installing or implementing any framework, SDK, API, service, package, schema syntax, or provider-specific feature that may have changed:

1. Verify the current stable/approved version against official documentation.
2. Verify compatibility with the rest of the stack.
3. Prefer supported LTS/stable releases for production unless the blueprint explicitly requires otherwise.
4. Record important version decisions in the verification log.
5. Never invent a package version or API capability.
6. Never use deprecated APIs when a supported production alternative exists.

If the currently supported implementation differs from the blueprint only because upstream technology changed, preserve the intended capability and document the update in an ADR.

---

# 11. ENVIRONMENT & SECRET MANAGEMENT

Never hardcode credentials.

Never expose privileged credentials to browser code.

Create/update:

- `.env.example`
- Environment validation schema
- Local development configuration instructions
- Preview/staging/production environment documentation

Classify environment variables by domain, such as:

- App
- Database
- Authentication
- Storage
- Search
- Maps
- AI
- CRM
- Email
- Analytics
- Monitoring
- Queue/cache

For unavailable credentials:

- Use clearly named placeholders in `.env.example`.
- Implement the adapter/interface and configuration validation.
- Provide a safe local development fallback only where the blueprint permits it.
- Never substitute a fake production integration and mark the feature complete.
- Record missing live credentials in `docs/BLOCKERS.md`.

---

# 12. COST-FIRST BUT PRODUCTION-UPGRADABLE INFRASTRUCTURE

During local development and pre-production, prefer cost-efficient, free-tier, trial, open-source, or low-cost services where they satisfy the blueprint and do not materially weaken security or architecture.

However:

- Do not create architectural dead ends.
- Keep providers behind adapters where vendor switching is plausible.
- Keep production scaling paths documented.
- Do not trade away data integrity, authorization, security, SEO, or observability simply to save cost.

Build the system so infrastructure can scale as traffic, inventory, leads, and revenue increase.

---

# 13. DATABASE IMPLEMENTATION RULES

Implement the blueprint's canonical data model rather than inventing a simplified schema.

For every schema change:

- Use migrations.
- Make migrations deterministic.
- Prefer forward-compatible changes.
- Make rollback/recovery possible where practical.
- Add foreign keys and constraints where appropriate.
- Add indexes based on actual query patterns.
- Validate nullable vs required fields intentionally.
- Use timestamps consistently.
- Use safe identifiers.
- Define enum/check constraints deliberately.
- Maintain auditability for important business data.
- Protect tenant/admin/private data with appropriate authorization policies.

Where Supabase/PostgreSQL is used:

- Use PostgreSQL as the authoritative relational store.
- Use PostGIS for geospatial capabilities where required.
- Use pgvector only where it serves the AI/RAG/search architecture.
- Apply RLS to exposed tables where appropriate.
- Never put service-role or equivalent privileged credentials in client code.
- Test authorization policies explicitly.

Create seed/demo fixtures only as clearly labeled development data.

Never fabricate production property facts.

---

# 14. DATA QUALITY & PROVENANCE

Real-estate data must not be treated as generic CMS content.

Implement validation for the blueprint-defined property/project fields, including where applicable:

- Price
- Currency
- Bedrooms
- Bathrooms
- Property type
- Size
- Location
- Coordinates
- Developer
- Project
- Completion date
- Availability
- Payment plan
- Images/media
- Agent/owner relationship
- Listing lifecycle state

Implement provenance/freshness metadata where defined by the blueprint.

Important investment and market facts should be able to distinguish:

- Verified/source-backed information
- Company-entered data
- Historical information
- User inputs
- Estimates
- Illustrative calculations
- AI-generated explanations

Never present uncertain investment returns as guaranteed results.

---

# 15. PROPERTY INGESTION

Implement production-grade ingestion for all blueprint-required supported sources.

The ingestion pipeline must cover:

- Validation
- Normalization
- Duplicate detection
- Idempotency
- Reprocessing safety
- Error reporting
- Partial failure handling
- Media handling
- Search-index synchronization
- Data freshness
- Audit history
- Observability

Do not let malformed feeds silently corrupt canonical property data.

Use background jobs for expensive/async work where the blueprint requires it.

---

# 16. SEARCH IMPLEMENTATION

Implement the search architecture selected by the blueprint.

Search must support the defined combination of:

- Structured filters
- Text search
- Typo tolerance
- Autocomplete
- Faceting
- Sorting
- Geographic search
- Community/developer search
- Property type
- Price
- Bedrooms/bathrooms
- Completion/status
- Payment-plan criteria
- Investment-related criteria where data is genuinely available
- Map synchronization
- Saved-search compatibility
- Semantic/natural-language behavior where specified

Search-state URLs must be shareable and deterministic where required.

Do not put complex search state only in ephemeral client memory if the blueprint requires URL synchronization.

Build empty, loading, error, no-results, and degraded-service states.

---

# 17. NATURAL-LANGUAGE PROPERTY SEARCH

Implement the blueprint-defined natural-language search flow.

Architecture should clearly separate:

1. User natural-language query
2. Intent/filter extraction
3. Validation against supported schema
4. Deterministic structured search
5. Optional semantic/ranking enrichment
6. Result explanation

The AI must never invent matching properties.

Property recommendations must resolve against real inventory records.

If a query cannot be fully represented by available filters/data, communicate the limitation gracefully rather than fabricating criteria.

---

# 18. MAP & GEO EXPERIENCE

Implement map discovery as a first-class property-search experience.

Cover blueprint-required capabilities such as:

- Property markers
- Clustering
- Search-this-area
- Bounding-box search
- Community boundaries where data exists
- Map/list synchronization
- Nearby-property discovery
- POI integration where appropriate
- Location autocomplete
- Geocoding
- Reverse geocoding where required
- Mobile map/filter behavior

Apply rate limiting, caching, and quota-aware provider usage.

---

# 19. FRONTEND / UX IMPLEMENTATION STANDARD

Build the blueprint's premium experience; do not substitute generic dashboard/template aesthetics.

For every public page:

- Implement mobile first.
- Implement desktop intentionally rather than stretching mobile.
- Implement responsive behavior at the blueprint-defined breakpoints.
- Use the design-system tokens.
- Use accessible component primitives.
- Use semantic HTML.
- Implement keyboard navigation.
- Implement visible focus states.
- Respect reduced-motion preferences.
- Implement loading states.
- Implement skeletons where appropriate.
- Implement empty states.
- Implement error states.
- Implement success states.
- Implement unavailable/sold/property-status states.

Do not overuse:

- Glassmorphism
- Decorative 3D
- Giant animations
- Heavy scroll effects
- Autoplay media
- Large client-side JavaScript for purely decorative behavior

Premium presentation must not compromise conversion, SEO, accessibility, or performance.

---

# 20. PAGE CONTRACT RULE

For every blueprint-defined important page, implementation must cover:

- Route
- Purpose
- Audience
- SEO intent
- Data sources
- Primary components
- Content hierarchy
- CTA strategy
- Authentication requirements where applicable
- API calls
- Cache strategy
- Loading state
- Empty state
- Error state
- Analytics events
- Structured data where valid
- Mobile behavior
- Accessibility behavior
- Tests

Do not consider a page complete if only its happy-path UI exists.

---

# 21. DESIGN SYSTEM

Implement a reusable production design system for Investment Experts.

It must include blueprint-defined tokens and primitives for:

- Color
- Typography
- Spacing
- Grid
- Radius
- Shadows
- Motion
- Breakpoints
- Containers
- Icons
- Component states

Implement reusable components including where required:

- Buttons
- Inputs
- Selects
- Autocomplete
- Search
- Property cards
- Project cards
- Developer cards
- Community cards
- Agent cards
- Forms
- Modals
- Drawers
- Tabs
- Accordions
- Breadcrumbs
- Pagination
- Carousels
- Galleries
- Maps
- Data visualizations
- Alerts
- Toasts
- Skeletons
- Empty states
- Error states

Avoid page-specific copies of components that should be system components.

---

# 22. LEAD SERVICE

Lead capture must be implemented as a reliable business workflow, not just form submission.

Implement as defined in the blueprint:

- Server-side validation
- Consent capture
- Property/project/context attachment
- Contact matching
- Duplicate detection
- Source attribution
- UTM capture
- Session context where permitted
- Lead qualification/scoring support where specified
- CRM handoff
- Agent assignment integration
- Retry behavior
- Idempotency
- Dead-letter handling where applicable
- Operational visibility

A CRM outage must not cause silent lead loss.

---

# 23. CRM INTEGRATION

Use an adapter boundary so the public website is not tightly coupled to a single CRM implementation.

Implement:

- Lead create/update
- Contact matching
- Property/project context
- Attribution payload
- Assignment payload
- Webhook ingestion where required
- Signature verification where supported
- Retry policy
- Idempotency keys
- Deduplication
- Failure logging
- DLQ/replay capability where appropriate
- Reconciliation mechanism

If live CRM credentials are unavailable, complete the integration code/interface, contract tests, payload fixtures, local test adapter, and configuration documentation, then mark only the live connectivity step BLOCKED.

Do not claim production CRM verification without evidence.

---

# 24. ANALYTICS & ATTRIBUTION

Implement the blueprint event taxonomy.

Important events include the defined equivalents of:

- Search
- Filter
- Property view
- Project view
- Developer view
- Community view
- Favorite
- Compare
- Share
- Brochure download
- WhatsApp click
- Call click
- Form start
- Form completion
- Consultation booking
- AI conversation
- AI recommendation
- Lead generated

Ensure events have stable names and validated payloads.

Capture attribution as defined in the blueprint, including where appropriate:

- Source
- Medium
- Campaign
- Content
- Term
- Landing page
- Referrer
- Session
- Property/project context
- Agent
- Lead source

Respect consent requirements.

Do not send sensitive/private fields to analytics unnecessarily.

---

# 25. SEO IMPLEMENTATION

SEO is a core platform capability.

Implement blueprint-defined requirements for:

- Route architecture
- Metadata
- Canonicals
- Sitemap indexes
- Dynamic sitemaps
- Robots directives
- Breadcrumbs
- Internal links
- Structured data
- Image metadata
- Pagination/index controls
- Faceted navigation controls
- Duplicate-content controls
- Redirects
- 404 behavior
- International/hreflang architecture
- Programmatic SEO safeguards

Do not create thin programmatic pages simply because combinations exist.

Prevent index bloat and keyword cannibalization.

Structured data must reflect visible truthful content and supported Schema.org/Google behavior.

---

# 26. MIGRATION / SEO EQUITY

When replacing the existing Investment Experts site:

- Inventory existing URLs.
- Preserve valuable routes where appropriate.
- Build a redirect map for changed URLs.
- Avoid redirect chains.
- Preserve canonical intent.
- Preserve relevant metadata/content signals.
- Migrate analytics continuity where possible.
- Preserve Search Console continuity where operationally possible.
- Test 301/404 behavior.
- Create pre-launch and post-launch crawl validation.

Do not launch a new URL architecture without migration evidence.

---

# 27. CMS & ADMIN

Implement the blueprint-defined content/admin capabilities rather than hardcoding operational content in source files.

Admin capabilities must use role-based authorization.

Where specified, implement management for:

- Properties
- Projects
- Developers
- Communities
- Agents
- Leads
- Content
- SEO
- Media
- AI knowledge
- Analytics views
- Integrations
- Users/roles
- Settings
- Audit logs

Protect destructive/admin actions.

Maintain revision/audit history where required.

---

# 28. USER ACCOUNTS & SAVED STATE

Where enabled by the blueprint, implement securely:

- Authentication
- Authorization
- Saved properties
- Saved searches
- Comparisons
- Recently viewed
- Preferences
- Alerts

Avoid forcing registration for basic browsing unless the blueprint explicitly requires it.

Protect user data server-side, not merely by hiding UI controls.

---

# 29. INVESTOR CALCULATORS

Implement deterministic calculations in software rather than using AI for arithmetic.

Where specified, support tools such as:

- ROI calculator
- Rental yield calculator
- Mortgage calculator
- Payment-plan calculator
- Investment-return scenarios
- Price-per-square-foot comparisons
- Currency conversion
- Rental-income projections
- Capital-appreciation scenarios

Clearly distinguish:

- Known facts
- User inputs
- Historical data
- Assumptions
- Estimates
- Illustrative projections

Never present projections as guaranteed outcomes.

Create test cases for formulas and edge conditions.

---

# 30. MARKET INTELLIGENCE

Implement the blueprint-defined market intelligence architecture.

Support reliable data provenance and publication dates.

Where external datasets are used:

- Record source
- Retrieval/update timestamp
- Transformation logic
- Data-quality checks
- Freshness state
- Failure state

Do not allow stale or incomplete data to appear as current without indication.

---

# 31. AI / RAG IMPLEMENTATION

The AI Property Advisor must be a real domain assistant, not a generic chatbot wrapper.

Implement the blueprint-defined architecture including:

- AI gateway/orchestrator
- Approved provider/model configuration
- Tool calling
- Property search tool
- Project lookup
- Developer/community lookup
- Knowledge retrieval
- Investor-calculation tools
- Lead capture tool
- Consultation/booking tool where available
- CRM handoff tool where permitted
- Human handoff
- Conversation/session memory policy
- Cost controls
- Rate limits
- Abuse controls
- Fallback behavior
- Analytics
- Observability

## RAG requirements

Implement:

- Approved knowledge sources
- Ingestion
- Parsing
- Chunking
- Metadata
- Embeddings where required
- Keyword search
- Vector search where required
- Hybrid retrieval
- Reranking where specified
- Source/citation metadata
- Freshness/version management
- Access controls

The AI must not fabricate property inventory, pricing, regulations, developer facts, market statistics, or source claims.

When reliable evidence is unavailable, say so and hand off or ask for the missing information.

---

# 32. AI COST GOVERNANCE

Do not use an LLM when deterministic application logic is better.

Implement blueprint-defined cost controls such as:

- Model routing
- Token/context budgets
- Retrieval limits
- Conversation limits
- Caching where safe
- Request rate limiting
- Abuse protection
- Usage tracking
- Cost analytics
- Provider fallback

Keep model identifiers configurable where practical.

---

# 33. INTERNATIONALIZATION

Implement the localization foundation described in the blueprint.

Include where applicable:

- Locale-aware routing
- Translation structure
- Arabic support
- RTL behavior
- Localized metadata
- `hreflang`
- Currency formatting
- Number formatting
- Date formatting
- CMS localization workflow

Do not implement Arabic by mirroring layouts blindly; verify component behavior in RTL.

Do not auto-publish low-quality machine translation as authoritative legal/investment content without review workflow.

---

# 34. SECURITY

Security is a release gate.

Implement defenses appropriate to the architecture, including blueprint-defined requirements for:

- Authentication
- Authorization
- RBAC
- Database/RLS policies
- TLS
- Encryption where required
- Secret management
- Input validation
- Output encoding
- XSS mitigation
- CSRF protection where relevant
- SQL injection prevention
- SSRF protection
- Safe file uploads
- Security headers
- CSP
- Rate limiting
- Bot/spam mitigation
- Dependency security
- Audit logging
- Admin hardening
- Backup/recovery
- Incident response documentation

Never disable a security control simply to make tests pass.

Never log secrets, tokens, passwords, privileged headers, or unnecessary PII.

---

# 35. PRIVACY & CONSENT

Implement the blueprint's privacy-conscious behavior.

Support applicable consent flows for:

- Analytics
- Marketing
- CRM submission
- Newsletter
- WhatsApp communication where applicable
- Personalization
- Cookies/non-essential storage

Implement data-retention/deletion/export workflows where required by the blueprint and applicable obligations.

Do not make unverified legal claims in UI copy.

Items requiring legal review must remain clearly identified for qualified review.

---

# 36. PERFORMANCE

Treat Core Web Vitals and page weight as release requirements.

Implement:

- Server-first rendering where appropriate
- Caching strategy
- Image optimization
- Responsive images
- AVIF/WebP where appropriate
- Lazy loading
- Font optimization
- Code splitting
- Bundle control
- Minimal client JavaScript
- CDN strategy
- Search/API caching
- Streaming where beneficial
- Third-party script governance

Measure rather than assume.

Create performance budgets based on the blueprint and fail release gates for material regressions.

---

# 37. ACCESSIBILITY

Target the blueprint-defined WCAG level.

Validate:

- Keyboard-only navigation
- Focus management
- Screen-reader labels
- Semantic landmarks
- Form labels/errors
- Menus
- Modals/dialogs
- Carousels/galleries
- Search controls
- Map alternatives where practical
- Contrast
- Touch targets
- Reduced motion
- Heading hierarchy
- Alternative text strategy

Automated tools alone are insufficient.

Perform manual critical-journey checks.

---

# 38. BACKGROUND JOBS

Use the blueprint's queue/background-processing strategy for asynchronous workloads such as:

- CRM synchronization
- Property ingestion
- Feed refresh
- Image processing
- Search indexing
- Sitemap generation
- AI/RAG ingestion
- Email/notifications
- Analytics processing where required

Every important job must define:

- Input contract
- Idempotency
- Retry policy
- Timeout
- Backoff
- Failure classification
- DLQ/recovery where appropriate
- Observability

---

# 39. RESILIENCE

Implement graceful behavior for blueprint-defined failure scenarios such as:

- Database outage
- Search outage
- CRM outage
- AI provider outage
- Email provider outage
- Maps outage
- Media/CDN outage
- Third-party API timeout

Use appropriate:

- Timeouts
- Retries
- Exponential backoff
- Circuit breaking where justified
- Caching
- Fallback/degraded UX
- DLQ
- Reconciliation

Avoid cascading failures.

---

# 40. TESTING STANDARD

Testing is required throughout implementation, not at the end.

Implement relevant:

- Unit tests
- Component tests
- Integration tests
- API tests
- Database tests
- Authorization/RLS tests
- Search tests
- Ingestion tests
- AI tool-contract tests
- CRM contract tests
- End-to-end tests
- Accessibility tests
- Visual regression tests
- Performance tests
- Security tests
- Cross-browser tests
- Mobile viewport tests

Every significant bug discovered during implementation should receive a regression test where practical.

Do not disable failing tests to achieve green CI.

---

# 41. CRITICAL E2E JOURNEYS

At minimum, create end-to-end coverage for the applicable blueprint journeys, such as:

1. Visitor lands on homepage -> searches -> filters -> opens property -> submits inquiry.
2. Visitor searches via natural language -> receives real inventory results -> opens a result.
3. Map/list search remains synchronized while filters change.
4. Visitor opens project -> reviews payment/project details -> requests consultation.
5. International investor journey -> relevant guide -> project/property -> lead capture.
6. Seller/valuation journey where implemented -> lead creation -> CRM queue.
7. Agent profile -> contact action -> correctly attributed lead.
8. User authentication -> save property -> saved property persists.
9. Saved search/alert creation where enabled.
10. AI Advisor -> retrieves source-backed information -> recommends real inventory -> lead/handoff.
11. Admin creates/updates property -> validation -> publication -> search indexing -> public visibility.
12. Property ingestion -> normalization -> canonical DB -> search index -> public page.
13. CRM unavailable -> lead preserved/retried -> operational error visible -> no lead loss.
14. AI provider unavailable -> graceful fallback/handoff.
15. Invalid/unauthorized admin access is rejected.

---

# 42. CI/CD

Implement the blueprint's continuous integration/deployment pipeline.

A pull request/build pipeline should include applicable:

- Formatting/lint
- Type checking
- Unit tests
- Integration tests
- Security/dependency checks
- Database/migration validation
- Build
- E2E/smoke tests
- Accessibility checks
- Preview deployment

Production deployment must include:

- Environment validation
- Migration safety
- Deployment
- Smoke tests
- Monitoring validation
- Rollback strategy

Do not deploy on a failed mandatory gate.

---

# 43. OBSERVABILITY

Implement production observability for critical workflows.

Include as appropriate:

- Structured logs
- Error tracking
- Tracing
- Application performance monitoring
- API monitoring
- Database monitoring
- Search monitoring
- Queue monitoring
- CRM synchronization monitoring
- AI monitoring
- Uptime checks
- Alerting

Logs must be useful for diagnosing failures without leaking secrets or unnecessary personal data.

---

# 44. DEVELOPMENT DATA VS PRODUCTION DATA

Never represent sample/demo content as verified real-world production inventory.

When production data is unavailable:

- Use clearly labeled fixtures/seeds for development.
- Keep fixtures isolated from production.
- Make replacement/import procedure documented.
- Ensure production launch gates can detect demo placeholders.

Do not generate fake testimonials, awards, transaction figures, agent credentials, developer claims, ROI guarantees, or regulatory claims.

---

# 45. NO FAKE COMPLETION

The following do **not** qualify as completing a feature:

- Empty UI shell
- Button with no handler
- Hardcoded mock API response
- TODO comment
- Static fake listing data passed off as production data
- Unconnected form
- Unverified CRM mock
- AI chatbot without required tools/RAG
- Schema without migrations/tests
- Route without responsive/error/loading states
- Test skipped or disabled
- Placeholder security policy
- Placeholder analytics
- Missing authorization
- Missing acceptance evidence

Mocks are allowed only for explicit test/local-development boundaries and must never be confused with production implementation.

---

# 46. PHASE EXECUTION LOOP

For each Q01–Q34 workstream, execute this loop:

## Step A — Read

Read the complete blueprint material relevant to the phase, including cross-references.

## Step B — Inspect

Inspect current implementation and dependencies.

## Step C — Plan internally

Determine exact changes required.

Do not spend the response only explaining the plan; proceed to implementation.

## Step D — Implement

Implement database, backend, frontend, UX, integrations, analytics, security, tests, and docs required by that phase.

## Step E — Validate

Run applicable:

- Install/dependency checks
- Lint
- Type check
- Unit tests
- Integration tests
- E2E tests
- Build
- Migration validation
- Security checks
- Accessibility checks
- Performance checks

## Step F — Fix

Fix failures caused by implementation.

Do not leave avoidable failures for later.

## Step G — Evidence

Update:

- `BUILD_STATE.md`
- `TRACEABILITY_MATRIX.md`
- `TEST_EVIDENCE.md`
- `VERIFICATION_LOG.md`
- Relevant ADR/runbooks

## Step H — Complete or block

Mark COMPLETE only when the blueprint's acceptance/definition-of-done conditions are actually met.

If externally blocked, mark BLOCKED, document the exact missing dependency, and continue independent work.

## Step I — Continue

Move automatically to the next dependency-ready workstream.

---

# 47. COMPLETION GATE FOR EVERY WORKSTREAM

A workstream may be marked COMPLETE only when relevant items below pass:

- Required code implemented
- Database migration applied/tested
- API contract implemented
- Frontend implemented
- Responsive behavior verified
- Loading/empty/error/success states implemented
- Authorization verified
- Input validation verified
- Analytics events implemented
- Observability implemented
- Tests written
- Tests passing
- Accessibility validated
- Performance checked
- Security checked
- Documentation updated
- Blueprint traceability updated
- Acceptance criteria satisfied
- No unresolved Sev-1/Sev-2 defect attributable to the workstream

---

# 48. GIT / CHANGE MANAGEMENT

If Git is available:

- Preserve current work.
- Do not erase unrelated user changes.
- Use meaningful commits where agent tooling permits.
- Prefer a coherent commit per completed workstream or logical subphase.
- Never commit `.env` secrets.
- Never rewrite shared history unless explicitly authorized.

Before destructive operations, confirm the command is safe and necessary.

Avoid deleting user assets/data unless clearly superseded and recoverable.

---

# 49. DATABASE / INFRASTRUCTURE SAFETY

Never run destructive production database commands casually.

For migrations:

- Inspect current state first.
- Back up or ensure rollback/recovery path before destructive transformations.
- Prefer additive/expand-contract migrations for live systems.
- Separate schema change from destructive cleanup when necessary.

For local development, automate setup where safe.

For staging/production, document exact commands and preconditions.

---

# 50. BLOCKER POLICY

When a blocker is encountered, record:

- Blocker ID
- Workstream
- Description
- Why it blocks production verification
- What has already been implemented
- Exact information/credential/action needed
- Whether other work can continue
- Safe fallback status

Examples:

`BLOCKED_LIVE_CRM_CREDENTIALS`

`BLOCKED_PRODUCTION_DOMAIN_ACCESS`

`BLOCKED_LEGAL_PRIVACY_REVIEW`

`BLOCKED_REAL_PROPERTY_FEED`

Do not convert a blocker into a silent mock and call the phase complete.

---

# 51. QUESTIONS POLICY

Do not repeatedly ask the user questions that can be resolved from:

- The blueprint
- Existing repository
- Existing config
- Existing documentation
- Official current documentation
- Reasonable reversible engineering decisions

For non-destructive, reversible implementation decisions, choose the option most consistent with the blueprint and document it.

Ask the user only when the answer materially changes business behavior, requires a credential/private fact, or authorizes a consequential/destructive action.

---

# 52. DOCUMENTATION QUALITY

Keep implementation documentation synchronized with reality.

Documentation must include where applicable:

- Local setup
- Architecture
- Environment variables
- Database migration process
- Search/index process
- Property ingestion
- Media pipeline
- CRM integration
- AI/RAG ingestion
- Deployment
- Rollback
- Monitoring
- Failure recovery
- Backups
- Admin operation
- Content/SEO operation
- Incident response

Do not leave critical operation knowledge only in chat output.

---

# 53. LOCAL DEVELOPMENT TARGET

The project should be runnable locally with the least friction practical.

Provide/update a root README with exact setup steps.

The desired local flow should be as close as possible to:

1. Clone/open repository.
2. Install dependencies.
3. Copy `.env.example` to `.env.local` or documented equivalent.
4. Start required local/container services.
5. Apply migrations.
6. Seed development fixtures if needed.
7. Start application.
8. Start workers/search services if separate.
9. Run tests.

Automate repeated setup using scripts/Makefile/task runner where appropriate.

---

# 54. PRODUCTION-READINESS GATE

Before declaring the platform production ready, complete Q33 and verify all blueprint-defined mandatory launch gates.

At minimum verify:

## Product

- Required P0 journeys work end to end.
- No critical placeholder content remains.
- Required property/project/admin/lead workflows work.

## Data

- Migrations validated.
- Data validation active.
- Backup/recovery strategy documented/tested as appropriate.
- Production/demo data separation confirmed.

## Security

- Secrets safe.
- Auth/authz tested.
- Admin protected.
- RLS/database policies tested where used.
- Input/file-upload protections verified.
- Security headers/CSP configured appropriately.
- Critical dependency vulnerabilities addressed.

## SEO

- Metadata/canonicals correct.
- Sitemaps correct.
- Robots correct.
- Redirect plan tested.
- Structured data validated where used.
- No accidental noindex on production-critical routes.
- No staging URLs indexed.

## Performance

- Performance budgets tested.
- Critical routes meet blueprint targets or documented accepted exceptions.

## Accessibility

- Critical journeys manually and automatically checked.

## Integrations

- CRM live path verified or explicitly blocked.
- Email/notification paths verified where required.
- Maps/search/AI integrations verified.

## Reliability

- Background job retries/DLQs validated where required.
- Degraded states validated.
- Monitoring/alerts active.

## Analytics

- Core event taxonomy validated.
- Attribution validated.
- Consent behavior validated.

## Operations

- Deployment runbook complete.
- Rollback runbook complete.
- Incident/operations documentation usable.

Do not use the phrase **Production Ready** if mandatory gates remain unverified.

Use **Implementation Complete — External Production Verification Pending** when code is finished but environment/vendor/business verification is still outstanding.

---

# 55. FINAL END-TO-END VALIDATION

When all build work is complete, perform a final repository-wide audit against the entire blueprint.

Do not rely solely on phase statuses.

Re-read the blueprint and search the repository for evidence of every material requirement.

Produce a final gap reconciliation with exactly these categories:

- VERIFIED COMPLETE
- COMPLETE — REQUIRES LIVE ENVIRONMENT VERIFICATION
- BLOCKED BY EXTERNAL DEPENDENCY
- NOT APPLICABLE — WITH BLUEPRINT-SUPPORTED REASON
- DEFECT / INCOMPLETE

Resolve all internally solvable `DEFECT / INCOMPLETE` items before finishing.

---

# 56. FINAL DELIVERABLES

At the end, the repository must contain the complete working platform plus implementation evidence.

Provide a concise final report containing:

## A. Build status

- Overall state
- Q01–Q34 completion table
- P0 completion status

## B. Architecture actually implemented

- Frontend
- Backend
- Database
- Search
- Geo/maps
- Storage/media
- Queue/cache
- AI/RAG
- CRM
- Analytics
- Observability
- Hosting/deployment

## C. User-facing capabilities

List only capabilities actually implemented and verified.

## D. Admin/operations capabilities

List only capabilities actually implemented and verified.

## E. Test evidence

Report:

- Lint
- Type check
- Unit tests
- Integration tests
- E2E tests
- Build
- Accessibility
- Performance
- Security

Include actual pass/fail state rather than saying "should pass."

## F. Database state

- Migration count/status
- Seed/dev data status
- RLS/authz status where applicable

## G. External integrations

For each provider:

- Implemented
- Configured
- Live verified
- Blocked and why

## H. Remaining blockers

Only genuine external blockers should remain.

## I. Local run instructions

Give exact commands.

## J. Production deployment instructions

Give exact commands/process for the architecture actually implemented.

## K. Production launch verdict

Use only one:

- `PRODUCTION READY — ALL MANDATORY GATES VERIFIED`
- `IMPLEMENTATION COMPLETE — EXTERNAL PRODUCTION VERIFICATION PENDING`
- `NOT PRODUCTION READY — MANDATORY BLOCKERS REMAIN`

Never claim a stronger state than the evidence supports.

---

# 57. RESPONSE / WORK STYLE WHILE BUILDING

Keep chat updates concise and execution-focused.

At meaningful checkpoints report:

- Current workstream
- What was implemented
- What validation passed/failed
- What was fixed
- Any genuine blocker
- Next workstream

Do not flood the user with every individual file edit.

Do not spend most of the session restating the blueprint.

Prioritize implementation.

---

# 58. STRICT PROHIBITIONS

You must NOT:

- Ignore sections of the blueprint because they are large.
- Build only the homepage.
- Build only visual mockups.
- Reduce the project to an MVP unless the user explicitly changes scope.
- Invent property inventory.
- Invent market statistics.
- Invent company claims, awards, testimonials, or transactions.
- Invent legal/regulatory claims.
- Invent API capabilities.
- Invent successful integration testing.
- Hardcode secrets.
- Expose privileged backend keys to the client.
- Disable authorization to unblock development.
- Disable tests to produce green CI.
- Silence TypeScript errors using unsafe broad workarounds without justification.
- Replace required live functionality with mocks and call it complete.
- Skip accessibility.
- Skip mobile responsiveness.
- Skip SEO.
- Skip analytics where required.
- Skip error/loading/empty states.
- Mark a phase complete before its acceptance criteria pass.
- Claim deployment occurred if it did not.
- Claim production readiness without evidence.

---

# 59. START COMMAND

Begin now.

Execute the following sequence without waiting for another instruction:

1. Locate and read the complete Investment Experts master blueprint.
2. Inspect the complete repository and current implementation.
3. Identify whether this is a greenfield build or continuation.
4. Create/update the build-state, traceability, blockers, assumptions, verification, ADR, test-evidence, deployment, and operations documents.
5. Map every blueprint requirement to Q01–Q34.
6. Verify current versions/provider capabilities needed for Q01 before installing or changing foundational dependencies.
7. Start **Q01 — Foundation & ADRs**.
8. Implement it fully.
9. Run its required validation.
10. Fix internally solvable failures.
11. Record evidence.
12. Continue automatically through every dependency-ready workstream.
13. After Q33, run the complete production-readiness audit.
14. Implement Q34 foundations/capabilities specified for the complete build where they do not depend on future traffic/data; document post-launch activation requirements for those that do.
15. Perform the final blueprint-to-repository reconciliation.
16. Resolve every internally solvable gap.
17. Return the final build report and exact run/deployment instructions.

The objective is a **complete, coherent, tested, secure, responsive, SEO-ready, observable, production-grade Investment Experts platform**, built from the blueprint end to end — not a partial prototype and not merely a plan.

---

# 60. FINAL AUTHORITY

Whenever you are uncertain about what to build, return to the uploaded master blueprint.

Whenever you are uncertain whether a phase is complete, return to its acceptance criteria and the global completion gates.

Whenever implementation convenience conflicts with the intended customer/business outcome, preserve the blueprint's intended outcome unless a documented ADR establishes a stronger implementation.

**Read completely. Build systematically. Validate continuously. Document evidence. Do not silently omit requirements. Do not fake completion. Continue until the entire blueprint has been implemented as far as the available environment and external dependencies genuinely allow.**
