import { API, qs, authHeaders, handle } from './http'

// Public endpoints
export async function search(query = '', campus = '', section = '', page = 0, size = 25) {
  const res = await fetch(`${API}/user/bricks/search?${qs({ q: query, campus, section, page, size })}`)
  return handle(res)
}

export async function getBrick(id) {
  const res = await fetch(`${API}/user/bricks/${id}`)
  return handle(res)
}

// Private endpoints
export async function adminSearchBricks(query = '', campus = '', section = '', deleted = false, page = 0, size = 25) {
  const res = await fetch(`${API}/admin/bricks/search?${qs({ q: query, campus, section, deleted, page, size })}`, {
    headers: authHeaders(),
  })
  return handle(res)
}

export async function adminGetBrick(id) {
    const res = await fetch(`${API}/admin/bricks/${id}`, { headers: authHeaders() })
    return handle(res)
}

export async function adminCreateBrick(brick) {
    const res = await fetch(`${API}/admin/bricks/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(brick),
    })
    return handle(res)
}

export async function adminImportCheck(bricks) {
    const res = await fetch(`${API}/admin/bricks/import/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(bricks),
    })
    return handle(res)
}

export async function adminImport(bricks) {
    const res = await fetch(`${API}/admin/bricks/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(bricks),
    })
    return handle(res)
}

async function saveBrick(body) {
  const res = await fetch(`${API}/admin/bricks/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  })
  return handle(res)
}

export async function adminUpdateBrick(brick, changes = {}) {
  const { deleted: _ignored, ...edits } = changes        
  return saveBrick({ ...brick, ...edits, deleted: brick.deleted })
}

export const adminDeleteBrick  = brick => saveBrick({ ...brick, deleted: true })
export const adminRestoreBrick = brick => saveBrick({ ...brick, deleted: false })



