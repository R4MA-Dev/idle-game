const mapSuffix = num => {
	const suffixes = ["k", "M", "B", "T", "Q"];
	let index = Math.floor((num - 3) / 3);

	if (index > suffixes.length - 1) {
		index = suffixes.length - 1;
	}

	return index >= 0
		? { suffix: suffixes[index], carry: num - 3 - (index * 3) }
		: undefined;
};

class BigNum extends Number {
	constructor(num) {
		super(num);
		const numAsExp = num.toExponential();  // Will output "X.XXXXe±XXXX"
		const indexOfExponent = numAsExp.indexOf("e");

		this.significand = Number(numAsExp.slice(0, indexOfExponent));
		this.exponent = Number(numAsExp.slice(indexOfExponent + 2));

		const suffixAndCarry = mapSuffix(this.exponent);
		const suffix = suffixAndCarry.suffix;
		const carry = Math.pow(10, suffixAndCarry.carry);

		this.displayedForm = (this.significand * carry).toFixed(2) + suffix;
	}

	toString() {
		return this.displayedForm;
	}
}

export default BigNum;