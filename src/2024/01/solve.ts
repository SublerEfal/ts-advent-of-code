import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	const arr1: number[] = [];
	const arr2: number[] = [];
	inputLines.forEach((line) => {
		const lineSplit = line.split("   ");
		arr1.push(parseInt(lineSplit[0]));
		arr2.push(parseInt(lineSplit[1]));
	});
	arr1.sort();
	arr2.sort();
	let totalDistance = 0;
	for (let i = 0; i < arr1.length; i++) {
		totalDistance += Math.abs(arr1[i] - arr2[i]);
	}
	return totalDistance;
}

function solvePart2(): number {
	const arr1: number[] = [];
	const arr2: number[] = [];
	inputLines.forEach((line) => {
		const lineSplit = line.split("   ");
		arr1.push(parseInt(lineSplit[0]));
		arr2.push(parseInt(lineSplit[1]));
	});
	let similarityScore: number = 0;
	arr1.forEach((nr) => {
		const countInArr2: number = arr2.filter((e) => e === nr).length;
		similarityScore += nr * countInArr2;
	});
	return similarityScore;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
