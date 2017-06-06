"use strict"

// Give the browser a chance to get the speech on the screen
// setTimeout(generate, 100)

// Generate the stats
function generate() {

	// Get the name of the speech we're about to request
	const title = document.getElementById("title").value
	document.getElementById("results").innerHTML = "Processing..."

	// Indicate we're about to do something
	document.getElementById("speech").innerHTML = "Loading " + title + "..."

	// Create a new AJAX request
	var client = new XMLHttpRequest();
	client.open("GET", "/Theresaurus/" + title);

	// Set up handler for AJAX response
	client.onreadystatechange = function() {
		document.getElementById("speech").innerHTML = client.responseText
		document.getElementById("heading").innerText = title.split(".")[0].toUpperCase()
	}

	// Request the file
	client.send()

	// Get the speech and results from the HTML
	// const speech = document.getElementById("speech").innerHTML
	const results = document.getElementById("results")

	// Helper function for writing the results
	// Suffix each write to the document with a new line
	function writeToDocument(str) {
		results.innerHTML += str + "<br>"
	}

	// Split speech into words
	const words =
		speech.toLowerCase().split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~—–]+/)

	// Create associative array and count word frequency
	var unique = []

	// Check if entry exists, create if not, increment if so
	for (var i in words) {

		const w = words[i]

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

	writeToDocument("<h2>Summary</h2>")

	// Words
	const proportion = 100 * unique.length / words.length
	writeToDocument("Total words " + words.length)
	writeToDocument("Unique words " + unique.length + " (" + proportion.toPrecision(2) + "%)")

	// Sentences
	var sentences = []
	sentences = speech.split(/[!.?]/)
	writeToDocument("Sentences " + sentences.length)

	// Sort by length of sentence
	sentences.sort(function(a,b){ return b.length - a.length })

	const sentenceLength = words.length / sentences.length
	writeToDocument("Average sentence length " + sentenceLength.toPrecision(2))
	writeToDocument("Longest sentence: "
			+ sentences[0] + " (" + sentences[0].split(' ').length + ")")

	console.log(sentences)

	// Print the most common words
	// writeToDocument("<h2>Common words</h2>")
	// for (var i = 0; i < 30 && i < unique.length; ++i)
	// 	writeToDocument(i + 1 + ": " + unique[i].word + " (" + unique[i].count + ")")

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

	// Sort by length (longest first)
	unique.sort(function(a, b) { return b.count - a.count })

	// Print the most common expressions
	writeToDocument("<h2>Common expressions</h2>")

	for (var i = 0; i < 50 && i < unique.length; ++i) {

		// Break out if we're into the single occurances
		if (unique[i].count == 1)
			break

		// Otherwise write the expression
		writeToDocument(i + 1 + ": " + unique[i].word + " (" + unique[i].count + ")")
	}

	// Periodically reload page if there's a special token in the URL
	setInterval(function() {
		if (window.location.href.split("?").pop() === "reload")
			window.location.reload()
	}, 2000)
}
