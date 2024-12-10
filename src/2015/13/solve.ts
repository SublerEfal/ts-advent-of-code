import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
// `${person},${neighbor} = happiness metric`
const happinessMap: Map<string, number> = new Map();
const names: string[] = [];
inputLines.forEach((line) => {
	let match = line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)./)!;
	let person: string = match[1];
	let gainOrLose: string = match[2];
	let happiness: number = parseInt(match[3]);
	let neighbour: string = match[4];
	if (gainOrLose === "lose") {
		happiness = -happiness;
	}
	if (!names.includes(person)) {
		names.push(person);
	}
	happinessMap.set(`${person},${neighbour}`, happiness);
});

function solvePart1(): number {
	return calculateMaxHappiness(names);
}

function solvePart2(): number {
	return calculateMaxHappiness([...names, "me"]);
}

function calculateMaxHappiness(notSeated: string[], seated: string[] = []): number {
	if (notSeated.length === 0) {
		return calculateTotalHappiness(seated);
	}
	let maxHappiness = -Infinity;
	for (const toSeat of notSeated) {
		const newSeated = [...seated, toSeat];
		const newNotSeated = notSeated.filter((n) => n !== toSeat);
		const result = calculateMaxHappiness(newNotSeated, newSeated);
		maxHappiness = Math.max(result, maxHappiness);
	}
	return maxHappiness;
}

function calculateTotalHappiness(seated: string[]): number {
	let total: number = 0;
	seated.forEach((seat, index) => {
		const left: string = seated[index - 1 < 0 ? seated.length - 1 : index - 1];
		const right: string = seated[index + 1 === seated.length ? 0 : index + 1];
		const happinessLeft = happinessMap.get(`${seat},${left}`) || 0;
		const happinessRight = happinessMap.get(`${seat},${right}`) || 0;
		total += happinessLeft;
		total += happinessRight;
	});
	return total;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
