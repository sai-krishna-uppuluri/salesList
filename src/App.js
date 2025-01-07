import React, { useState } from "react";
import { FixedSizeList as List } from "react-window"; // Import virtualization library
import "./App.css";
import { SalesDataDisplay } from "./components/SalesDataDisplay";
import salesData from "./datafile/output.json"; // Assuming data is in output.json

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredSalesData = searchQuery
    ? salesData.filter((data) => {
        const partNumber = data["Part Number"];
        if (!partNumber) return false;
        // Normalize both user input and part number by removing spaces
        const normalizedPartNumber = partNumber
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/-/g, "");
        const normalizedQuery = searchQuery
          .replace(/\s+/g, "")
          .replace(/-/, "");
        return normalizedPartNumber.includes(normalizedQuery);
      })
    : salesData; // Display all data initially

  return (
    <div className="App">
      <header className="header-class">
        <h1>KIRTI AGENCIES</h1>
      </header>

      <div className="input-search-container">
        <input
          type="search"
          placeholder="Enter part number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input-search"
        />
      </div>

      {filteredSalesData.length > 0 && (
        <div className="div-table-container">
          {/* Render Header */}
          <div className="div-table-header">
            {Object.keys(filteredSalesData[0]).map((key, index) => (
              <div
                key={index}
                className={`div-column div-column-${key
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {key}
              </div>
            ))}
          </div>

          {/* Virtualized Rows */}
          <List
            height={400} // Adjust height based on container
            itemCount={filteredSalesData.length}
            itemSize={50} // Height of each row
            width="100%"
          >
            {({ index, style }) => (
              <div style={style} className="div-table-row">
                <SalesDataDisplay eachSalesData={filteredSalesData[index]} />
              </div>
            )}
          </List>
        </div>
      )}
    </div>
  );
}

export default App;
