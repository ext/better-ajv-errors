const passthrough = (text) => text;

export function normalizeColors(colors = {}) {
	return {
		error: colors.error ?? passthrough,
		property: colors.property ?? passthrough,
		bold: colors.bold ?? passthrough,
	};
}
