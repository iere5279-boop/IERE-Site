import twilio from 'twilio'

/**
 * Q18: SMS/WhatsApp Service
 * Handles SMS notifications and WhatsApp messages.
 * Falls back to console logging if credentials missing.
 */

interface SMSOptions {
  to: string
  body: string
}

class SMSService {
  private client: any = null
  private mode: 'twilio' | 'mock' = 'mock'

  constructor() {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      )
      this.mode = 'twilio'
    } else {
      console.warn('SMS service running in MOCK mode - no Twilio credentials')
      this.mode = 'mock'
    }
  }

  async send(options: SMSOptions): Promise<{ success: boolean; sid?: string }> {
    if (this.mode === 'mock') {
      console.log(`[MOCK SMS] To: ${options.to} | Body: ${options.body}`)
      return { success: true }
    }

    try {
      const message = await this.client.messages.create({
        body: options.body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: options.to,
      })
      return { success: true, sid: message.sid }
    } catch (error) {
      console.error('SMS send failed:', error)
      return { success: false }
    }
  }

  async sendWhatsApp(to: string, body: string): Promise<{ success: boolean; sid?: string }> {
    if (this.mode === 'mock') {
      console.log(`[MOCK WHATSAPP] To: ${to} | Body: ${body}`)
      return { success: true }
    }

    try {
      const message = await this.client.messages.create({
        body: body,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`,
      })
      return { success: true, sid: message.sid }
    } catch (error) {
      console.error('WhatsApp send failed:', error)
      return { success: false }
    }
  }

  // Template: Viewing Reminder
  async sendViewingReminder(to: string, details: {
    propertyName: string
    date: string
    time: string
  }) {
    const body = `Reminder: Your viewing for ${details.propertyName} is scheduled for ${details.date} at ${details.time}. Reply CANCEL to reschedule.`
    return this.send({ to, body })
  }

  // Template: Offer Update
  async sendOfferUpdate(to: string, status: string, amount: number) {
    const body = `Offer Update: Your offer of AED ${amount.toLocaleString()} has been ${status}. Contact your agent for details.`
    return this.send({ to, body })
  }

  // Template: OTP Verification
  async sendOTP(to: string, code: string) {
    const body = `Your Investment Experts verification code is: ${code}. Valid for 10 minutes.`
    return this.send({ to, body })
  }
}

export const smsService = new SMSService()
