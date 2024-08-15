import fs from "fs";

const input = getInput();
const inputLines = input.split("\n");

// write code here
function solvePart1(): number {
	const lightsMap = new LightsMapPart1(1000, 1000);
	inputLines.forEach((inputLine, index) => lightsMap.processActionString(inputLine));
	return lightsMap.countOnLights();
}

function solvePart2(): number {
	const lightsMap = new LightsMapPart2(1000, 1000);
	inputLines.forEach((inputLine, index) => lightsMap.processActionString(inputLine));
	return lightsMap.countTotalBrightness();
}

class LightsMapPart1 {
	width: number;
	height: number;
	private lights: number[];

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.lights = new Array(width * height);
	}

	processActionString(actionString: string): void {
		const match = actionString.match(/^(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/)!;
		const action = match[1];
		const startX = parseInt(match[2]);
		const startY = parseInt(match[3]);
		const endX = parseInt(match[4]);
		const endY = parseInt(match[5]);
		this.processAction(action, startX, startY, endX, endY);
	}

	processAction(action: string, startX: number, startY: number, endX: number, endY: number): void {
		let actionFunction = this.toggleLight;
		if (action === "turn on") actionFunction = this.turnOn;
		if (action === "turn off") actionFunction = this.turnOff;

		for (let x = startX; x < endX + 1; x++) {
			for (let y = startY; y < endY + 1; y++) {
				actionFunction.call(this, x, y);
			}
		}
	}

	getLight(x: number, y: number): number {
		return this.lights[this.getIndex(x, y)];
	}

	toggleLight(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = this.lights[index] ? 0 : 1;
	}

	turnOn(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = 1;
	}

	turnOff(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = 0;
	}

	countOnLights(): number {
		return this.lights.reduce((total, light) => total + (light ? 1 : 0), 0);
	}

	private getIndex(x: number, y: number): number {
		if (x > this.width - 1) throw new Error("Invalid x specified");
		if (y > this.height - 1) throw new Error("Invalid y specified");
		return y * this.width + x;
	}
}

class LightsMapPart2 {
	width: number;
	height: number;
	private lights: number[];

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.lights = new Array(width * height);
	}

	processActionString(actionString: string): void {
		const match = actionString.match(/^(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/)!;
		const action = match[1];
		const startX = parseInt(match[2]);
		const startY = parseInt(match[3]);
		const endX = parseInt(match[4]);
		const endY = parseInt(match[5]);
		this.processAction(action, startX, startY, endX, endY);
	}

	processAction(action: string, startX: number, startY: number, endX: number, endY: number): void {
		let actionFunction = this.toggleLight;
		if (action === "turn on") actionFunction = this.turnOn;
		if (action === "turn off") actionFunction = this.turnOff;

		for (let x = startX; x < endX + 1; x++) {
			for (let y = startY; y < endY + 1; y++) {
				actionFunction.call(this, x, y);
			}
		}
	}

	getLight(x: number, y: number): number {
		return this.lights[this.getIndex(x, y)];
	}

	toggleLight(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = (this.lights[index] || 0) + 2;
	}

	turnOn(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = (this.lights[index] || 0) + 1;
	}

	turnOff(x: number, y: number): void {
		const index = this.getIndex(x, y);
		this.lights[index] = Math.max((this.lights[index] || 0) - 1, 0);
	}

	countTotalBrightness(): number {
		return this.lights.reduce((total, light) => total + (light || 0), 0);
	}

	private getIndex(x: number, y: number): number {
		if (x > this.width - 1) throw new Error("Invalid x specified");
		if (y > this.height - 1) throw new Error("Invalid y specified");
		return y * this.width + x;
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
