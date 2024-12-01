import fs from "fs";

const input = getInput();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	let codeSize = 0;
	let stringSize = 0;
	for (const line of inputLines) {
		codeSize += line.length;
		stringSize += line.replace(/^"|"$/g, "").replace(/\\\\|\\"|\\x../g, "_").length;
	}
	return codeSize - stringSize;
}

function solvePart2(): number {
	let codeSize = 0;
	let stringSize = 0;
	for (const line of inputLines) {
		stringSize += line.length;
		const newString = '"' + line.replace(/("|\\)/g, "\\$1") + '"';
		codeSize += newString.length;
	}
	return codeSize - stringSize;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
