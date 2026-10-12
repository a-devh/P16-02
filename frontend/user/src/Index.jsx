import { useState } from 'react'
import BrickDetails from './components/BrickDetails.jsx'
import BrickRenderer from './components/BrickRenderer.jsx'
import KsuMap from './components/KsuMap.jsx'
import Mapbox from './components/Mapbox.jsx'
import Results from './components/Results.jsx'
import SearchBar from './components/SearchBar.jsx'
import { campuses } from './data/campuses.js'

const bricks = [
  { id: '1', name: 'Faye Barber', inscription: 'Class of 2025', campus: 'Kennesaw Campus', section: 'B', row: '4', location: 'Legacy Walk · Section B · Row 4' },
  { id: '2', name: 'James Barber', inscription: 'Owl Forever', campus: 'Kennesaw Campus', section: 'B', row: '2', location: 'Legacy Walk · Section B · Row 2' },
  { id: '3', name: 'Cole Williams', inscription: 'KSU 2026', campus: 'Marietta Campus', section: 'A', row: '6', location: 'Alumni Plaza · Section A · Row 6' },
]

const campusGreenDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Campus+Green%2C+Kennesaw+State+University%2C+Kennesaw%2C+GA&destination_place_id=0x88f56acbb80bf183:0x7b989078cfcac4ae'

function Index() {
  const [search, setSearch] = useState('')
  const [activeCampus, setActiveCampus] = useState(campuses[0].name)
  const [selectedBrick, setSelectedBrick] = useState(null)
  const [notice, setNotice] = useState('')
  const matchingBricks = bricks.filter((brick) =>
    brick.campus === activeCampus &&
    `${brick.name} ${brick.campus} ${brick.location}`.toLowerCase().includes(search.toLowerCase()),
  )

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

  function getDirections() {
    window.open(campusGreenDirectionsUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="utility-bar">
          <a className="university-brand" href="#home" aria-label="Kennesaw State University home">
            <img className="brand-logo" src="/ksu_horizontal.svg" alt="Kennesaw State University" />
          </a>
          <nav className="utility-nav" aria-label="University links">
            <a href="https://www.kennesaw.edu/about/">About KSU</a><a href="https://www.kennesaw.edu/academics/">Academics</a><a href="https://www.kennesaw.edu/admissions/">Admissions</a><a href="https://www.kennesaw.edu/discover-student-affairs/">Students</a><a href="https://www.kennesaw.edu/research.php">Research</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="intro-band" aria-labelledby="page-title">
          <div className="intro-copy"><h1 id="page-title">Find your legacy brick</h1></div>
        </section>

        <section className="finder-layout" aria-label="Legacy brick finder">
          <aside className="finder-panel" aria-labelledby="search-title">
            <div className="panel-heading"><h2 id="search-title">Find a name</h2></div>
            <SearchBar value={search} onChange={setSearch} />
            <Results
              bricks={matchingBricks}
              selectedBrickId={selectedBrick?.id}
              onSelect={(brick) => { setSelectedBrick(brick); setNotice('') }}
            />
          </aside>

          <section className="map-panel" aria-label="Campus map">
            <KsuMap campus={activeCampus} onCampusChange={switchCampus} selectedBrick={selectedBrick}>
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
      <footer className="site-footer"><span>KENNESAW STATE UNIVERSITY</span><span>Knowledge · Discovery · Service</span><a href="#home">Back to top ↑</a></footer>
    </div>
  )
}

export default Index