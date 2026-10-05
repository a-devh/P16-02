import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import UserManagement from './pages/UserManagement'
import Reports from './pages/Reports'
import ReviewRecords from './pages/ReviewRecords'
import CatalogBricsk from './pages/CatalogBricks'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/users">Manage Users</Link>
        <Link to='/reports'>View Reports</Link>
        <Link to='/records'>View Records</Link>
        <Link to='/catalog'>Add Bricks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Admin home</div>} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path='/records' element={<ReviewRecords />} />
        <Route path='/catalog' element={<CatalogBricsk />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App