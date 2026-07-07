import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/guide-page";
import { getGuide, getGuides } from "@/lib/guides";
import { buildAlternates, localizedUrl } from "@/lib/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		getGuides(locale).map((guide) => ({ locale, slug: guide.slug })),
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const guide = getGuide(slug, locale as Locale);
	if (!guide) return {};

	const path = `/ideas/${guide.slug}`;

	return {
		title: guide.metaTitle,
		description: guide.metaDescription,
		alternates: buildAlternates({ path, locale: locale as Locale }),
		openGraph: {
			title: guide.metaTitle,
			description: guide.metaDescription,
			url: localizedUrl(path, locale as Locale),
			type: "article",
			images: [{ url: guide.image.src }],
		},
		twitter: {
			card: "summary_large_image",
			title: guide.metaTitle,
			description: guide.metaDescription,
		},
	};
}

export default async function Page({ params }: Props) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const guide = getGuide(slug, locale as Locale);
	if (!guide) notFound();

	return <GuidePage guide={guide} locale={locale as Locale} />;
}
