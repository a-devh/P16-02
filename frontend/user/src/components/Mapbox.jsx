import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { campuses } from '../data/campuses.js'

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

function Mapbox({ campus, selectedBrick }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !accessToken) return

    mapboxgl.accessToken = accessToken
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: campuses[0].center,
      zoom: 15,
    })

    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      markerRef.current?.remove()
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    const campusConfig = campuses.find((option) => option.name === campus) ?? campuses[0]
    const campusCenter =
      campusConfig.center
    const coordinates = selectedBrick?.coordinates
    markerRef.current?.remove()
    markerRef.current = coordinates
      ? new mapboxgl.Marker({ color: '#ffc629' })
          .setLngLat(coordinates)
          .addTo(mapRef.current)
      : null

    mapRef.current.flyTo({
      center: coordinates ?? campusCenter,
      zoom: coordinates ? 18 : (campusConfig.zoom ?? 15),
    })
  }, [campus, selectedBrick])

  return (
    <div
      id="mapbox-map"
      ref={containerRef}
      className="campus-map"
      role="region"
      aria-label={`${campus} interactive map`}
    >
      {!accessToken && (
        <div className="map-token-message" role="status">
        </div>
      )}
    </div>
  )
}

export default Mapbox
