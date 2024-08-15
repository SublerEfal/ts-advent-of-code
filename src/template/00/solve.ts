import fs from "fs";

const input = getInput();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	// todo
	return 0;
}

function solvePart2(): number {
	// todo
	return 0;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
