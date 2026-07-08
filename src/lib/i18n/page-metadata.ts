import type { Metadata } from "next";
import { buildAlternates, localizedUrl } from "./metadata";
import type { Locale } from "@/i18n/routing";

type PageMetadataOptions = {
	path: string;
	locale: Locale;
	title: string;
	description: string;
	ogImage?: string;
	type?: "website" | "article";
};

export function createPageMetadata({
	path,
	locale,
	title,
	description,
	ogImage = "/images/hero-home.webp",
	type = "website",
}: PageMetadataOptions): Metadata {
	const url = localizedUrl(path, locale);

	return {
		title,
		description,
		alternates: buildAlternates({ path, locale }),
		openGraph: {
			title,
			description,
			url,
			type,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}
