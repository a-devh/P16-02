import { campuses } from '../data/campuses.js'

function KsuMap({ campus, onCampusChange, selectedBrick, children }) {
  return (
    <>
      <div className="map-toolbar">
        <div
          className="campus-switcher"
          role="group"
          aria-label="Choose campus"
        >
          {campuses.map((option) => (
            <button
              aria-pressed={campus === option.name}
              key={option.name}
              onClick={() => onCampusChange(option.name)}
              type="button"
            >
              {option.shortName}
            </button>
          ))}
        </div>
        <span className="map-label">
          CAMPUS DIRECTORY <i>·</i> 01
        </span>
      </div>
      <div className="map-stage">
        {children}
        <div
          className="ksu-map-overlay"
          data-campus={campus}
          data-brick-id={selectedBrick?.id ?? ''}
          aria-hidden="true"
        />
      </div>
    </>
  )
}

export default KsuMap
