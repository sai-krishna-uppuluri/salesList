import React from "react";
import "./SalesDataDisplay.css";

export const SalesDataDisplay = ({ eachSalesData, display_keys }) => {
  return (
    <>
      {display_keys.map((key, index) => (
        <div
          key={index}
          className={`div-column div-column-${key
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {eachSalesData[key] || "N/A"}
        </div>
      ))}
    </>
  );
};
