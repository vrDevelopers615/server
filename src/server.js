const express = require("express");
const app = express();
const port = 3000;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Vaishu Serdi kami zhali ka? Server ch folder banavun github la separate repo madhe push kr VRDevelopers vr.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
