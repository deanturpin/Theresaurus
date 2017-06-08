# Trumpasaurus - word usage analysis of political speeches

## Motivation

I started this purely out of curiosity to see if Theresa May was really
repeating herself a lot. But by way of comparison I quickly extended it to other
speakers. I also wondered if I could capture "the essence" of a piece without
actually having to read it.

It was originally called Theresaurus - which looks cool - but Trumpasaurus is
much more enjoyable to say.

## Installation

Trumpasaurus must be served by a web server.

Like this one: https://deanturpin.github.io/trumpasaurus/

During dev you can run one locally with python (one level up from your repo)
```bash
python -m SimpleHTTPServer
```

And connect with your web browser: http://0.0.0.0:8000/trumpasaurus/

## Testing

Tested this on recent Firefox, Safari and Chrome on the desktop. Chrome and
Safari on iPhone.

## Adding a new speech

This can be done entirely within github.

- Fork this repo
- Add a new text file in speeches
- In index.html: add a new option in the select tag with the new file
- In your repo settings: select "master" branch as the source in the GitHub
	Pages section
- View it on your github.io

### Preprocessing

Conversations need preprocessing to split them into separate files. I use the bash
script ```tools/split-speech.sh```.
