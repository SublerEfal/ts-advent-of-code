import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	return calculatePriceOfFences(
		inputLines.map((line) => line.split("")),
		"part1"
	);
}

function solvePart2(): number {
	return calculatePriceOfFences(
		inputLines.map((line) => line.split("")),
		"part2"
	);
}

function calculatePriceOfFences(grid: string[][], part: "part1" | "part2"): number {
	let price = 0;
	for (let outerY = 0; outerY < grid.length; outerY++) {
		for (let outerX = 0; outerX < grid[outerY].length; outerX++) {
			if (!grid[outerY][outerX]) continue;
			let crop = grid[outerY][outerX];
			const processedCoords: Coord[] = [];
			const stack: Coord[] = [{ x: outerX, y: outerY }];
			let size = 0;
			let perimeter = 0;
			let coord = stack.pop();
			while (coord) {
				grid[coord.y][coord.x] = "";
				processedCoords.push({ x: coord.x, y: coord.y });
				size++;
				for (const direction of /* prettier-ignore */ [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
					const neighbourX = coord.x + direction[0];
					const neighbourY = coord.y + direction[1];
					const gridCrop = grid[neighbourY]?.[neighbourX];
					const stackHasCoord = stack.some((coord) => coord.x === neighbourX && coord.y === neighbourY);
					const processedHasCoord = processedCoords.some((coord) => coord.x === neighbourX && coord.y === neighbourY);
					if (processedHasCoord || stackHasCoord) {
						continue;
					}
					if (gridCrop !== crop) {
						perimeter++;
						continue;
					}
					stack.push({ x: neighbourX, y: neighbourY });
				}
				coord = stack.pop();
			}
			if (part === "part1") {
				price += size * perimeter;
			} else if (part === "part2") {
				price += size * findSides(processedCoords);
			}
		}
	}
	return price;
}

function findSides(coords: Coord[]): number {
	let sides = 0;
	const width = inputLines[0].length + 2;
	const height = inputLines.length + 2;
	const grid: string[][] = new Array(height).fill([]).map((_) => new Array(width).fill(""));
	coords.forEach((coord) => {
		grid[coord.y + 1][coord.x + 1] = "x";
	});
	for (let y = 0; y < grid.length - 1; y++) {
		for (let x = 0; x < grid[y].length - 1; x++) {
			const boxDeltas: Coord[] = [
				{ x: 0, y: 0 }, // top left
				{ x: 1, y: 0 }, // top right
				{ x: 0, y: 1 }, // bottom left
				{ x: 1, y: 1 }, // bottom right
			];
			const box = boxDeltas.map((deltaCoord) => grid[y + deltaCoord.y][x + deltaCoord.x]);
			const boxString = box.map((value) => (value ? "1" : "0")).join("");
			const boxFilledCount = box.filter(Boolean).length;
			if (boxFilledCount === 1 || boxFilledCount === 3) {
				sides++;
			}
			if (boxString === "0110" || boxString === "1001") {
				sides += 2;
			}
		}
	}
	return sides;
}

interface Coord {
	x: number;
	y: number;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
