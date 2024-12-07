import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const inputLines = input.split("\n").map((line) => line.trim());

// write code here
const cities: string[] = [];
const distances: { city1: string; city2: string; distance: number }[] = [];
inputLines.forEach((line) => {
	const split = line.match(/(\w+) to (\w+) = (\d+)/)!;
	const city1 = split[1];
	const city2 = split[2];
	const distance = parseInt(split[3]);
	distances.push({ city1: city1, city2: city2, distance });
	distances.push({ city2: city1, city1: city2, distance });
	for (const city of [city1, city2]) {
		if (!cities.includes(city)) {
			cities.push(city);
		}
	}
});

function solvePart1(): number {
	return findDistance(null, cities, Math.min);
}

function solvePart2(): number {
	return findDistance(null, cities, Math.max);
}

function findDistance(currentCity: null | string, cities: string[], compareFunction: (a: number, b: number) => number): number {
	if (cities.length === 0) {
		return 0;
	}
	let result: number | null = null;
	for (const city of cities) {
		const distance = currentCity ? distances.find((d) => d.city1 === currentCity && d.city2 === city)!.distance : 0;
		const remainingCities = cities.filter((c) => c !== city);
		const remainingDistance = findDistance(city, remainingCities, compareFunction);
		const totalDistance = distance + remainingDistance;
		if (result === null) {
			result = totalDistance;
		} else {
			result = compareFunction(result, totalDistance);
		}
	}
	if (result === null) throw new Error("No result found");
	return result;
}
// finish writing code here

console.log("Part 1 result: " + solvePart1());
console.log("Part 2 result: " + solvePart2());
