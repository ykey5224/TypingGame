import "../controllers/resultController"

const resultViewHTML = require('./result.html');
// app division
const root = document.documentElement

root.innerHTML = resultViewHTML
const header = document.querySelector('.header');
header.innerHTML += '<link href="app.css" rel="stylesheet">'


