function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span className="visually-hidden">Search names or campus locations</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search name or location"
      />
      <span className="search-symbol" aria-hidden="true">
        ⌕
      </span>
    </label>
  )
}

export default SearchBar
