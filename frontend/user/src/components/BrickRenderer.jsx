function BrickRenderer({ brick }) {
  return (
    <div className={`brick-preview${brick ? ' has-brick' : ''}`}>
      {brick ? (
        <div className="brick-face">
          <span>{brick.name}</span>
          <small>{brick.inscription}</small>
        </div>
      ) : (
        <span className="preview-prompt">
          Select a name
          <br />
          to preview its brick
        </span>
      )}
    </div>
  )
}

export default BrickRenderer
