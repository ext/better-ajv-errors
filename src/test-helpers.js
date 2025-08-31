import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readJsonFile(filePath) {
	const content = await readFile(filePath, "utf8");
	return JSON.parse(content);
}

export async function getSchemaAndData(name, fixturesPath) {
	const schemaPath = path.join(fixturesPath, name, "schema.json");
	const schema = await readJsonFile(schemaPath);
	const dataPath = path.join(fixturesPath, name, "data.json");
	const json = await readFile(dataPath, "utf8");
	const data = JSON.parse(json);
	return [schema, data, json];
}
