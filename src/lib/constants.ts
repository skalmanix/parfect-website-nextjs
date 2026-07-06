export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://parfect.app";

export const ANDROID_PACKAGE = "com.app.parfect";

export const APP_STORE_URL =
	process.env.NEXT_PUBLIC_APP_STORE_URL ??
	"https://apps.apple.com/app/parfect-couples-app";

export const PLAY_STORE_URL =
	process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
	`https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

export const PRIVACY_URL = "https://api.parfect.app/privacy";
export const TERMS_URL = "https://api.parfect.app/terms";
export const SUPPORT_URL = "https://api.parfect.app/support";

export const APP_TABS = [
	{ id: "chat", label: "Chat", icon: "chat" },
	{ id: "fantasies", label: "Fantasies", icon: "sparkles" },
	{ id: "together", label: "Together", icon: "heart" },
] as const;

export const PILLARS = [
	{
		id: "chat",
		tab: "chat" as const,
		title: "Talk like it's only you two",
		tagline: "Chat",
		description:
			"A private thread that's just yours. Set messages to disappear, speak freely, and stay close even when you're apart.",
		image: "/images/pattern-chat.webp",
		accent: "primary" as const,
		highlights: [
			"Real-time messaging for two",
			"Disappearing messages & read receipts",
			"Optional end-to-end encryption",
		],
	},
	{
		id: "fantasies",
		tab: "fantasies" as const,
		title: "Share what you imagine",
		tagline: "Fantasies",
		description:
			"Send a fantasy or ask for one. Gentle prompts help you open up, and \"not right now\" is always okay.",
		image: "/images/hero-home.webp",
		accent: "rose" as const,
		highlights: [
			"Daily prompts to spark curiosity",
			"Ask or share at your own pace",
			"Graduate shared dreams to your bucket list",
		],
	},
	{
		id: "together",
		tab: "together" as const,
		title: "Make the moments real",
		tagline: "Together",
		description:
			"Turn sparks into a shared bucket list, plan date nights, even line up a sitter — together.",
		image: "/images/hero-together.webp",
		accent: "gold" as const,
		highlights: [
			"Shared bucket list & date planning",
			"Babysitter coordination built in",
			"Anniversaries & important dates",
		],
	},
] as const;

export const APP_SCREENSHOTS = [
	{
		id: "chat",
		src: "/images/pattern-chat.webp",
		label: "Private chat",
		tab: "chat" as const,
	},
	{
		id: "home",
		src: "/images/hero-home.webp",
		label: "Fantasies home",
		tab: "fantasies" as const,
	},
	{
		id: "together",
		src: "/images/hero-together.webp",
		label: "Together tab",
		tab: "together" as const,
	},
	{
		id: "date",
		src: "/images/hero-date.webp",
		label: "Date night",
		tab: "together" as const,
	},
] as const;

export const FEATURES = [
	{
		title: "Weekly check-ins",
		description:
			"Reflect together with thoughtful questions — revealed side by side when you're both ready.",
		icon: "checkin",
	},
	{
		title: "Shared calendar",
		description:
			"Never miss an anniversary. Plan date nights and track the moments that matter.",
		icon: "calendar",
	},
	{
		title: "App lock & biometrics",
		description:
			"PIN lock and biometric protection keep your relationship private on your device.",
		icon: "lock",
		image: "/images/hero-lock.webp",
	},
	{
		title: "Connection growth",
		description:
			"Watch your constellation grow as you share moments and build your story together.",
		icon: "constellation",
	},
	{
		title: "Privacy-first design",
		description:
			"Content-free notifications, pause controls, and clear data policies.",
		icon: "shield",
	},
	{
		title: "Made for two",
		description:
			"Pair once with an invite code. No feeds, no followers, no one else.",
		icon: "rings",
		image: "/images/hero-onboarding.webp",
	},
] as const;

export const STEPS = [
	{
		step: "01",
		title: "Download & pair",
		description:
			"Get the app, create your account, and invite your partner with a private code. Under two minutes.",
	},
	{
		step: "02",
		title: "Talk, share, dream",
		description:
			"Chat privately, explore fantasies with gentle prompts, and build a bucket list together.",
	},
	{
		step: "03",
		title: "Take the next step",
		description:
			"Turn ideas into date nights, coordinate the details, and celebrate what brings you closer.",
	},
] as const;
