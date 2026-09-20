import Stripe from 'stripe'

class PaymentService {
  private stripe: Stripe | null = null
  private mode: 'stripe' | 'mock' = 'mock'

  constructor() {
    if (process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-08-26.dahlia' })
      this.mode = 'stripe'
    } else {
      console.warn('Payment service running in MOCK mode - no Stripe key')
      this.mode = 'mock'
    }
  }

  async createCheckoutSession(options: { customerId: string; amount: number; description: string; successUrl: string; cancelUrl: string; metadata?: Record<string, string> }): Promise<{ sessionId: string | null; url: string | null }> {
    if (this.mode === 'mock') {
      console.log('[MOCK PAYMENT] Creating checkout session:', options)
      return { sessionId: 'mock_session_' + Date.now(), url: options.successUrl + '?session_id=mock_session' }
    }
    try {
      const session = await this.stripe!.checkout.sessions.create({
        customer: options.customerId,
        line_items: [{ price_data: { currency: 'aed', product_data: { name: options.description }, unit_amount: Math.round(options.amount * 100) }, quantity: 1 }],
        mode: 'payment',
        success_url: options.successUrl,
        cancel_url: options.cancelUrl,
        metadata: options.metadata,
      })
      return { sessionId: session.id, url: session.url }
    } catch (error) {
      console.error('Checkout session creation failed:', error)
      return { sessionId: null, url: null }
    }
  }

  async createPaymentIntent(options: { amount: number; currency: string; customerId?: string; metadata?: Record<string, string> }): Promise<{ clientSecret: string | null; id: string | null }> {
    if (this.mode === 'mock') {
      console.log('[MOCK PAYMENT] Creating payment intent:', options)
      return { clientSecret: 'mock_client_secret_' + Date.now(), id: 'mock_pi_' + Date.now() }
    }
    try {
      const paymentIntent = await this.stripe!.paymentIntents.create({
        amount: Math.round(options.amount * 100),
        currency: options.currency.toLowerCase(),
        customer: options.customerId,
        metadata: options.metadata,
        automatic_payment_methods: { enabled: true },
      })
      return { clientSecret: paymentIntent.client_secret, id: paymentIntent.id }
    } catch (error) {
      console.error('Payment intent creation failed:', error)
      return { clientSecret: null, id: null }
    }
  }

  async handleWebhook(signature: string, payload: Buffer): Promise<{ type: string; data: any } | null> {
    if (this.mode === 'mock') {
      return { type: 'payment_intent.succeeded', data: {} }
    }
    try {
      const event = await this.stripe!.webhooks.constructEventAsync(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
      return { type: event.type, data: event.data.object }
    } catch (error) {
      console.error('Webhook verification failed:', error)
      return null
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number): Promise<{ success: boolean }> {
    if (this.mode === 'mock') {
      return { success: true }
    }
    try {
      await this.stripe!.refunds.create({ payment_intent: paymentIntentId, amount: amount ? Math.round(amount * 100) : undefined })
      return { success: true }
    } catch (error) {
      console.error('Refund failed:', error)
      return { success: false }
    }
  }

  async createBookingFeeSession(customerId: string, propertyId: string, amount: number, urls: { success: string; cancel: string }) {
    return this.createCheckoutSession({ customerId, amount, description: 'Booking Fee - Property ' + propertyId, successUrl: urls.success, cancelUrl: urls.cancel, metadata: { type: 'booking_fee', propertyId } })
  }

  async createDepositSession(customerId: string, propertyId: string, amount: number, urls: { success: string; cancel: string }) {
    return this.createCheckoutSession({ customerId, amount, description: 'Reservation Deposit - Property ' + propertyId, successUrl: urls.success, cancelUrl: urls.cancel, metadata: { type: 'deposit', propertyId } })
  }
}

export const paymentService = new PaymentService()
