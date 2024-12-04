import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const board: string[][] = inputLines.map((line) => line.split(""));

function solvePart1(): number {
	let total = 0;
	for (let y = 0; y < board.length; y++) {
		const row = board[y];
		for (let x = 0; x < row.length; x++) {
			total += countWordsOnLocation(board, x, y, "SAMX");
		}
	}
	return total;
}

function solvePart2(): number {
	let count = 0;
	for (let y = 0; y < board.length; y++) {
		const row = board[y];
		for (let x = 0; x < row.length; x++) {
			if (isCrossWord(board, x, y, "SAM")) {
				count++;
			}
		}
	}
	return count;
}

function countWordsOnLocation(board: string[][], locationX: number, locationY: number, wordToFind: string): number {
	const letters = wordToFind.split("");
	let count = 0;
	outer: for (const xMod of [-1, 0, 1]) {
		inner: for (const yMod of [-1, 0, 1]) {
			let x = locationX;
			let y = locationY;
			for (let i = 0; i < letters.length; i++) {
				if (board[y]?.[x] !== letters[i]) continue inner;
				x += xMod;
				y += yMod;
			}
			count++;
		}
	}
	return count;
}

function isCrossWord(board: string[][], x: number, y: number, wordToFind: string): boolean {
	const letters = wordToFind.split("");
	if (letters.length !== 3) throw new Error("Word most be exactly 3 characters long");
	if (board[y]?.[x] !== letters[1]) return false;

	const isValidDiagonal1 =
		(board[y - 1]?.[x - 1] === letters[0] && board[y + 1]?.[x + 1] === letters[2]) ||
		(board[y - 1]?.[x - 1] === letters[2] && board[y + 1]?.[x + 1] === letters[0]);
	const isValidDiagonal2 =
		(board[y + 1]?.[x - 1] === letters[0] && board[y - 1]?.[x + 1] === letters[2]) ||
		(board[y + 1]?.[x - 1] === letters[2] && board[y - 1]?.[x + 1] === letters[0]);

	return isValidDiagonal1 && isValidDiagonal2;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
