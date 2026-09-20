import { Redis } from 'ioredis'

/**
 * Q29: Job Queue Service (Background Jobs)
 * Handles heavy async tasks: image processing, email batches, data sync.
 * Falls back to immediate execution if Redis unavailable.
 */

interface Job<T = any> {
  id: string
  type: string
  data: T
  priority: number
  attempts: number
  maxAttempts: number
  createdAt: Date
  scheduledAt?: Date
}

type JobHandler<T = any> = (data: T) => Promise<void>

class JobQueueService {
  private redis: Redis | null = null
  private handlers: Map<string, JobHandler> = new Map()
  private mode: 'redis' | 'mock' = 'mock'
  private pendingJobs: Job[] = []

  constructor() {
    if (process.env.REDIS_URL) {
      this.redis = new Redis(process.env.REDIS_URL)
      this.mode = 'redis'
      this.setupRedisListeners()
    } else {
      console.warn('Job queue running in MOCK mode - no Redis URL')
      this.mode = 'mock'
    }
  }

  private setupRedisListeners() {
    if (!this.redis) return
    
    // In production, would use Bull/BullMQ for proper queue management
    this.redis.on('error', (err) => {
      console.error('Redis connection error:', err)
    })
  }

  /**
   * Register a job handler
   */
  registerHandler<T>(type: string, handler: JobHandler<T>) {
    this.handlers.set(type, handler as JobHandler)
  }

  /**
   * Add a job to the queue
   */
  async addJob<T>(type: string, data: T, options?: {
    priority?: number
    delay?: number
    maxAttempts?: number
  }): Promise<string> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const job: Job<T> = {
      id: jobId,
      type,
      data,
      priority: options?.priority || 0,
      attempts: 0,
      maxAttempts: options?.maxAttempts || 3,
      createdAt: new Date(),
      scheduledAt: options?.delay ? new Date(Date.now() + options.delay) : undefined,
    }

    if (this.mode === 'mock') {
      console.log(`[MOCK JOB] Queued: ${type} (${jobId})`)
      this.pendingJobs.push(job as Job)
      
      // Execute immediately in mock mode
      setTimeout(() => this.processJob(job), 0)
      
      return jobId
    }

    try {
      // Store job in Redis
      await this.redis!.lpush('job_queue', JSON.stringify(job))
      return jobId
    } catch (error) {
      console.error('Failed to add job to queue:', error)
      // Fallback to mock execution
      this.pendingJobs.push(job as Job)
      setTimeout(() => this.processJob(job), 0)
      return jobId
    }
  }

  /**
   * Process a single job
   */
  private async processJob<T>(job: Job<T>): Promise<boolean> {
    const handler = this.handlers.get(job.type)
    
    if (!handler) {
      console.error(`No handler registered for job type: ${job.type}`)
      return false
    }

    try {
      job.attempts++
      await handler(job.data)
      console.log(`Job ${job.id} completed successfully`)
      return true
    } catch (error) {
      console.error(`Job ${job.id} failed (attempt ${job.attempts}/${job.maxAttempts}):`, error)
      
      if (job.attempts < job.maxAttempts) {
        // Retry with exponential backoff
        const delay = Math.pow(2, job.attempts) * 1000
        setTimeout(() => this.processJob(job), delay)
        return false
      }
      
      // Max attempts reached - would move to dead letter queue in production
      console.error(`Job ${job.id} failed permanently after ${job.maxAttempts} attempts`)
      return false
    }
  }

  // Specific job types

  /**
   * Queue bulk email sending
   */
  async queueBulkEmail(recipients: Array<{ email: string; template: string; data: any }>) {
    return this.addJob('bulk_email', { recipients })
  }

  /**
   * Queue image processing (resize, optimize)
   */
  async queueImageProcessing(imageUrls: string[]) {
    return this.addJob('image_processing', { images: imageUrls })
  }

  /**
   * Queue property data sync from external feeds
   */
  async queuePropertyDataSync(feedId: string) {
    return this.addJob('property_sync', { feedId })
  }

  /**
   * Queue analytics aggregation
   */
  async queueAnalyticsAggregation(dateRange: { start: Date; end: Date }) {
    return this.addJob('analytics_aggregate', { dateRange })
  }

  /**
   * Queue CRM sync
   */
  async queueCRMSync(entityType: string, entityIds: string[]) {
    return this.addJob('crm_sync', { entityType, entityIds })
  }

  /**
   * Queue report generation
   */
  async queueReportGeneration(reportType: string, params: any, userId: string) {
    return this.addJob('report_generation', { reportType, params, userId })
  }
}

// Initialize and register default handlers
export const jobQueue = new JobQueueService()

// Register handlers (would be called during app initialization)
jobQueue.registerHandler('bulk_email', async (data: any) => {
  console.log(`Processing ${data.recipients.length} emails...`)
  // Would integrate with email service
})

jobQueue.registerHandler('image_processing', async (data: any) => {
  console.log(`Processing ${data.images.length} images...`)
  // Would integrate with image optimization service
})

jobQueue.registerHandler('property_sync', async (data: any) => {
  console.log(`Syncing property feed: ${data.feedId}`)
  // Would fetch from external API and update database
})

jobQueue.registerHandler('analytics_aggregate', async (data: any) => {
  console.log(`Aggregating analytics from ${data.dateRange.start} to ${data.dateRange.end}`)
  // Would run aggregation queries
})

jobQueue.registerHandler('crm_sync', async (data: any) => {
  console.log(`Syncing ${data.entityIds.length} ${data.entityType} to CRM`)
  // Would integrate with CRM API
})

jobQueue.registerHandler('report_generation', async (data: any) => {
  console.log(`Generating ${data.reportType} report for user ${data.userId}`)
  // Would generate PDF/Excel report
})
