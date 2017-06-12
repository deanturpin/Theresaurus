#!/usr/bin/node

// Create a sentence
var sentence = "To ensure that more people to ensure that more people".toLowerCase()

// Split into words
const words = sentence.split(" ")

// Create array for results
var results = []

// Create/increment entry for each word
for (var i = 0; i < words.length; ++i) {

	// Initialise segment
	var segment = ""

	// Iterate over remaining sentence creating entries as we go
	for (var j = i + 1; j < words.length; ++j) {

		segment += words[j] + " "
		results[segment] == undefined ? results[segment] = 1 : ++results[segment]
	}
}

for (var word in results)
	console.log(results[word] + "\t" + word)
