import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	let total = 0;
	for (let i = 0; i < input.length; i++) {
		total += readMul(input, i) || 0;
	}
	return total;
}

function solvePart2(): number {
	let total = 0;
	let enabled = true;
	for (let i = 0; i < input.length; i++) {
		if (input.substring(i, i + 4) === "do()") {
			enabled = true;
		} else if (input.substring(i, i + 7) === "don't()") {
			enabled = false;
		}
		if (!enabled) continue;
		total += readMul(input, i) || 0;
	}
	return total;
}
// finish writing code here

function readMul(fullString: string, startIndex: number): number | null {
	if (fullString.substring(startIndex, startIndex + 4) !== "mul(") {
		return null;
	}

	let nr1 = parseInt(fullString.substring(startIndex + 4, startIndex + 7));
	const nr1Length = nr1.toString().length;

	const commaIndex = startIndex + 4 + nr1Length;
	if (fullString.substring(commaIndex, commaIndex + 1) !== ",") {
		return null;
	}

	const nr2StartIndex = startIndex + 4 + nr1.toString().length + 1;
	let nr2 = parseInt(fullString.substring(nr2StartIndex, nr2StartIndex + 3));

	const closingParenthesesIndex = nr2StartIndex + nr2.toString().length;
	if (fullString.substring(closingParenthesesIndex, closingParenthesesIndex + 1) !== ")") {
		return null;
	}

	return nr1 * nr2;
}

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
