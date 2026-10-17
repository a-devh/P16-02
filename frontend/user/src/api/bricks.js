const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
).replace(/\/+$/, '')

async function request(path, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, { signal })
  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(
      responseText || `Brick API request failed with status ${response.status}`,
    )
  }

  return JSON.parse(responseText)
}

function normalizeBrick(brick) {
  if (
    brick?.id == null ||
    !brick.name ||
    !brick.campus ||
    !brick.section ||
    brick.number == null
  ) {
    throw new Error('The brick API returned a record with missing required fields.')
  }

  const campus = `${brick.campus} Campus`
  return {
    ...brick,
    id: String(brick.id),
    campus,
    location: `${campus} · Section ${brick.section} · Brick ${brick.number}`,
  }
}

export async function searchBricks({ query = '', campus, signal }) {
  const params = new URLSearchParams({ page: '0', size: '50' })
  const trimmedQuery = query.trim()
  const campusValue = campus.replace(/ Campus$/, '')

  if (trimmedQuery) params.set('q', trimmedQuery)
  if (campusValue) params.set('campus', campusValue)

  const page = await request(
    `/user/bricks/search?${params.toString()}`,
    { signal },
  )
  if (!Array.isArray(page.content)) {
    throw new Error('The brick search API returned an unexpected response.')
  }

  return page.content.map(normalizeBrick)
}

export async function getBrick(id, { signal } = {}) {
  const brick = await request(`/user/bricks/${encodeURIComponent(id)}`, { signal })
  return normalizeBrick(brick)
}
