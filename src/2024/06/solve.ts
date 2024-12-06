import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

interface Coord {
	x: number;
	y: number;
}

// write code here
function solvePart1(): number {
	return runSimulation().travelledCoords!.length;
}

function solvePart2(): number {
	const coordsToTest: Coord[] = runSimulation().travelledCoords!;
	console.log(`Running part 2, this may take a minute...`);
	let stuckCount = 0;
	for (let i = 0; i < coordsToTest.length; i++) {
		const coord = coordsToTest[i];
		const result = runSimulation({ x: coord.x, y: coord.y });
		if (result.stuck) {
			stuckCount++;
		}
	}
	// for (let y = 0; y < inputLines.length; y++) {
	// 	for (let x = 0; x < inputLines[0].length; x++) {
	// 		console.log(`Running ${y * inputLines[0].length + x}/${total}`);
	// 		const result = runSimulation({ x, y });
	// 		if (result.stuck) {
	// 			stuckCount++;
	// 		}
	// 	}
	// }
	return stuckCount;
}

function runSimulation(additionalObstacle?: Coord): { travelledCoords: null | Coord[]; stuck: boolean } {
	const mapWidth = inputLines[0].length;
	const mapHeight = inputLines.length;
	const obstacles: Coord[] = [];
	if (additionalObstacle) {
		obstacles.push(additionalObstacle);
	}
	const travelledCoords: Set<string> = new Set();
	const turns: Set<string> = new Set();
	let guard: Coord = { x: -1, y: -1 };
	let direction = 0; // 0up 1right 2down 3left
	inputLines.forEach((line, y) => {
		line.split("").forEach((character, x) => {
			if (character === "#") {
				obstacles.push({ x, y });
			}
			if (character === "^") {
				guard = { x, y };
			}
		});
	});
	while (guard.x >= 0 && guard.y >= 0 && guard.x < mapWidth && guard.y < mapHeight) {
		const nextTile = readNextTile(guard, direction, obstacles);
		if (nextTile.isObstacle) {
			const turnString = `${guard.x}x${guard.y}_${direction}`;
			if (turns.has(turnString)) {
				return {
					travelledCoords: null,
					stuck: true,
				};
			}
			turns.add(turnString);
			direction++;
			if (direction > 3) {
				direction = 0;
			}
			continue;
		}
		travelledCoords.add(`${guard.x}x${guard.y}`);
		guard = nextTile.coord;
	}
	return { travelledCoords: coordStringsToCoords(Array.from(travelledCoords)), stuck: false };
}

function coordStringsToCoords(coordStrings: string[]): Coord[] {
	return coordStrings.map((coordString) => {
		const match = coordString.match(/(\d+)x(\d+)/)!;
		const x = parseInt(match[1]);
		const y = parseInt(match[2]);
		return { x, y };
	});
}

function readNextTile(guard: Coord, direction: number, obstacles: Coord[]): { isObstacle: boolean; coord: Coord } {
	let nextTile: Coord = guard;
	if (direction === 0) nextTile = { x: guard.x, y: guard.y - 1 };
	if (direction === 1) nextTile = { x: guard.x + 1, y: guard.y };
	if (direction === 2) nextTile = { x: guard.x, y: guard.y + 1 };
	if (direction === 3) nextTile = { x: guard.x - 1, y: guard.y };
	if (nextTile === guard) throw new Error("Could not determine next tile: It was never set");
	const isObstacle = obstacles.some((obstacle) => obstacle.x === nextTile.x && obstacle.y === nextTile.y);
	return {
		isObstacle: isObstacle,
		coord: nextTile,
	};
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
