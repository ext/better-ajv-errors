import path from "node:path";
import Ajv from "ajv";
import Ajv7 from "ajv7";
import Ajv8 from "ajv8";
import { getSchemaAndData } from "../test-helpers";
import betterAjvErrors from "../";

const fixturePath = path.join(__dirname, "..", "__fixtures__");

function ajv7() {
	return new Ajv7();
}

function ajv8() {
	return new Ajv8();
}

function latest() {
	return new Ajv();
}

describe.each([
	["AJV v7", ajv7],
	["AJV v8", ajv8],
	["AJV latest", latest],
])("%s", (_, getAjvInstance) => {
	it("should output error with reconstructed codeframe", async () => {
		const [schema, data] = await getSchemaAndData("default", fixturePath);
		const ajv = getAjvInstance();
		const validate = ajv.compile(schema);
		const valid = validate(data);
		expect(valid).toBeFalsy();

		const res = betterAjvErrors(schema, data, validate.errors, {
			format: "cli",
			indent: 2,
		});
		expect(res).toMatchSnapshot();
	});

	it("should output error with codeframe", async () => {
		const [schema, data, json] = await getSchemaAndData("default", fixturePath);
		const ajv = getAjvInstance();
		const validate = ajv.compile(schema);
		const valid = validate(data);
		expect(valid).toBeFalsy();

		const res = betterAjvErrors(schema, data, validate.errors, {
			format: "cli",
			json,
		});
		expect(res).toMatchSnapshot();
	});

	it("should output proper error for enumeration", async () => {
		const [schema, data] = await getSchemaAndData("enum", fixturePath);
		const ajv = getAjvInstance();
		const validate = ajv.compile(schema);
		const valid = validate(data);
		expect(valid).toBeFalsy();

		const res = betterAjvErrors(schema, data, validate.errors, {
			format: "cli",
			indent: 2,
		});
		expect(res).toMatchSnapshot();
	});
	it("should output proper error for enumeration in anyOf", async () => {
		const [schema, data] = await getSchemaAndData("enum-anyof", fixturePath);
		const ajv = getAjvInstance();
		const validate = ajv.compile(schema);
		const valid = validate(data);
		expect(valid).toBeFalsy();

		const res = betterAjvErrors(schema, data, validate.errors, {
			format: "cli",
			indent: 2,
		});
		expect(res).toMatchSnapshot();
	});
});
