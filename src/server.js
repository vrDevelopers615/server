const express = require("express");
const app = express();
const port = 3000;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Name: Vaishali KirtiKumar Nile </br> College Name: Deogiri institute of engineering and management studies, chh.Sambhaji Nagar. </br> Gender: Female");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
