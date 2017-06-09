#!/bin/bash

[[ $# == 0 ]] && echo gimme some speeches && exit

manifestos=$@

keywords=(
'nhs'
'islam|muslim'
'climate'
'strong|stable'
'fgm|mutilation'
'europe|european|eu|e.u.'
'tax'
'crime'
'education'
'cyber'
'university|universities'
'debt'
'wealth|money'
'community|communities'
'surveillance'
'badger'
'blair'
'ivory'
'police'
'racism|racist'
'lgbt'
'disabled|disability'
'abortion'
'ireland'
)

# Print the headings (first few chars of each party)
for m in ${manifestos[@]}; do
	echo -en "${m:0:4}\t"
done
echo

# Count instances of each keyword in the manifestos
for k in ${keywords[@]}; do
	for file in ${manifestos[@]}; do
		echo -en "$(grep -E -o -i $k $file | wc -l)\t" # \t${file##*/}"
	done
	echo -e "$k"
done
