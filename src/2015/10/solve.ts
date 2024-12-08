import fs from "fs";

const input = "3113322113";

// write code here
function solvePart1(): number {
	return lookAndSayNTimes(input, 40).length;
}

function solvePart2(): number {
	return lookAndSayNTimes(input, 50).length;
}

function lookAndSayNTimes(str: string, times: number): string {
	for (let i = 0; i < times; i++) {
		str = lookAndSay(str);
	}
	return str;
}

function lookAndSay(str: string): string {
	let index = 0;
	let newString = "";
	while (index < str.length) {
		const nr: string = str[index];
		let count = 0;
		while (str[index] === nr) {
			index++;
			count++;
		}
		newString += count.toString() + nr.toString();
	}
	return newString;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
