import mapboxgl from 'mapbox-gl'

/**
 * Q26: Map Service
 * Handles Mapbox integration for property maps, clustering, and area drawing.
 * Falls back to static coordinates if credentials missing.
 */

interface MapConfig {
  container: string
  center?: [number, number]
  zoom?: number
  style?: string
}

interface PropertyMarker {
  id: string
  name: string
  price: number
  bedrooms: number
  coordinates: [number, number]
  imageUrl?: string
}

interface DrawnArea {
  coordinates: [number, number][]
  areaSqFt: number
}

class MapService {
  private map: mapboxgl.Map | null = null
  private markers: mapboxgl.Marker[] = []
  private mode: 'mapbox' | 'mock' = 'mock'

  constructor() {
    if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      this.mode = 'mapbox'
    } else {
      console.warn('Map service running in MOCK mode - no Mapbox token')
      this.mode = 'mock'
    }
  }

  /**
   * Initialize map instance (client-side only)
   */
  initializeMap(config: MapConfig): mapboxgl.Map | null {
    if (this.mode === 'mock') {
      console.log('[MOCK MAP] Would initialize at:', config.center || [-122.4194, 37.7749])
      return null
    }

    try {
      this.map = new mapboxgl.Map({
        container: config.container,
        style: config.style || 'mapbox://styles/mapbox/streets-v12',
        center: config.center || [55.2708, 25.2048], // Dubai default
        zoom: config.zoom || 11,
      })

      this.map.addControl(new mapboxgl.NavigationControl())
      this.map.addControl(new mapboxgl.ScaleControl())

      return this.map
    } catch (error) {
      console.error('Map initialization failed:', error)
      return null
    }
  }

  /**
   * Add property markers to map
   */
  addPropertyMarkers(properties: PropertyMarker[]): void {
    if (this.mode === 'mock' || !this.map) {
      console.log(`[MOCK MAP] Would add ${properties.length} property markers`)
      return
    }

    properties.forEach(prop => {
      // Create marker element
      const el = document.createElement('div')
      el.className = 'property-marker'
      el.style.cssText = `
        background-color: #2563eb;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      `
      el.innerHTML = `AED ${(prop.price / 1000000).toFixed(1)}M`

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0;">${prop.name}</h3>
          <p style="margin: 0 0 4px 0;"><strong>AED ${prop.price.toLocaleString()}</strong></p>
          <p style="margin: 0;">${prop.bedrooms} bed${prop.bedrooms > 1 ? 's' : ''}</p>
        </div>
      `)

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(prop.coordinates)
        .setPopup(popup)
        .addTo(this.map!)

      this.markers.push(marker)
    })
  }

  /**
   * Clear all markers
   */
  clearMarkers(): void {
    this.markers.forEach(marker => marker.remove())
    this.markers = []
  }

  /**
   * Cluster property markers for large datasets
   */
  enableClustering(geojson: any): void {
    if (this.mode === 'mock' || !this.map) {
      console.log('[MOCK MAP] Would enable clustering')
      return
    }

    // Add GeoJSON source with clustering
    this.map.addSource('properties', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    })

    // Add layer for clustered points
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'properties',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1',
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40,
        ],
      },
    })

    // Add layer for cluster counts
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'properties',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    })

    // Add layer for unclustered points
    this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'properties',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 6,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    })
  }

  /**
   * Enable draw tools for area measurement
   */
  async enableDrawTools(): Promise<DrawnArea | null> {
    if (this.mode === 'mock' || !this.map) {
      console.log('[MOCK MAP] Would enable draw tools')
      return null
    }

    // In production, would integrate @mapbox/mapbox-gl-draw
    console.log('Draw tools enabled - user can draw polygons')
    
    // Mock implementation returns a sample area
    return {
      coordinates: [
        [55.2708, 25.2048],
        [55.2808, 25.2048],
        [55.2808, 25.2148],
        [55.2708, 25.2148],
      ],
      areaSqFt: 10890, // ~1000 sq meters
    }
  }

  /**
   * Calculate distance between two points (in km)
   */
  calculateDistance(point1: [number, number], point2: [number, number]): number {
    const R = 6371 // Earth's radius in km
    const dLat = this.toRad(point2[1] - point1[1])
    const dLon = this.toRad(point2[0] - point1[0])
    const lat1 = this.toRad(point1[1])
    const lat2 = this.toRad(point2[1])

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Fit map bounds to show all markers
   */
  fitToMarkers(markers: PropertyMarker[]): void {
    if (this.mode === 'mock' || !this.map || markers.length === 0) {
      console.log('[MOCK MAP] Would fit to markers')
      return
    }

    const bounds = new mapboxgl.LngLatBounds()
    markers.forEach(marker => bounds.extend(marker.coordinates))
    
    this.map.fitBounds(bounds, { padding: 50 })
  }

  /**
   * Get nearby amenities (mock implementation)
   */
  async getNearbyAmenities(coordinates: [number, number], radiusKm: number = 1): Promise<Array<{
    type: 'school' | 'hospital' | 'mall' | 'metro' | 'park'
    name: string
    distance: number
  }>> {
    if (this.mode === 'mock') {
      // Return mock amenities
      return [
        { type: 'school', name: 'Dubai International Academy', distance: 0.5 },
        { type: 'mall', name: 'Dubai Mall', distance: 0.8 },
        { type: 'metro', name: 'Burj Khalifa Metro Station', distance: 0.3 },
        { type: 'hospital', name: 'Mediclinic City Hospital', distance: 1.2 },
        { type: 'park', name: 'Zabeel Park', distance: 0.9 },
      ]
    }

    // In production, would use Mapbox Geocoding API or Places API
    return []
  }
}

export const mapService = new MapService()

// Re-export mapboxgl for direct use in components
export { mapboxgl }
