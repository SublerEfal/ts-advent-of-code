// import "./2015/13/solve";

(async function () {
	const year = process.argv[2];
	const day = process.argv[3].padStart(2, "0");
	await import(`./${year}/${day}/solve`);
})();
