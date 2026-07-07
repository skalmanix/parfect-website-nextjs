export const NAV_ANCHORS = [
	{ href: "/#experience", label: "Experience" },
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/#couples", label: "Testimonials" },
	{ href: "/#privacy", label: "Privacy" },
] as const;

export const IDEAS_LINK = { href: "/ideas", label: "Ideas" } as const;

export const DOWNLOAD_LINK = { href: "/download", label: "Get the app" } as const;

export const FEATURE_LINKS = [
	{
		href: "/features/private-chat",
		label: "Private chat",
		description: "Encrypted messaging made only for two.",
		image: "/images/features/private-chat.webp",
	},
	{
		href: "/features/fantasies",
		label: "Fantasies",
		description: "Share what you've never said out loud.",
		image: "/images/features/fantasies.webp",
	},
	{
		href: "/features/date-planner",
		label: "Date planner",
		description: "From \u201cwe should\u201d to a booked Saturday.",
		image: "/images/features/date-planner.webp",
	},
	{
		href: "/features/bucket-list",
		label: "Bucket list",
		description: "Shared dreams that actually happen.",
		image: "/images/features/bucket-list.webp",
	},
] as const;

export const AUDIENCE_LINKS = [
	{
		href: "/for/parents",
		label: "For parents",
		description: "Partners, not just co-parents.",
	},
	{
		href: "/for/long-distance",
		label: "For long-distance",
		description: "Close, from anywhere.",
	},
	{
		href: "/for/married-couples",
		label: "For married couples",
		description: "Keep choosing each other.",
	},
] as const;
