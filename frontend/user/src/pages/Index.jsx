
import { useEffect, useState } from 'react'
import BrickDetails from '../components/BrickDetails.jsx'
import BrickRenderer from '../components/BrickRenderer.jsx'
import KsuMap from '../components/KsuMap.jsx'
import Mapbox from '../components/Mapbox.jsx'
import Results from '../components/Results.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { search } from '../../../shared/api/bricks'
import { Campus } from '../../../shared/api/shapes'
 
// 'Kennesaw' -> Campus.kennesaw
const getCampus = (name) => Campus[String(name ?? '').toLowerCase()] ?? Campus.kennesaw
 
// the API brick plus the extra fields the existing components display
const toView = (brick) => ({
  ...brick,
  row: brick.number,
  location: `${brick.campus} Campus · Section ${brick.section} · Brick ${brick.number}`,
})
 
// a section's [lng, lat] if it's been filled in, otherwise the campus center
function locationOf(brick, campusName) {
  const point = brick && getCampus(brick.campus).sections[brick.section]
  return point?.length === 2 ? point : getCampus(brick?.campus ?? campusName).center
}
 
function Index() {
  const [query, setQuery] = useState('')
  const [activeCampus, setActiveCampus] = useState('Kennesaw')
  const [bricks, setBricks] = useState([])
  const [selectedBrick, setSelectedBrick] = useState(null)
  const [notice, setNotice] = useState('')
 
  // search the API 250ms after the user stops typing, limited to the active campus
  useEffect(() => {
    if (!query.trim()) { setBricks([]); return }
    const t = setTimeout(() => {
      search(query, activeCampus, '', 0, 25)
        .then((page) => setBricks(page.content.map(toView)))
        .catch((err) => { setBricks([]); setNotice(err.message) })
    }, 250)
    return () => clearTimeout(t)
  }, [query, activeCampus])
 
  function switchCampus(campus) {
    setActiveCampus(campus)
    setSelectedBrick(null)
    setNotice('')
  }
 
  async function copyLocation() {
    if (!selectedBrick) return
    try {
      await navigator.clipboard.writeText(selectedBrick.location)
      setNotice('Location copied')
    } catch {
      setNotice(selectedBrick.location)
    }
  }
 
  function shareBrick() {
    if (!selectedBrick) return
    if (navigator.share) {
      navigator.share({ title: `${selectedBrick.name}’s legacy brick`, text: selectedBrick.location })
        .catch(() => setNotice(selectedBrick.location))
    } else {
      copyLocation()
    }
  }
 
  // directions to the brick's section, or to the campus if no brick (or no section coordinates) yet
  function getDirections() {
    const [lng, lat] = locationOf(selectedBrick, activeCampus)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank', 'noopener,noreferrer')
  }
 
  return (
    <div className="site-shell">
      <main id="home">
        <section className="intro-band" aria-labelledby="page-title">
          <div className="intro-copy"><h1 id="page-title">Find your legacy brick</h1></div>
        </section>
 
        <section className="finder-layout" aria-label="Legacy brick finder">
          <aside className="finder-panel" aria-labelledby="search-title">
            <div className="panel-heading"><h2 id="search-title">Find a name</h2></div>
            <SearchBar value={query} onChange={setQuery} />
            <Results
              bricks={bricks}
              selectedBrickId={selectedBrick?.id}
              onSelect={(brick) => { setSelectedBrick(brick); setNotice('') }}
            />
          </aside>
 
          <section className="map-panel" aria-label="Campus map">
            <KsuMap campus={activeCampus} onCampusChange={switchCampus}>
              <Mapbox campus={activeCampus} selectedBrick={selectedBrick} />
            </KsuMap>
            <div className="map-actions"><button type="button" onClick={shareBrick} disabled={!selectedBrick}>Share brick <span aria-hidden="true">↗</span></button><button type="button" onClick={getDirections}>Get directions <span aria-hidden="true">↗</span></button><button type="button" onClick={copyLocation} disabled={!selectedBrick}>Copy location <span aria-hidden="true">⌁</span></button></div>
          </section>
 
          <aside className="preview-panel" aria-labelledby="preview-title">
            <div className="preview-heading"><span className="section-kicker">YOUR SELECTION</span><h2 id="preview-title">Brick preview</h2></div>
            <BrickRenderer brick={selectedBrick} />
            <BrickDetails brick={selectedBrick} />
            <div className="location-card"><span aria-hidden="true">⌖</span><div><span className="section-kicker">ON CAMPUS</span><p>{selectedBrick?.location ?? 'Choose a brick to see its location.'}</p></div></div>
            {notice && <p className="action-notice" role="status">{notice}</p>}
            <a className="purchase-link" href="#purchase">Purchase a brick <span aria-hidden="true">→</span></a>
          </aside>
        </section>
 
        <section className="legacy-cta" id="purchase"><div><h2>Leave a lasting legacy.</h2></div><a href="mailto:advancement@kennesaw.edu">Purchase a brick <span aria-hidden="true">→</span></a></section>
      </main>
    </div>
  )
}
 
export default Index
 
