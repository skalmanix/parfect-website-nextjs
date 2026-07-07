import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import {
	hreflangCodes,
	openGraphLocales,
	routing,
	type Locale,
} from "@/i18n/routing";

/** Build a localized path (English has no prefix). */
export function localizedPath(path: string, locale: Locale): string {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	if (locale === routing.defaultLocale) {
		return normalized === "/" ? "/" : normalized;
	}
	return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/** Absolute URL for a path in a given locale. */
export function localizedUrl(path: string, locale: Locale): string {
	const localized = localizedPath(path, locale);
	return `${SITE_URL}${localized === "/" ? "" : localized}`;
}

/** hreflang alternates for Next.js metadata (includes x-default). */
export function getLanguageAlternates(path: string): Record<string, string> {
	const languages: Record<string, string> = {};

	for (const locale of routing.locales) {
		languages[hreflangCodes[locale]] = localizedUrl(path, locale);
	}

	languages["x-default"] = localizedUrl(path, routing.defaultLocale);
	return languages;
}

type MetadataAlternatesOptions = {
	path: string;
	locale: Locale;
	canonicalPath?: string;
};

export function buildAlternates({
	path,
	locale,
	canonicalPath,
}: MetadataAlternatesOptions): Metadata["alternates"] {
	const canonical = localizedUrl(canonicalPath ?? path, locale);

	return {
		canonical,
		languages: getLanguageAlternates(path),
	};
}

export function buildOpenGraphLocale(locale: Locale): string {
	return openGraphLocales[locale];
}
