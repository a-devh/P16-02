import { useMemo, useState } from "react";
import "./UserManagement.css";

const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "jdoe1234@students.kennesaw.edu",
    role: "Student",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jsmith@kennesaw.edu",
    role: "Staff",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "ajohnson@students.kennesaw.edu",
    role: "Student",
  },
  {
    id: 4,
    name: "Taylor Brown",
    email: "tbrown@kennesaw.edu",
    role: "Staff",
  },
  {
    id: 5,
    name: "Jordan Davis",
    email: "jdavis@students.kennesaw.edu",
    role: "Student",
  },
  {
    id: 6,
    name: "Morgan Lee",
    email: "mlee@kennesaw.edu",
    role: "Admin",
  },
  {
    id: 7,
    name: "Casey Wilson",
    email: "cwilson@students.kennesaw.edu",
    role: "Student",
  },
  {
    id: 8,
    name: "Jamie Clark",
    email: "jclark@kennesaw.edu",
    role: "Staff",
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return sampleUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const handleCreate = (event) => {
    event.preventDefault();

    console.log("Create user:", {
      name,
      email,
      role,
    });
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setRole("Student");
  };

  return (
    <main className="user-management">
      <section className="user-records-panel">
        <div className="user-search-container">
          <input
            type="text"
            className="user-search"
            placeholder="Search"
            aria-label="Search users"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
        </div>

        <div className="user-record-grid">
          {filteredUsers.map((user) => (
            <article className="user-card" key={user.id}>
              <div className="user-card-info">
                <strong>{user.name}</strong>
                <span>
                  {user.role} | {user.email}
                </span>
              </div>

              <button
                type="button"
                className="view-user-button"
                onClick={() => console.log("View user:", user)}
              >
                View
              </button>
            </article>
          ))}

          {filteredUsers.length === 0 && (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </section>

      <section className="user-form-panel">
        <form className="create-user-form" onSubmit={handleCreate}>
          <div className="form-row">
            <label htmlFor="user-name">Name</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-row role-row">
            <span className="role-label">Role</span>

            <div className="role-selector">
              {["Student", "Staff", "Admin"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`role-button ${
                    role === option ? "selected-role" : ""
                  }`}
                  onClick={() => setRole(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="form-button">
              Create
            </button>

            <button
              type="button"
              className="form-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UserManagement;