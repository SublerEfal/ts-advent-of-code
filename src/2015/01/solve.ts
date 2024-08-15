import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1() {
	return input.split("").reduce((acc, val) => {
		return (acc += val === "(" ? 1 : -1);
	}, 0);
}

function solvePart2() {
	let currentFloor = 0;
	return (
		input.split("").findIndex((val, index) => {
			currentFloor += val === "(" ? 1 : -1;
			if (currentFloor < 0) return true;
			return false;
		}) + 1
	);
}

// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
