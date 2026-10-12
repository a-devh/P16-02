
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminHeader from "./components/AdminHeader";
import CatalogBricks from "./pages/CatalogBricks";
import ReviewRecords from "./pages/ReviewRecords";
import UserManagement from "./pages/UserManagement";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AdminHeader />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/review-records" replace />} />
          <Route path="/catalog-bricks" element={<CatalogBricks />} />
          <Route path="/review-records" element={<ReviewRecords />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
