import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import {
	getOrganizationSchema,
	getSoftwareApplicationSchema,
	getWebSiteSchema,
} from "@/lib/schema";
import { buildAlternates, buildOpenGraphLocale, localizedUrl } from "@/lib/i18n/metadata";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/gtm";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const hanken = Hanken_Grotesk({
	variable: "--font-hanken",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: true,
});

const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: true,
});

export const viewport: Viewport = {
	themeColor: "#160910",
	colorScheme: "dark",
	width: "device-width",
	initialScale: 1,
};

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		return {};
	}

	const t = await getTranslations({ locale, namespace: "Metadata" });

	return {
		metadataBase: new URL(
			process.env.NEXT_PUBLIC_SITE_URL ?? "https://parfect.app",
		),
		title: {
			default: t("titleDefault"),
			template: t("titleTemplate"),
		},
		description: t("description"),
		keywords: t.raw("keywords") as string[],
		authors: [{ name: "Parfect" }],
		creator: "Parfect",
		openGraph: {
			type: "website",
			locale: buildOpenGraphLocale(locale),
			url: localizedUrl("/", locale as Locale),
			siteName: "Parfect",
			title: t("ogTitle"),
			description: t("ogDescription"),
			images: [
				{
					url: "/images/hero-home.webp",
					width: 720,
					height: 1560,
					alt: t("ogImageAlt"),
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: t("twitterTitle"),
			description: t("twitterDescription"),
			images: ["/images/hero-home.webp"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		alternates: buildAlternates({ path: "/", locale: locale as Locale }),
		category: "lifestyle",
		icons: {
			icon: [{ url: "/favicon.png", sizes: "96x96", type: "image/png" }],
			apple: [
				{ url: "/images/icon.png", sizes: "512x512", type: "image/png" },
			],
		},
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	const jsonLd = await Promise.all([
		getOrganizationSchema(locale as Locale),
		getSoftwareApplicationSchema(locale as Locale),
		getWebSiteSchema(locale as Locale),
	]);

	return (
		<html lang={locale} className="dark" data-scroll-behavior="smooth">
			<body
				className={`${hanken.variable} ${newsreader.variable} antialiased`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd),
					}}
				/>
				<GoogleTagManagerNoScript />
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
				<GoogleTagManager />
			</body>
		</html>
	);
}
