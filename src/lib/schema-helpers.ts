/** Combine multiple schema.org nodes into a single JSON-LD @graph document. */
export function buildSchemaGraph(
	items: Record<string, unknown>[],
): Record<string, unknown> {
	const graph = items.map((item) => {
		const { "@context": _context, ...node } = item;
		return node;
	});

	return {
		"@context": "https://schema.org",
		"@graph": graph,
	};
}

export function buildBreadcrumbSchema(
	items: { name: string; item: string }[],
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((entry, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: entry.name,
			item: entry.item,
		})),
	};
}

export function buildWebPageSchema({
	name,
	description,
	url,
}: {
	name: string;
	description: string;
	url: string;
}): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name,
		description,
		url,
	};
}
