import { useState } from "react";
import "./Reports.css";

const reportData = [
  { id: 1, name: "Faye Barber", campus: "Marietta", section: "D", row: "4", rowNumber: "12" },
  { id: 2, name: "James Wilson", campus: "Kennesaw", section: "A", row: "2", rowNumber: "8" },
  { id: 3, name: "Morgan Lee", campus: "Marietta", section: "D", row: "4", rowNumber: "15" },
  { id: 4, name: "Taylor Brown", campus: "Kennesaw", section: "B", row: "3", rowNumber: "21" },
  { id: 5, name: "Jordan Davis", campus: "Marietta", section: "C", row: "1", rowNumber: "5" },
];

const Reports = () => {
  const [campus, setCampus] = useState("All Campuses");
  const [section, setSection] = useState("All Sections");

  const handleClear = () => {
    setCampus("All Campuses");
    setSection("All Sections");
  };

  return (
    <main className="reports-page">
      <h1 className="reports-title">Reports</h1>

      <section className="report-filters">
        <div className="report-filter">
          <label htmlFor="campus-filter">Campus</label>
          <select
            id="campus-filter"
            value={campus}
            onChange={(event) => setCampus(event.target.value)}
          >
            <option>All Campuses</option>
            <option>Kennesaw</option>
            <option>Marietta</option>
          </select>
        </div>

        <div className="report-filter">
          <label htmlFor="section-filter">Section</label>
          <select
            id="section-filter"
            value={section}
            onChange={(event) => setSection(event.target.value)}
          >
            <option>All Sections</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
        </div>

        <button type="button" className="report-button">
          Generate Report
        </button>

        <button
          type="button"
          className="report-button"
          onClick={handleClear}
        >
          Clear
        </button>
      </section>

      <section className="report-summary">
        <div className="summary-card">
          <span>Total Bricks</span>
          <strong>5</strong>
        </div>

        <div className="summary-card">
          <span>Kennesaw Campus</span>
          <strong>2</strong>
        </div>

        <div className="summary-card">
          <span>Marietta Campus</span>
          <strong>3</strong>
        </div>
      </section>

      <section className="report-results">
        <div className="report-results-header">
          <h2>Brick Report</h2>

          <button type="button" className="export-button">
            Export CSV
          </button>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Campus</th>
              <th>Section</th>
              <th>Row</th>
              <th>Row #</th>
            </tr>
          </thead>

          <tbody>
            {reportData.map((brick) => (
              <tr key={brick.id}>
                <td>{brick.name}</td>
                <td>{brick.campus}</td>
                <td>{brick.section}</td>
                <td>{brick.row}</td>
                <td>{brick.rowNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Reports;