import BaseValidationError from "./base";

export default class RequiredValidationError extends BaseValidationError {
	getLocation(dataPath = this.instancePath) {
		const { start } = super.getLocation(dataPath);
		return { start };
	}

	print() {
		const { message, params } = this.options;
		const { error, property, bold } = this.colors;
		const line = error(`${bold("REQUIRED")} ${message}`);
		const output = [`${line}\n`];

		return output.concat(this.getCodeFrame(`${property(params.missingProperty)} is missing here!`));
	}

	getError() {
		const { message } = this.options;

		return {
			...this.getLocation(),
			error: `${this.getDecoratedPath()} ${message}`,
			path: this.instancePath,
		};
	}
}
