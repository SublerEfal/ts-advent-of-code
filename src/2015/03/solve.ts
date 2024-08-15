import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1() {
	const santa = new Santa();
	santa.deliverPresent();
	for (let i = 0; i < input.length; i++) {
		const direction = input[i];
		santa.move(direction);
		santa.deliverPresent();
	}
	return santa.deliveredPresents.size;
}

function solvePart2(): number {
	const santa = new Santa();
	const robotSanta = new Santa();
	santa.deliverPresent();
	robotSanta.deliverPresent();
	for (let i = 0; i < input.length; i++) {
		const activeSanta = i % 2 === 0 ? santa : robotSanta;
		const direction = input[i];
		activeSanta.move(direction);
		activeSanta.deliverPresent();
	}

	const totalDeliveredPresents: Map<string, number> = new Map();
	for (const entry of santa.deliveredPresents.entries()) {
		const current = totalDeliveredPresents.get(entry[0]) || 0;
		totalDeliveredPresents.set(entry[0], entry[1] + current);
	}
	for (const entry of robotSanta.deliveredPresents.entries()) {
		const current = totalDeliveredPresents.get(entry[0]) || 0;
		totalDeliveredPresents.set(entry[0], entry[1] + current);
	}

	return totalDeliveredPresents.size;
}

class Santa {
	location: Coord = new Coord(0, 0);
	deliveredPresents: Map<string, number> = new Map();

	constructor() {}

	move(direction: string): void {
		this.location = this.location.getAdjacentCoord(direction);
	}

	deliverPresent(): void {
		const locationString: string = this.location.toString();
		const currentlyDelivered: number = this.deliveredPresents.get(locationString) || 0;
		this.deliveredPresents.set(locationString, currentlyDelivered + 1);
	}
}

class Coord {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getAdjacentCoord(direction: string): Coord {
		switch (direction) {
			case "^":
				return new Coord(this.x, this.y - 1);
			case ">":
				return new Coord(this.x + 1, this.y);
			case "v":
				return new Coord(this.x, this.y + 1);
			case "<":
				return new Coord(this.x - 1, this.y);
			default:
				throw new Error(`Invalid direction "${direction}"`);
		}
	}

	toString(): string {
		return `${this.x}x${this.y}`;
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
