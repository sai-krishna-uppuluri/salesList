const express = require("express");
const xlsx = require("xlsx");
const fs = require("fs");

// const excel_file_path = "C:\Users\usaic\OneDrive\Desktop\sai\projects\react projects\sales_project_dad\public"

const excel_file_path =
  "/mnt/c/Users/usaic/OneDrive/Desktop/sai/projects/react projects/sales_project_dad/public/excel_data/Cleaned_Part_Data.xlsx";

const workbook = xlsx.readFile(excel_file_path);

const kirti_data_sheet = workbook.SheetNames[0];

const sheet = workbook.Sheets[kirti_data_sheet];

const jsonData = xlsx.utils.sheet_to_json(sheet);

const outputFilePath = "output.json";

fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 4));

console.log("json data" + outputFilePath);
