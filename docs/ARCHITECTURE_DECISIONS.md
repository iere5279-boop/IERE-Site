# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Investment Experts platform.

## ADR Index

| ADR ID | Title | Status | Date | Superseded By |
|--------|-------|--------|------|---------------|
| ADR-001 | Technology Stack Selection | PROPOSED | 2026-09-20 | - |
| ADR-002 | Repository Architecture | PROPOSED | 2026-09-20 | - |
| ADR-003 | Database and Search Strategy | PROPOSED | 2026-09-20 | - |
| ADR-004 | AI Gateway and RAG Architecture | PROPOSED | 2026-09-20 | - |
| ADR-005 | CRM Integration Pattern | PROPOSED | 2026-09-20 | - |

---

## ADR-001: Technology Stack Selection

**Status:** PROPOSED  
**Date:** 2026-09-20  
**Deciders:** Engineering Team  

### Context

The blueprint specifies technology recommendations based on research as of 2026-09-19. We must select stable, production-ready versions that satisfy all blueprint requirements while maintaining upgradeability.

### Decision

Adopt the following technology stack based on blueprint verification:

**Frontend:**
- Next.js 16.3.x (Active LTS)
- React 19.x
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.x

**Backend/Database:**
- PostgreSQL 18.x with PostGIS and pgvector extensions
- Supabase for managed PostgreSQL and authentication
- Typesense 30.x for search

**Infrastructure:**
- Vercel for frontend hosting
- Node.js 22.x LTS runtime
- Redis for job queues (managed or self-hosted)

**AI:**
- OpenAI API for language models and embeddings

**Maps:**
- Mapbox GL JS for interactive maps

**Analytics:**
- Google Analytics 4
- Product analytics tool (PostHog recommended for cost-effectiveness)

**Email:**
- Transactional email provider (SendGrid or Postmark)

### Consequences

**Positive:**
- All technologies are mature with strong community support
- Blueprint requirements fully satisfied
- Clear upgrade paths available
- Good documentation and developer experience

**Negative:**
- Multiple vendor relationships to manage
- Cost accumulation across services
- Potential vendor lock-in for some services

**Neutral:**
- Requires ongoing version monitoring for security updates

### Compliance

This decision aligns with:
- Blueprint Part M (Technology Recommendations)
- Blueprint Part O (Repository Architecture)
- Blueprint Part P (Environment Variables)

### Rollback Plan

If any technology proves unsuitable:
1. Document specific failure mode in new ADR
2. Evaluate alternatives against same criteria
3. Plan migration path with minimal user impact
4. Execute migration during low-traffic period

---

## ADR-002: Repository Architecture

**Status:** PROPOSED  
**Date:** 2026-09-20  
**Deciders:** Engineering Team  

### Context

The blueprint specifies a feature-sliced repository architecture in Part O. We must implement this structure to support modularity, testability, and team scalability.

### Decision

Implement the following repository structure:

```
/workspace
├── app/
│   ├── (public)/          # Public-facing routes
│   ├── (account)/         # Authenticated user routes
│   ├── (admin)/           # Internal admin routes
│   └── api/               # API route handlers (thin transport)
├── features/              # Feature modules
│   ├── search/
│   ├── properties/
│   ├── projects/
│   ├── leads/
│   ├── ai/
│   └── market-intelligence/
├── domain/                # Domain entities and use cases
├── server/                # Backend services
│   ├── db/
│   ├── search/
│   ├── ai/
│   ├── integrations/
│   ├── jobs/
│   └── security/
├── components/
│   ├── ui/                # Design system primitives
│   └── patterns/          # Composed product patterns
├── lib/                   # Pure utilities
├── config/                # Validated configuration
├── schemas/               # Versioned validation schemas
├── db/
│   ├── migrations/
│   └── seeds/
├── scripts/               # Operational scripts
├── infrastructure/        # IaC configuration
├── observability/         # Telemetry configuration
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── accessibility/
│   └── performance/
├── docs/
│   ├── adr/
│   ├── runbooks/
│   └── product/
└── [configuration files]
```

### Consequences

**Positive:**
- Clear separation of concerns
- Feature modules can be developed independently
- Easy to locate code by domain
- Supports incremental implementation
- Test organization matches code organization

**Negative:**
- More directories than minimal structure
- Requires discipline to maintain boundaries

### Compliance

This decision implements:
- Blueprint Part O (Repository Architecture)
- Blueprint Q01 (Foundation & ADRs)

### Rollback Plan

Restructure only if:
1. Clear anti-patterns emerge during development
2. Team velocity significantly impacted
3. New structure better serves blueprint requirements

Any restructuring requires new ADR documenting rationale.

---

## ADR-003: Database and Search Strategy

**Status:** PROPOSED  
**Date:** 2026-09-20  
**Deciders:** Engineering Team  

### Context

The blueprint requires canonical data in PostgreSQL with derived search indexes in Typesense (Part F, Part C). We must implement this dual-store architecture with proper synchronization.

### Decision

