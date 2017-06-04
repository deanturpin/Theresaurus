"use strict"

onload = function() {

	// Get the speech and results from the HTML
	const speech = document.getElementById("speech").innerHTML
	const results = document.getElementById("results")

	// Suffix each write to the document with a new line
	function writeToDocument(str) {
		results.innerHTML += str + "<br>"
	}

	// Split into words
	const words =
		speech.toLowerCase().split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~—–]+/)

	const sentences = speech.toLowerCase().split(/[!-.;?] /)
	writeToDocument("Sentences " + sentences.length)

	// Create associative array and count word frequency
	var unique = []

	// Check if entry exists, create if not, increment if so
	for (var i in words) {

		const w = words[i]

		var found = -1

		for (var j in unique) {

			if (unique[j].word == w) {

				found = j
				break
			}
		}

		// Increment if word exists, otherwise add it
		found === -1
			? unique.push({ word: w, count: 1 })
			: ++unique[j].count
	}

	unique.sort(function(a, b) { return b.count - a.count })

	const proportion = 100 * unique.length / words.length
	writeToDocument("Total words " + words.length)
	writeToDocument("Unique words " + unique.length + " (" + proportion.toPrecision(2) + "%)")

	// Print the most common words
	writeToDocument("<br> Common words")
	for (var i = 0; i < 30 && i < unique.length; ++i)
		writeToDocument(i + 1 + ": " + unique[i].word + " (" + unique[i].count + ")")

	// Clear down and prepare to count clusters
	unique = []

	// Construct clusters of words
	const cluster = 4
	for (var i = 0; i < words.length - cluster; ++i) {

		var w = ""

		for (var c = 0; c < cluster; ++c)
			w += words[i + c] + " "

		var found = -1

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

	unique.sort(function(a, b) { return b.count - a.count })

	// Print the most common
	writeToDocument("<br> Common clusters")
	for (var i = 0; i < 30 && i < unique.length; ++i)
		writeToDocument(i + 1 + ": " + unique[i].word + " (" + unique[i].count + ")")

	// Periodically reload the page
	setInterval(function() {

		if (window.location.href.split("?").pop() === "reload")
			window.location.reload()
	}, 1000)
}
