const CLIENT_NAMESPACES = [
	"Common",
	"GuidesUI",
	"AppTabs",
	"AppPreview",
	"HomeScreen",
	"ChatScreen",
	"FantasiesScreen",
	"TogetherScreen",
	"DateScreen",
] as const;

export function pickClientMessages(
	messages: Record<string, unknown>,
): Record<string, unknown> {
	const picked: Record<string, unknown> = {};
	for (const namespace of CLIENT_NAMESPACES) {
		if (namespace in messages) {
			picked[namespace] = messages[namespace];
		}
	}
	return picked;
}
