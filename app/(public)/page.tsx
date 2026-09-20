import { Header } from '@/components/patterns/header';
import { Footer } from '@/components/patterns/footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  MapPin,
  Phone,
  Play
} from 'lucide-react';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Penthouse in Downtown Dubai',
    location: 'Downtown Dubai',
    price: 15500000,
    beds: 4,
    baths: 5,
    area: 4500,
    image: '/placeholder-property-1.jpg',
    badge: 'Featured',
  },
  {
    id: 2,
    title: 'Beachfront Villa on Palm Jumeirah',
    location: 'Palm Jumeirah',
    price: 28000000,
    beds: 6,
    baths: 7,
    area: 8200,
    image: '/placeholder-property-2.jpg',
    badge: 'New',
  },
  {
    id: 3,
    title: 'Modern Apartment in Dubai Marina',
    location: 'Dubai Marina',
    price: 3200000,
    beds: 2,
    baths: 3,
    area: 1850,
    image: '/placeholder-property-3.jpg',
    badge: 'Hot Deal',
  },
];

const stats = [
  { value: 'AED 2.5B+', label: 'Property Value Sold' },
  { value: '850+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
];

const services = [
  {
    icon: Building2,
    title: 'Property Sales',
    description: 'Premium properties in prime locations across Dubai',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    description: 'Data-driven insights for maximum ROI',
  },
  {
    icon: ShieldCheck,
    title: 'Legal Support',
    description: 'Complete legal assistance and documentation',
  },
  {
    icon: Users,
    title: 'Property Management',
    description: 'End-to-end management for investors',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-primary-950 text-white">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="gold" className="mb-6">
                #1 Real Estate Investment Experts in Dubai
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your Gateway to Premium{' '}
                <span className="text-gold-400">Dubai Real Estate</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Expert guidance for property investments with proven track record of 
                delivering exceptional returns for local and international investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="bg-gold-500 hover:bg-gold-600">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium properties in Dubai&apos;s most sought-after locations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-64 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <Building2 className="h-16 w-16" />
                    </div>
                    <Badge className="absolute top-4 left-4" variant="gold">
                      {property.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{property.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{property.beds} Beds</span>
                        <span>{property.baths} Baths</span>
                        <span>{property.area.toLocaleString()} sqft</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(property.price)}
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive real estate solutions tailored to your investment goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-6 rounded-xl border border-gray-200 hover:border-primary-600 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                    <service.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Get expert advice from our team and discover the perfect investment opportunity in Dubai
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  +971 4 333 7707
                </Button>
                <Button size="xl" className="bg-gold-500 hover:bg-gold-600 text-white">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
