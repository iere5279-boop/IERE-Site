/**
 * Environment Configuration Validator
 * 
 * Validates and provides type-safe access to environment variables.
 * Never exposes secrets to client-side code.
 */

import { z } from 'zod';

// Server-side only schema
const serverEnvSchema = z.object({
  // Application
  APP_ENV: z.enum(['development', 'staging', 'production']),
  APP_URL: z.string().url(),
  BUILD_SHA: z.string().optional(),
  DEFAULT_LOCALE: z.string().default('en'),
  DEFAULT_CURRENCY: z.string().default('AED'),
  
  // Database
  DATABASE_URL: z.string().startsWith('postgresql://'),
  DATABASE_POOL_URL: z.string().startsWith('postgresql://').optional(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(10),
  SUPABASE_SECRET_KEY: z.string().min(10),
  
  // Search
  TYPESENSE_HOST: z.string().url().optional(),
  TYPESENSE_SEARCH_KEY: z.string().min(10).optional(),
  TYPESENSE_ADMIN_KEY: z.string().min(10).optional(),
  SEARCH_SCHEMA_VERSION: z.string().default('1.0.0'),
  
  // Redis/Queue
  REDIS_URL: z.string().optional(),
  QUEUE_PREFIX: z.string().default('investment-experts'),
  WORKER_CONCURRENCY: z.string().transform(Number).default('4'),
  
  // AI
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  AI_MODEL_DEFAULT: z.string().default('gpt-4o-mini'),
  AI_MODEL_FAST: z.string().default('gpt-4o-mini'),
  AI_MODEL_EMBEDDING: z.string().default('text-embedding-3-small'),
  AI_DAILY_BUDGET_MINOR: z.string().transform(Number).default('10'),
  
  // Maps
  MAPBOX_PUBLIC_TOKEN: z.string().startsWith('pk.').optional(),
  MAPBOX_SECRET_TOKEN: z.string().startsWith('sk.').optional(),
  
  // CRM
  CRM_PROVIDER: z.enum(['hubspot', 'salesforce', 'pipedrive', 'custom']).optional(),
  CRM_BASE_URL: z.string().url().optional(),
  CRM_CLIENT_ID: z.string().optional(),
  CRM_CLIENT_SECRET: z.string().optional(),
  CRM_WEBHOOK_SECRET: z.string().optional(),
  
  // Email
  EMAIL_PROVIDER: z.enum(['sendgrid', 'postmark', 'ses']).optional(),
  EMAIL_API_KEY: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().email().optional(),
  EMAIL_WEBHOOK_SECRET: z.string().optional(),
  
  // Analytics
  GA_MEASUREMENT_ID: z.string().startsWith('G-').optional(),
  PRODUCT_ANALYTICS_KEY: z.string().optional(),
  ANALYTICS_SERVER_SECRET: z.string().optional(),
  
  // Observability
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  ERROR_TRACKING_DSN: z.string().url().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Security
  APP_ENCRYPTION_KEY: z.string().length(64).optional(),
  CRON_SECRET: z.string().min(16).optional(),
  WEBHOOK_REPLAY_WINDOW_SECONDS: z.string().transform(Number).default('300'),
});

// Public (client-safe) schema
const publicEnvSchema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  PUBLIC_SITE_URL: z.string().url(),
  DEFAULT_LOCALE: z.string().default('en'),
  DEFAULT_CURRENCY: z.string().default('AED'),
  MAPBOX_PUBLIC_TOKEN: z.string().startsWith('pk.').optional(),
  GA_MEASUREMENT_ID: z.string().startsWith('G-').optional(),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;
type PublicEnv = z.infer<typeof publicEnvSchema>;

function validateServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.errors
      .map(e => e.path.join('.'))
      .filter(path => !path.includes('optional'));
    
    if (missing.length > 0) {
      console.warn('⚠️  Missing or invalid environment variables:', missing.join(', '));
      console.warn('   See .env.example for required configuration');
    }
    
    // Return partial with defaults where possible
    return result.data ?? {} as Partial<ServerEnv> as ServerEnv;
  }
  return result.data;
}

function validatePublicEnv(): PublicEnv {
  const result = publicEnvSchema.safeParse({
    APP_ENV: process.env.APP_ENV,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || process.env.APP_URL,
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
    DEFAULT_CURRENCY: process.env.DEFAULT_CURRENCY,
    MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  });
  
  if (!result.success) {
    console.warn('⚠️  Invalid public environment variables:', result.error.message);
  }
  
  return result.data as PublicEnv;
}

export const serverEnv = validateServerEnv();
export const publicEnv = validatePublicEnv();

// Export individual values for convenience
export const env = {
  isDev: serverEnv.APP_ENV === 'development',
  isStaging: serverEnv.APP_ENV === 'staging',
  isProd: serverEnv.APP_ENV === 'production',
  siteUrl: serverEnv.APP_URL,
  publicSiteUrl: publicEnv.PUBLIC_SITE_URL,
  locale: serverEnv.DEFAULT_LOCALE,
  currency: serverEnv.DEFAULT_CURRENCY,
  logLevel: serverEnv.LOG_LEVEL,
  // Database
  SUPABASE_URL: serverEnv.SUPABASE_URL,
  SUPABASE_ANON_KEY: serverEnv.SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY: serverEnv.SUPABASE_SECRET_KEY,
  DATABASE_URL: serverEnv.DATABASE_URL,
  // Search
  TYPESENSE_HOST: serverEnv.TYPESENSE_HOST,
  TYPESENSE_SEARCH_KEY: serverEnv.TYPESENSE_SEARCH_KEY,
  TYPESENSE_ADMIN_KEY: serverEnv.TYPESENSE_ADMIN_KEY,
  // AI
  OPENAI_API_KEY: serverEnv.OPENAI_API_KEY,
  AI_MODEL_DEFAULT: serverEnv.AI_MODEL_DEFAULT,
  // Maps
  MAPBOX_PUBLIC_TOKEN: serverEnv.MAPBOX_PUBLIC_TOKEN,
  MAPBOX_SECRET_TOKEN: serverEnv.MAPBOX_SECRET_TOKEN,
  // CRM
  CRM_PROVIDER: serverEnv.CRM_PROVIDER,
  CRM_BASE_URL: serverEnv.CRM_BASE_URL,
  // Email
  EMAIL_PROVIDER: serverEnv.EMAIL_PROVIDER,
  EMAIL_FROM_ADDRESS: serverEnv.EMAIL_FROM_ADDRESS,
  // Analytics
  GA_MEASUREMENT_ID: serverEnv.GA_MEASUREMENT_ID,
} as const;

// Validation helper for runtime checks
export function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}
