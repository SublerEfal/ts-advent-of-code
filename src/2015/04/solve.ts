import fs from "fs";
import crypto from "crypto";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1(): number {
	return findMd5WithLeadingZeroes(input, 5);
}

function solvePart2(): number {
	return findMd5WithLeadingZeroes(input, 6);
}

function findMd5WithLeadingZeroes(str: string, leadingZeroes: number): number {
	const zeroesString = (new Array(leadingZeroes) as string[]).fill("0").join("");
	let result = "";
	let testIndex = 0;
	while (!result.startsWith(zeroesString)) {
		testIndex++;
		result = md5(str + testIndex);
	}
	return testIndex;
}

function md5(str: string): string {
	return crypto.createHash("md5").update(str).digest("hex");
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
