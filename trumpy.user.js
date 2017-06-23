// ==UserScript==
// @name        Trumpy
// @namespace   deanturpin
// @description Quick word stat check to find candidate speeches for further study
// @include     http://www.britishpoliticalspeech.org/*
// @version     2
// @grant       none
// ==/UserScript==

console.log("trumpy!");

var speech = "";

// If there's a speech element then just use that
const speechElement = document.getElementsByClassName("speech-content")[0];

// If we've found a speech store the text and analyse it
if (speechElement !== undefined) {
    speech = speechElement.innerText;
    statistics();
}

// Let's generate some stats!
function statistics() {

    // const speech = window.getSelection().toString().toLowerCase()
    const words = speech.split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~”“]+/);

    var uniqueWords = [];

    // Use associative array to remove duplicates
    for (var i in words)
        uniqueWords[words[i]] = 1;

    // Word stats
    const totalWords = words.length;
    var uniqueWordCount = 0;

    // Loop through the sparse array counting the entries
    for (var j in uniqueWords)
        ++uniqueWordCount;

    // And calculate the important metric
    const uniqueWordRatio = (100 * uniqueWordCount / totalWords);

    console.log("Total words " + totalWords);
    console.log("Unique word ratio " + uniqueWordRatio.toFixed(0) + "%");

    // Summarise in a sentence
    var summary = "The speech ";

    // Interesting
    summary +=
        uniqueWordRatio < 25 ? "is repetitive and tiresome" :
    uniqueWordRatio < 30 ? "is overly finessed" :
    uniqueWordRatio < 33 ? "has had some work done" :
    uniqueWordRatio < 36 ? "is practiced but loose" :
    uniqueWordRatio < 42 ? "is spontaneous" : "is a rant";

    // Length
    summary += " ";
    summary +=
        totalWords < 500 ? "and is very short" :
    totalWords < 1000 ? "but at least it's short" :
    totalWords < 2000 ? "and is on the short side" :
    totalWords < 3000 ? "and is a good size" :
    totalWords < 4000 ? "and is dragging on a bit" :
    totalWords < 5000 ? "and is getting long" :
    totalWords < 7000 ? "and is SOOO long" :
    totalWords < 9000 ? "... please to kill me now (far too long)"
    : "and is the longest I've seen";

    console.log(summary);
}