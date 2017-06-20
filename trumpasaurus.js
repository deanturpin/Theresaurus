"use strict"

// Get the selected speech and initiate statistic generation
function getSpeech() {

	// Get the name of the speech we're requesting
	const title = document.getElementById("title").value

	// Indicate something's happening
	document.getElementById("speech").innerHTML = "Loading " + title + "..."
	document.getElementById("results").innerHTML = "Processing..."

	// Create a new AJAX request
	var client = new XMLHttpRequest()

	// Set up handler for AJAX response
	client.onreadystatechange = function() {

		// Check response is a good one
		if (this.readyState === 4 && this.status === 200) {

			// We have the response, update the page
			document.getElementById("speech").innerHTML = client.responseText

			// And generate the stats for the speech
			// Give the browser a chance to get something on screen
			setTimeout(statistics, 200)
		}
	}

	// Request the file
	client.open("GET", "/trumpasaurus/speeches/" + title)
	client.send()
}

// Generate stats based on the selected speech
function statistics() {

	// Record the time we began processing for later
	const start = new Date()

	// Get the speech and results from the HTML
	const speech = document.getElementById("speech").innerText.toLowerCase()
	const results = document.getElementById("results")

	// Extract sentences and sort by length
	const sentences = speech.split(/[!.?] */)
	sentences.sort(function(a, b){ return b.length - a.length })

	// Create array for results
	var phrases = []
	var uniqueWords = []
	var totalWords = 0

	// Iterate over each sentence and create unsorted associative array of phrases
	for (var s in sentences) {

		// Split sentence into words
		var words = sentences[s].split(/[ •!"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~—–]+/)

		totalWords += words.length

		// Create/increment entry for each word
		for (var i = 0; i < words.length; ++i) {

			// Create entry if it doesn't exist, otherwise increment
			uniqueWords[words[i]] == undefined
				? uniqueWords[words[i]] = 1
				: ++uniqueWords[words[i]]

			// Initialise segment
			var segment = ""

			// Iterate over remaining sentence creating entries as we go
			for (var j = i; j < words.length; ++j) {

				// Append to segment
				segment += words[j] + " "

				// Check if we've already seen it
				if (phrases[segment] === undefined)
					phrases[segment] = 1
				else
					++phrases[segment]
			}
		}
	}

	var uniqueWordCount = 0
	for (var i in uniqueWords)
		++uniqueWordCount

	// Word stats
	results.innerHTML = "<h3>Summary</h3>"
	results.innerHTML += "Total words " + totalWords + "<br>"
	results.innerHTML += "Unique words " + uniqueWordCount + "<br>"
	const uniqueWordRatio = (100 * uniqueWordCount / totalWords) 

	// Sentence stats
	results.innerHTML += "Unique word ratio " + uniqueWordRatio.toFixed(0) + "%<br>"
	results.innerHTML += "Sentences " + sentences.length + "<br>"

	const averageSentenceLength = totalWords / sentences.length
	results.innerHTML += "Sentence length " + averageSentenceLength.toFixed(0) + "<br>"

	// Create array for our trimmed down results
	var pruned = []

	// Store if occurance count is significant
	for (var i in phrases)
		if (phrases[i] > 1 && i.split(" ").length > 3)
			pruned.push({ phrase: i, freq: phrases[i], count: i.split(" ").length })

	// Sort by frequency
	pruned.sort(function(a, b) { return b.freq - a.freq })

	// Sentence / phrase ratio can only be calculated after pruning
	const sentencePhraseRatio = pruned.length / sentences.length
	results.innerHTML += "Phrase/sentence ratio "
		+ sentencePhraseRatio.toFixed(2) + "<br>"

	// Report processing time
	results.innerHTML += "<br><small>Processing took " + (new Date() - start) + "ms</small><br>"

	// Dump the common phrases
	results.innerHTML += "<h3>Common phrases " + pruned.length + "</h3>"


	for (var i in pruned)
		results.innerHTML += pruned[i].phrase + " - " + pruned[i].freq + "<br>"
}
