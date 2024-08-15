import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1(): number {
	const games = getGames(inputLines);
	const validGames = games.filter((game) =>
		game.isValidFor({
			red: 12,
			green: 13,
			blue: 14,
		})
	);
	return validGames.map((game) => game.id).reduce((prev, cur) => prev + cur, 0);
}

function solvePart2(): number {
	return getGames(inputLines)
		.map((game) => game.getPower())
		.reduce((prev, cur) => prev + cur, 0);
}

function getGames(inputLines: string[]): Game[] {
	return inputLines.map((line) => {
		const id = parseInt(line.match(/^Game (\d+)/)?.pop()!);
		const rounds: GameRound[] = line.split(";").map((roundString) => {
			return {
				red: parseInt(roundString.match(/(\d+) red/)?.pop() || "0"),
				green: parseInt(roundString.match(/(\d+) green/)?.pop() || "0"),
				blue: parseInt(roundString.match(/(\d+) blue/)?.pop() || "0"),
			};
		});
		return new Game(id, rounds);
	});
}

class Game {
	id: number;
	rounds: GameRound[];

	constructor(id: number, rounds: GameRound[]) {
		this.id = id;
		this.rounds = rounds;
	}

	isValidFor(testRound: GameRound): boolean {
		const maxRed = this.rounds.reduce((max, cur) => Math.max(max, cur.red), 0);
		const maxGreen = this.rounds.reduce((max, cur) => Math.max(max, cur.green), 0);
		const maxBlue = this.rounds.reduce((max, cur) => Math.max(max, cur.blue), 0);
		if (maxRed > testRound.red) return false;
		if (maxGreen > testRound.green) return false;
		if (maxBlue > testRound.blue) return false;
		return true;
	}

	getPower(): number {
		const maxRed = this.rounds.reduce((max, cur) => Math.max(max, cur.red), 0);
		const maxGreen = this.rounds.reduce((max, cur) => Math.max(max, cur.green), 0);
		const maxBlue = this.rounds.reduce((max, cur) => Math.max(max, cur.blue), 0);
		return maxRed * maxGreen * maxBlue;
	}
}

interface GameRound {
	green: number;
	blue: number;
	red: number;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
