import Image from "next/image";
import { STEPS } from "@/lib/constants";

export function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="py-20 md:py-28 scroll-mt-20"
			aria-labelledby="how-heading"
		>
			<div className="container-wide section-padding">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div>
						<p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
							How it works
						</p>
						<h2
							id="how-heading"
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4"
						>
							From first message to date night
						</h2>
						<p className="text-muted text-lg mb-10">
							Getting started takes less than two minutes. Pair with your
							partner and start building the relationship you both want.
						</p>

						<ol className="space-y-8">
							{STEPS.map((step) => (
								<li key={step.step} className="flex gap-5">
									<span className="font-display text-3xl text-primary/60 font-medium shrink-0 w-12">
										{step.step}
									</span>
									<div>
										<h3 className="font-display text-xl font-medium mb-1">
											{step.title}
										</h3>
										<p className="text-muted leading-relaxed">
											{step.description}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>

					<div className="relative">
						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-2xl overflow-hidden border border-border/60 card-glow mt-8">
								<Image
									src="/images/hero-onboarding.webp"
									alt="Parfect onboarding — pair with your partner"
									width={400}
									height={700}
									className="w-full h-auto"
									sizes="(max-width: 768px) 45vw, 250px"
								/>
							</div>
							<div className="rounded-2xl overflow-hidden border border-border/60 card-glow">
								<Image
									src="/images/hero-date.webp"
									alt="Parfect date night planning screen"
									width={400}
									height={700}
									className="w-full h-auto"
									sizes="(max-width: 768px) 45vw, 250px"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
