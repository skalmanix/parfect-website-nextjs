import type { Locale } from "@/i18n/routing";
import type { Guide } from "./types";
import enGuides from "../../../messages/en/guides-content.json";
import svGuides from "../../../messages/sv/guides-content.json";
import noGuides from "../../../messages/no/guides-content.json";
import daGuides from "../../../messages/da/guides-content.json";
import deGuides from "../../../messages/de/guides-content.json";
import esGuides from "../../../messages/es/guides-content.json";

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

const guidesByLocale: Record<Locale, GuideContentFile> = {
	en: enGuides as GuideContentFile,
	sv: svGuides as GuideContentFile,
	no: noGuides as GuideContentFile,
	da: daGuides as GuideContentFile,
	de: deGuides as GuideContentFile,
	es: esGuides as GuideContentFile,
};

function buildGuides(locale: Locale): Guide[] {
	const content = guidesByLocale[locale] ?? guidesByLocale.en;
	return GUIDE_SLUGS.map((slug) => ({
		slug,
		...content.guides[slug],
	}));
}

export function getGuides(locale: Locale): Guide[] {
	return buildGuides(locale);
}

export function getGuide(slug: string, locale: Locale): Guide | undefined {
	return getGuides(locale).find((guide) => guide.slug === slug);
}

export function getGuidesByCluster(
	cluster: Guide["cluster"],
	locale: Locale,
): Guide[] {
	return getGuides(locale).filter((guide) => guide.cluster === cluster);
}

export const GUIDES = getGuides("en");
