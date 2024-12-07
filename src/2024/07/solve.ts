import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const equations = inputLines.map((line) => {
	const match = line.match(
		/^(\d+):( \d+)( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?( \d+)?$/
	)!;
	const testValue: number = parseInt(match[1]);
	const numbers: number[] = match
		.slice(2)
		.filter(Boolean)
		.map((nr) => parseInt(nr.trim()));
	return { testValue, numbers };
});

function solvePart1(): number {
	return equations
		.filter((equation) => isValidEquation(equation.testValue, equation.numbers, [sum, multiply]))
		.reduce((acc, cur) => acc + cur.testValue, 0);
}

function solvePart2(): number {
	return equations
		.filter((equation) => isValidEquation(equation.testValue, equation.numbers, [sum, multiply, concatenation]))
		.reduce((acc, cur) => acc + cur.testValue, 0);
}

function isValidEquation(testValue: number, numbers: number[], operators: ((a: number, b: number) => number)[], currentValue?: number): boolean {
	for (const operatorFunction of operators) {
		const value = currentValue === undefined ? numbers[0] : operatorFunction(currentValue, numbers[0]);
		if (numbers.length === 1 && testValue === value) {
			return true;
		}
		if (numbers.length > 1 && isValidEquation(testValue, numbers.slice(1), operators, value)) {
			return true;
		}
	}
	return false;
}

function sum(a: number, b: number): number {
	return a + b;
}

function multiply(a: number, b: number): number {
	return a * b;
}

function concatenation(a: number, b: number): number {
	return parseInt(a.toString() + b.toString());
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
