# Investment Experts — Blockers Log

This document tracks external dependencies and blockers that prevent full implementation of the blueprint.

Last updated: 2026-09-20 (Initial preflight)

## Active Blockers

### BLOCKER-001: Missing Environment Credentials

**Status:** ACTIVE  
**Severity:** P0  
**Affected Workstreams:** Q01, Q03, Q08, Q16, Q24, Q25, Q30  

**Description:**  
No environment variable template (`.env.example`) exists in the repository. The following credentials are required but unavailable:

| Variable | Provider | Required For | Impact |
|----------|----------|--------------|--------|
| `DATABASE_URL` | Supabase/PostgreSQL | Q03, Q04, Q05 | Cannot create database schema or run migrations |
| `SUPABASE_URL` | Supabase | Q03, Q18 | Cannot configure auth or RLS policies |
| `SUPABASE_SECRET_KEY` | Supabase | Q03 | Cannot implement secure backend operations |
| `TYPESENSE_HOST` | Typesense | Q08, Q09 | Cannot configure search indexing |
| `TYPESENSE_ADMIN_KEY` | Typesense | Q08 | Cannot create/update search collections |
| `OPENAI_API_KEY` | OpenAI | Q24, Q25 | Cannot implement AI/RAG features |
| `MAPBOX_PUBLIC_TOKEN` | Mapbox | Q10 | Cannot render maps |
| `CRM_BASE_URL` | CRM Provider | Q16 | Cannot integrate with CRM |
| `CRM_CLIENT_ID` | CRM Provider | Q16 | Cannot authenticate to CRM |
| `CRM_CLIENT_SECRET` | CRM Provider | Q16 | Cannot authenticate to CRM |
| `EMAIL_API_KEY` | Email Provider | Q27 | Cannot send transactional emails |
| `REDIS_URL` | Redis | Q07, Q27 | Cannot implement job queues |

**Workaround Implemented:**  
Created `.env.example` with placeholder values for all required variables. Implementation can proceed with:
- Local development mocks where blueprint permits
- Adapter pattern implementations without live credentials
- Test doubles in unit/integration tests

**Resolution Required:**  
Provision of production/staging credentials for all services listed above.

---

### BLOCKER-002: No CRM Vendor Documentation

**Status:** ACTIVE  
**Severity:** P0  
**Affected Workstreams:** Q16, Q17  

**Description:**  
The blueprint references CRM integration but no specific CRM vendor is identified. Required for:
- Lead synchronization
- Contact/deal creation
- Webhook handling for lead status updates

**Workaround Implemented:**  
Implemented generic CRM adapter interface with pluggable provider support. Can be configured once vendor is selected.

**Resolution Required:**  
Selection of CRM provider (e.g., Salesforce, HubSpot, Pipedrive, custom) and provision of API documentation/credentials.

---

### BLOCKER-003: No Property Data Feed Access

**Status:** ACTIVE  
**Severity:** P0  
**Affected Workstreams:** Q07, Q08, Q09, Q11, Q12  

**Description:**  
The blueprint requires property/project data ingestion from external feeds (developers, portals, MLS equivalents). No feed access credentials or sample data available.

**Workaround Implemented:**  
Implemented ingestion framework with:
- Generic feed adapter interface
- Sample seed data generator for local development
- Reconciliation pipeline structure

**Resolution Required:**  
Access agreements with data providers (developers, Property Finder API, Bayut API, DLD transaction data, etc.)

---

### BLOCKER-004: No Legal/Compliance Review

**Status:** ACTIVE  
**Severity:** P0  
**Affected Workstreams:** Q30, T-part  

**Description:**  
UAE real estate regulations, privacy law compliance (UAE PDPL), cookie consent requirements, and international buyer disclosures require qualified legal review before production deployment.

**Workaround Implemented:**  
Implemented technical controls for:
- Consent management framework (ready for configuration)
- Privacy policy page structure
- Data export/deletion endpoints (GDPR-style)
- Age verification gates where required

**Resolution Required:**  
Legal counsel review and approval of:
- Privacy policy content
- Cookie consent text and categorization
- International buyer disclosure statements
- Terms of service
- Data retention policies

---

### BLOCKER-005: No Domain/DNS Access

**Status:** ACTIVE  
**Severity:** P1  
**Affected Workstreams:** Q32, Q33  

**Description:**  
Production domain configuration, SSL certificates, DNS records, and email authentication (SPF/DKIM/DMARC) require access to domain registrar and DNS provider.

**Workaround Implemented:**  
Configured application to use environment-based URLs. SSL termination delegated to hosting provider (Vercel/similar).

**Resolution Required:**  
DNS access for:
- Domain verification
- SSL certificate provisioning
- Email deliverability configuration
- CDN configuration

---

## Resolved Blockers

None yet.

## Blocker Resolution Process

1. Identify blocker during implementation
2. Document in this file with unique ID (BLOCKER-NNN)
3. Implement maximum possible work around blocker
4. Continue all independent workstreams
5. Update status when resolved
6. Verify unblocked functionality passes tests
