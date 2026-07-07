import type { Metadata } from "next";
import { buildAlternates, localizedUrl } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";

type PageMetadataOptions = {
	path: string;
	title: string;
	description: string;
	ogTitle?: string;
	ogDescription?: string;
};

export function createLocalizedMetadata({
	path,
	title,
	description,
	ogTitle,
	ogDescription,
}: PageMetadataOptions) {
	return async function generateMetadata({
		params,
	}: {
		params: Promise<{ locale: string }>;
	}): Promise<Metadata> {
		const { locale } = await params;
		const resolvedLocale = locale as Locale;

		return {
			title,
			description,
			alternates: buildAlternates({ path, locale: resolvedLocale }),
			openGraph: {
				title: ogTitle ?? title,
				description: ogDescription ?? description,
				url: localizedUrl(path, resolvedLocale),
			},
		};
	};
}
