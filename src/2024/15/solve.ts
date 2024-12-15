import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
type Tile1 = "free" | "box" | "wall";
type Tile2 = "free" | "boxLeft" | "boxRight" | "wall";
interface Coord {
	x: number;
	y: number;
}
interface MoveAction {
	from: Coord;
	to: Coord;
}
const robot1: Coord = findRobotCoord();
const robot2: Coord = findRobotCoord();
robot2.x *= 2;
const grid1: Tile1[][] = inputLines
	.filter((line) => line.startsWith("#"))
	.map((line) => {
		return line.split("").map<Tile1>((symbol) => {
			if (symbol === "#") return "wall";
			if (symbol === "O") return "box";
			return "free";
		});
	});
const grid2: Tile2[][] = initGrid2();
const moves: Coord[] = inputLines
	.filter((line) => /^(\^|\>|v|\<)/.test(line))
	.join("")
	.split("")
	.map((moveString) => {
		if (moveString === "^") return { x: 0, y: -1 };
		if (moveString === ">") return { x: 1, y: 0 };
		if (moveString === "v") return { x: 0, y: 1 };
		if (moveString === "<") return { x: -1, y: 0 };
		throw new Error("Invalid move string: " + moveString);
	});

function solvePart1(): number {
	for (const direction of moves) {
		if (movePart1(robot1.x, robot1.y, direction)) {
			robot1.x += direction.x;
			robot1.y += direction.y;
		}
	}
	// printGrid1();
	return calculateGpsSumPart1();
}

function solvePart2(): number {
	for (const direction of moves) {
		const todoMoves = movePart2(robot2.x, robot2.y, direction);
		todoMoves?.pop(); // The last move simply moves free to free so its obsolete.
		if (todoMoves) {
			todoMoves.forEach((todoMove, i) => {
				grid2[todoMove.to.y][todoMove.to.x] = grid2[todoMove.from.y][todoMove.from.x];
				grid2[todoMove.from.y][todoMove.from.x] = "free";
			});
			robot2.x += direction.x;
			robot2.y += direction.y;
		}
	}
	// printGrid2();
	return calculateGpsSumPart2();
}

function movePart1(x: number, y: number, direction: Coord): boolean {
	const newX = x + direction.x;
	const newY = y + direction.y;
	if (grid1[newY][newX] === "wall") return false;
	if (grid1[newY][newX] === "box") {
		if (movePart1(newX, newY, direction)) {
			grid1[newY][newX] = grid1[y][x];
			grid1[y][x] = "free";
			return true;
		} else {
			return false;
		}
	}
	grid1[newY][newX] = grid1[y][x];
	grid1[y][x] = "free";
	return true;
}

function movePart2(x: number, y: number, direction: Coord): null | MoveAction[] {
	const newX = x + direction.x;
	const newY = y + direction.y;

	const rawMoveActions: MoveAction[] = [];
	if (grid2[newY][newX] === "wall") return null;
	if (grid2[newY][newX].startsWith("box") && direction.y) {
		const newXLeft = grid2[newY][newX] === "boxLeft" ? newX : newX - 1;
		const newXRight = grid2[newY][newX] === "boxLeft" ? newX + 1 : newX;
		const moveLeft = movePart2(newXLeft, newY, direction);
		const moveRight = movePart2(newXRight, newY, direction);
		if (!moveLeft || !moveRight) return null;
		rawMoveActions.push(...moveLeft, ...moveRight);
	}
	if (grid2[newY][newX].startsWith("box") && direction.x) {
		const result = movePart2(newX, newY, direction);
		if (result) {
			rawMoveActions.push(...result);
		} else {
			return null;
		}
	}
	const moveActions: MoveAction[] = [];
	rawMoveActions.forEach((rawMoveAction) => {
		const exists = moveActions.some(
			(other) =>
				rawMoveAction.from.x === other.from.x &&
				rawMoveAction.from.y === other.from.y &&
				rawMoveAction.to.x === other.to.x &&
				rawMoveAction.to.y === other.to.y
		);
		if (exists) return;
		moveActions.push(rawMoveAction);
	});
	moveActions.push({ from: { x: x, y: y }, to: { x: newX, y: newY } });
	return moveActions;
}

function calculateGpsSumPart1(): number {
	let total = 0;
	for (let y = 0; y < grid1.length; y++) {
		for (let x = 0; x < grid1[y].length; x++) {
			if (grid1[y][x] !== "box") continue;
			total += y * 100 + x;
		}
	}
	return total;
}

function calculateGpsSumPart2(): number {
	let total = 0;
	for (let y = 0; y < grid2.length; y++) {
		for (let x = 0; x < grid2[y].length; x++) {
			if (grid2[y][x] !== "boxLeft") continue;
			total += y * 100 + x;
		}
	}
	return total;
}

function printGrid1(): void {
	grid1.forEach((row, y) =>
		console.log(
			row
				.map((tile, x) => {
					if (x === robot1.x && y === robot1.y) return "@";
					if (tile === "wall") return "#";
					if (tile === "box") return "O";
					if (tile === "free") return ".";
				})
				.join("")
		)
	);
}

function printGrid2(): void {
	grid2.forEach((row, y) =>
		console.log(
			row
				.map((tile, x) => {
					if (x === robot2.x && y === robot2.y) return "@";
					if (tile === "wall") return "#";
					if (tile === "boxLeft") return "[";
					if (tile === "boxRight") return "]";
					if (tile === "free") return ".";
				})
				.join("")
		)
	);
}

function findRobotCoord(): Coord {
	for (let y = 0; y < inputLines.length; y++) {
		for (let x = 0; x < inputLines[y].length; x++) {
			if (inputLines[y][x] === "@") return { x, y };
		}
	}
	throw new Error("No robot found");
}

function initGrid2(): Tile2[][] {
	const grid: Tile2[][] = [];
	inputLines
		.filter((line) => line.startsWith("#"))
		.forEach((line, y) => {
			grid[y] = [];
			line.split("").forEach((symbol, x) => {
				if (symbol === "#") {
					grid[y].push("wall");
					grid[y].push("wall");
				} else if (symbol === "O") {
					grid[y].push("boxLeft");
					grid[y].push("boxRight");
				} else {
					grid[y].push("free");
					grid[y].push("free");
				}
			});
		});
	return grid;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
