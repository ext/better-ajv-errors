import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/__tests__/**/*.js"],
		coverage: {
			include: ["src/**/*.[jt]s"],
			exclude: ["**/__tests__/**", "**/*.d.ts", "**/index.[jt]s"],
			reporter: ["text", "text-summary", "html", "json", "lcov"],
		},
	},
});
