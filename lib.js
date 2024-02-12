function $(str) { return document.querySelector(str) }
function $$(name) { return document.createElement(name) }
function random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function sleep(ms) { return new Promise(res => setTimeout(res, ms)) }