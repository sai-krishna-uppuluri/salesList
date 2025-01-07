import React from "react";
import "./SalesDataDisplay.css";

export const SalesDataDisplay = ({ eachSalesData }) => {
  return (
    <>
      {Object.entries(eachSalesData).map(([key, value], index) => (
        <div
          key={index}
          className={`div-column div-column-${key
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {value || "N/A"}
        </div>
      ))}
    </>
  );
};
