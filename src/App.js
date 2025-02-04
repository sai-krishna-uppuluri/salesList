import React, { useState } from "react";
import { FixedSizeList as List } from "react-window"; // Import virtualization library
import "./App.css";
import { SalesDataDisplay } from "./components/SalesDataDisplay";
import salesData from "./datafile/final_output.json"; // Assuming data is in output.json
import toyotaData from "./datafile/toyota_final.json";

function App() {
  const tabs = ["Kirti", "Toyota"];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabId, setActiveTabId] = useState(tabs[0]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const selectedData = activeTabId === "Kirti" ? salesData : toyotaData;

  const filteredSalesData = searchQuery
    ? selectedData.filter((data) => {
        const partNumber = data["Part_Number"]
          ? data["Part_Number"].toString().toLowerCase()
          : "";
        const description = data["Description"]
          ? data["Description"].toString().toLowerCase()
          : "";
        const normalizedQuery = searchQuery
          .replace(/\s+/g, "")
          .replace(/-/g, "");

        return (
          partNumber
            .replace(/\s+/g, "")
            .replace(/-/g, "")
            .includes(normalizedQuery) ||
          description
            .replace(/\s+/g, "")
            .replace(/-/g, "")
            .includes(normalizedQuery)
        );
      })
    : selectedData;

  const kirti_keys = [
    "Part_Number",
    "Description",
    "MRP",
    "Discount",
    "SGST",
    "CGST",
    "Net_price",
  ];

  const toyota_keys = ["Part_Number", "Description", "MRP"];

  function onClickEachTab(tabId) {
    // console.log("reached", tabId);

    setActiveTabId(tabId);
  }

  const display_keys =
    activeTabId.toLocaleLowerCase() === "kirti" ? kirti_keys : toyota_keys;

  const getTabClass = (eachTab) =>
    activeTabId === eachTab ? "activeClass" : "normalClass";

  return (
    <div className="App">
      <header className="header-class">
        <h1>KIRTI AGENCIES</h1>
      </header>

      <div className="tabs-container">
        {tabs.map((eachTab, index) => {
          return (
            <div key={index} className="tab-button-container">
              <button
                className={`tab-button ${getTabClass(eachTab)}`}
                onClick={() => onClickEachTab(eachTab)}
              >
                {eachTab}
              </button>
            </div>
          );
        })}
      </div>

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
            {display_keys.map((key, index) => (
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
                <SalesDataDisplay
                  eachSalesData={filteredSalesData[index]}
                  display_keys={display_keys}
                />
              </div>
            )}
          </List>
        </div>
      )}
    </div>
  );
}

export default App;
