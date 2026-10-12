function BrickDetails({ brick }) {
  return (
    <div className="brick-details">
      <span className="section-kicker">INSCRIPTION DETAILS</span>
      <h3>{brick?.name ?? '—'}</h3>
      <dl>
        <div>
          <dt>Inscription</dt>
          <dd>{brick?.inscription ?? '—'}</dd>
        </div>
        <div>
          <dt>Campus</dt>
          <dd>{brick?.campus ?? '—'}</dd>
        </div>
        <div>
          <dt>Section</dt>
          <dd>{brick?.section ?? '—'}</dd>
        </div>
        <div>
          <dt>Row</dt>
          <dd>{brick?.row ?? '—'}</dd>
        </div>
        <div>
          <dt>Brick ID</dt>
          <dd>{brick?.id ?? '—'}</dd>
        </div>
      </dl>
    </div>
  )
}

export default BrickDetails
