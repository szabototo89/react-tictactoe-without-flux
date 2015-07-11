export const range = function range(start = 0, count = 0) {
	if (count < 0) {
		throw Error("count cannot be negative number.")
	}

	let result = [];

	for (let i = 0; i < count; i++) {
		result.push(start + i);
	}

	return result;
}