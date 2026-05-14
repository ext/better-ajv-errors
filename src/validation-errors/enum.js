import leven from "leven";
import pointer from "jsonpointer";
import BaseValidationError from "./base";

export default class EnumValidationError extends BaseValidationError {
	print() {
		const {
			message,
			params: { allowedValues },
		} = this.options;
		const { error, property, bold } = this.colors;
		const bestMatch = this.findBestMatch();

		const line1 = error(`${bold("ENUM")} ${message}`);
		const line2 = error(`(${allowedValues.join(", ")})`);
		const output = [line1, `${line2}\n`];

		return output.concat(
			this.getCodeFrame(
				bestMatch !== null
					? `Did you mean ${property(bestMatch)} here?`
					: `Unexpected value, should be equal to one of the allowed values`,
			),
		);
	}

	getError() {
		const { message, params } = this.options;
		const bestMatch = this.findBestMatch();
		const allowedValues = params.allowedValues.join(", ");

		const output = {
			...this.getLocation(),
			error: `${this.getDecoratedPath()} ${message}: ${allowedValues}`,
			path: this.instancePath,
		};

		if (bestMatch !== null) {
			output.suggestion = `Did you mean ${bestMatch}?`;
		}

		return output;
	}

	findBestMatch() {
		const {
			params: { allowedValues },
		} = this.options;

		const currentValue =
			this.instancePath === "" ? this.data : pointer.get(this.data, this.instancePath);

		if (!currentValue) {
			return null;
		}

		const bestMatch = allowedValues
			.map((value) => ({
				value,
				weight: leven(value, currentValue.toString()),
			}))
			.sort((x, y) => (x.weight > y.weight ? 1 : x.weight < y.weight ? -1 : 0))[0];

		return allowedValues.length === 1 || bestMatch.weight < bestMatch.value.length
			? bestMatch.value
			: null;
	}
}
