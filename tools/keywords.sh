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
)

for k in ${keywords[@]}; do
	echo -e "$k\n"
	for file in ${manifestos[@]}; do
		echo -e "$(grep -E -o -i $k $file | wc -l) \t${file##*/}"
	done
	echo
done
