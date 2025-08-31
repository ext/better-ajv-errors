import path from "node:path";
import { parse } from "@humanwhocodes/momoa";
import { getSchemaAndData } from "../../test-helpers";
import RequiredValidationError from "../required";

const fixturePath = path.join(__dirname, "..", "__fixtures__");

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
			{ data, schema, jsonRaw, jsonAst },
		);

		expect(error.print()).toMatchSnapshot();
	});
});
