/** Route paths with translation keys for labels. */

export const HOW_IT_WORKS_LINK = {
	href: "/#how-it-works",
	key: "howItWorks",
} as const;

/** Trust cluster: social proof, who we are, safety. */
export const WHY_PARFECT_LINKS = [
	{ href: "/#couples", key: "testimonials" },
	{ href: "/about", key: "aboutUs" },
	{ href: "/#privacy", key: "privacySecurity" },
] as const;

export const IDEAS_PATH = "/ideas";
export const DOWNLOAD_PATH = "/download";

export const FEATURE_LINKS = [
	{
		href: "/features/private-chat",
		key: "privateChat",
		image: "/images/features/private-chat.webp",
	},
	{
		href: "/features/fantasies",
		key: "fantasies",
		image: "/images/features/fantasies.webp",
	},
	{
		href: "/features/date-planner",
		key: "datePlanner",
		image: "/images/features/date-planner.webp",
	},
	{
		href: "/features/bucket-list",
		key: "bucketList",
		image: "/images/features/bucket-list.webp",
	},
] as const;

export const AUDIENCE_LINKS = [
	{ href: "/for/parents", key: "forParents" },
	{ href: "/for/long-distance", key: "forLongDistance" },
	{ href: "/for/married-couples", key: "forMarriedCouples" },
] as const;

/** @deprecated Use DOWNLOAD_PATH with translations */
export const DOWNLOAD_LINK = { href: DOWNLOAD_PATH, label: "Get the app" } as const;

/** @deprecated Use IDEAS_PATH with translations */
export const IDEAS_LINK = { href: IDEAS_PATH, label: "Ideas" } as const;

/** @deprecated Use NAV_ANCHORS with translations */
export const NAV_ANCHORS_LEGACY = [
	{ href: "/#experience", label: "Experience" },
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/#couples", label: "Testimonials" },
	{ href: "/#privacy", label: "Privacy" },
] as const;
