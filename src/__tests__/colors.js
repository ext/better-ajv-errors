import { describe, it, expect } from "vitest";
import { normalizeColors } from "../colors";

describe("normalizeColors", () => {
	it("returns passthrough functions for all keys when called with no argument", () => {
		const colors = normalizeColors();
		expect(colors.error("text")).toBe("text");
		expect(colors.property("text")).toBe("text");
		expect(colors.bold("text")).toBe("text");
	});

	it("returns passthrough functions for all keys when called with empty object", () => {
		const colors = normalizeColors({});
		expect(colors.error("text")).toBe("text");
		expect(colors.property("text")).toBe("text");
		expect(colors.bold("text")).toBe("text");
	});

	it("preserves supplied keys and fills missing keys with passthrough", () => {
		const customError = (text) => `[error]${text}[/error]`;
		const colors = normalizeColors({ error: customError });
		expect(colors.error("text")).toBe("[error]text[/error]");
		expect(colors.property("text")).toBe("text");
		expect(colors.bold("text")).toBe("text");
	});

	it("preserves all keys when a full object is supplied", () => {
		const customError = (text) => `E:${text}`;
		const customProperty = (text) => `P:${text}`;
		const customBold = (text) => `B:${text}`;
		const colors = normalizeColors({
			error: customError,
			property: customProperty,
			bold: customBold,
		});
		expect(colors.error("x")).toBe("E:x");
		expect(colors.property("x")).toBe("P:x");
		expect(colors.bold("x")).toBe("B:x");
	});
});
