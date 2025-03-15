import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to data.json file
const dataFilePath = path.join(__dirname, "public", "data.json");

// Helper function to read data.json
const readDataFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    // If file doesn't exist or is invalid, return empty object
    return {};
  }
};

// Helper function to write to data.json
const writeDataFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing data file:", error);
    return false;
  }
};

// GET endpoint to read all data
app.get("/api/data", (req, res) => {
  try {
    const data = readDataFile();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data file" });
  }
});

// GET endpoint to read specific section
app.get("/api/:section", (req, res) => {
  try {
    const { section } = req.params;
    const data = readDataFile();

    if (data[section] !== undefined) {
      res.json(data[section]);
    } else {
      res.status(404).json({ error: `Section '${section}' not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read data file" });
  }
});

// PUT endpoint to update specific section
app.put("/api/:section", (req, res) => {
  try {
    const { section } = req.params;
    const newData = req.body;
    const data = readDataFile();

    // Update the specific section
    data[section] = newData;

    // Write updated data back to file
    if (writeDataFile(data)) {
      res.json({
        success: true,
        message: `Section '${section}' updated successfully`,
      });
    } else {
      res.status(500).json({ error: "Failed to write data file" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// POST endpoint to create or replace entire data file
app.post("/api/data", (req, res) => {
  try {
    const newData = req.body;

    // Write new data to file
    if (writeDataFile(newData)) {
      res.json({ success: true, message: "Data file updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to write data file" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update data file" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
