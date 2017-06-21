#!/bin/bash

speechdir=../speeches
outputdir=.
index=readme.md

echo $'# Trumpasaurus\n' > $index
echo $'## Analysis of word usage in political speeches\n' >> $index

for f in $speechdir/*; do

	title=${f##*/}
	file=$title.md

	echo "- [$title]($file)" >> $index
done
