import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const antennas: Map<string, Coord[]> = new Map();
inputLines.forEach((line, y) => {
	line.split("").forEach((char, x) => {
		if (char === ".") return;
		if (!antennas.has(char)) {
			antennas.set(char, []);
		}
		antennas.get(char)!.push({ x, y });
	});
});

function solvePart1(): number {
	const antinodes: Set<string> = new Set();
	antennas.forEach((coords) => {
		coords.forEach((antenna1) => {
			coords.forEach((antenna2) => {
				if (isSameCoord(antenna1, antenna2)) return;
				const antinode: Coord = {
					x: antenna1.x + (antenna1.x - antenna2.x),
					y: antenna1.y + (antenna1.y - antenna2.y),
				};
				if (isInBounds(antinode)) {
					antinodes.add(coordToString(antinode));
				}
			});
		});
	});
	return antinodes.size;
}

function solvePart2(): number {
	const antinodes: Set<string> = new Set();
	antennas.forEach((coords) => {
		if (coords.length === 1) return;
		coords.forEach((antenna1) => {
			coords.forEach((antenna2) => {
				if (isSameCoord(antenna1, antenna2)) {
					antinodes.add(coordToString(antenna1));
					return;
				}
				const deltaX = antenna1.x - antenna2.x;
				const deltaY = antenna1.y - antenna2.y;
				let antinode: Coord | null = null;
				while (!antinode || isInBounds(antinode)) {
					if (antinode) {
						antinodes.add(coordToString(antinode));
					}
					antinode = {
						x: (antinode ?? antenna1).x + deltaX,
						y: (antinode ?? antenna1).y + deltaY,
					};
				}
			});
		});
	});
	return antinodes.size;
}

interface Coord {
	x: number;
	y: number;
}

function isSameCoord(coord1: Coord, coord2: Coord): boolean {
	return coord1.x === coord2.x && coord1.y === coord2.y;
}

function coordToString(coord: Coord): string {
	return `${coord.x},${coord.y}`;
}

function isInBounds(coord: Coord): boolean {
	const width = inputLines[0].length;
	const height = inputLines.length;
	if (coord.x < 0) return false;
	if (coord.y < 0) return false;
	if (coord.x >= width) return false;
	if (coord.y >= height) return false;
	return true;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
