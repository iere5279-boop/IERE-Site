# Investment Experts — Traceability Matrix

This document maps blueprint requirements to workstreams, repository implementations, tests, and status.

Last updated: 2026-09-20 (Initial preflight)

## Blueprint Requirement → Implementation Mapping

### Foundation Requirements (Part O, Part P, Part Q)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| O-001 | Repository architecture | Q01 | docs/ARCHITECTURE_DECISIONS.md, package.json | N/A | IN_PROGRESS | ADR-001 |
| O-002 | Feature-sliced structure | Q01-Q02 | app/, features/, domain/, server/ | N/A | IN_PROGRESS | Directory structure |
| P-001 | Environment variable specification | Q01 | .env.example, config/env.ts | tests/unit/config.test.ts | IN_PROGRESS | Files created |
| P-002 | Secret classification | Q01 | docs/BLOCKERS.md, .env.example | N/A | COMPLETE | Documentation |
| Q-001 | Dependency-ordered implementation | Q01 | docs/BUILD_STATE.md | N/A | IN_PROGRESS | Status matrix |

### Design System Requirements (Part B)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| B-001 | Design tokens | Q02 | components/ui/tokens/ | tests/unit/tokens.test.ts | NOT_STARTED | - |
| B-002 | Typography system | Q02 | components/ui/typography/ | tests/accessibility/typography.test.ts | NOT_STARTED | - |
| B-003 | Color palette | Q02 | components/ui/tokens/colors.ts | tests/unit/colors.test.ts | NOT_STARTED | - |
| B-004 | Responsive shell | Q02 | app/layout.tsx, components/patterns/ | tests/e2e/responsive.spec.ts | NOT_STARTED | - |
| B-005 | Navigation patterns | Q02 | components/patterns/navigation/ | tests/e2e/navigation.spec.ts | NOT_STARTED | - |
| B-006 | Accessibility primitives | Q02 | components/ui/primitives/ | tests/accessibility/primitives.test.ts | NOT_STARTED | - |

