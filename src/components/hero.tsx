import Image from "next/image";
import { Logo } from "./logo";
import { StoreBadges } from "./store-badges";
import { AppTabs } from "./app-tabs";
import { HomeScreen } from "./app-screens";
import { AvatarCluster, RatingStars } from "./testimonials";
import { RATING_LINE } from "@/lib/testimonials";

export function Hero() {
	return (
		<section className="relative min-h-[100svh] overflow-hidden">
			<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
			<div className="absolute inset-0 opacity-30" aria-hidden="true">
				<Image
					src="/images/hero-onboarding.webp"
					alt=""
					fill
					loading="eager"
					fetchPriority="low"
					className="object-cover"
					sizes="100vw"
					quality={60}
				/>
			</div>
			<div className="absolute inset-0 welcome-scrim" aria-hidden="true" />
			<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

			<div className="relative container-wide section-padding pt-28 pb-20 md:pt-36 md:pb-28 min-h-[100svh] flex flex-col">
				<div className="flex-1 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
					<div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
						<div className="flex justify-center lg:justify-start mb-6 animate-fade-up">
							<Logo size={72} />
						</div>

						<p className="animate-fade-up-delay-1 eyebrow mb-4">
							Just the two of you
						</p>

						<h1 className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.05] tracking-tight mb-5 text-balance">
							Take the{" "}
							<span className="text-gradient">next step</span>{" "}
							together
						</h1>

						<p className="animate-fade-up-delay-2 text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
							A private space to talk, dream, and experience the moments
							you only imagine. No feeds. No followers. No one else.
						</p>

						<div
							id="download"
							className="animate-fade-up-delay-2 scroll-mt-28 flex flex-col items-center lg:items-start"
						>
							<StoreBadges size="lg" className="mb-5 justify-center lg:justify-start" />
							<ul className="flex flex-wrap justify-center lg:justify-start items-center gap-x-5 gap-y-2 text-sm text-muted-deep">
								<li className="flex items-center gap-1.5">
									<svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
									</svg>
									End-to-end encrypted
								</li>
								<li className="flex items-center gap-1.5">
									<svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
									</svg>
									No ads, ever
								</li>
								<li className="flex items-center gap-1.5">
									<svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
									</svg>
									Free + Premium
								</li>
							</ul>

							<a
								href="#couples"
								className="mt-6 inline-flex items-center gap-3 group"
							>
								<AvatarCluster />
								<span className="text-left">
									<RatingStars size="w-3.5 h-3.5" />
									<span className="block text-xs text-muted-deep group-hover:text-muted transition-colors">
										{RATING_LINE}
									</span>
								</span>
							</a>
						</div>
					</div>

					<div className="animate-fade-up-delay-2 flex justify-center lg:justify-end">
						<HeroShowcase />
					</div>
				</div>

				<a
					href="#experience"
					className="hidden md:flex flex-col items-center gap-1.5 text-muted-deep hover:text-muted transition-colors mx-auto mt-10 text-xs tracking-widest uppercase"
					aria-label="Scroll to explore the app"
				>
					Explore
					<svg className="w-4 h-4 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				</a>
			</div>
		</section>
	);
}

function HeroShowcase() {
	return (
		<div className="relative w-full max-w-[300px]">
			<div className="phone-frame relative">
				<div className="phone-notch" aria-hidden="true" />
				<div className="phone-screen">
					<HomeScreen />
					<div className="absolute bottom-0 inset-x-0 z-10">
						<AppTabs active="fantasies" />
					</div>
				</div>
			</div>

		</div>
	);
}
