import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FeaturePage } from "@/components/feature-page";
import { buildAlternates, localizedUrl } from "@/lib/i18n/metadata";
import {
	getFeaturePageContent,
	getFeaturePageMetadata,
	type FeaturePageKey,
} from "@/lib/content/feature-pages";
import { routing, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function createFeaturePage(key: FeaturePageKey) {
	async function generateStaticParams() {
		return routing.locales.map((locale) => ({ locale }));
	}

	async function generateMetadata({ params }: Props): Promise<Metadata> {
		const { locale } = await params;
		const meta = await getFeaturePageMetadata(key, locale as Locale);

		return {
			title: meta.title,
			description: meta.description,
			alternates: buildAlternates({
				path: meta.path,
				locale: locale as Locale,
			}),
			openGraph: {
				title: meta.ogTitle,
				description: meta.ogDescription,
				url: localizedUrl(meta.path, locale as Locale),
			},
		};
	}

	async function Page({ params }: Props) {
		const { locale } = await params;
		setRequestLocale(locale);
		const content = await getFeaturePageContent(key, locale as Locale);
		return <FeaturePage content={content} />;
	}

	return { generateMetadata, Page, generateStaticParams };
}
