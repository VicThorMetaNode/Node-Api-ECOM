//handling requests using Express
//import express using require
const express = require('express');

//executing express as a function
const app = express();

//use incoming requests with arrow function + .json as stringify
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works !'
    });
});

module.exports = app;