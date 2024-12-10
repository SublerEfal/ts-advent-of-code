import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
interface Coord {
	x: number;
	y: number;
}
const grid = inputLines.map((line) => line.split(""));

function solvePart1(): number {
	let score = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid.length; x++) {
			if (grid[y][x] !== "0") continue;
			score += scoreTrailHead({ x, y }, grid);
		}
	}
	return score;
}

function solvePart2(): number {
	let rating = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid.length; x++) {
			if (grid[y][x] !== "0") continue;
			rating += scoreTrailHead({ x, y }, grid, null);
		}
	}
	return rating;
}

function scoreTrailHead(head: Coord, grid: string[][], foundHeads: Set<string> | null = new Set(), start: number = 0): number {
	if (start === 9) {
		const coordString = `${head.x},${head.y}`;
		if (foundHeads) {
			if (foundHeads.has(coordString)) return 0;
			foundHeads.add(coordString);
		}
		return 1;
	}
	// console.log(`\t${start} > ${head.x},${head.y}`);
	let score = 0;
	const directions: Coord[] = [
		{ x: head.x, y: head.y - 1 }, //up
		{ x: head.x + 1, y: head.y }, //right
		{ x: head.x, y: head.y + 1 }, //down
		{ x: head.x - 1, y: head.y }, //left
	];
	for (const direction of directions) {
		const value = parseInt(grid[direction.y]?.[direction.x]);
		// console.log(`Here > ${value} to ${start + 1} (${direction.x},${direction.y}) and head (${head.x},${head.y})`);
		if (value !== start + 1) continue;
		score += scoreTrailHead({ x: direction.x, y: direction.y }, grid, foundHeads, value);
	}
	return score;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
