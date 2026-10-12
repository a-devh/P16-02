
import { NavLink } from "react-router-dom";
import ksuHeader from "../assets/image 4.png";
import adminTitle from "../assets/Legacy Brick Admin.png";
import "./AdminHeader.css";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-university-bar">
        <img
          src={ksuHeader}
          alt="Kennesaw State University"
          className="admin-ksu-header-image"
        />
      </div>

      <div className="admin-banner">
        <div className="admin-banner-bottom">
          
          <div className="admin-title-container">
            <img
                 src={adminTitle}
                 alt="Legacy Brick Admin"
                className="admin-title-image"
            />
        </div>

          <nav className="admin-nav-links" aria-label="Admin navigation">
            <NavLink to="/catalog-bricks">Catalog Bricks</NavLink>
            <NavLink to="/review-records">Review Records</NavLink>
            <NavLink to="/user-management">User Management</NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </nav>

          <button type="button" className="admin-signout">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
