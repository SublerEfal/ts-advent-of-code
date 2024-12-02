import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
function solvePart1(): number {
	const reports: number[][] = inputLines.map((line) => line.split(" ").map((str) => parseInt(str)));
	const safeReports = reports.filter((report) => isReportSafe(report));
	return safeReports.length;
}

function solvePart2(): number {
	const reports: number[][] = inputLines.map((line) => line.split(" ").map((str) => parseInt(str)));
	const safeReports = reports.filter((report) => {
		for (let i = 0; i < report.length; i++) {
			const subReport: number[] = report.slice();
			subReport.splice(i, 1);
			if (isReportSafe(subReport)) {
				return true;
			}
		}
		return false;
	});
	return safeReports.length;
}

function isReportSafe(report: number[]): boolean {
	let lastValue = report[0];
	let initialDirection = lastValue - report[1] > 0 ? 1 : -1;
	for (let i = 1; i < report.length; i++) {
		let currentValue = report[i];
		let difference = Math.abs(lastValue - currentValue);
		if (difference < 1 || difference > 3) {
			return false;
		}
		const currentDirection = report[i - 1] - report[i] > 0 ? 1 : -1;
		if (currentDirection !== initialDirection) {
			return false;
		}
		lastValue = currentValue;
	}
	return true;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
