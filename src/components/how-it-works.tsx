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
					<div data-reveal>
						<p className="eyebrow text-gold mb-3">
							How it works
						</p>
						<h2
							id="how-heading"
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
						>
							From first message to date night
						</h2>
						<p className="text-muted text-lg mb-10">
							Getting started takes less than two minutes. Pair with your
							partner and start building the relationship you both want.
						</p>

						<ol className="space-y-8">
							{STEPS.map((step, index) => (
								<li
									key={step.step}
									data-reveal
									style={{ transitionDelay: `${index * 100}ms` }}
									className="flex gap-5"
								>
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

					<div data-reveal className="relative" style={{ transitionDelay: "150ms" }}>
						<div className="grid grid-cols-2 gap-4">
							<figure className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 card-glow mt-10">
								<Image
									src="/images/people/couple-sofa.webp"
									alt="Couple cuddled on the sofa smiling at a phone together"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 45vw, 250px"
								/>
								<figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chrome/90 to-transparent px-4 pt-8 pb-3">
									<p className="font-display text-sm">Closer every evening</p>
								</figcaption>
							</figure>
							<figure className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 card-glow">
								<Image
									src="/images/hero-together.webp"
									alt="Two hands reaching for each other surrounded by rose petals"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 45vw, 250px"
								/>
								<figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chrome/90 to-transparent px-4 pt-8 pb-3">
									<p className="font-display text-sm">The next step is yours</p>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
