// ==UserScript==
// @name        Trump
// @namespace   trump
// @description word stats
// @include     http://0.0.0.0:8000/trumpasaurus/
// @include     http://www.britishpoliticalspeech.org/*
// @version     1
// @grant       none
// ==/UserScript==

console.log("trumpy word stats")

console.log("set up listener")

// Add listen to catch on mouse up
document.body.addEventListener('mouseup', function() { statistics() },false)

function statistics() {
  
  const speech = window.getSelection().toString()
  const words = speech.split(" ")
  
  console.log(window.getSelection().toString())
  console.log(words.length)
}