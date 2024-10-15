import express from "express";
const app = express();
import indexRouter from "./routes/index";

const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes from routes/index.js
app.use("/", indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
