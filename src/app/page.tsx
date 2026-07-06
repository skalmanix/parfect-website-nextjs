import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AppPreview } from "@/components/app-preview";
import { Pillars } from "@/components/pillars";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { PrivacySection } from "@/components/privacy-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<AppPreview />
				<Pillars />
				<Features />
				<HowItWorks />
				<PrivacySection />
				<CtaSection />
			</main>
			<Footer />
		</>
	);
}
