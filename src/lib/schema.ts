import {
	APP_STORE_URL,
	PLAY_STORE_URL,
	PRIVACY_URL,
	SITE_URL,
	SUPPORT_URL,
} from "./constants";

export function getOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Parfect",
		url: SITE_URL,
		logo: `${SITE_URL}/images/icon.png`,
		description:
			"A private couples app for intimate chat, shared fantasies, and turning dreams into real date nights.",
		sameAs: [
			"https://github.com/skalmanix/Parfect",
			...(APP_STORE_URL.startsWith("http") ? [APP_STORE_URL] : []),
			...(PLAY_STORE_URL.startsWith("http") ? [PLAY_STORE_URL] : []),
		],
	};
}

export function getSoftwareApplicationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Parfect",
		operatingSystem: "iOS, Android",
		applicationCategory: "LifestyleApplication",
		description:
			"Just the two of you. A private couples companion for intimate chat, fantasies, date planning, and relationship growth.",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		aggregateRating: undefined,
		downloadUrl: [
			...(APP_STORE_URL.startsWith("http") ? [APP_STORE_URL] : []),
			...(PLAY_STORE_URL.startsWith("http") ? [PLAY_STORE_URL] : []),
		],
		screenshot: `${SITE_URL}/images/hero-home.webp`,
		url: SITE_URL,
		author: {
			"@type": "Organization",
			name: "Parfect",
		},
	};
}

export function getWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Parfect",
		url: SITE_URL,
		description:
			"Download Parfect — the private app for couples who want to talk intimately, share dreams, and make them real.",
		publisher: {
			"@type": "Organization",
			name: "Parfect",
		},
	};
}

export function getFaqSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "What is Parfect?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Parfect is a private couples app that combines intimate chat, fantasy prompts, date planning, and relationship milestones in one warm, secure space made for two.",
				},
			},
			{
				"@type": "Question",
				name: "Is Parfect private?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes. Parfect is built for couples only — pair with an invite code, use optional end-to-end encryption, app lock with biometrics, and content-free push notifications. See our privacy policy for details.",
				},
			},
			{
				"@type": "Question",
				name: "Who is Parfect for?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Parfect is designed for committed couples aged 18+ who want to strengthen their relationship through meaningful communication, shared experiences, and intentional intimacy.",
				},
			},
		],
	};
}

export const LEGAL_LINKS = {
	privacy: PRIVACY_URL,
	terms: "https://api.parfect.app/terms",
	support: SUPPORT_URL,
} as const;
