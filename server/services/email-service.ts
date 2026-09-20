import sgMail from '@sendgrid/mail'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailService {
  private mode: 'sendgrid' | 'mock' = 'mock'

  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      this.mode = 'sendgrid'
    } else {
      console.warn('Email service running in MOCK mode - no API keys configured')
      this.mode = 'mock'
    }
  }

  async send(options: EmailOptions): Promise<{ success: boolean; id?: string }> {
    if (this.mode === 'mock') {
      console.log('[MOCK EMAIL] To: ' + options.to + ' | Subject: ' + options.subject)
      return { success: true }
    }
    try {
      await sgMail.send({
        to: options.to,
        from: process.env.EMAIL_FROM || 'noreply@investmentexperts.ae',
        subject: options.subject,
        html: options.html,
        text: options.text,
      })
      return { success: true }
    } catch (error) {
      console.error('Email send failed:', error)
      return { success: false }
    }
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = '<h1>Welcome to Investment Experts!</h1><p>Hi ' + name + ',</p><p>Thank you for joining Dubai premier real estate investment platform.</p>'
    return this.send({ to, subject: 'Welcome to Investment Experts Dubai', html })
  }

  async sendViewingConfirmation(to: string, details: { propertyName: string; date: string; time: string; address: string; agentName: string; agentPhone: string }) {
    const html = '<h1>Viewing Confirmed</h1><p>Property: ' + details.propertyName + '</p><p>Date: ' + details.date + ' at ' + details.time + '</p><p>Agent: ' + details.agentName + '</p>'
    return this.send({ to, subject: 'Viewing Confirmed: ' + details.propertyName, html })
  }

  async sendOfferNotification(to: string, details: { propertyName: string; offerAmount: number; buyerName: string; offerId: string }) {
    const html = '<h1>New Offer Received</h1><p>Property: ' + details.propertyName + '</p><p>Amount: AED ' + details.offerAmount.toLocaleString() + '</p>'
    return this.send({ to, subject: 'New Offer: ' + details.propertyName, html })
  }
}

export const emailService = new EmailService()
