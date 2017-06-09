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
		if (this.readyState == 4 && this.status == 200) {
			// We have the response, update the page
			document.getElementById("speech").innerHTML = client.responseText
			document.getElementById("heading").innerText = title.split(".")[0].toUpperCase()

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
	// Get the speech and results from the HTML
	const speech = document.getElementById("speech").innerHTML
	const results = document.getElementById("results")

	// Split speech into words
	const words =
		speech.toLowerCase().split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~—–]+/)

	// Create associative array and count word frequency
	var unique = []

	// Check if entry exists, create if not, increment if so
	for (var i in words) {
		const w = words[i]

		var found = -1

		// Search if the current word is already in the list
		for (var j in unique)
			if (unique[j].word == w) {
				found = j
				break
			}

		// Increment if word exists, otherwise add it
		found === -1
			? unique.push({ word: w, count: 1 })
			: ++unique[j].count
	}

	// Sort the results so the important ones are at the front
	unique.sort(function(a, b) { return b.count - a.count })

	// Let's generate results
	results.innerHTML = "<h2>Summary</h2>"

	// Words
	const proportion = 100 * unique.length / words.length
	results.innerHTML += "Total words " + words.length + "<br>"
	results.innerHTML +=
		"Unique words " + unique.length + " (" + proportion.toPrecision(2) + "%)" + "<br>"

	// Sentences
	var sentences = []
	sentences = speech.split(/[!.?]/)
	results.innerHTML += "Sentences " + sentences.length + "<br>"

	// Sort by length of sentence
	sentences.sort(function(a, b){ return b.length - a.length })

	const sentenceLength = words.length / sentences.length
	results.innerHTML +=
		"Average sentence length " + sentenceLength.toPrecision(2) + "<br>"

	results.innerHTML +=
		"Longest sentence " + sentences[0].split(' ').length + " words<br>"

	// console.log("Longest sentence: " + sentences[0])

	// Clear down and prepare to count clusters
	unique = []

	// Construct clusters of words
	const cluster = 4
	for (var i = 0; i < words.length - cluster; ++i) {
		var w = ""

		// Create a cluster
		for (var c = 0; c < cluster; ++c)
			w += words[i + c] + " "

		var found = -1

		// Check we've already seen this one
		for (var j in unique)
			if (unique[j].word == w) {
				found = j
				break
			}

		// Increment count if word exists, otherwise add it
		found === -1
			? unique.push({ word: w, count: 1 })
			: ++unique[j].count
	}

	// Sort by length (longest first)
	unique.sort(function(a, b) { return b.count - a.count })

	// Print the most common expressions
	results.innerHTML += "<h2>Repeated " + cluster + " word expressions</h2>"

	for (var i = 0; i < unique.length; ++i) {
		// Break out if we're into the single occurances
		if (unique[i].count == 1)
			break

		// Otherwise write the expression
		results.innerHTML +=
			i + 1 + ": " + unique[i].word + " (" + unique[i].count + ")" + "<br>"
	}
}
