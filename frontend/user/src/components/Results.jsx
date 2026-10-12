function Results({ bricks, selectedBrickId, onSelect }) {
  return (
    <div className="brick-results" aria-live="polite">
      {bricks.map((brick) => (
        <button
          className={`brick-result${selectedBrickId === brick.id ? ' is-selected' : ''}`}
          key={brick.id}
          onClick={() => onSelect(brick)}
          type="button"
        >
          <span className="result-initial" aria-hidden="true">
            {brick.name.charAt(0)}
          </span>
          <span className="result-copy">
            <strong>{brick.name}</strong>
            <small>{brick.location}</small>
          </span>
          <span className="result-arrow" aria-hidden="true">
            →
          </span>
        </button>
      ))}
      {bricks.length === 0 && (
        <p className="empty-results">
          No names match. Try another name or campus.
        </p>
      )}
    </div>
  )
}

export default Results
