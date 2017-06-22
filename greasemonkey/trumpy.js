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

var speech = ""

// If there's a speech element then just use that
const speechElement = document.getElementsByClassName("speech-content")[0]

// If we've found a speech store the text and analyse it 
if (speechElement !== undefined){
	
	speech = speechElement.innerText
  statistics()
}
	
/*
// Otherwise set up an event listener
if (speechElement === undefined)
  document.body.addEventListener("contextmenu", function() { statistics() }, false)
else {
	speech = speechElement.innerText
  statistics()
}
*/

// Let's generate some stats!
function statistics() {
  
  // const speech = window.getSelection().toString().toLowerCase()
  const words = speech.split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~”“]+/)
    
	var uniqueWords = []

	// Use associative array to remove duplicates
	for (var i in words)
		uniqueWords[words[i]] = 1

	// Word stats
  const totalWords = words.length
  var uniqueWordCount = 0
	for (var i in uniqueWords)
		++uniqueWordCount

  const uniqueWordRatio = (100 * uniqueWordCount / totalWords) 

  console.log("Total words " + totalWords)
  console.log("Unique word ratio " + uniqueWordRatio.toFixed(0) + "%")

  // Summarise in a sentence
	const summary = 
		uniqueWordRatio < 25 ? "is repetitive and tiresome" :
			uniqueWordRatio < 30 ? "is overly finessed" :
				uniqueWordRatio < 33 ? "has had some work done" :
					uniqueWordRatio < 36 ? "is practiced but loose" :
						uniqueWordRatio < 42 ? "is spontaneous"
							: "is a rant"
	
	console.log("This text " + summary)
}