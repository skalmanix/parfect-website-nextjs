import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
	APP_STORE_URL,
	PLAY_STORE_URL,
	PRIVACY_URL,
	SITE_URL,
	SUPPORT_URL,
	TERMS_URL,
} from "./constants";

export async function getOrganizationSchema(locale: Locale) {
	const t = await getTranslations({ locale, namespace: "Home.schema" });

	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Parfect",
		url: SITE_URL,
		logo: `${SITE_URL}/images/icon.png`,
		description: t("organizationDescription"),
		sameAs: [
			"https://github.com/skalmanix/Parfect",
			...(APP_STORE_URL.startsWith("http") ? [APP_STORE_URL] : []),
			...(PLAY_STORE_URL.startsWith("http") ? [PLAY_STORE_URL] : []),
		],
	};
}

export async function getSoftwareApplicationSchema(locale: Locale) {
	const t = await getTranslations({ locale, namespace: "Home.schema" });

	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Parfect",
		operatingSystem: "iOS, Android",
		applicationCategory: "LifestyleApplication",
		description: t("appDescription"),
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
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

export async function getWebSiteSchema(locale: Locale) {
	const t = await getTranslations({ locale, namespace: "Home.schema" });

	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Parfect",
		url: SITE_URL,
		description: t("websiteDescription"),
		publisher: {
			"@type": "Organization",
			name: "Parfect",
		},
	};
}

export const LEGAL_LINKS = {
	privacy: PRIVACY_URL,
	terms: TERMS_URL,
	support: SUPPORT_URL,
} as const;
