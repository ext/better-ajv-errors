import BaseValidationError from "./base";

export default class DefaultValidationError extends BaseValidationError {
	print() {
		const { keyword, message } = this.options;
		const { error, property, bold } = this.colors;
		const line = error(`${bold(keyword.toUpperCase())} ${message}`);
		const output = [`${line}\n`];

		return output.concat(this.getCodeFrame(`${property(keyword)} ${message}`));
	}

	getError() {
		const { keyword, message } = this.options;

		return {
			...this.getLocation(),
			error: `${this.getDecoratedPath()}: ${keyword} ${message}`,
			path: this.instancePath,
		};
	}
}
