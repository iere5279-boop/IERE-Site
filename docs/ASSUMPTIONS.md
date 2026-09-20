# Investment Experts — Assumptions Log

This document tracks assumptions made during implementation where blueprint requirements could not be definitively determined from available information.

Last updated: 2026-09-20 (Initial preflight)

## Implementation Assumptions

### ASSUMP-001: Technology Stack Versions

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Section M (Technology Verification)  

**Assumption:**  
Based on blueprint technology verification dated 2026-09-19:
- Next.js 16.3.3 (Active LTS as of August 2026 security release)
- React 19.3 (stable release 2026-09-09)
- TypeScript 5.x with strict mode
- Tailwind CSS 4.x
- PostgreSQL 18.x (or newest supported by managed provider)
- Typesense 30.x
- Supabase for PostgreSQL hosting and auth
- Node.js 22.x LTS

**Validation Required:**  
Verify current stable versions match at implementation time. Update if newer LTS/stable versions are available with better security or compatibility.

---

### ASSUMP-002: Repository Structure

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Part O (Repository Architecture)  

**Assumption:**  
Single Next.js application with feature-sliced architecture:
```
app/(public)/     - Public routes
app/(account)/    - Authenticated user routes
app/(admin)/      - Internal admin routes
features/         - Feature modules
domain/           - Domain entities and use cases
server/           - Backend services
components/       - UI components
```

**Validation Required:**  
Confirm this structure supports all blueprint requirements before Q02 completion.

---

### ASSUMP-003: Database Provider

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Part P (Environment Variables)  

**Assumption:**  
Supabase will provide:
- Managed PostgreSQL with PostGIS extension
- Row Level Security (RLS) policies
- Authentication service
- Storage buckets for media

**Validation Required:**  
Confirm Supabase account provisioning and region selection based on target market (UAE/Dubai).

---

### ASSUMP-004: Search Provider

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Part F (Search Specification)  

**Assumption:**  
Typesense self-hosted or managed instance will provide:
- Full-text search with typo tolerance
- Faceted filtering
- Geo-search capabilities
- Vector search for semantic retrieval (via pgvector fallback or native support)

**Validation Required:**  
Confirm deployment strategy (self-hosted vs managed) based on cost and operational capacity.

---

### ASSUMP-005: Hosting Platform

**Status:** ACTIVE  
**Confidence:** MEDIUM  
**Source:** Blueprint recommendation (Vercel-compatible)  

**Assumption:**  
Vercel will host the Next.js frontend with:
- Automatic preview deployments
- Edge functions for API routes where beneficial
- Integration with Supabase and external services

**Validation Required:**  
Confirm Vercel plan selection and whether backend workers require separate hosting (e.g., Railway, Fly.io, AWS Lambda).

---

### ASSUMP-006: CRM Integration Strategy

**Status:** ACTIVE  
**Confidence:** MEDIUM  
**Source:** Blueprint Part E (Integration Contracts)  

**Assumption:**  
CRM integration will use OAuth 2.0 client credentials flow with:
- Webhook-based bidirectional sync
- Local queue for retry/dead-letter handling
- Generic adapter pattern supporting multiple providers

**Validation Required:**  
Actual CRM vendor selection and API capability verification.

---

### ASSUMP-007: AI Model Routing

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Part G (AI Property Advisor)  

**Assumption:**  
OpenAI API will provide:
- GPT-4 class model for complex reasoning (AI_MODEL_FAST)
- Smaller/faster model for simple queries (AI_MODEL_DEFAULT)
- Embedding model for RAG (AI_MODEL_EMBEDDING)

**Validation Required:**  
Confirm OpenAI API access from UAE region and compliance with data residency requirements.

---

### ASSUMP-008: Map Provider

**Status:** ACTIVE  
**Confidence:** HIGH  
**Source:** Blueprint Part P (Environment Variables)  

**Assumption:**  
Mapbox will provide:
- Interactive map rendering
- Geocoding services
- Static map images for SEO/social sharing

**Validation Required:**  
Confirm Mapbox pricing tier based on expected monthly map views.

---

### ASSUMP-009: Email Provider

**Status:** ACTIVE  
**Confidence:** MEDIUM  
**Source:** Blueprint Part P (Environment Variables)  

**Assumption:**  
SendGrid, Postmark, or similar transactional email provider will handle:
- Lead confirmation emails
- Agent notifications
- System alerts

**Validation Required:**  
Provider selection based on UAE deliverability rates and pricing.

---

### ASSUMP-010: Analytics Stack

**Status:** ACTIVE  
**Confidence:** MEDIUM  
**Source:** Blueprint Part J (Analytics Event Taxonomy)  

**Assumption:**  
Dual analytics approach:
- Google Analytics 4 for acquisition/behavior
- Product analytics tool (PostHog/Mixpanel/Amplitude) for funnel analysis

**Validation Required:**  
Confirm specific tools and ensure GDPR/UAE PDPL compliance for user tracking.

---

## Decision Log

| Date | Assumption ID | Decision | Rationale |
|------|---------------|----------|-----------|
| 2026-09-20 | All | Initial assumptions logged | Preflight phase |

## Validation Process

1. Review assumption before implementing dependent feature
2. Verify against official documentation or vendor communication
3. Update assumption status to VERIFIED or REVISED
4. Create ADR if assumption change affects architecture
5. Document validation evidence in `docs/VERIFICATION_LOG.md`
