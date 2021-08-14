const express = require('express');
const app = express();
const Port = process.env.port || 3001;
const databaseConnection = require('./app/db');
const ourApp = require('./app');
const AppError = require('./app/helpers/')
// Database Connection
databaseConnection();


app.use(express.json());
app.use('/', ourApp.router);
app.use((err, req, res, next)=>{
err.statusCode = err.statusCode || 500;
err.status = err.status ||'error';
res.status(err.statusCode).json({
  status:err.status,
  message: err.message
})
})

app.listen(Port, () => {
  console.log(`Server up, running on Port: ${Port}...`);
});

