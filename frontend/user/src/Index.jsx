import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { searchBricks } from './api/bricks.js'
import BrickDetails from './components/BrickDetails.jsx'
import BrickRenderer from './components/BrickRenderer.jsx'
import KsuMap from './components/KsuMap.jsx'
import Mapbox from './components/Mapbox.jsx'
import Results from './components/Results.jsx'
import SearchBar from './components/SearchBar.jsx'
import { campuses } from './data/campuses.js'

const campusGreenDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Campus+Green%2C+Kennesaw+State+University%2C+Kennesaw%2C+GA&destination_place_id=0x88f56acbb80bf183:0x7b989078cfcac4ae'

function Index() {
  const [search, setSearch] = useState('')
  const [activeCampus, setActiveCampus] = useState(campuses[0].name)
  const [searchState, setSearchState] = useState({
    key: '',
    results: [],
    error: '',
    loading: true,
  })
  const [selectedBrick, setSelectedBrick] = useState(null)
  const [notice, setNotice] = useState('')
  const searchKey = `${activeCampus}\u0000${search}`
  const currentSearch = searchState.key === searchKey
  const bricks = currentSearch ? searchState.results : []
  const isLoading = !currentSearch || searchState.loading
  const apiError = currentSearch ? searchState.error : ''

  useEffect(() => {
    const controller = new AbortController()
    const requestKey = `${activeCampus}\u0000${search}`

    searchBricks({
      query: search,
      campus: activeCampus,
      signal: controller.signal,
    })
      .then((results) => {
        if (controller.signal.aborted) return
        setSearchState({ key: requestKey, results, error: '', loading: false })
        setSelectedBrick((current) =>
          results.some((brick) => brick.id === current?.id) ? current : null,
        )
      })
      .catch((error) => {
        if (!controller.signal.aborted && error.name !== 'AbortError') {
          setSearchState({
            key: requestKey,
            results: [],
            error: `Unable to load bricks: ${error.message}`,
            loading: false,
          })
          setSelectedBrick(null)
        }
      })

    return () => controller.abort()
  }, [search, activeCampus])

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
          <div className="intro-copy">
            <Title id="page-title" order={1}>Find your legacy brick</Title>
          </div>
        </section>

        <section className="finder-layout" aria-label="Legacy brick finder">
          <Paper component="aside" className="finder-panel" radius={0} shadow="none" aria-labelledby="search-title">
            <div className="panel-heading">
              <Title id="search-title" order={2}>Find a name</Title>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            {apiError && <Alert color="red" mb="sm" title="Brick search unavailable">{apiError}</Alert>}
            {isLoading && <Text c="dimmed" size="sm" role="status">Loading bricks…</Text>}
            <Results
              bricks={bricks}
              isLoading={isLoading}
              selectedBrickId={selectedBrick?.id}
              onSelect={(brick) => { setSelectedBrick(brick); setNotice('') }}
            />
          </Paper>

          <Paper component="section" className="map-panel" radius={0} shadow="none" aria-label="Campus map">
            <KsuMap campus={activeCampus} onCampusChange={switchCampus} selectedBrick={selectedBrick}>
              <Mapbox
                campus={activeCampus}
                section={selectedBrick?.section}
                bricks={bricks}
              />
            </KsuMap>
            <Group className="map-actions" gap={0} wrap="nowrap">
              <Button
                className="map-action"
                disabled={!selectedBrick}
                leftSection={<span aria-hidden="true">↗</span>}
                onClick={shareBrick}
                variant="subtle"
              >
                Share brick
              </Button>
              <Button
                className="map-action"
                leftSection={<span aria-hidden="true">⌖</span>}
                onClick={getDirections}
                variant="subtle"
              >
                Get directions
              </Button>
              <Button
                className="map-action"
                disabled={!selectedBrick}
                leftSection={<span aria-hidden="true">⌁</span>}
                onClick={copyLocation}
                variant="subtle"
              >
                Copy location
              </Button>
            </Group>
          </Paper>

          <Paper component="aside" className="preview-panel" radius={0} shadow="none" aria-labelledby="preview-title">
            <div className="preview-heading">
              <span className="section-kicker">YOUR SELECTION</span>
              <Title id="preview-title" order={2}>Brick preview</Title>
            </div>
            <BrickRenderer brick={selectedBrick} />
            <BrickDetails brick={selectedBrick} />
            <Paper className="location-card" radius={0} shadow="none" withBorder>
              <span aria-hidden="true">⌖</span>
              <div>
                <span className="section-kicker">ON CAMPUS</span>
                <Text>{selectedBrick?.location ?? 'Choose a brick to see its location.'}</Text>
              </div>
            </Paper>
            {notice && <Text className="action-notice" role="status">{notice}</Text>}
            <Button
              className="purchase-link"
              component="a"
              href="#purchase"
              rightSection={<span aria-hidden="true">→</span>}
              variant="filled"
            >
              Purchase a brick
            </Button>
          </Paper>
        </section>

        <section className="legacy-cta" id="purchase">
          <div><Title order={2}>Leave a lasting legacy.</Title></div>
          <Button
            component="a"
            href="mailto:advancement@kennesaw.edu"
            rightSection={<span aria-hidden="true">→</span>}
            variant="filled"
          >
            Purchase a brick
          </Button>
        </section>
      </main>
      <footer className="site-footer"><span>KENNESAW STATE UNIVERSITY</span><span>Knowledge · Discovery · Service</span><a href="#home">Back to top ↑</a></footer>
    </div>
  )
}

export default Index