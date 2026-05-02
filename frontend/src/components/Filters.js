import React from "react";

function Filters({ setPrice }) {
  return (
    <div style={{ margin: "20px" }}>
      <label style={{ fontWeight: "bold" }}>Filter by Price:</label>

      <select
        onChange={(e) => setPrice(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "6px",
          marginLeft: "10px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        <option value="">All</option>
        <option value="10000">Below ₹10,000</option>
        <option value="50000">Below ₹50,000</option>
        <option value="100000">Below ₹1,00,000</option>
      </select>
    </div>
  );
}

export default Filters;