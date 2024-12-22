import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
type Tile = "free" | "wall";
type Coord = { x: number; y: number };
type Node = { coord: Coord; direction: number; score: number; path?: Coord[] };
let startCoord: Coord;
let endCoord: Coord;
let bestScore: number = Infinity;
const grid: Tile[][] = inputLines.map((line, y) => {
	return line.split("").map<Tile>((symbol, x) => {
		if (symbol === "S") {
			startCoord = { x, y };
		}
		if (symbol === "E") {
			endCoord = { x, y };
		}
		return symbol === "#" ? "wall" : "free";
	});
});

function solvePart1(): number {
	bestScore = scoreBestPath();
	return bestScore;
}

function solvePart2(): number {
	return findTilesOfBestPaths();
}

function scoreBestPath(): number {
	const bestScores: { [key: string]: number } = {};
	const nodes: Node[] = [{ coord: startCoord, direction: 1, score: 0 }];
	let node: Node | undefined;
	while ((node = nodes.pop())) {
		const nodeString = nodeToString(node);
		if (bestScores[nodeString]) {
			if (node.score < bestScores[nodeString]) {
				bestScores[nodeString] = node.score;
			} else {
				continue;
			}
		} else {
			bestScores[nodeString] = node.score;
		}
		nodes.push(...getNeighbourNodes(node, false));
	}

	const endScores = Object.keys(bestScores)
		.filter((key) => key.startsWith(`${endCoord.x},${endCoord.y},`))
		.map((key) => bestScores[key]);
	return Math.min(...endScores);
}

function findTilesOfBestPaths(): number {
	const bestDestinationNodes: Node[] = [];
	const bestScores: { [key: string]: number } = {};
	const nodes: Node[] = [{ coord: startCoord, direction: 1, score: 0, path: [startCoord] }];
	let node: Node | undefined;
	while ((node = nodes.pop())) {
		const nodeString = nodeToString(node);
		if (bestScores[nodeString]) {
			if (node.score <= bestScores[nodeString]) {
				bestScores[nodeString] = node.score;
				if (node.coord.x === endCoord.x && node.coord.y === endCoord.y && node.score === bestScore) {
					bestDestinationNodes.push(node);
					continue;
				}
			} else {
				continue;
			}
		} else {
			bestScores[nodeString] = node.score;
			if (node.coord.x === endCoord.x && node.coord.y === endCoord.y && node.score === bestScore) {
				bestDestinationNodes.push(node);
				continue;
			}
		}
		nodes.push(...getNeighbourNodes(node, true).filter((neighbourNode) => neighbourNode.score <= bestScore));
	}

	const tilesOfBestPaths: Set<string> = new Set();
	for (const node of bestDestinationNodes) {
		for (const coord of node.path!) {
			tilesOfBestPaths.add(coordToString(coord));
		}
	}
	// printMap(
	// 	Array.from(tilesOfBestPaths).map((str) => {
	// 		const split = str.split(",");
	// 		return { x: parseInt(split[0]), y: parseInt(split[1]) };
	// 	})
	// );
	return tilesOfBestPaths.size;
}

function getNeighbourNodes(node: Node, includePath: boolean): Node[] {
	let neighbourNodes: Node[] | undefined;
	if (node.direction === 0) {
		neighbourNodes = [
			{ score: node.score + 1001, coord: { x: node.coord.x - 1, y: node.coord.y }, direction: (node.direction - 1) & 0x3 },
			{ score: node.score + 1, coord: { x: node.coord.x, y: node.coord.y - 1 }, direction: node.direction },
			{ score: node.score + 1001, coord: { x: node.coord.x + 1, y: node.coord.y }, direction: (node.direction + 1) & 0x3 },
		];
	} else if (node.direction === 1) {
		neighbourNodes = [
			{ score: node.score + 1001, coord: { x: node.coord.x, y: node.coord.y - 1 }, direction: (node.direction - 1) & 0x3 },
			{ score: node.score + 1, coord: { x: node.coord.x + 1, y: node.coord.y }, direction: node.direction },
			{ score: node.score + 1001, coord: { x: node.coord.x, y: node.coord.y + 1 }, direction: (node.direction + 1) & 0x3 },
		];
	} else if (node.direction === 2) {
		neighbourNodes = [
			{ score: node.score + 1001, coord: { x: node.coord.x + 1, y: node.coord.y }, direction: (node.direction - 1) & 0x3 },
			{ score: node.score + 1, coord: { x: node.coord.x, y: node.coord.y + 1 }, direction: node.direction },
			{ score: node.score + 1001, coord: { x: node.coord.x - 1, y: node.coord.y }, direction: (node.direction + 1) & 0x3 },
		];
	} else if (node.direction === 3) {
		neighbourNodes = [
			{ score: node.score + 1001, coord: { x: node.coord.x, y: node.coord.y + 1 }, direction: (node.direction - 1) & 0x3 },
			{ score: node.score + 1, coord: { x: node.coord.x - 1, y: node.coord.y }, direction: node.direction },
			{ score: node.score + 1001, coord: { x: node.coord.x, y: node.coord.y - 1 }, direction: (node.direction + 1) & 0x3 },
		];
	}
	if (!neighbourNodes) throw new Error("Invalid direction: " + node.direction);
	neighbourNodes = neighbourNodes.filter((neighourNode) => grid[neighourNode.coord.y][neighourNode.coord.x] === "free");
	if (includePath) {
		neighbourNodes.forEach((neighourNode) => {
			const newPath = node.path?.slice() ?? [];
			newPath.push(neighourNode.coord);
			neighourNode.path = newPath;
		});
	}
	return neighbourNodes;
}

function coordToString(coord: Coord): string {
	return `${coord.x},${coord.y}`;
}

function nodeToString(node: Node): string {
	return `${node.coord.x},${node.coord.y},${node.direction}`;
}

function printMap(markedCoords: Coord[]): void {
	for (let y = 0; y < grid.length; y++) {
		let rowString = "";
		for (let x = 0; x < grid[y].length; x++) {
			if (markedCoords.find((c) => c.x === x && c.y === y)) rowString += "O";
			else if (startCoord.x === x && startCoord.y === y) rowString += "S";
			else if (endCoord.x === x && endCoord.y === y) rowString += "E";
			else if (grid[y][x] === "free") rowString += ".";
			else if (grid[y][x] === "wall") rowString += "#";
			else rowString += "?";
		}
		console.log(rowString);
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
