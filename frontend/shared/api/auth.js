import { API, handle } from './http'

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await handle(res)
  localStorage.setItem('token', data.token)
  localStorage.setItem('email', email)
  return data
}

export async function changePassword(currentPassword, newPassword) {
  if (newPassword.length < 8) throw new Error('Password must be at least 8 characters')
  const res = await fetch(`${API}/auth/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  })
  await handle(res)
  return login(localStorage.getItem('email'), newPassword)  // get a full token
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
}