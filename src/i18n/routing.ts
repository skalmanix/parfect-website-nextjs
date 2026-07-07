import { defineRouting } from "next-intl/routing";

export const locales = ["en", "sv", "no", "da", "de", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** ISO 639-1 codes used in hreflang tags. */
export const hreflangCodes: Record<Locale, string> = {
	en: "en",
	sv: "sv",
	no: "no",
	da: "da",
	de: "de",
	es: "es",
};

/** Open Graph locale codes (language_TERRITORY). */
export const openGraphLocales: Record<Locale, string> = {
	en: "en_US",
	sv: "sv_SE",
	no: "nb_NO",
	da: "da_DK",
	de: "de_DE",
	es: "es_ES",
};

export const localeNames: Record<Locale, string> = {
	en: "English",
	sv: "Svenska",
	no: "Norsk",
	da: "Dansk",
	de: "Deutsch",
	es: "Español",
};

export const routing = defineRouting({
	locales,
	defaultLocale,
	localePrefix: "as-needed",
	localeDetection: true,
});
