const express = require('express');

function log(req, res, next)  {
    console.log('Logging...');
    next();
}

module.exports = log;