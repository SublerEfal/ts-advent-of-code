import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1(): number {
	return inputLines.reduce((result, line) => {
		const firstNumber: string = line.match(/\d/)?.[0] || "";
		const lastNumber: string = line.split("").reverse().join("").match(/\d/)?.[0] || "";
		return result + parseInt(firstNumber + lastNumber);
	}, 0);
}

function solvePart2(): number {
	return inputLines.reduce((result, line) => {
		const numberRegex = /\d|one|two|three|four|five|six|seven|eight|nine/;
		const numberRegexReversed = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
		const firstNumber: string = line.match(numberRegex)?.[0] || "";
		const lastNumber: string = (line.split("").reverse().join("").match(numberRegexReversed)?.[0] || "").split("").reverse().join("");
		return result + parseInt(convertNumberWordToNumber(firstNumber) + convertNumberWordToNumber(lastNumber));
	}, 0);
}

function convertNumberWordToNumber(nrString: string): string {
	// prettier-ignore
	switch(nrString) {
		case "one": return "1";
		case "two": return "2";
		case "three": return "3";
		case "four": return "4";
		case "five": return "5";
		case "six": return "6";
		case "seven": return "7";
		case "eight": return "8";
		case "nine": return "9";
		default: return nrString;
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
