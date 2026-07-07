import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Moments } from "@/components/moments";
import { AppPreview } from "@/components/app-preview";
import { Pillars } from "@/components/pillars";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { PrivacySection } from "@/components/privacy-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StickyCta } from "@/components/sticky-cta";
import { getFaqSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const faqSchema = await getFaqSchema(locale as Locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
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
