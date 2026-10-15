export const API = import.meta.env.VITE_API_URL

export function qs(params) {
  return new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== ''))
}

export function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` }
}

export async function handle(res) {
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || data?.error || `${res.status} ${res.statusText}`)
  return data
}