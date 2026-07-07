import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";

const FEATURE_PAGES = [
	"/features/private-chat",
	"/features/fantasies",
	"/features/date-planner",
	"/features/bucket-list",
	"/for/parents",
	"/for/long-distance",
	"/for/married-couples",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();
	return [
		{
			url: SITE_URL,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		...FEATURE_PAGES.map((path) => ({
			url: `${SITE_URL}${path}`,
			lastModified,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
		{
			url: `${SITE_URL}/download`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/ideas`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...GUIDES.map((guide) => ({
			url: `${SITE_URL}/ideas/${guide.slug}`,
			lastModified: new Date(guide.dateModified),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: `${SITE_URL}/support`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/privacy`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.4,
		},
		{
			url: `${SITE_URL}/terms`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.4,
		},
	];
}
