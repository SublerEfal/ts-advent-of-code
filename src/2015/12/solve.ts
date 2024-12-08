import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// write code here
function solvePart1(): number {
	const regex = /-?\d+/g;
	let match = regex.exec(input);
	let total = 0;
	while (match) {
		total += parseInt(match.pop()!);
		match = regex.exec(input);
	}
	return total;
}

function solvePart2(): number {
	const obj = JSON.parse(input);
	return sumRecursiveNotRed(obj);
}

function sumRecursiveNotRed(obj: any): number {
	let total = 0;
	if (Array.isArray(obj)) {
		obj.forEach((innerObj: any) => {
			total += sumRecursiveNotRed(innerObj);
		});
	} else if (typeof obj === "object") {
		for (const key in obj) {
			const innerObj = obj[key];
			if (innerObj === "red") return 0;
			total += sumRecursiveNotRed(innerObj);
		}
	} else if (typeof obj === "number") {
		total += obj;
	} else if (typeof obj === "string") {
		return 0;
	}
	return total;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
