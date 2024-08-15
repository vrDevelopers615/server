const express = require("express");
const app = express();
const port = 3000;

// Define a simple route

app.get("/", (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personal Info</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                margin-bottom: 10px;
            }
            p {
                margin: 5px 0;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Personal Information</h1>
            <p><strong>Name:</strong> Vaishali KirtiKumar Nile</p>
            <p><strong>Gender:</strong> Female</p>
            <p><strong>Fees Status:</strong> Pending</p>
            <p><strong>College Name:</strong> Deogiri Institute of Engineering and Management Studies, Chh. Sambhaji Nagar</p>
        </div>
    </body>
    </html>
  `;
res.send(htmlResponse);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
