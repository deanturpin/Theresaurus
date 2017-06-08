#!/bin/bash

lines=()
readarray lines < $1

writetofile=blah.txt
echo > paxman.txt
echo > brand.txt

for line in "${lines[@]}"; do

	if [[ $line =~ Paxman: ]]; then
		writetofile=paxman.txt
	elif [[ $line =~ Brand: ]]; then
		writetofile=brand.txt
	fi

	echo $line >> $writetofile
done
