import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getGuides } from "@/lib/guides";
import { getLanguageAlternates, localizedUrl } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

const FEATURE_PAGES = [
	"/features/private-chat",
	"/features/fantasies",
	"/features/date-planner",
	"/features/bucket-list",
	"/for/parents",
	"/for/long-distance",
	"/for/married-couples",
];

const STATIC_PAGES = [
	"/",
	"/download",
	"/ideas",
	"/support",
	"/privacy",
	"/terms",
];

function buildSitemapEntry(
	path: string,
	lastModified: Date,
	priority: number,
	changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
) {
	const languages = getLanguageAlternates(path);

	return routing.locales.map((locale) => ({
		url: localizedUrl(path, locale),
		lastModified,
		changeFrequency,
		priority,
		alternates: {
			languages,
		},
	}));
}

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();
	const entries: MetadataRoute.Sitemap = [];

	for (const path of STATIC_PAGES) {
		entries.push(
			...buildSitemapEntry(
				path,
				lastModified,
				path === "/" ? 1 : path === "/download" ? 0.9 : 0.8,
				path === "/" || path === "/ideas" ? "weekly" : "monthly",
			),
		);
	}

	for (const path of FEATURE_PAGES) {
		entries.push(...buildSitemapEntry(path, lastModified, 0.8));
	}

	for (const locale of routing.locales) {
		for (const guide of getGuides(locale)) {
			const path = `/ideas/${guide.slug}`;
			entries.push({
				url: localizedUrl(path, locale),
				lastModified: new Date(guide.dateModified),
				changeFrequency: "monthly",
				priority: 0.7,
				alternates: {
					languages: getLanguageAlternates(path),
				},
			});
		}
	}

	return entries;
}
