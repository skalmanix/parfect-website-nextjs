import type { ReactNode } from "react";
import type { FeaturePageContent } from "@/components/feature-page";
import type { Locale } from "@/i18n/routing";
import {
	FEATURE_PAGE_KEYS,
	FEATURE_PAGE_PATHS,
	type FeaturePageKey,
} from "./feature-page-keys";

type FeaturePageData = {
	slug: string;
	metaTitle: string;
	metaDescription: string;
	ogTitle: string;
	ogDescription: string;
	eyebrow: string;
	titlePlain: string;
	titleBefore: string;
	titleHighlight: string;
	titleAfter: string;
	intro: string;
	screen: FeaturePageContent["screen"];
	tab: FeaturePageContent["tab"];
	story: { heading: string; paragraphs: string[] };
	image: { src: string; alt: string; caption: string };
	benefits: FeaturePageContent["benefits"];
	steps: FeaturePageContent["steps"];
	testimonial?: FeaturePageContent["testimonial"];
	faqs: FeaturePageContent["faqs"];
	related: FeaturePageContent["related"];
	cta: FeaturePageContent["cta"];
};

type FeaturesFile = {
	FeaturePages: Record<FeaturePageKey, FeaturePageData>;
};

async function loadFeatures(locale: Locale): Promise<FeaturesFile> {
	return (await import(`../../../messages/${locale}/features.json`))
		.default as FeaturesFile;
}

function buildTitle(data: FeaturePageData): ReactNode {
	return (
		<>
			{data.titleBefore}{" "}
			<span className="text-gradient">{data.titleHighlight}</span>{" "}
			{data.titleAfter}
		</>
	);
}

function mapFeaturePage(data: FeaturePageData): FeaturePageContent {
	return {
		slug: data.slug,
		eyebrow: data.eyebrow,
		titlePlain: data.titlePlain,
		title: buildTitle(data),
		intro: data.intro,
		screen: data.screen,
		tab: data.tab,
		story: data.story,
		image: data.image,
		benefits: data.benefits,
		steps: data.steps,
		testimonial: data.testimonial,
		faqs: data.faqs,
		related: data.related,
		cta: data.cta,
	};
}

export async function getFeaturePageContent(
	key: FeaturePageKey,
	locale: Locale,
): Promise<FeaturePageContent> {
	const features = await loadFeatures(locale);
	return mapFeaturePage(features.FeaturePages[key]);
}

export async function getFeaturePageMetadata(key: FeaturePageKey, locale: Locale) {
	const features = await loadFeatures(locale);
	const data = features.FeaturePages[key];
	return {
		title: data.metaTitle,
		description: data.metaDescription,
		ogTitle: data.ogTitle,
		ogDescription: data.ogDescription,
		path: FEATURE_PAGE_PATHS[key],
	};
}

export { FEATURE_PAGE_KEYS, FEATURE_PAGE_PATHS, type FeaturePageKey };
