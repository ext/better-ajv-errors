import { beforeAll, describe, it, expect } from "vitest";
import path from "node:path";
import { parse } from "@humanwhocodes/momoa";
import { getSchemaAndData } from "../../test-helpers";
import AdditionalPropValidationError from "../additional-prop";

const colors = {
	error: (text) => `<red>${text}</color>`,
	property: (text) => `<magenta>${text}</color>`,
	bold: (text) => `<bold>${text}</intensity>`,
};

const fixturePath = path.join(__dirname, "..", "..", "__fixtures__");

expect.addSnapshotSerializer({
	serialize(text) {
		return String(text);
	},
	test(val) {
		return typeof val === "string";
	},
});

describe("Additional properties", () => {
	let schema, data, jsonRaw, jsonAst;
	beforeAll(async () => {
		[schema, data] = await getSchemaAndData("additional-prop", fixturePath);
		jsonRaw = JSON.stringify(data, null, 2);
		jsonAst = parse(jsonRaw);
	});

	it("prints correctly", () => {
		const error = new AdditionalPropValidationError(
			{
				keyword: "additionalProperties",
				dataPath: "",
				schemaPath: "#/additionalProperties",
				params: { additionalProperty: "bar" },
				message: "should NOT have additional properties",
			},
			{ data, schema, jsonRaw, jsonAst, colors },
		);

		expect(error.print().join("\n")).toMatchSnapshot();
	});
});
