import { campuses } from '../data/campuses.js'

function findCampus(campus) {
  const match = campuses.find(
    (option) =>
      option.name === campus ||
      option.name.replace(/ Campus$/, '') === campus,
  )

  if (!match) {
    throw new Error(`No campus map data is configured for "${campus}".`)
  }

  return match
}

// Frontend stub for the campus-sections API until the backend exposes this data.
export async function getCampusSections(campus) {
  return findCampus(campus).sections ?? []
}
