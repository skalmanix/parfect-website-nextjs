import Image from "next/image";
import { PILLARS } from "@/lib/constants";
import {
	ChatIllustration,
	FantasyIllustration,
	TogetherIllustration,
} from "./pillar-illustrations";
import { AppTabs } from "./app-tabs";

const illustrations = {
	chat: ChatIllustration,
	fantasies: FantasyIllustration,
	together: TogetherIllustration,
} as const;

const accentColors = {
	primary: "text-primary border-primary/30 bg-primary/10",
	rose: "text-rose border-rose/30 bg-rose/10",
	gold: "text-gold border-gold/30 bg-gold/10",
} as const;

export function Pillars() {
	return (
		<section
			id="pillars"
			className="py-20 md:py-28 scroll-mt-20"
			aria-labelledby="pillars-heading"
		>
			<div className="container-wide section-padding">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<p className="eyebrow text-primary mb-3">Three pillars</p>
					<h2
						id="pillars-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4"
					>
						Built the way your relationship actually works
					</h2>
					<p className="text-muted text-lg">
						Talk, share, and make it real — the same journey you&apos;ll
						follow inside the app.
					</p>
				</div>

				<div className="space-y-8 md:space-y-10">
					{PILLARS.map((pillar, index) => {
						const Illustration = illustrations[pillar.id];
						return (
							<article
								key={pillar.id}
								className={`pillar-card grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center p-6 md:p-8 ${
									index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
								}`}
							>
								<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
									<div className="mb-6">
										<Illustration className="w-36 h-36 sm:w-44 sm:h-44" />
									</div>
									<span
										className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border mb-4 ${accentColors[pillar.accent]}`}
									>
										{pillar.tagline}
									</span>
									<h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-3">
										{pillar.title}
									</h3>
									<p className="text-muted text-lg leading-relaxed mb-5 max-w-md">
										{pillar.description}
									</p>
									<ul className="space-y-2.5 text-left w-full max-w-md">
										{pillar.highlights.map((highlight) => (
											<li
												key={highlight}
												className="flex items-start gap-3 text-foreground/90 text-sm sm:text-base"
											>
												<span
													className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
														pillar.accent === "primary"
															? "bg-primary"
															: pillar.accent === "rose"
																? "bg-rose"
																: "bg-gold"
													}`}
													aria-hidden="true"
												/>
												{highlight}
											</li>
										))}
									</ul>
								</div>

								<div className="relative mx-auto w-full max-w-[300px]">
									<div className="phone-frame">
										<div className="phone-notch" aria-hidden="true" />
										<div className="phone-screen relative">
											<Image
												src={pillar.image}
												alt={`Parfect ${pillar.tagline} screen`}
												width={720}
												height={1280}
												className="w-full h-full object-cover object-top"
												sizes="300px"
											/>
										</div>
										<AppTabs active={pillar.tab} />
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
