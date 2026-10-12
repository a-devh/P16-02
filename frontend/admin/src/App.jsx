import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import UserManagement from './pages/UserManagement'
import Reports from './pages/Reports'
import ReviewRecords from './pages/ReviewRecords'
import CatalogBricks from './pages/CatalogBricks'
import './App.css'

function AdminLayout({ onLogout }) {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/catalog">Catalog</Link>
        <Link to="/users">Manage Users</Link>
        <Link to="/reports">View Reports</Link>
        <Link to="/records">Review Records</Link>
        <button type="button" onClick={onLogout}>Logout</button>
      </nav>
      <Outlet />
    </>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/records" replace />
              : <Login onSuccess={() => setIsAuthenticated(true)} />
          }
        />
        <Route
          element={
            isAuthenticated
              ? <AdminLayout onLogout={() => setIsAuthenticated(false)} />
              : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Navigate to="/records" replace />} />
          <Route path="/catalog" element={<CatalogBricks />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/records" element={<ReviewRecords />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
