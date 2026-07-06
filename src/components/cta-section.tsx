import { Logo } from "./logo";
import { StoreBadges } from "./store-badges";

export function CtaSection() {
	return (
		<section
			className="py-20 md:py-28 relative overflow-hidden"
			aria-labelledby="cta-heading"
		>
			<div className="absolute inset-0 app-gradient-bg opacity-80" aria-hidden="true" />

			<div className="container-wide section-padding relative">
				<div data-reveal className="rounded-[2rem] border border-border/60 hero-card p-8 md:p-12 lg:p-16 text-center max-w-3xl mx-auto">
					<div className="flex justify-center mb-6">
						<Logo size={64} showWordmark={false} />
					</div>
					<h2
						id="cta-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						Your next step starts here
					</h2>
					<p className="text-muted text-lg mb-8 max-w-lg mx-auto">
						This is for us. Download Parfect and begin the conversation
						that brings you closer — one message, one dream, one date night
						at a time.
					</p>
					<StoreBadges size="lg" className="justify-center mb-4" />
					<p className="text-muted-deep text-sm">
						Available on iOS and Android · Free download
					</p>
				</div>
			</div>
		</section>
	);
}
