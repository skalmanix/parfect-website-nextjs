import type { Locale } from "@/i18n/routing";
import type { Guide } from "./types";

const GUIDE_SLUGS = [
	"date-night-ideas-at-home",
	"date-ideas-for-parents",
	"long-distance-date-ideas",
	"questions-for-couples",
	"how-to-reconnect-with-your-partner",
	"couples-bucket-list-ideas",
	"valentines-day-date-ideas",
	"anniversary-date-ideas",
] as const;

type GuideContentFile = {
	guides: Record<string, Omit<Guide, "slug">>;
};

const guidesCache = new Map<Locale, Guide[]>();

async function loadGuidesContent(locale: Locale): Promise<GuideContentFile> {
	const mod = await import(`../../../messages/${locale}/guides-content.json`);
	return mod.default as GuideContentFile;
}

function buildGuides(
	content: GuideContentFile,
	fallback: GuideContentFile,
): Guide[] {
	return GUIDE_SLUGS.map((slug) => ({
		slug,
		...(content.guides[slug] ?? fallback.guides[slug]),
	}));
}

export async function getGuides(locale: Locale): Promise<Guide[]> {
	const cached = guidesCache.get(locale);
	if (cached) return cached;

	const [content, fallback] = await Promise.all([
		loadGuidesContent(locale),
		locale === "en" ? Promise.resolve(null) : loadGuidesContent("en"),
	]);

	const guides = buildGuides(content, fallback ?? content);
	guidesCache.set(locale, guides);
	return guides;
}

export async function getGuide(
	slug: string,
	locale: Locale,
): Promise<Guide | undefined> {
	const guides = await getGuides(locale);
	return guides.find((guide) => guide.slug === slug);
}

export async function getGuidesByCluster(
	cluster: Guide["cluster"],
	locale: Locale,
): Promise<Guide[]> {
	const guides = await getGuides(locale);
	return guides.filter((guide) => guide.cluster === cluster);
}
