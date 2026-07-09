import { ResponsiveImage } from "@/components/responsive-image";
import { getTranslations } from "next-intl/server";

const stepKeys = ["0", "1", "2"] as const;

export async function HowItWorks() {
	const t = await getTranslations("Home.howItWorks");

	return (
		<section
			id="how-it-works"
			className="py-20 md:py-28 scroll-mt-20"
			aria-labelledby="how-heading"
		>
			<div className="container-wide section-padding">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div data-reveal>
						<p className="eyebrow text-gold mb-3">{t("eyebrow")}</p>
						<h2
							id="how-heading"
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
						>
							{t("heading")}
						</h2>
						<p className="text-muted text-lg mb-10">{t("description")}</p>

						<ol className="space-y-8">
							{stepKeys.map((key, index) => (
								<li
									key={key}
									data-reveal
									style={{ transitionDelay: `${index * 100}ms` }}
									className="flex gap-5"
								>
									<span className="font-display text-3xl text-primary/60 font-medium shrink-0 w-12">
										{String(index + 1).padStart(2, "0")}
									</span>
									<div>
										<h3 className="font-display text-xl font-medium mb-1">
											{t(`steps.${key}.title`)}
										</h3>
										<p className="text-muted leading-relaxed">
											{t(`steps.${key}.description`)}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>

					<div
						data-reveal
						className="relative"
						style={{ transitionDelay: "150ms" }}
					>
						<div className="grid grid-cols-2 gap-4">
							<figure className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 card-glow mt-10">
								<ResponsiveImage
									src="/images/people/couple-sofa.webp"
									alt={t("images.sofa.alt")}
									preset="portraitCard"
									fill
								/>
								<figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chrome/90 to-transparent px-4 pt-8 pb-3">
									<p className="font-display text-sm">
										{t("images.sofa.caption")}
									</p>
								</figcaption>
							</figure>
							<figure className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 card-glow">
								<ResponsiveImage
									src="/images/people/couple-night-walk.webp"
									alt={t("images.together.alt")}
									preset="portraitCard"
									fill
								/>
								<figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chrome/90 to-transparent px-4 pt-8 pb-3">
									<p className="font-display text-sm">
										{t("images.together.caption")}
									</p>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
