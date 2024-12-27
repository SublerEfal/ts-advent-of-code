import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
interface Gate {
	input1: string;
	input1Value: boolean | null;
	input2: string;
	input2Value: boolean | null;
	output: string;
	outputValue: boolean | null;
	type: "AND" | "OR" | "XOR";
}

const inputMap: Map<string, Gate[]> = new Map();
const gates: Gate[] = [];

inputLines
	.filter((line) => line.includes("->"))
	.forEach((line) => {
		const match = line.match(/([^\s]+) ([^\s]+) ([^\s]+) -> ([^\s]+)/)!;
		const gate: Gate = {
			input1: match[1],
			input1Value: null,
			input2: match[3],
			input2Value: null,
			output: match[4],
			type: match[2] as "AND" | "OR" | "XOR",
			outputValue: null,
		};
		gates.push(gate);
		if (!inputMap.get(gate.input1)) {
			inputMap.set(gate.input1, []);
		}
		if (!inputMap.get(gate.input2)) {
			inputMap.set(gate.input2, []);
		}
		if (!inputMap.get(gate.output)) {
			inputMap.set(gate.output, []);
		}
		inputMap.get(gate.input1)!.push(gate);
		inputMap.get(gate.input2)!.push(gate);
	});

function solvePart1(): number {
	inputLines
		.filter((line) => line.includes(":"))
		.forEach((line) => {
			const split = line.split(": ");
			const wire = split[0];
			const value = parseInt(split[1]) === 1 ? true : false;
			setValue(wire, value);
		});
	const binaryNumberString = gates
		.filter((gate) => gate.output.match(/^z\d\d/))
		.sort((a, b) => parseInt(b.output.substring(1)) - parseInt(a.output.substring(1)))
		.map((gate) => (gate.outputValue ? 1 : 0).toString())
		.join("");
	return parseInt(binaryNumberString, 2);
}

function solvePart2(): number {
	// todo
	return 0;
}

function setValue(wire: string, value: boolean): void {
	const gates = inputMap.get(wire)!;
	for (const gate of gates) {
		if (gate.input1 === wire) gate.input1Value = value;
		if (gate.input2 === wire) gate.input2Value = value;
		if (gate.input1Value === undefined) continue;
		if (gate.input2Value === undefined) continue;
		if (gate.type === "AND") {
			gate.outputValue = gate.input1Value && gate.input2Value;
		}
		if (gate.type === "OR") {
			gate.outputValue = gate.input1Value || gate.input2Value;
		}
		if (gate.type === "XOR") {
			gate.outputValue = gate.input1Value !== gate.input2Value;
		}
		setValue(gate.output, gate.outputValue!);
	}
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
