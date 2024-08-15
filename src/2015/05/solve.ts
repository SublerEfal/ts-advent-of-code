import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1(): number {
	return inputLines.reduce((niceCount, str) => niceCount + (isStringNicePart1(str) ? 1 : 0), 0);
}

function solvePart2(): number {
	return inputLines.reduce((niceCount, str) => niceCount + (isStringNicePart2(str) ? 1 : 0), 0);
}

function isStringNicePart1(str: string) {
	const vowelCount = str.match(/[aeiou]/g)?.length || 0;
	if (vowelCount < 3) return false;

	const hasDoubleLetter = /aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz/.test(str);
	if (!hasDoubleLetter) return false;

	const hasDisallowedStrings = /ab|cd|pq|xy/.test(str);
	if (hasDisallowedStrings) return false;

	return true;
}

function isStringNicePart2(str: string) {
	let hasRepeatingCombo = false;
	for (let i = 0; i < str.length - 1; i++) {
		const combo = str[i] + str[i + 1];
		if (str.substring(i + 2).includes(combo)) {
			hasRepeatingCombo = true;
			break;
		}
	}
	if (!hasRepeatingCombo) return false;

	const hasRepeatingLetterWithOneBetween =
		/a.a|b.b|c.c|d.d|e.e|f.f|g.g|h.h|i.i|j.j|k.k|l.l|m.m|n.n|o.o|p.p|q.q|r.r|s.s|t.t|u.u|v.v|w.w|x.x|y.y|z.z/.test(str);
	if (!hasRepeatingLetterWithOneBetween) return false;

	return true;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
