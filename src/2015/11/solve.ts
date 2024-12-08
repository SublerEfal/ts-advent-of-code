import fs from "fs";

const input = "cqjxjnds";

// write code here
function solvePart1(): string {
	let str = input;
	while (!isValidPassword(str)) {
		str = incrementString(str);
	}
	return str;
}

function solvePart2(): string {
	let str = input;
	while (!isValidPassword(str)) {
		str = incrementString(str);
	}
	str = incrementString(str);
	while (!isValidPassword(str)) {
		str = incrementString(str);
	}
	return str;
}

function incrementString(str: string): string {
	const lastCharacter = str[str.length - 1];
	const charCode = lastCharacter.charCodeAt(0);
	let newCharacter = lastCharacter === "z" ? "a" : String.fromCharCode(charCode + 1);
	if (newCharacter === "i") newCharacter = "j";
	if (newCharacter === "o") newCharacter = "p";
	if (newCharacter === "l") newCharacter = "m";
	let strWithoutLastCharacter = str.substring(0, str.length - 1);
	let newString = strWithoutLastCharacter + newCharacter;
	if (newCharacter === "a" && strWithoutLastCharacter === "") {
		newString = "a" + newCharacter;
	} else if (newCharacter === "a") {
		newString = incrementString(strWithoutLastCharacter) + newCharacter;
	}
	return newString;
}

function isValidPassword(str: string): boolean {
	if (/[iol]/.test(str)) return false;

	const charCode_a = "a".charCodeAt(0);
	const charCode_x = "x".charCodeAt(0);
	const charCode_z = "z".charCodeAt(0);

	let hasStraightSequence: boolean = false;
	for (let i = charCode_a; i <= charCode_x; i++) {
		const sequence = String.fromCharCode(i) + String.fromCharCode(i + 1) + String.fromCharCode(i + 2);
		if (str.indexOf(sequence) !== -1) {
			hasStraightSequence = true;
			break;
		}
	}
	if (!hasStraightSequence) return false;

	let foundDoubles: number = 0;
	for (let i = charCode_a; i <= charCode_z; i++) {
		const sequence = String.fromCharCode(i) + String.fromCharCode(i);
		if (str.indexOf(sequence) !== -1) {
			foundDoubles++;
			if (foundDoubles > 1) break;
		}
	}
	if (foundDoubles < 2) return false;

	return true;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
