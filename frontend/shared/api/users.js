import { API, qs, authHeaders, handle } from './http'

export async function searchUsers(query = '', page = 0, size = 25) {
    const res = await fetch(`${API}/admin/users/search?${qs({ q: query, page, size })}`, {
        headers: authHeaders(),
    })
    return handle(res)
}

export async function getUser(id) {
    const res = await fetch(`${API}/admin/users/${id}`, { headers: authHeaders() })
    return handle(res)
}

export async function updateUser(id, user) {
    const res = await fetch(`${API}/admin/users/${id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(user),
    })
    return handle(res)
}

export async function createUser(user) {
    const res = await fetch(`${API}/admin/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(user),
    })
    return handle(res)
}

export async function deleteUser(id) {
    const res = await fetch(`${API}/admin/users/${id}/delete`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handle(res)
}

export async function restoreUser(id) {
    const res = await fetch(`${API}/admin/users/${id}/restore`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handle(res)
}

export async function lockUser(id) {
    const res = await fetch(`${API}/admin/users/${id}/lock`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handle(res)
}

export async function unlockUser(id) {
    const res = await fetch(`${API}/admin/users/${id}/unlock`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handle(res)
}

export async function resetUserPassword(id, newPassword) {
    const res = await fetch(`${API}/admin/users/${id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ newPassword }),
    })
    return handle(res)
}