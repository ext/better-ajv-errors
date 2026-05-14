import { describe, it, expect } from "vitest";
import path from "node:path";
import { parse } from "@humanwhocodes/momoa";
import { getSchemaAndData } from "../../test-helpers";
import RequiredValidationError from "../required";

const colors = {
	error: (text) => `<red>${text}</color>`,
	property: (text) => `<magenta>${text}</color>`,
	bold: (text) => `<bold>${text}</intensity>`,
};

const fixturePath = path.join(__dirname, "..", "__fixtures__");

expect.addSnapshotSerializer({
	serialize(text) {
		return String(text);
	},
	test(val) {
		return typeof val === "string";
	},
});

describe("Required", () => {
	it("prints correctly for missing required prop", async () => {
		const [schema, data] = await getSchemaAndData("required", fixturePath);
		const jsonRaw = JSON.stringify(data, null, 2);
		const jsonAst = parse(jsonRaw);

		const error = new RequiredValidationError(
			{
				keyword: "required",
				dataPath: "/nested",
				schemaPath: "#/required",
				params: { missingProperty: "id" },
				message: `should have required property 'id'`,
			},
			{ data, schema, jsonRaw, jsonAst, colors },
		);

		expect(error.print().join("\n")).toMatchSnapshot();
	});
});
