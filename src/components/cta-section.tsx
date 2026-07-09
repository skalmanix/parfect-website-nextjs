import { getTranslations } from "next-intl/server";
import { ResponsiveImage } from "@/components/responsive-image";
import { Logo } from "./logo";
import { StoreBadges } from "./store-badges";
import { AvatarCluster, RatingStars } from "./testimonials";

export async function CtaSection() {
	const t = await getTranslations("Home.cta");
	const tRating = await getTranslations("Common.rating");

	return (
		<section
			className="py-24 md:py-36 relative overflow-hidden"
			aria-labelledby="cta-heading"
		>
			<div className="absolute inset-0" aria-hidden="true">
				<ResponsiveImage
					src="/images/people/couple-night-walk.webp"
					alt=""
					preset="heroBg"
					fill
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 55% 65% at 50% 55%, color-mix(in srgb, var(--background) 55%, transparent) 0%, transparent 100%)",
					}}
				/>
			</div>

			<div className="container-wide section-padding relative">
				<div data-reveal className="text-center max-w-3xl mx-auto">
					<div className="flex justify-center mb-6">
						<Logo size={64} showWordmark={false} />
					</div>
					<h2
						id="cta-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<p className="text-muted text-lg mb-8 max-w-lg mx-auto">
						{t("description")}
					</p>
					<StoreBadges size="lg" className="justify-center mb-5" />
					<div className="flex items-center justify-center gap-3 mb-2">
						<AvatarCluster />
						<span className="text-left">
							<RatingStars size="w-3.5 h-3.5" ariaLabel={tRating("stars")} />
							<span className="block text-xs text-muted-deep">
								{tRating("line")}
							</span>
						</span>
					</div>
					<p className="text-muted-deep text-sm">{t("availability")}</p>
				</div>
			</div>
		</section>
	);
}
