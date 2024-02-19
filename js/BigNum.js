const mapSuffix = num => {
	if (num < 3) {
		return {suffix: "", carry: num};
	}
	const suffixes = ["k", "M", "B", "T", "Q"];
	let index = Math.floor((num - 3) / 3);

	if (index > suffixes.length - 1) {
		index = suffixes.length - 1;
	}

	return index >= 0
		? { suffix: suffixes[index], carry: num - 3 - (index * 3) }
		: undefined;
};

class BigNum {
	constructor(num) {
		this.initialize(num);
	}

	initialize(num) {
		this.value = num;
		this.numAsExp = num.toExponential(); // Will output "X.XXXXe±XXXX"
		this.indexOfExponent = this.numAsExp.indexOf("e");

		this.displayedForm = BigNum.generateDisplayedForm(this.numAsExp, this.indexOfExponent);
	}

	static generateDisplayedForm(numAsExp, indexOfExponent) {
		const significand = Number(numAsExp.slice(0, indexOfExponent));
		const exponent = Number(numAsExp.slice(indexOfExponent + 2));
		const suffixAndCarry = mapSuffix(exponent);
		const suffix = suffixAndCarry.suffix;
		const carry = Math.pow(10, suffixAndCarry.carry);

		if (suffix === "") {
			return (significand * carry).toString();
		}
		return (significand * carry).toFixed(2) + suffix;
	}

	toString() {
		return this.displayedForm;
	}

	addEqual(other) {
		this.initialize(this.value + other);
	}

	mult(other) {
		return new BigNum(this.value * other);
	}

	multEqual(other) {
		this.initialize(this.value * other);
	}

	isLessThanOrEqualTo(other) {
		return this.value <= other;
	}
}

export default BigNum;