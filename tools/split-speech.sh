#!/bin/bash

lines=()
readarray lines < $1

writetofile=blah.txt
echo > paxman.txt
echo > blair.txt

for line in "${lines[@]}"; do

	if [[ $line =~ PAXMAN ]]; then
		writetofile=paxman.txt
	elif [[ $line =~ BLAIR ]]; then
		writetofile=blair.txt
	fi

	echo $line >> $writetofile
done
