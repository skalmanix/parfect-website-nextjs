import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

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
