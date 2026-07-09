import { ResponsiveImage } from "@/components/responsive-image";
import { getTranslations } from "next-intl/server";

const testimonialKeys = ["0", "1", "2", "3"] as const;

export async function Testimonials() {
	const t = await getTranslations("Home.testimonials");
	const tRating = await getTranslations("Common.rating");

	return (
		<section
			id="couples"
			className="py-20 md:py-28 bg-background-elevated/50 border-y border-border/40 scroll-mt-20"
			aria-labelledby="testimonials-heading"
		>
			<div className="container-wide section-padding">
				<div data-reveal className="text-center max-w-2xl mx-auto mb-12">
					<p className="eyebrow mb-4">{t("eyebrow")}</p>
					<h2
						id="testimonials-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<div className="flex items-center justify-center gap-2 text-muted">
						<RatingStars ariaLabel={tRating("stars")} />
						<span className="text-sm">{tRating("line")}</span>
					</div>
				</div>

				<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6 mb-5 md:mb-6">
					<figure
						data-reveal
						className="relative rounded-2xl overflow-hidden border border-border/60 card-glow min-h-[380px] flex"
					>
						<ResponsiveImage
							src="/images/people/couple-laughing.webp"
							alt={t("featured.alt")}
							preset="testimonialHero"
							fill
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-chrome/95 via-chrome/40 to-transparent"
							aria-hidden="true"
						/>
						<figcaption className="relative self-end p-6 md:p-8">
							<RatingStars ariaLabel={tRating("stars")} className="mb-3" />
							<blockquote className="font-display text-xl md:text-2xl leading-snug text-balance mb-4">
								&ldquo;{t("featured.quote")}&rdquo;
							</blockquote>
							<p className="text-sm">
								<span className="font-medium">{t("featured.names")}</span>
								<span className="text-muted">
									{" "}
									· {t("featured.context")}
								</span>
							</p>
						</figcaption>
					</figure>

					<div className="grid gap-5 md:gap-6">
						{testimonialKeys.slice(0, 2).map((key, index) => (
							<TestimonialCard
								key={key}
								quote={t(`items.${key}.quote`)}
								names={t(`items.${key}.names`)}
								context={t(`items.${key}.context`)}
								image={`/images/people/couple-${key === "0" ? "elin-jonas" : "sara-marcus"}.webp`}
								delay={index * 80}
								starsLabel={tRating("stars")}
							/>
						))}
					</div>
				</div>

				<div className="grid sm:grid-cols-2 gap-5 md:gap-6">
					{testimonialKeys.slice(2).map((key, index) => (
						<TestimonialCard
							key={key}
							quote={t(`items.${key}.quote`)}
							names={t(`items.${key}.names`)}
							context={t(`items.${key}.context`)}
							image={`/images/people/couple-${key === "2" ? "amira-daniel" : "kerstin-lars"}.webp`}
							delay={index * 80}
							starsLabel={tRating("stars")}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export function RatingStars({
	className = "",
	size = "w-4 h-4",
	ariaLabel = "Rated 4.9 out of 5",
}: {
	className?: string;
	size?: string;
	ariaLabel?: string;
}) {
	return (
		<span
			className={`inline-flex items-center gap-0.5 text-primary-strong ${className}`}
			aria-label={ariaLabel}
			role="img"
		>
			{[0, 1, 2, 3, 4].map((i) => (
				<svg
					key={i}
					className={size}
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
				</svg>
			))}
		</span>
	);
}

export function AvatarCluster({ className = "" }: { className?: string }) {
	const images = [
		"/images/people/couple-elin-jonas.webp",
		"/images/people/couple-sara-marcus.webp",
		"/images/people/couple-amira-daniel.webp",
	];

	return (
		<span className={`inline-flex ${className}`} aria-hidden="true">
			{images.map((src, i) => (
				<span
					key={src}
					className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-chrome"
					style={{ marginLeft: i === 0 ? 0 : "-0.55rem", zIndex: 3 - i }}
				>
					<ResponsiveImage src={src} alt="" preset="avatarXs" fill aria-hidden />
				</span>
			))}
		</span>
	);
}

function TestimonialCard({
	quote,
	names,
	context,
	image,
	delay,
	starsLabel,
}: {
	quote: string;
	names: string;
	context: string;
	image: string;
	delay: number;
	starsLabel: string;
}) {
	return (
		<figure
			data-reveal
			style={{ transitionDelay: `${delay}ms` }}
			className="rounded-2xl border border-border/60 bg-surface/60 p-6 md:p-7 flex flex-col"
		>
			<RatingStars className="mb-4" size="w-3.5 h-3.5" ariaLabel={starsLabel} />
			<blockquote className="text-muted leading-relaxed flex-1 mb-5">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<figcaption className="flex items-center gap-3">
				<span className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
					<ResponsiveImage src={image} alt={names} preset="avatarSm" fill />
				</span>
				<span>
					<span className="block text-sm font-medium">{names}</span>
					<span className="block text-xs text-muted">{context}</span>
				</span>
			</figcaption>
		</figure>
	);
}
