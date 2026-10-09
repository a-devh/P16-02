import { TextInput } from '@mantine/core'

function SearchBar({ value, onChange }) {
  return (
    <TextInput
      aria-label="Search names or campus locations"
      className="search-box"
      leftSection={<span aria-hidden="true">⌕</span>}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder="Search name or location"
      type="search"
      value={value}
    />
  )
}

export default SearchBar
