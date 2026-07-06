import { Logo } from "./logo";
import { StoreBadges } from "./store-badges";

export function Hero() {
	return (
		<section className="relative min-h-[100svh] overflow-hidden">
			<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
			<div
				className="absolute inset-0 bg-[url('/images/hero-onboarding.webp')] bg-cover bg-center opacity-30"
				aria-hidden="true"
			/>
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

						<h1 className="animate-fade-up-delay-1 font-display text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.05] tracking-tight mb-5">
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
							<StoreBadges size="lg" className="mb-4" />
							<p className="text-muted-deep text-sm">
								Free on iOS & Android · Ages 18+
							</p>
						</div>
					</div>

					<div className="animate-fade-up-delay-2 flex justify-center lg:justify-end">
						<HeroShowcase />
					</div>
				</div>
			</div>
		</section>
	);
}

function HeroShowcase() {
	return (
		<div className="relative w-full max-w-[340px]">
			<div className="hero-card mb-4 p-5">
				<div className="flex items-center gap-2 mb-3">
					<svg
						className="w-3.5 h-3.5 text-gold"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					<span className="eyebrow text-gold">Tonight&apos;s prompt</span>
				</div>
				<p className="font-display text-xl leading-snug">
					What&apos;s one small thing your partner did lately that made you
					feel loved?
				</p>
			</div>

			<div className="phone-frame relative">
				<div className="phone-notch" aria-hidden="true" />
				<div
					className="phone-screen bg-cover bg-center min-h-[520px]"
					style={{ backgroundImage: "url('/images/hero-home.webp')" }}
					role="img"
					aria-label="Parfect app home screen preview"
				/>
			</div>

			<div className="absolute -bottom-3 -left-3 sm:-left-6 hero-card p-4 max-w-[220px] hidden sm:block">
				<p className="text-xs text-sage font-medium mb-1">Date night planned</p>
				<p className="text-sm font-display">Saturday · 7:30 PM</p>
			</div>
		</div>
	);
}
