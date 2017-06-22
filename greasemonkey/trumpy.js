// ==UserScript==
// @name        Trump
// @namespace   trump
// @description word stats
// @include     http://0.0.0.0:8000/trumpasaurus/
// @include     http://www.britishpoliticalspeech.org/*
// @include     https://inbox.google.com/u/0/
// @version     1
// @grant       none
// ==/UserScript==

console.log("trumpy word stats")

// Add listen to catch on mouse up
document.body.addEventListener('mouseup', function() { statistics() },false)

function statistics() {
  
  const speech = window.getSelection().toString().toLowerCase()
  const words = speech.split(/[ â€¢!"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~â€”â€“]+/)
    
	var uniqueWords = []
  
	// Create/increment entry for each word
	for (var i = 0; i < words.length; ++i) {

			// Create entry if it doesn't exist, otherwise increment
			uniqueWords[words[i]] == undefined
				? uniqueWords[words[i]] = 1
				: ++uniqueWords[words[i]]

		}
  
  const totalWords = words.length
  var uniqueWordCount = 0
	for (var i in uniqueWords)
		++uniqueWordCount

  const uniqueWordRatio = (100 * uniqueWordCount / totalWords) 

  console.log("Total words " + totalWords)
	console.log("Unique words " + uniqueWordCount)
  console.log("Unique word ratio " + uniqueWordRatio.toFixed(0) + "%")
}