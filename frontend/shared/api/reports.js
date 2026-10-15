import { API, qs, authHeaders, handle } from './http'

export async function summary() {
    const res = await fetch(`${API}/user/reports/summary`, { headers: authHeaders() })
    return handle(res)
}

export async function duplicates(page = 0, size = 25) {
    const res = await fetch(`${API}/user/reports/duplicates?${qs({ page, size })}`, { headers: authHeaders() })
    return handle(res)
}

export async function removed(page = 0, size = 25) {
    const res = await fetch(`${API}/user/reports/removed?${qs({ page, size })}`, { headers: authHeaders() })
    return handle(res)
}



