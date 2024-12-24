import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const instructions: number[] = inputLines[4]
	.split(": ")[1]
	.split(",")
	.map((v) => parseInt(v));
let initialA = 1;
//test
let prevA = -1;
let A: number = parseInt(inputLines[0].split(": ")[1]);
let B: number = parseInt(inputLines[1].split(": ")[1]);
let C: number = parseInt(inputLines[2].split(": ")[1]);
let pointer: number = 0;
let outputArray: string[] = [];
let part: "part1" | "part2" = "part1";

function solvePart1(): string {
	runProgram();
	return outputArray.join(","); // Answer: 1,6,3,6,5,6,5,1,7
}

function solvePart2(): number {
	// part = "part1";
	// // 100000000000 (100 billion) is too low
	// initialA = 1;
	// // while (outputArray.length > 0) {
	// for (let i = 0; i < 1000; i++) {
	// 	// outputArray = instructions.slice().map((v) => v.toString());
	// 	outputArray = [];
	// 	A = initialA++;
	// 	B = 0;
	// 	C = 0;
	// 	pointer = 0;
	// 	// if (A % 1000000 === 0) console.log(A);
	// 	runProgram();
	// 	console.log(`${initialA}: ${outputArray.join(",")}`);
	// }
	// return initialA - 1;

	part = "part2";
	// 100000000000 (100 billion) is too low
	initialA = Math.pow(8, instructions.length - 1);
	console.log(initialA);
	while (outputArray.length > 0) {
		outputArray = instructions.slice().map((v) => v.toString());
		A = initialA++;
		B = 0;
		C = 0;
		pointer = 0;
		if (A % 1000000 === 0) console.log(A);
		runProgram();
	}
	return initialA - 1;
}

function runProgram(): void {
	while (pointer < instructions.length) {
		const opcode = instructions[pointer];
		const operand = instructions[pointer + 1];
		if (opcode === 0) run_adv(operand);
		if (opcode === 1) run_bxl(operand);
		if (opcode === 2) run_bst(operand);
		if (opcode === 3) run_jnz(operand);
		if (opcode === 4) run_bxc(operand);
		if (opcode === 5) {
			const result = run_out(operand);
			//test
			const diff = instructions.length - outputArray.length;
			if (!result && diff > 3) {
				console.log(`${initialA}: ${diff} (${initialA - prevA})`);
				prevA = initialA;
			}
			if (!result) break;
		}
		if (opcode === 6) run_bdv(operand);
		if (opcode === 7) run_cdv(operand);
		pointer += 2;
	}
}

function run_adv(operand: number): void {
	const numerator = A;
	const denominator = Math.pow(2, getComboOperand(operand));
	A = Math.trunc(numerator / denominator);
}

function run_bxl(operand: number): void {
	B = B ^ operand;
}

function run_bst(operand: number): void {
	B = getComboOperand(operand) % 8;
}

function run_jnz(operand: number): void {
	if (A === 0) return;
	pointer = operand - 2;
}

function run_bxc(operand: number): void {
	B = B ^ C;
}

function run_out(operand: number): boolean {
	const outputValue = (getComboOperand(operand) % 8).toString();
	if (part === "part1") {
		outputArray.push(outputValue);
		return true;
	} else {
		return outputValue === outputArray.shift();
	}
}

function run_bdv(operand: number): void {
	const numerator = A;
	const denominator = Math.pow(2, getComboOperand(operand));
	B = Math.trunc(numerator / denominator);
}

function run_cdv(operand: number): void {
	const numerator = A;
	const denominator = Math.pow(2, getComboOperand(operand));
	C = Math.trunc(numerator / denominator);
}

function getComboOperand(operand: number): number {
	if (operand === 4) return A;
	if (operand === 5) return B;
	if (operand === 6) return C;
	if (operand === 7) throw new Error("Invalid combo operand 7");
	return operand;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
