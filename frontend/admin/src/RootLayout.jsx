import { NavLink, Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <NavLink to="/app" end>Home</NavLink>
        <NavLink to="/app/records">Records</NavLink>
        <NavLink to="/app/catalog">Add Bricks</NavLink>
        <NavLink to="/app/reports">Reports</NavLink>
        <NavLink to="/app/users">Users</NavLink>
        <NavLink to="/">Log out</NavLink>
      </nav>
      <Outlet />
    </>
  )
}
