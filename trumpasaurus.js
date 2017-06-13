"use strict"

// Get the selected speech and initiate statistic generation
// function getSpeech() {
onload = function() {

	setInterval(function() {
		if (window.location.href.split("?").pop() === "reload")
			window.location.reload()
	}, 2000)

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
	const speech =
		document.getElementById("speech").innerText.toLowerCase().replace(/\r?\n/g, " ")

	console.log(speech)

	const results = document.getElementById("results")

	// Extract sentences and sort by length
	const sentences = speech.split(/[!.?] */)
	sentences.sort(function(a, b){ return b.length - a.length })

	// Create array for results
	var phrases = []

	console.log("sentences", sentences.length)

	for (var s in sentences) {

		// Split sentence into words
		var words = sentences[s].split(/[\n !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~—–]+/)
		// words.pop()

		// Create/increment entry for each word
		// console.log("words", words.length)
		console.log(words)
		for (var i = 0; i < words.length; ++i) {

			// Initialise segment
			var segment = ""

			// Iterate over remaining sentence creating entries as we go
			for (var j = i; j < words.length; ++j) {

				// Append to segment
				// segment += words[j] + (j + 1 == words.length ? "" : " ")
				segment += words[j] + " "

				// if (segment === " ")
					// continue

				// Check if we've already seen it
				if (phrases[segment] == undefined)
					phrases[segment] = 1
				else
					++phrases[segment]
			}
		}
	}

	for (var i in phrases)
		console.log(phrases[i] + "\t" + i)

	// Sort the results by creating a new array based on phrase length
	var sorted = []

	console.log("------------------------")
	for (var i in phrases) {

		// console.log(phrases[i] + "\t" + "\"" + i + "\"")

		// If it hasn't had anything added to it yet initialise with an empty array
		if (sorted[phrases[i]] == undefined)
			sorted[phrases[i]] = []

			const end = sorted[phrases[i]].length

			sorted[phrases[i]][end] = i
	}

	for (var i in sorted)
		console.log(i, sorted[i])

	// Find the longest sentence
	/*
	results.innerHTML = ""

	var longest = ""
	for (var i in phrases)
		if (longest.length < i.length && phrases[i] > 1) {

			longest = i
			results.innerHTML += longest + "(" + phrases[longest] + ")<br>"
		}

	*/

	// for (var i in sorted)
		// console.log(i)
	
	// console.log("Longest sentence")
	// console.log(sorted[3])

	/*
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

	console.log("Longest sentence: " + sentences[0])

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
	*/
}
