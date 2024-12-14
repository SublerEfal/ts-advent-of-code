import fs from "fs";
import path from "path";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const WIDTH = 101;
const HEIGHT = 103;
const robots: Robot[] = inputLines.map((line) => {
	const match = line.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/)!;
	return {
		location: { x: parseInt(match[1]), y: parseInt(match[2]) },
		velocity: { x: parseInt(match[3]), y: parseInt(match[4]) },
	};
});

interface Coord {
	x: number;
	y: number;
}

interface Robot {
	location: Coord;
	velocity: Coord;
}

function solvePart1(): number {
	moveRobots(robots, 100);
	return calculateSafetyFactor(robots);
}

function solvePart2(): number {
	let arr: string[] = [];
	let counter = 100; // take into account the first 100 from part 1
	for (let j = 1; j <= 20; j++) {
		for (let i = j * 500 - 500; i < 500 * j; i++) {
			moveRobots(robots, 1);
			counter++;
			arr.push(getGridString(robots));
			arr.push(
				` ========================================== ^ at ${i} seconds (counter ${counter}) ========================================== `
			);
		}
		fs.writeFileSync(path.join(__dirname, `visual_output_${j.toString().padStart(0, "0")}.text`), arr.join("\n"));
		arr = [];
	}
	return 7916; // Manually check the files to find the christmas tree!
}

function moveRobots(robots: Robot[], seconds: number): void {
	for (const robot of robots) {
		robot.location.x = (robot.location.x + robot.velocity.x * seconds + WIDTH * seconds) % WIDTH;
		robot.location.y = (robot.location.y + robot.velocity.y * seconds + HEIGHT * seconds) % HEIGHT;
	}
}

function calculateSafetyFactor(robots: Robot[]): number {
	let topLeft: number = 0;
	let topRight: number = 0;
	let bottomLeft: number = 0;
	let bottomRight: number = 0;
	for (const robot of robots) {
		const x = robot.location.x - Math.floor(WIDTH / 2);
		const y = robot.location.y - Math.floor(HEIGHT / 2);
		if (x < 0 && y < 0) topLeft++;
		if (x > 0 && y < 0) topRight++;
		if (x < 0 && y > 0) bottomLeft++;
		if (x > 0 && y > 0) bottomRight++;
	}
	return topLeft * topRight * bottomLeft * bottomRight;
}

function getGridString(robots: Robot[]): string {
	const grid: number[][] = new Array(HEIGHT).fill([]).map((_) => new Array(HEIGHT).fill(0));
	for (const robot of robots) {
		grid[robot.location.y][robot.location.x]++;
	}
	return grid.map((row) => row.map((count) => (count ? "#" : " ")).join("")).join("\n");
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