**Canonical Store (PostgreSQL):**
- All business entities stored in normalized PostgreSQL tables
- PostGIS extension for geospatial queries
- pgvector extension for initial vector storage
- Row Level Security (RLS) for access control
- Audit logging via triggers

**Search Index (Typesense):**
- Denormalized documents optimized for search
- Outbox pattern for synchronization from PostgreSQL
- Schema versioning for index evolution
- Reindex workflow for schema changes

**Synchronization:**
- Database triggers write to outbox table on entity changes
- Background worker processes outbox and updates Typesense
- Idempotent operations for retry safety
- Dead-letter queue for failed syncs

### Consequences

**Positive:**
- Single source of truth for business data
- Search can evolve independently
- Outbox pattern ensures eventual consistency
- Can rebuild search index from database at any time

**Negative:**
- Eventual consistency window (typically <1 second)
- Additional infrastructure to maintain
- More complex than single-database approach

### Compliance

This decision implements:
- Blueprint Part C (Relational Database Specification)
- Blueprint Part F (Search & Recommendation Specification)
- Blueprint F06 (Canonical data model in PostgreSQL)
- Blueprint F08 (Search combining filters, full-text, geo, semantic)

### Rollback Plan

If Typesense proves unsuitable:
1. Evaluate Algolia, Meilisearch, or Elasticsearch
2. Maintain outbox pattern for abstraction
3. Update adapter implementation only

---

## ADR-004: AI Gateway and RAG Architecture

**Status:** PROPOSED  
**Date:** 2026-09-20  
**Deciders:** Engineering Team  

### Context

The blueprint requires an AI Property Advisor with RAG capabilities (Part G). We must implement safe, controlled AI responses grounded in verified knowledge.

### Decision

**AI Gateway:**
- Central gateway service abstracts model providers
- Model routing based on query complexity
- Budget tracking per model/user
- Response validation before delivery

**RAG Pipeline:**
- Embeddings generated for property/project/community content
- Vector store in pgvector (initially), migratable to dedicated vector DB
- Retrieval augmented generation for factual queries
- Source attribution in responses

**Tool Registry:**
- Structured tools for property search, calculations, data lookup
- Tool execution sandboxed from model
- Results validated before inclusion in response

**Safety Controls:**
- No raw provider secrets in browser code
- Prompt injection prevention
- Response filtering for prohibited content
- Human escalation path for uncertain responses

### Consequences

**Positive:**
- Grounded responses reduce hallucination risk
- Audit trail for AI interactions
- Flexible model switching
- Cost control through routing and budgets

**Negative:**
- Increased latency vs direct model calls
- Additional infrastructure complexity
- Embedding pipeline maintenance required

### Compliance

This decision implements:
- Blueprint Part G (AI Property Advisor & RAG Specification)
- Blueprint F05 (AI uses tools and approved knowledge)
- Blueprint G-requirements for safe AI

### Rollback Plan

If OpenAI proves unsuitable:
1. Evaluate Anthropic Claude, Google Gemini, or open-source models
2. Maintain gateway abstraction for provider switching
3. Update model configuration only

---

## ADR-005: CRM Integration Pattern

**Status:** PROPOSED  
**Date:** 2026-09-20  
**Deciders:** Engineering Team  

### Context

The blueprint requires CRM integration for lead management (Part E). Vendor not yet selected; must design for flexibility.

### Decision

**Adapter Pattern:**
- Generic CRM interface defining required operations
- Pluggable provider implementations
- Factory function selects provider based on configuration

**Operations Supported:**
- Create/update contact
- Create/update deal/opportunity
- Link contact to property/search attribution
- Retrieve contact status
- Webhook handling for status updates

**Resilience:**
- Queue-based async operations
- Retry with exponential backoff
- Dead-letter queue for permanent failures
- Graceful degradation if CRM unavailable

**Data Flow:**
1. Lead captured on website
2. Stored locally with attribution
3. Queued for CRM sync
4. Synced to CRM when available
5. Webhook updates local status

### Consequences

**Positive:**
- Can switch CRM vendors with minimal code change
- System functions during CRM outages
- Local data provides backup
- Clear integration contract

**Negative:**
- Data duplication between systems
- Sync complexity
- Must handle bidirectional conflicts

### Compliance

This decision implements:
- Blueprint Part E (Integration Contracts)
- Blueprint F09 (Lead capture with CRM outage resilience)
- Blueprint Q16 (CRM Integration)

### Rollback Plan

If CRM integration blocked:
1. Continue with local lead management
2. Implement CSV export for manual import
3. Add provider when credentials available

---

## ADR Creation Process

To create a new ADR:

1. Create file `docs/adr/ADR-NNN-title.md`
2. Use this template structure
3. Submit for review if team exists
4. Update ADR Index table
5. Mark superseded ADRs appropriately

## ADR Statuses

- **PROPOSED**: Under consideration
- **ACCEPTED**: Approved for implementation
- **REJECTED**: Considered and rejected
- **SUPERSEDED**: Replaced by newer ADR
- **IMPLEMENTED**: Successfully implemented
- **DEPRECATED**: No longer recommended
