#!/bin/bash

readonly manifestos=$@

readonly keywords=(
'abortion'
'badger'
'blair'
'brexit'
'cameron'
'clegg'
'climate'
'community|communities'
'conservative'
'corbyn'
'crime'
'cyber'
'debt'
'defence'
'disabled|disability'
'education|school'
'europe|european|eu|e.u.'
'fgm|mutilation'
'immigrant|immigration'
'internet'
'ireland'
'islam|muslim'
'ivory'
'jihad|terror'
'labour'
'lgbt'
'nhs'
'nuclear'
'nuttall'
'police|justice'
'racism|racist'
'saudi'
'scotland'
'sex'
'sinn'
'stormont'
'strong|stable'
'surveillance'
'tax'
'theresa'
'tourism|tourist'
'trump'
'university|universities'
'wealth|money|economy'
)

# Print the headings (first few chars of each party)
for m in ${manifestos[@]}; do
	echo -en "${m:0:7}\t"
done
echo

# Count instances of each keyword in the manifestos
for k in ${keywords[@]}; do
	for file in ${manifestos[@]}; do
		echo -en "$(grep -E -o -i $k $file | wc -l | tr 0 ' ')\t"
	done
	echo -e "$k"
done
