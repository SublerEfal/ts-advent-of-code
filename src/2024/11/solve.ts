const input = "7568 155731 0 972 1 6919238 80646 22";

// write code here
function solvePart1(): number {
	return simulateBlinks(input, 25);
}

function solvePart2(): number {
	return simulateBlinks(input, 75);
}

function simulateBlinks(input: string, blinks: number): number {
	let stoneMap: { [key: string]: number } = {};
	input.split(" ").map((key) => {
		stoneMap[key] = (stoneMap[key] || 0) + 1;
	});
	for (let blink = 0; blink < blinks; blink++) {
		const newMap: { [key: string]: number } = {};
		for (const keyString in stoneMap) {
			const key = parseInt(keyString);
			const count = stoneMap[key];
			if (key === 0) {
				newMap[1] = (newMap[1] || 0) + count;
			} else if (keyString.length % 2 === 0) {
				const newKey1: number = parseInt(keyString.substring(0, keyString.length / 2));
				const newKey2: number = parseInt(keyString.substring(keyString.length / 2, keyString.length));
				newMap[newKey1] = (newMap[newKey1] || 0) + count;
				newMap[newKey2] = (newMap[newKey2] || 0) + count;
			} else {
				newMap[key * 2024] = (newMap[key * 2024] || 0) + count;
			}
		}
		stoneMap = newMap;
	}
	let stoneCount = 0;
	for (const key in stoneMap) {
		stoneCount += stoneMap[key];
	}
	return stoneCount;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
