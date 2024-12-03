import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	const muls = input.match(/mul\(\d{1,3},\d{1,3}\)/g) || [];
	let total = 0;
	muls.forEach((mul) => {
		const numbers = mul.match(/mul\((\d{1,3}),(\d{1,3})\)/)!;
		const nr1 = parseInt(numbers[1]);
		const nr2 = parseInt(numbers[2]);
		total += nr1 * nr2;
	});
	return total;
}

function solvePart2(): number {
	const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g) || [];
	let total = 0;
	let enabled = true;
	instructions.forEach((instruction) => {
		if (instruction === "do()") {
			enabled = true;
			return;
		} else if (instruction === "don't()") {
			enabled = false;
			return;
		}
		if (!enabled) return;
		const numbers = instruction.match(/mul\((\d{1,3}),(\d{1,3})\)/)!;
		const nr1 = parseInt(numbers[1]);
		const nr2 = parseInt(numbers[2]);
		total += nr1 * nr2;
	});
	return total;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
