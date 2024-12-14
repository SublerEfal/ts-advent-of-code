import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
interface Machine {
	goalX: number;
	goalY: number;
	ax: number;
	bx: number;
	ay: number;
	by: number;
}

const machines: Machine[] = [];
for (let i = 0; i < inputLines.length; i += 4) {
	const matchLine1 = inputLines[i].match(/Button A: X\+(\d+), Y\+(\d+)/)!;
	const matchLine2 = inputLines[i + 1].match(/Button B: X\+(\d+), Y\+(\d+)/)!;
	const matchLine3 = inputLines[i + 2].match(/Prize: X=(\d+), Y=(\d+)/)!;
	machines.push({
		goalX: parseInt(matchLine3[1]),
		goalY: parseInt(matchLine3[2]),
		ax: parseInt(matchLine1[1]),
		bx: parseInt(matchLine2[1]),
		ay: parseInt(matchLine1[2]),
		by: parseInt(matchLine2[2]),
	});
}

function solvePart1(): number {
	return machines.map((machine) => findCheapestSuccess(machine)).reduce((acc, cur) => (cur === Infinity ? acc : acc + cur), 0);
}

function solvePart2(): number {
	machines.forEach((machine) => {
		machine.goalX += 10000000000000;
		machine.goalY += 10000000000000;
	});
	return machines.map((machine) => findCheapestSuccess(machine)).reduce((acc, cur) => (cur === Infinity ? acc : acc + cur), 0);
}

function findCheapestSuccess(machine: Machine): number {
	// This video helped me: https://www.youtube.com/watch?v=UKt7SXtyLRs
	const factor = findClosestCommonFactor(machine.ax, machine.ay);
	let goalX = machine.goalX * factor.mx;
	let goalY = machine.goalY * factor.my;
	let ax = machine.ax * factor.mx;
	let bx = machine.bx * factor.mx;
	let ay = machine.ay * factor.my; // lmao how do I not even need this?? :')
	let by = machine.by * factor.my;
	const b = (goalX - goalY) / (bx - by);
	const a = (goalX - bx * b) / ax;
	if (b % 1 !== 0 || a % 1 !== 0) return Infinity;
	return a * 3 + b;
}

function findClosestCommonFactor(initialX: number, initialY: number): { mx: number; my: number } {
	let x = initialX;
	let y = initialY;
	let mx = 1;
	let my = 1;
	while (true) {
		if (x === y) {
			break;
		}
		if (x < y) {
			mx++;
		} else {
			my++;
		}
		x = initialX * mx;
		y = initialY * my;
	}
	return { mx, my };
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
