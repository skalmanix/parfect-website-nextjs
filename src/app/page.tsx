import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Moments } from "@/components/moments";
import { AppPreview } from "@/components/app-preview";
import { Pillars } from "@/components/pillars";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { PrivacySection } from "@/components/privacy-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
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
				<PrivacySection />
				<CtaSection />
			</main>
			<Footer />
			<StickyCta />
		</>
	);
}
