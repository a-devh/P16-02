import { useMemo, useState } from "react";
import "./ReviewRecords.css";

const sampleBricks = [
  { id: 1, name: "Faye Barber", campus: "Marietta Campus", section: "D", row: "4", rowNumber: "12", inscription: "Forever a KSU Owl" },
  { id: 2, name: "James Wilson", campus: "Kennesaw Campus", section: "A", row: "2", rowNumber: "8", inscription: "KSU Class of 2025" },
  { id: 3, name: "Morgan Lee", campus: "Marietta Campus", section: "D", row: "4", rowNumber: "15", inscription: "Go Owls!" },
  { id: 4, name: "Taylor Brown", campus: "Kennesaw Campus", section: "B", row: "3", rowNumber: "21", inscription: "Forever an Owl" },
  { id: 5, name: "Jordan Davis", campus: "Marietta Campus", section: "C", row: "1", rowNumber: "5", inscription: "KSU Alumni" },
  { id: 6, name: "Alex Johnson", campus: "Kennesaw Campus", section: "A", row: "5", rowNumber: "9", inscription: "Hooty Hoo!" },
  { id: 7, name: "Jamie Clark", campus: "Marietta Campus", section: "D", row: "6", rowNumber: "18", inscription: "KSU 2026" },
  { id: 8, name: "Casey Smith", campus: "Kennesaw Campus", section: "B", row: "2", rowNumber: "14", inscription: "Proud KSU Owl" },
];

const ReviewRecords = () => {
  const [bricks, setBricks] = useState(sampleBricks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrick, setSelectedBrick] = useState(sampleBricks[0]);
  const [editedBrick, setEditedBrick] = useState({ ...sampleBricks[0] });
  const [message, setMessage] = useState("");

  const filteredBricks = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return bricks.filter(
      (brick) =>
        brick.name.toLowerCase().includes(search) ||
        brick.campus.toLowerCase().includes(search)
    );
  }, [searchTerm, bricks]);

  const handleView = (brick) => {
    setSelectedBrick(brick);
    setEditedBrick({ ...brick });
    setMessage("");
  };

  const handleChange = (field, value) => {
    setEditedBrick((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedBrick = { ...editedBrick };

    setBricks((previous) =>
      previous.map((brick) =>
        brick.id === updatedBrick.id ? updatedBrick : brick
      )
    );

    setSelectedBrick(updatedBrick);
    setMessage("Brick record updated successfully!");
  };

  const handleCancel = () => {
    setEditedBrick({ ...selectedBrick });
    setMessage("Changes discarded.");
  };

  return (
    <main className="review-records">
      <section className="brick-records-panel">
        <div className="brick-search-container">
          <input
            type="text"
            className="brick-search"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search brick records"
          />
          <span className="brick-search-icon" aria-hidden="true">⌕</span>
        </div>

        <div className="brick-record-grid">
          {filteredBricks.map((brick) => (
            <article className="brick-card" key={brick.id}>
              <div className="brick-card-info">
                <strong>{brick.name}</strong>
                <span>
                  {brick.campus} | Section {brick.section} | Row {brick.row}
                </span>
              </div>

              <button
                type="button"
                className="view-brick-button"
                onClick={() => handleView(brick)}
              >
                View
              </button>
            </article>
          ))}

          {filteredBricks.length === 0 && (
            <p>No matching brick records found.</p>
          )}
        </div>
      </section>

      <section className="brick-detail-panel">
        <div className="brick-map-placeholder">
          Map Preview
        </div>

        <form className="brick-edit-form" onSubmit={handleSave}>
          <div className="brick-form-grid">
            {[
              ["name", "Name"],
              ["campus", "Campus"],
              ["row", "Row"],
              ["rowNumber", "Row #"],
            ].map(([field, label]) => (
              <label key={field}>
                <span>{label}</span>
                <input
                  type="text"
                  value={editedBrick[field]}
                  onChange={(event) =>
                    handleChange(field, event.target.value)
                  }
                />
              </label>
            ))}
          </div>

          <label className="inscription-field">
            <span>Inscription</span>
            <textarea
              value={editedBrick.inscription}
              onChange={(event) =>
                handleChange("inscription", event.target.value)
              }
            />
          </label>

          <div className="brick-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>

          {message && (
            <p role="status" className="brick-status-message">
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default ReviewRecords;