### Database Requirements (Part C)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| C-001 | PostgreSQL schema | Q03 | db/migrations/ | tests/integration/db-schema.test.ts | NOT_STARTED | BLOCKED: No DB credentials |
| C-002 | RLS policies | Q03 | db/migrations/*_rls.sql | tests/integration/rls.test.ts | NOT_STARTED | BLOCKED: No Supabase access |
| C-003 | Auth configuration | Q03 | server/auth/, db/migrations/ | tests/integration/auth.test.ts | NOT_STARTED | BLOCKED: No Supabase access |
| C-004 | Audit logging | Q03, Q05 | db/migrations/audit_log.sql, server/audit/ | tests/integration/audit.test.ts | NOT_STARTED | - |

### Real Estate Model Requirements (Part C, Part D)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| C-005 | Properties table | Q04 | db/migrations/properties.sql, domain/property.ts | tests/integration/property-repo.test.ts | NOT_STARTED | - |
| C-006 | Projects table | Q04 | db/migrations/projects.sql, domain/project.ts | tests/integration/project-repo.test.ts | NOT_STARTED | - |
| C-007 | Developers table | Q04 | db/migrations/developers.sql, domain/developer.ts | tests/integration/developer-repo.test.ts | NOT_STARTED | - |
| C-008 | Communities table | Q04 | db/migrations/communities.sql, domain/community.ts | tests/integration/community-repo.test.ts | NOT_STARTED | - |
| C-009 | Agents table | Q04 | db/migrations/agents.sql, domain/agent.ts | tests/integration/agent-repo.test.ts | NOT_STARTED | - |
| C-010 | Media table | Q04, Q06 | db/migrations/media.sql, domain/media.ts | tests/integration/media-repo.test.ts | NOT_STARTED | - |
| C-011 | Payment plans | Q04 | db/migrations/payment_plans.sql, domain/payment-plan.ts | tests/integration/payment-plan-repo.test.ts | NOT_STARTED | - |
| C-012 | Listings table | Q04 | db/migrations/listings.sql, domain/listing.ts | tests/integration/listing-repo.test.ts | NOT_STARTED | - |

### Search Requirements (Part F)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| F-001 | Typesense schema | Q08 | server/search/schema.ts | tests/integration/typesense-schema.test.ts | NOT_STARTED | BLOCKED: No Typesense access |
| F-002 | Outbox indexer | Q08 | server/jobs/outbox-indexer.ts | tests/integration/outbox-indexer.test.ts | NOT_STARTED | - |
| F-003 | SearchPlan schema | Q08, Q09 | features/search/SearchPlan.ts | tests/unit/search-plan.test.ts | NOT_STARTED | - |
| F-004 | Query compiler | Q08 | server/search/query-compiler.ts | tests/unit/query-compiler.test.ts | NOT_STARTED | - |
| F-005 | Geo-search | Q08, Q10 | server/search/geo-filters.ts | tests/integration/geo-search.test.ts | NOT_STARTED | - |
| F-006 | Faceted search | Q08, Q09 | server/search/facets.ts | tests/integration/facet-search.test.ts | NOT_STARTED | - |

### AI Requirements (Part G)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| G-001 | AI gateway | Q24 | server/ai/gateway.ts | tests/integration/ai-gateway.test.ts | NOT_STARTED | BLOCKED: No OpenAI key |
| G-002 | Tool registry | Q24 | server/ai/tools/registry.ts | tests/unit/tool-registry.test.ts | NOT_STARTED | - |
| G-003 | RAG pipeline | Q24 | server/ai/rag/pipeline.ts | tests/integration/rag-pipeline.test.ts | NOT_STARTED | BLOCKED: No embeddings |
| G-004 | Property Advisor UI | Q25 | features/ai/advisor/ | tests/e2e/advisor.spec.ts | NOT_STARTED | - |
| G-005 | Safe response validation | Q24, Q25 | server/ai/validation.ts | tests/unit/ai-validation.test.ts | NOT_STARTED | - |

### Lead & CRM Requirements (Part E, Part D)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| E-001 | Lead capture forms | Q15 | features/leads/forms/ | tests/e2e/lead-capture.spec.ts | NOT_STARTED | - |
| E-002 | Attribution tracking | Q15 | features/leads/attribution.ts | tests/unit/attribution.test.ts | NOT_STARTED | - |
| E-003 | CRM adapter interface | Q16 | server/integrations/crm/adapter.ts | tests/integration/crm-adapter.test.ts | NOT_STARTED | BLOCKED: No CRM vendor |
| E-004 | Webhook handling | Q16 | app/api/webhooks/crm/route.ts | tests/integration/crm-webhook.test.ts | NOT_STARTED | - |
| E-005 | Retry/dead-letter queue | Q16 | server/jobs/crm-sync.ts | tests/integration/crm-queue.test.ts | NOT_STARTED | - |

### Public UX Requirements (Part A)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| A-001 | Homepage | Q02, Q09 | app/(public)/page.tsx | tests/e2e/homepage.spec.ts | NOT_STARTED | - |
| A-002 | Property search | Q09 | app/(public)/properties/page.tsx | tests/e2e/search.spec.ts | NOT_STARTED | - |
| A-003 | Property detail | Q11 | app/(public)/properties/[id]/page.tsx | tests/e2e/property-detail.spec.ts | NOT_STARTED | - |
| A-004 | Project detail | Q12 | app/(public)/projects/[id]/page.tsx | tests/e2e/project-detail.spec.ts | NOT_STARTED | - |
| A-005 | Community pages | Q13 | app/(public)/communities/[slug]/page.tsx | tests/e2e/community.spec.ts | NOT_STARTED | - |
| A-006 | Developer pages | Q13 | app/(public)/developers/[slug]/page.tsx | tests/e2e/developer.spec.ts | NOT_STARTED | - |
| A-007 | Agent directory | Q14 | app/(public)/agents/page.tsx | tests/e2e/agents.spec.ts | NOT_STARTED | - |
| A-008 | Map discovery | Q10 | app/(public)/map/page.tsx | tests/e2e/map.spec.ts | NOT_STARTED | BLOCKED: No Mapbox token |

### Admin Requirements (Part N)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| N-001 | RBAC system | Q05 | server/security/rbac.ts, app/(admin)/ | tests/integration/rbac.test.ts | NOT_STARTED | - |
| N-002 | Data tables | Q05 | app/(admin)/properties/, app/(admin)/projects/ | tests/e2e/admin-tables.spec.ts | NOT_STARTED | - |
| N-003 | Entity editors | Q05 | features/admin/editors/ | tests/e2e/admin-editors.spec.ts | NOT_STARTED | - |
| N-004 | Audit logs view | Q05 | app/(admin)/audit-log/ | tests/e2e/audit-log.spec.ts | NOT_STARTED | - |

### SEO Requirements (Part I)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| I-001 | Structured data | Q22 | components/patterns/structured-data/ | tests/unit/structured-data.test.ts | NOT_STARTED | - |
| I-002 | Sitemap generation | Q22 | app/sitemap.ts | tests/integration/sitemap.test.ts | NOT_STARTED | - |
| I-003 | Robots.txt | Q22 | app/robots.ts | tests/integration/robots.test.ts | NOT_STARTED | - |
| I-004 | Programmatic SEO controls | Q22 | server/seo/programmatic.ts | tests/unit/programmatic-seo.test.ts | NOT_STARTED | - |

### Analytics Requirements (Part J)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| J-001 | Event taxonomy | Q01, Q22 | schemas/analytics-events.ts | tests/unit/analytics-schema.test.ts | NOT_STARTED | - |
| J-002 | Client-side tracking | Q22 | lib/analytics/client.ts | tests/unit/analytics-client.test.ts | NOT_STARTED | - |
| J-003 | Server-side tracking | Q22 | lib/analytics/server.ts | tests/integration/analytics-server.test.ts | NOT_STARTED | - |

### Security Requirements (Part H)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| H-001 | Input validation | Q30 | server/security/validation.ts | tests/unit/validation.test.ts | NOT_STARTED | - |
| H-002 | XSS prevention | Q30 | server/security/xss.ts | tests/security/xss.test.ts | NOT_STARTED | - |
| H-003 | CSRF protection | Q30 | server/security/csrf.ts | tests/security/csrf.test.ts | NOT_STARTED | - |
| H-004 | Rate limiting | Q30 | server/security/rate-limit.ts | tests/integration/rate-limit.test.ts | NOT_STARTED | - |
| H-005 | Secrets management | Q01, Q30 | config/env.ts, docs/SECURITY_NOTES.md | tests/unit/secrets.test.ts | IN_PROGRESS | .env.example |

### Performance Requirements (Part L)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| L-001 | Performance budgets | Q31 | tests/performance/budgets.ts | tests/performance/*.test.ts | NOT_STARTED | - |
| L-002 | Observability setup | Q01, Q31 | observability/, lib/telemetry/ | tests/integration/telemetry.test.ts | NOT_STARTED | - |
| L-003 | Error tracking | Q31 | lib/telemetry/error-tracking.ts | tests/integration/error-tracking.test.ts | NOT_STARTED | - |
| L-004 | Logging configuration | Q01 | lib/logging/, config/env.ts | tests/unit/logging.test.ts | IN_PROGRESS | In progress |

### Migration Requirements (Part U)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| U-001 | SEO cutover plan | Q32 | docs/DEPLOYMENT_RUNBOOK.md | N/A | NOT_STARTED | - |
| U-002 | Redirect mapping | Q32 | middleware.ts (redirects) | tests/integration/redirects.test.ts | NOT_STARTED | - |
| U-003 | Data migration scripts | Q32 | scripts/migrate-*.ts | tests/integration/migration.test.ts | NOT_STARTED | - |

### Launch Gates (Part V)

| Blueprint ID | Requirement | Workstream | Implementation Location | Test Location | Status | Evidence |
|--------------|-------------|------------|------------------------|---------------|--------|----------|
| V-001 | All P0 tests passing | Q33 | All test suites | npm test, npm run test:e2e | NOT_STARTED | - |
| V-002 | Security audit passed | Q30, Q33 | docs/SECURITY_NOTES.md | External audit | NOT_STARTED | - |
| V-003 | Accessibility audit passed | Q31, Q33 | tests/accessibility/ | External audit | NOT_STARTED | - |
| V-004 | Performance budgets met | Q31, Q33 | tests/performance/ | Lighthouse CI | NOT_STARTED | - |
| V-005 | Operations documentation complete | Q33 | docs/runbooks/ | Manual review | NOT_STARTED | - |

## Coverage Summary

| Category | Total Requirements | Implemented | In Progress | Not Started | Blocked |
|----------|-------------------|-------------|-------------|-------------|---------|
| Foundation | 5 | 0 | 3 | 2 | 0 |
| Design System | 6 | 0 | 0 | 6 | 0 |
| Database | 12 | 0 | 0 | 9 | 3 |
| Search | 6 | 0 | 0 | 4 | 2 |
| AI | 5 | 0 | 0 | 3 | 2 |
| Lead & CRM | 5 | 0 | 0 | 3 | 2 |
| Public UX | 8 | 0 | 0 | 7 | 1 |
| Admin | 4 | 0 | 0 | 4 | 0 |
| SEO | 4 | 0 | 0 | 4 | 0 |
| Analytics | 3 | 0 | 0 | 3 | 0 |
| Security | 5 | 0 | 1 | 4 | 0 |
| Performance | 4 | 0 | 1 | 3 | 0 |
| Migration | 3 | 0 | 0 | 3 | 0 |
| Launch Gates | 5 | 0 | 0 | 5 | 0 |
| **TOTAL** | **75** | **0** | **5** | **63** | **7** |

## Notes

- This matrix is updated as implementation progresses
- "Blocked" indicates external dependency preventing implementation
- Evidence column references files, test results, or documentation proving completion
- See `docs/BUILD_STATE.md` for workstream-level status
- See `docs/VERIFICATION_LOG.md` for detailed test evidence
