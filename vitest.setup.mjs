import { expect } from "vitest";
import { $ } from "kleur/colors";
import prettyAnsi from "pretty-ansi";

/* force colors to be enabled for the snapshot tests */
$.enabled = true;

expect.addSnapshotSerializer({
	serialize(text) {
		return prettyAnsi(text);
	},
	test(val) {
		return typeof val === "string" && val.includes("\u001b");
	},
});
