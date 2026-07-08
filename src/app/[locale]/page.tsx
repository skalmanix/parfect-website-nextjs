import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Moments } from "@/components/moments";
import { Pillars } from "@/components/pillars";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { PrivacySection } from "@/components/privacy-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import { buildOpenGraphLocale } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";

const AppPreview = dynamic(
	() => import("@/components/app-preview").then((mod) => mod.AppPreview),
);

const StickyCta = dynamic(
	() => import("@/components/sticky-cta").then((mod) => mod.StickyCta),
);

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Metadata" });
	const base = createPageMetadata({
		path: "/",
		locale: locale as Locale,
		title: t("titleDefault"),
		description: t("description"),
	});

	return {
		...base,
		openGraph: {
			...base.openGraph,
			locale: buildOpenGraphLocale(locale as Locale),
			title: t("ogTitle"),
			description: t("ogDescription"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("twitterTitle"),
			description: t("twitterDescription"),
			images: ["/images/hero-home.webp"],
		},
	};
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<ScrollReveal />
			<Header />
			<main>
				<Hero />
				<Moments />
				<AppPreview />
				<Pillars />
				<Features />
				<HowItWorks />
				<Testimonials />
				<PrivacySection />
				<CtaSection />
			</main>
			<Footer />
			<StickyCta />
		</>
	);
}
