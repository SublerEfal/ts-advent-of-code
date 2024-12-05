import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const rules: number[][] = inputLines.filter((line) => line.match(/\|/)).map((line) => line.split("|").map((str) => parseInt(str)));
const updates: number[][] = inputLines.filter((line) => line.match(/,/)).map((line) => line.split(",").map((str) => parseInt(str)));

function solvePart1(): number {
	const goodUpdates = updates.filter((update) => {
		for (const rule of rules) {
			const firstNumberIndex = update.indexOf(rule[0]);
			const secondNumberIndex = update.indexOf(rule[1]);
			if (firstNumberIndex === -1 || secondNumberIndex === -1) continue;
			if (secondNumberIndex < firstNumberIndex) return false;
		}
		return true;
	});
	return goodUpdates.reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);
}

function solvePart2(): number {
	const allUpdates = updates.map((update, updateIndex) => {
		const fixedUpdate = update.slice();
		let updateValid = false;
		fixLoop: while (!updateValid) {
			for (const rule of rules) {
				const firstNumberIndex = fixedUpdate.indexOf(rule[0]);
				const secondNumberIndex = fixedUpdate.indexOf(rule[1]);
				if (firstNumberIndex === -1 || secondNumberIndex === -1) continue;
				if (secondNumberIndex < firstNumberIndex) continue;
				const secondNumber = fixedUpdate[secondNumberIndex];
				fixedUpdate.splice(secondNumberIndex, 1);
				fixedUpdate.splice(firstNumberIndex, 0, secondNumber);
				continue fixLoop;
			}
			updateValid = true;
		}
		return fixedUpdate;
	});

	const allUpdatesValue = allUpdates.reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);
	return allUpdatesValue - solvePart1();
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
