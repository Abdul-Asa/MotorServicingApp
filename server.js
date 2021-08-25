const express = require("express");
const app = express();
const Port = process.env.port || 3001;
const databaseConnection = require("./app/db");
const ourApp = require("./app/router/index");
const path = require("path");

// Database Connection
databaseConnection();

app.use(express.json());

router.get("/", (req, res) => {
  res.send("welcome to our Motor Servicing App");
});
app.use("/", ourApp.router);

app.use((req, res, next) => {
  console.log(req.headers);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.listen(Port, () => {
  console.log(`Server up, running on Port: ${Port}...`);
});
