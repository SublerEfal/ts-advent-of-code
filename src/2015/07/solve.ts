import fs from "fs";

const input = getInput();
const inputLines = input.split("\n").map((line) => line.trim());

type WireMap = Map<string, number>;
type InstructionResult = { wire: string; value: number };

class Instruction {
	private phrase: string;

	constructor(phrase: string) {
		this.phrase = phrase;
	}

	solve(wireMap: WireMap): InstructionResult | null {
		const resultWire = this.phrase.match(/-> (\w+)/)?.pop();
		if (!resultWire) throw new Error("Could not get result wire");
		if (wireMap.has(resultWire)) return null;
		let result: number | undefined;
		const inputs = getInputs(this.phrase, wireMap);
		if (!inputs) return null;
		if (/RSHIFT/.test(this.phrase)) {
			if (inputs.b === undefined) return null;
			result = inputs.a >> inputs.b!;
		} else if (/LSHIFT/.test(this.phrase)) {
			if (inputs.b === undefined) return null;
			result = inputs.a << inputs.b!;
		} else if (/AND/.test(this.phrase)) {
			if (inputs.b === undefined) return null;
			result = inputs.a & inputs.b!;
		} else if (/OR/.test(this.phrase)) {
			if (inputs.b === undefined) return null;
			result = inputs.a | inputs.b!;
		} else if (/NOT/.test(this.phrase)) {
			result = ~inputs.a & 0xffff;
		} else if (/^[^\s]+ ->/.test(this.phrase)) {
			result = inputs.a;
		}
		if (typeof result === "undefined") throw new Error("Could not determine result");

		return { wire: resultWire, value: result };
	}
}

function solveCircuit(phrases: string[], startMap?: WireMap): WireMap {
	const instructions: Instruction[] = phrases.map((phrase) => new Instruction(phrase));
	const map: WireMap = startMap || new Map();
	let instruction: Instruction | undefined;
	while ((instruction = instructions.shift())) {
		const result = instruction.solve(map);
		if (result) {
			map.set(result.wire, result.value);
		} else {
			instructions.push(instruction);
		}
	}
	return map;
}

function getInputs(phrase: string, wireMap: WireMap): { a: number; b?: number } | null {
	const inputAMatch = phrase.match(/^([^\s]+) (?:[RL]SHIFT|AND|OR) [^\s]+|^NOT ([^\s]+)|^(\d+|\w+)/);
	const inputA = getInputValue(inputAMatch?.[1] || inputAMatch?.[2] || inputAMatch?.[3] || "", wireMap);
	const inputB = getInputValue(phrase.match(/^[^\s]+ (?:[RL]SHIFT|AND|OR) ([^\s]+)/)?.pop() || "", wireMap);
	if (inputA === null) return null;
	return {
		a: inputA,
		b: inputB ?? undefined,
	};
}

function getInputValue(wireOrValue: string, map: WireMap): number | null {
	if (/\D/.test(wireOrValue)) {
		return map.get(wireOrValue) ?? null;
	} else {
		return parseInt(wireOrValue);
	}
}

// write code here
function solve(): void {
	const resultMap = solveCircuit(inputLines);
	const part1Result = resultMap.get("a") || 0;
	console.log("Part 2 result: " + part1Result);
	console.log("Part 1 result: " + solvePart2(part1Result));
}

function solvePart2(part1Result: number): number {
	const startMap: WireMap = new Map();
	startMap.set("b", part1Result); // result of part 1
	const resultMap = solveCircuit(
		inputLines.filter((line) => !/-> b$/.test(line)),
		startMap
	);
	return resultMap.get("a") || 0;
}
// finish writing code here

solve();

function getInput(): string {
	return fs.readFileSync(__dirname + "/input.txt").toString();
}
