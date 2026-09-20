import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface PropertyBrochureData {
  propertyName: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  size: number
  description: string
  features: string[]
  agentName: string
  agentPhone: string
  agentEmail: string
}

interface OfferLetterData {
  offerId: string
  buyerName: string
  propertyName: string
  propertyAddress: string
  offerAmount: number
  depositAmount: number
  proposedClosingDate: string
  contingencies: string[]
  date: string
}

class DocumentService {
  async generatePropertyBrochure(data: PropertyBrochureData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const { width, height } = page.getSize()
    let y = height - 50

    page.drawText('INVESTMENT EXPERTS DUBAI', { x: 50, y, size: 18, font: boldFont })
    y -= 30
    page.drawText(data.propertyName, { x: 50, y, size: 24, font: boldFont })
    y -= 25
    page.drawText('AED ' + data.price.toLocaleString(), { x: 50, y, size: 20, font: boldFont, color: rgb(0.2, 0.4, 0.8) })
    y -= 35
    page.drawText('PROPERTY DETAILS', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText('Address: ' + data.address, { x: 70, y, size: 11 })
    y -= 18
    page.drawText('Bedrooms: ' + data.bedrooms + ' | Bathrooms: ' + data.bathrooms + ' | Size: ' + data.size + ' sq.ft', { x: 70, y, size: 11 })
    y -= 25
    page.drawText('DESCRIPTION', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText(data.description.substring(0, 500), { x: 70, y, size: 11 })
    y -= 25
    page.drawText('FEATURES', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    data.features.forEach((feature) => {
      if (y < 100) { pdfDoc.addPage(); y = height - 50; }
      page.drawText('- ' + feature, { x: 70, y, size: 11 })
      y -= 16
    })
    y -= 20
    page.drawText('CONTACT AGENT', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText(data.agentName, { x: 70, y, size: 11, font: boldFont })
    y -= 16
    page.drawText('Phone: ' + data.agentPhone, { x: 70, y, size: 11 })
    y -= 16
    page.drawText('Email: ' + data.agentEmail, { x: 70, y, size: 11 })
    return await pdfDoc.save()
  }

  async generateOfferLetter(data: OfferLetterData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const { height } = page.getSize()
    let y = height - 50

    page.drawText('FORMAL OFFER TO PURCHASE', { x: 50, y, size: 20, font: boldFont })
    y -= 30
    page.drawText('Offer ID: ' + data.offerId, { x: 50, y, size: 11 })
    y -= 30
    page.drawText('Date: ' + data.date, { x: 50, y, size: 11 })
    y -= 30
    page.drawText('BUYER INFORMATION', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText('Name: ' + data.buyerName, { x: 70, y, size: 11 })
    y -= 25
    page.drawText('PROPERTY', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText(data.propertyName, { x: 70, y, size: 11, font: boldFont })
    y -= 16
    page.drawText(data.propertyAddress, { x: 70, y, size: 11 })
    y -= 25
    page.drawText('OFFER TERMS', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    page.drawText('Purchase Price: AED ' + data.offerAmount.toLocaleString(), { x: 70, y, size: 11, font: boldFont })
    y -= 18
    page.drawText('Deposit Amount: AED ' + data.depositAmount.toLocaleString(), { x: 70, y, size: 11 })
    y -= 18
    page.drawText('Proposed Closing Date: ' + data.proposedClosingDate, { x: 70, y, size: 11 })
    y -= 25
    page.drawText('CONTINGENCIES', { x: 50, y, size: 14, font: boldFont })
    y -= 20
    data.contingencies.forEach((c, i) => {
      page.drawText((i + 1) + '. ' + c, { x: 70, y, size: 11 })
      y -= 18
    })
    y -= 30
    page.drawText('BUYER SIGNATURE', { x: 50, y, size: 12, font: boldFont })
    y -= 40
    page.drawLine({ start: { x: 50, y }, end: { x: 250, y }, thickness: 1 })
    y -= 40
    page.drawText('SELLER ACCEPTANCE', { x: 50, y, size: 12, font: boldFont })
    y -= 40
    page.drawLine({ start: { x: 50, y }, end: { x: 250, y }, thickness: 1 })
    return await pdfDoc.save()
  }

  async generateViewingConfirmation(data: { viewingId: string; buyerName: string; propertyName: string; address: string; dateTime: string; agentName: string; agentPhone: string }): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 400])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    let y = 350
    page.drawText('VIEWING CONFIRMATION', { x: 50, y, size: 18, font: boldFont })
    y -= 30
    page.drawText('Viewing ID: ' + data.viewingId, { x: 50, y, size: 11 })
    y -= 25
    page.drawText('Dear ' + data.buyerName + ',', { x: 50, y, size: 11 })
    y -= 20
    page.drawText('Your property viewing has been confirmed:', { x: 50, y, size: 11 })
    y -= 20
    page.drawText('Property: ' + data.propertyName, { x: 70, y, size: 11, font: boldFont })
    y -= 16
    page.drawText('Address: ' + data.address, { x: 70, y, size: 11 })
    y -= 16
    page.drawText('Date & Time: ' + data.dateTime, { x: 70, y, size: 11, font: boldFont })
    y -= 20
    page.drawText('Agent: ' + data.agentName, { x: 70, y, size: 11 })
    y -= 16
    page.drawText('Contact: ' + data.agentPhone, { x: 70, y, size: 11 })
    y -= 25
    page.drawText('Please arrive 5 minutes early.', { x: 50, y, size: 10 })
    y -= 20
    page.drawText('Investment Experts Dubai', { x: 50, y, size: 11, font: boldFont })
    return await pdfDoc.save()
  }

  async generateMarketReport(data: { title: string; period: string; generatedDate: string; sections: Array<{ title: string; content: string }> }): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage([595, 842])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const { width, height } = page.getSize()
    let y = height - 50
    page.drawText(data.title, { x: 50, y, size: 22, font: boldFont })
    y -= 25
    page.drawText('Period: ' + data.period, { x: 50, y, size: 12 })
    y -= 18
    page.drawText('Generated: ' + data.generatedDate, { x: 50, y, size: 11 })
    y -= 30
    for (const section of data.sections) {
      if (y < 100) { page = pdfDoc.addPage(); y = height - 50; }
      page.drawText(section.title.toUpperCase(), { x: 50, y, size: 14, font: boldFont })
      y -= 20
      page.drawText(section.content.substring(0, 800), { x: 50, y, size: 11 })
      y -= 25
    }
    return await pdfDoc.save()
  }
}

export const documentService = new DocumentService()
