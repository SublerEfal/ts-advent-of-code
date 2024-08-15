import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1() {
	const presents = inputLines.map((line) => Present.fromString(line));
	return presents.reduce((acc, val) => acc + val.calculatePaperNeeded(), 0);
}

function solvePart2() {
	const presents = inputLines.map((line) => Present.fromString(line));
	return presents.reduce((acc, val) => acc + val.calculateRibbonNeeded(), 0);
}

class Present {
	constructor(public length: number, public width: number, public height: number) {}

	static fromString(str: string): Present {
		const sides = str.split("x").map((sideString) => parseInt(sideString));
		return new Present(sides[0], sides[1], sides[2]);
	}

	calculatePaperNeeded(): number {
		// prettier-ignore
		const areas = [
			this.length*this.width,
			this.width*this.height,
			this.height*this.length,
		];
		const extra = Math.min(areas[0], areas[1], areas[2]);
		return 2 * areas[0] + 2 * areas[1] + 2 * areas[2] + extra;
	}

	calculateRibbonNeeded(): number {
		let sides = [this.length, this.width, this.height].sort((a, b) => a - b);
		const cubicFeet = this.length * this.width * this.height;
		return 2 * sides[0] + 2 * sides[1] + cubicFeet;
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
