import OpenAI from 'openai'

/**
 * Q24: AI Service Gateway
 * Handles all AI interactions (property descriptions, smart match, chatbot, sentiment analysis).
 * Falls back to mock responses if credentials missing.
 */

interface PropertyDescriptionOptions {
  propertyName: string
  location: string
  bedrooms: number
  bathrooms: number
  size: number
  features: string[]
  price: number
}

interface SmartMatchOptions {
  buyerPreferences: {
    locations: string[]
    minPrice: number
    maxPrice: number
    minBedrooms: number
    propertyType?: string
  }
  properties: Array<{
    id: string
    name: string
    location: string
    price: number
    bedrooms: number
    features: string[]
  }>
}

class AIService {
  private openai: OpenAI | null = null
  private mode: 'openai' | 'mock' = 'mock'

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      this.mode = 'openai'
    } else {
      console.warn('AI service running in MOCK mode - no OpenAI key')
      this.mode = 'mock'
    }
  }

  /**
   * Generate compelling property description
   */
  async generatePropertyDescription(options: PropertyDescriptionOptions): Promise<string> {
    if (this.mode === 'mock') {
      return `Stunning ${options.bedrooms}-bedroom residence in ${options.location}. 
This ${Math.round(options.size)} sq.ft property features modern design, premium finishes, 
and ${options.features.join(', ')}. Priced at AED ${options.price.toLocaleString()}, 
this is an exceptional investment opportunity in Dubai's thriving real estate market.`
    }

    try {
      const completion = await this.openai!.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a luxury real estate copywriter specializing in Dubai properties. Write compelling, concise property descriptions that highlight investment potential.',
          },
          {
            role: 'user',
            content: `Write a property description for:
- Name: ${options.propertyName}
- Location: ${options.location}
- Bedrooms: ${options.bedrooms}
- Bathrooms: ${options.bathrooms}
- Size: ${options.size} sq.ft
- Features: ${options.features.join(', ')}
- Price: AED ${options.price.toLocaleString()}`,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      })

      return completion.choices[0].message.content || ''
    } catch (error) {
      console.error('AI description generation failed:', error)
      return options.propertyName // Fallback
    }
  }

  /**
   * Smart Match: Find best properties for a buyer
   */
  async smartMatchBuyerToProperties(options: SmartMatchOptions): Promise<Array<{ propertyId: string; score: number; reason: string }>> {
    if (this.mode === 'mock') {
      // Simple mock scoring based on bedroom match
      return options.properties.map(p => ({
        propertyId: p.id,
        score: p.bedrooms === options.buyerPreferences.minBedrooms ? 95 : 70,
        reason: p.bedrooms >= options.buyerPreferences.minBedrooms 
          ? 'Matches bedroom requirement and location preference'
          : 'Good location but fewer bedrooms than preferred',
      })).sort((a, b) => b.score - a.score).slice(0, 5)
    }

    try {
      const completion = await this.openai!.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a real estate matching algorithm. Analyze buyer preferences and rank properties by fit. Return JSON array with propertyId, score (0-100), and reason.',
          },
          {
            role: 'user',
            content: `Buyer wants:
- Locations: ${options.buyerPreferences.locations.join(', ')}
- Budget: AED ${options.buyerPreferences.minPrice.toLocaleString()} - ${options.buyerPreferences.maxPrice.toLocaleString()}
- Min Bedrooms: ${options.buyerPreferences.minBedrooms}
- Type: ${options.buyerPreferences.propertyType || 'Any'}

Properties: ${JSON.stringify(options.properties)}`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      })

      const result = JSON.parse(completion.choices[0].message.content || '{}')
      return result.matches || []
    } catch (error) {
      console.error('AI smart match failed:', error)
      return []
    }
  }

  /**
   * Analyze lead sentiment from messages/notes
   */
  async analyzeSentiment(text: string): Promise<{ sentiment: 'positive' | 'neutral' | 'negative'; confidence: number; keywords: string[] }> {
    if (this.mode === 'mock') {
      const positiveWords = ['interested', 'love', 'perfect', 'great', 'excellent', 'ready']
      const negativeWords = ['expensive', 'no', 'not', 'disappointed', 'waiting', 'concern']
      
      const lowerText = text.toLowerCase()
      const posCount = positiveWords.filter(w => lowerText.includes(w)).length
      const negCount = negativeWords.filter(w => lowerText.includes(w)).length
      
      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral'
      if (posCount > negCount) sentiment = 'positive'
      if (negCount > posCount) sentiment = 'negative'

      return {
        sentiment,
        confidence: Math.abs(posCount - negCount) > 0 ? 0.7 : 0.5,
        keywords: [...positiveWords, ...negativeWords].filter(w => lowerText.includes(w)),
      }
    }

    try {
      const completion = await this.openai!.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Analyze the sentiment of this real estate lead communication. Return JSON with sentiment (positive/neutral/negative), confidence (0-1), and key phrases.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      })

      return JSON.parse(completion.choices[0].message.content || '{}')
    } catch (error) {
      console.error('AI sentiment analysis failed:', error)
      return { sentiment: 'neutral', confidence: 0.5, keywords: [] }
    }
  }

  /**
   * Chatbot response generator
   */
  async generateChatbotResponse(message: string, context?: {
    currentPage?: string
    userHistory?: string
    availableProperties?: number
  }): Promise<string> {
    if (this.mode === 'mock') {
      return `Thank you for your inquiry about "${message}". Our team specializes in Dubai luxury real estate and would be happy to assist you. Would you like to schedule a viewing or speak with an agent?`
    }

    try {
      const completion = await this.openai!.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for Investment Experts, a premier Dubai real estate agency. 
Be professional, friendly, and knowledgeable about Dubai property market.
Current context: ${JSON.stringify(context || {})}`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      })

      return completion.choices[0].message.content || ''
    } catch (error) {
      console.error('AI chatbot response failed:', error)
      return 'Thank you for your message. Our team will get back to you shortly.'
    }
  }

  /**
   * Extract structured data from unstructured lead notes
   */
  async extractLeadInsights(notes: string): Promise<{
    budget?: number
    preferredLocations?: string[]
    timeline?: string
    concerns?: string[]
  }> {
    if (this.mode === 'mock') {
      return {
        budget: 2500000,
        preferredLocations: ['Dubai Marina', 'Downtown Dubai'],
        timeline: '3 months',
        concerns: ['ROI', 'payment plan'],
      }
    }

    try {
      const completion = await this.openai!.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Extract structured insights from real estate lead notes. Return JSON with budget (number), preferredLocations (array), timeline (string), and concerns (array).',
          },
          {
            role: 'user',
            content: notes,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      })

      return JSON.parse(completion.choices[0].message.content || '{}')
    } catch (error) {
      console.error('AI insight extraction failed:', error)
      return {}
    }
  }
}

export const aiService = new AIService()
