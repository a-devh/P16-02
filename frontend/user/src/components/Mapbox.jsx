import { useEffect, useMemo, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getCampusSections } from '../api/campuses.js'
import { campuses } from '../data/campuses.js'

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
const sectionPinsSourceId = 'section-pins'
const sectionPinsCircleLayerId = 'section-pin-circles'
const sectionPinsLabelLayerId = 'section-pin-labels'

function getCampusConfig(campus) {
  return campuses.find(
    (option) => option.name === campus || option.name.replace(' Campus', '') === campus,
  ) ?? campuses[0]
}

function createPopupContent(section, brickNames) {
  const content = document.createElement('div')
  const heading = document.createElement('strong')
  heading.textContent = `Section ${section}`
  content.append(heading)

  const count = document.createElement('p')
  count.textContent = `${brickNames.length} ${brickNames.length === 1 ? 'brick' : 'bricks'}`
  content.append(count)

  if (brickNames.length > 0) {
    const list = document.createElement('ul')
    brickNames.forEach((name) => {
      const item = document.createElement('li')
      item.textContent = name
      list.append(item)
    })
    content.append(list)
  }

  return content
}

function Mapbox({ campus, section, bricks = [] }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [sectionState, setSectionState] = useState({
    campus: '',
    sections: [],
    error: '',
  })
  const sections = useMemo(
    () => sectionState.campus === campus ? sectionState.sections : [],
    [campus, sectionState.campus, sectionState.sections],
  )
  const sectionsError = sectionState.campus === campus ? sectionState.error : ''

  useEffect(() => {
    if (!containerRef.current || !accessToken) return

    mapboxgl.accessToken = accessToken
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/colej057/cmu0dxke2004p01s4cru0de5l',
      center: campuses[0].center,
      zoom: campuses[0].zoom ?? 18,
    })

    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    getCampusSections(campus)
      .then((result) => {
        if (!cancelled) setSectionState({ campus, sections: result, error: '' })
      })
      .catch((error) => {
        if (!cancelled) setSectionState({ campus, sections: [], error: error.message })
      })

    return () => {
      cancelled = true
    }
  }, [campus])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const campusConfig = getCampusConfig(campus)
    const campusBricks = bricks.filter(
      (brick) =>
        brick.campus === campus ||
        brick.campus === campusConfig.name.replace(' Campus', ''),
    )

    const pinData = {
      type: 'FeatureCollection',
      features: sections.map((sectionPin) => {
        const sectionBricks = campusBricks.filter(
          (brick) => brick.section === sectionPin.name,
        )
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: sectionPin.coordinates,
          },
          properties: {
            section: sectionPin.name,
            selected: section === sectionPin.name,
            brickNames: JSON.stringify(sectionBricks.map((brick) => brick.name)),
          },
        }
      }),
    }

    let cancelled = false
    function updateSectionPins() {
      if (cancelled || mapRef.current !== map) return

      if (map.getSource(sectionPinsSourceId)) {
        map.getSource(sectionPinsSourceId).setData(pinData)
      } else {
        map.addSource(sectionPinsSourceId, {
          type: 'geojson',
          data: pinData,
        })
      }

      if (!map.getLayer(sectionPinsCircleLayerId)) {
        map.addLayer({
          id: sectionPinsCircleLayerId,
          type: 'circle',
          source: sectionPinsSourceId,
          minzoom: 17,
          paint: {
            'circle-radius': 15,
            'circle-color': [
              'case',
              ['boolean', ['get', 'selected'], false],
              '#17120b',
              '#ffc629',
            ],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
          },
        })
        map.addLayer({
          id: sectionPinsLabelLayerId,
          type: 'symbol',
          source: sectionPinsSourceId,
          minzoom: 17,
          layout: {
            'text-field': ['get', 'section'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-allow-overlap': true,
          },
          paint: {
            'text-color': [
              'case',
              ['boolean', ['get', 'selected'], false],
              '#ffffff',
              '#17120b',
            ],
          },
        })

        const showSectionPopup = (event) => {
          const feature = event.features?.[0]
          if (!feature) return

          const brickNames = JSON.parse(feature.properties.brickNames)
          new mapboxgl.Popup({ offset: 18, closeButton: false })
            .setLngLat(event.lngLat)
            .setDOMContent(createPopupContent(feature.properties.section, brickNames))
            .addTo(map)
        }

        map.on('click', [sectionPinsCircleLayerId, sectionPinsLabelLayerId], showSectionPopup)
        map.on('mouseenter', sectionPinsCircleLayerId, () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', sectionPinsCircleLayerId, () => {
          map.getCanvas().style.cursor = ''
        })
      }
    }

    if (map.isStyleLoaded()) {
      updateSectionPins()
    } else {
      map.once('load', updateSectionPins)
    }

    return () => {
      cancelled = true
      map.off('load', updateSectionPins)
    }
  }, [campus, section, bricks, sections])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const campusConfig = getCampusConfig(campus)
    const selectedSection = sections.find((item) => item.name === section)
    map.flyTo({
      center: selectedSection?.coordinates ?? campusConfig.center,
      zoom: selectedSection ? 19 : (campusConfig.zoom ?? 15),
    })
  }, [campus, section, sections])

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
          Add <code>VITE_MAPBOX_ACCESS_TOKEN</code> to the user app&apos;s environment to load the map.
        </div>
      )}
      {accessToken && (sectionsError || getCampusConfig(campus).sections.length === 0) && (
        <div className="map-data-message" role="status">
          {sectionsError
            ? `Unable to load section pins: ${sectionsError}`
            : `Section pin locations have not been added for ${campus} yet.`}
        </div>
      )}
    </div>
  )
}

export default Mapbox
