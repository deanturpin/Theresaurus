#!/usr/bin/node

// Create a sentence
var sentence = "To ensure that more people that that that that have the opportunity to further their education To ensure that more people have the opportunity to further their education ensure".toLowerCase()

// Split into words
const words = sentence.split(" ")

// Create array for results
var results = []

// Create/increment entry for each word
for (var i in words)
	results[words[i]] == undefined ? results[words[i]] = 1 : ++results[words[i]]

for (var word in results)
	console.log(results[word] + "\t" + word)
