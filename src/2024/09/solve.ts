import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// write code here
function solvePart1(): number {
	const diskMap = input;
	const fileBlocks: number[] = generateFileBlocks(diskMap); // TODO
	rearrangeFileblocksFragmented(fileBlocks);
	return calculateChecksum(fileBlocks);
}

function solvePart2(): number {
	const diskMap = input;
	const fileBlocks: number[] = generateFileBlocks(diskMap); // TODO
	rearrangeFileblocksWhole(fileBlocks);
	return calculateChecksum(fileBlocks);
}

function generateFileBlocks(diskMap: string): number[] {
	const fileBlocks: number[] = [];
	for (let i = 0; i < diskMap.length; i++) {
		const size = parseInt(diskMap[i]);
		const id = i / 2;
		const isFile = i % 2 === 0;
		const fileBlock = isFile ? id : -1;
		for (let j = 0; j < size; j++) {
			fileBlocks.push(fileBlock);
		}
	}
	return fileBlocks;
}

function rearrangeFileblocksFragmented(fileBlocks: number[]): void {
	let backIndex = fileBlocks.length - 1;
	let frontIndex = 0;
	while (backIndex > frontIndex) {
		if (fileBlocks[backIndex] === -1) {
			backIndex--;
			continue;
		}
		while (fileBlocks[frontIndex] !== -1) {
			frontIndex++;
		}
		if (frontIndex > backIndex) continue;
		fileBlocks[frontIndex] = fileBlocks[backIndex];
		fileBlocks[backIndex] = -1;
		backIndex--;
	}
}

function rearrangeFileblocksWhole(fileBlocks: number[]): void {
	let backIndex = fileBlocks.length - 1;
	let file: number[] = [];
	let lastId: number = Infinity;
	while (backIndex > -1) {
		while (fileBlocks[backIndex] === -1 || fileBlocks[backIndex] >= lastId) {
			backIndex--;
			continue;
		}
		while (file.length === 0 || fileBlocks[backIndex] === file[0]) {
			file.push(fileBlocks[backIndex]);
			backIndex--;
		}
		frontLoop: for (let frontIndex = 0; frontIndex <= backIndex; frontIndex++) {
			for (let i = 0; i < file.length; i++) {
				if (fileBlocks[frontIndex + i] !== -1) {
					continue frontLoop;
				}
			}
			for (let i = 0; i < file.length; i++) {
				fileBlocks[frontIndex + i] = fileBlocks[backIndex + i + 1];
				fileBlocks[backIndex + i + 1] = -1;
			}
			break frontLoop;
		}
		lastId = file[0];
		file = [];
	}
}

function calculateChecksum(fileBlocks: number[]): number {
	let total = 0;
	fileBlocks.forEach((id, index) => {
		if (id === -1) return;
		total += index * id;
	});
	return total;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
