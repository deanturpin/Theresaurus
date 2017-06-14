"use strict"

// Get the selected speech and initiate statistic generation
function getSpeech() {

	// Peridoically reload page if there's a "reload" token in the URL
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
		if (this.readyState === 4 && this.status === 200) {

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

	// Clear down the results
	results.innerHTML = ""

	// General stats
	results.innerHTML += "Total words " + totalWords + "<br>"
	const percentageUnique = (100 * uniqueWords.length / totalWords) 
	results.innerHTML += "Unique words " + percentageUnique.toPrecision(2) + "%<br>"
	results.innerHTML += "Sentences " + sentences.length + "<br>"
	const wordsPerSentence = totalWords / sentences.length
	results.innerHTML += "Words per sentence " + wordsPerSentence.toPrecision(2) + "<br>"

	// Create array of objects
	var arr = []

	// Store if occurance count is significant
	for (var i in phrases)
		if (phrases[i] > 1 && i.split(" ").length > 3)
			arr.push({ phrase: i, freq: phrases[i], count: i.split(" ").length })

	results.innerHTML += "<br>Phrases " + arr.length + "<br><br>"

	// Sort by frequency and then phrase length
	arr.sort(function(a, b) { return b.freq - a.freq })

	// Dump the common phrases
	for (var i in arr)
		results.innerHTML += arr[i].phrase + " - " + arr[i].freq + "<br>"
}
