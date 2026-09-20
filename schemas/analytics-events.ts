/**
 * Analytics Event Taxonomy Schema
 * 
 * Based on Blueprint Part J - Analytics Event Taxonomy
 * All events must conform to this schema for consistent tracking
 */

import { z } from 'zod';

// Base event structure
const baseEventSchema = z.object({
  event_id: z.string().uuid(),
  event_name: z.string(),
  timestamp: z.string().datetime(),
  user_id: z.string().optional(),
  session_id: z.string(),
  page_url: z.string().url(),
  referrer: z.string().url().optional(),
  user_agent: z.string().optional(),
  ip_address: z.string().ip().optional(),
});

// User identification
const userIdentitySchema = z.object({
  user_id: z.string(),
  email_hash: z.string().optional(),
  user_type: z.enum(['anonymous', 'registered', 'agent', 'admin']),
  traits: z.record(z.unknown()).optional(),
});

// Property interaction events
const propertyViewSchema = z.object({
  property_id: z.string(),
  property_type: z.enum(['ready', 'off_plan']),
  listing_type: z.enum(['buy', 'rent']),
  price: z.number().optional(),
  bedrooms: z.number().optional(),
  community: z.string().optional(),
  developer: z.string().optional(),
});

const searchPerformedSchema = z.object({
  query_id: z.string(),
  search_type: z.enum(['structured', 'natural_language', 'map']),
  filters: z.record(z.unknown()),
  result_count: z.number(),
  sort_by: z.string().optional(),
  page: z.number().default(1),
});

// Lead events
const leadSubmittedSchema = z.object({
  lead_id: z.string(),
  form_type: z.enum(['contact', 'viewing', 'callback', 'brochure']),
  property_id: z.string().optional(),
  project_id: z.string().optional(),
  agent_id: z.string().optional(),
  source: z.string(),
  campaign: z.string().optional(),
  medium: z.string().optional(),
  term: z.string().optional(),
  content: z.string().optional(),
});

const leadQualifiedSchema = z.object({
  lead_id: z.string(),
  qualification_score: z.number().min(0).max(100),
  qualification_factors: z.array(z.string()),
  assigned_agent_id: z.string().optional(),
});

// AI Advisor events
const aiQuerySubmittedSchema = z.object({
  query_id: z.string(),
  query_type: z.enum(['property_search', 'investment_advice', 'market_info', 'general']),
  query_length: z.number(),
  context_provided: z.boolean(),
});

const aiResponseDeliveredSchema = z.object({
  query_id: z.string(),
  response_length: z.number(),
  sources_cited: z.number(),
  confidence_score: z.number().min(0).max(1),
  tools_used: z.array(z.string()),
});

// Market intelligence events
const reportViewedSchema = z.object({
  report_id: z.string(),
  report_type: z.enum(['market_overview', 'area_analysis', 'investment_guide', 'transaction_data']),
  sections_viewed: z.array(z.string()),
  time_spent_seconds: z.number(),
  downloaded: z.boolean(),
});

// Conversion funnel events
const consultationBookedSchema = z.object({
  consultation_id: z.string(),
  consultation_type: z.enum(['phone', 'video', 'in_person']),
  agent_id: z.string(),
  scheduled_time: z.string().datetime(),
  property_interest: z.string().optional(),
});

// E-commerce style events (for investment products)
const calculatorUsedSchema = z.object({
  calculator_type: z.enum(['roi', 'mortgage', 'rent_yield', 'comparison']),
  inputs: z.record(z.number()),
  results_viewed: z.boolean(),
  saved: z.boolean(),
});

// Complete event union
export const analyticsEventSchema = baseEventSchema.extend({
  event_type: z.enum([
    'page_view',
    'property_view',
    'project_view',
    'community_view',
    'agent_view',
    'search_performed',
    'filter_applied',
    'map_interaction',
    'lead_submitted',
    'lead_qualified',
    'ai_query_submitted',
    'ai_response_delivered',
    'report_viewed',
    'consultation_booked',
    'calculator_used',
    'saved_property',
    'shared_property',
    'contact_agent',
    'newsletter_signup',
  ]),
  event_data: z.union([
    propertyViewSchema,
    searchPerformedSchema,
    leadSubmittedSchema,
    leadQualifiedSchema,
    aiQuerySubmittedSchema,
    aiResponseDeliveredSchema,
    reportViewedSchema,
    consultationBookedSchema,
    calculatorUsedSchema,
  ]).optional(),
  user_identity: userIdentitySchema.optional(),
  custom_dimensions: z.record(z.string()).optional(),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

// Helper function to create typed events
export function createAnalyticsEvent(
  eventName: string,
  eventData: Record<string, unknown>,
  sessionId: string
): AnalyticsEvent {
  return {
    event_id: crypto.randomUUID(),
    event_name: eventName,
    event_type: eventName as AnalyticsEvent['event_type'],
    timestamp: new Date().toISOString(),
    session_id: sessionId,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...eventData,
  } as AnalyticsEvent;
}
