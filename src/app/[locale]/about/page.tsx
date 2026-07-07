import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StoreBadges } from "@/components/store-badges";
import { RatingStars, AvatarCluster } from "@/components/testimonials";
import { buildAlternates, localizedUrl } from "@/lib/i18n/metadata";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

type Value = { title: string; text: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "About" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: buildAlternates({ path: "/about", locale: locale as Locale }),
		openGraph: {
			title: t("metaTitle"),
			description: t("metaDescription"),
			url: localizedUrl("/about", locale as Locale),
			type: "website",
		},
	};
}

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("About");
	const tRating = await getTranslations("Common.rating");
	const story = t.raw("story") as string[];
	const values = t.raw("values") as Value[];

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "AboutPage",
			name: t("metaTitle"),
			description: t("metaDescription"),
			url: localizedUrl("/about", locale as Locale),
			about: {
				"@type": "Organization",
				name: "Parfect",
				url: SITE_URL,
				logo: `${SITE_URL}/images/icon.png`,
				email: SUPPORT_EMAIL,
				foundingLocation: {
					"@type": "Place",
					address: { "@type": "PostalAddress", addressCountry: "SE" },
				},
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Parfect", item: SITE_URL },
				{
					"@type": "ListItem",
					position: 2,
					name: t("eyebrow"),
					item: localizedUrl("/about", locale as Locale),
				},
			],
		},
	];

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ScrollReveal />
			<Header />
			<main>
				{/* Hero */}
				<section className="relative overflow-hidden border-b border-border/40">
					<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
					<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

					<div className="relative container-narrow section-padding pt-28 md:pt-36 pb-14 md:pb-20">
						<p className="animate-fade-up eyebrow mb-4">{t("eyebrow")}</p>
						<h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight mb-5 text-balance">
							{t("title")}
						</h1>
						<p className="animate-fade-up-delay-2 text-muted text-lg sm:text-xl leading-relaxed max-w-2xl">
							{t("intro")}
						</p>
					</div>
				</section>

				{/* Story */}
				<section
					className="py-14 md:py-20"
					aria-labelledby="about-story-heading"
				>
					<div className="container-narrow section-padding">
						<div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
							<div>
								<h2
									id="about-story-heading"
									data-reveal
									className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-6 text-balance"
								>
									{t("storyHeading")}
								</h2>
								<div className="space-y-5">
									{story.map((paragraph) => (
										<p
											key={paragraph.slice(0, 32)}
											data-reveal
											className="text-muted leading-relaxed text-[1.05rem]"
										>
											{paragraph}
										</p>
									))}
								</div>
							</div>
							<div data-reveal className="lg:sticky lg:top-28">
								<div className="relative rounded-3xl overflow-hidden aspect-[3/4] border border-border/60">
									<Image
										src="/images/people/couple-sofa.webp"
										alt=""
										fill
										sizes="(min-width: 1024px) 420px, 90vw"
										className="object-cover"
										quality={70}
									/>
									<div
										className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
										aria-hidden="true"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Values */}
				<section
					className="py-14 md:py-20 border-t border-border/40"
					aria-labelledby="about-values-heading"
				>
					<div className="container-narrow section-padding">
						<h2
							id="about-values-heading"
							data-reveal
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-10 text-balance"
						>
							{t("valuesHeading")}
						</h2>
						<div className="grid sm:grid-cols-2 gap-5">
							{values.map((value, index) => (
								<article
									key={value.title}
									data-reveal
									style={{ transitionDelay: `${index * 60}ms` }}
									className="rounded-2xl border border-border/60 bg-surface/50 p-7"
								>
									<h3 className="font-display text-xl font-medium mb-2.5">
										{value.title}
									</h3>
									<p className="text-muted leading-relaxed">{value.text}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Made in Sweden */}
				<section
					className="py-14 md:py-20 border-t border-border/40"
					aria-labelledby="about-madein-heading"
				>
					<div className="container-narrow section-padding">
						<div data-reveal className="hero-card p-7 sm:p-10">
							<h2
								id="about-madein-heading"
								className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-balance"
							>
								{t("madeInHeading")}
							</h2>
							<p className="text-muted leading-relaxed max-w-2xl mb-5">
								{t("madeInText")}
							</p>
							<a
								href={`mailto:${SUPPORT_EMAIL}`}
								className="text-primary hover:text-primary-strong font-medium text-sm transition-colors"
							>
								{SUPPORT_EMAIL}
							</a>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section
					className="py-16 md:py-24 border-t border-border/40 text-center"
					aria-labelledby="about-cta-heading"
				>
					<div className="container-narrow section-padding">
						<h2
							id="about-cta-heading"
							data-reveal
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-8 text-balance"
						>
							{t("ctaHeading")}
						</h2>
						<div data-reveal>
							<StoreBadges size="lg" className="justify-center mb-7" />
							<Link
								href="/#couples"
								className="inline-flex items-center gap-3 group"
							>
								<AvatarCluster />
								<span className="flex flex-col items-start">
									<RatingStars ariaLabel={tRating("stars")} />
									<span className="text-muted text-sm group-hover:text-foreground transition-colors">
										{tRating("line")}
									</span>
								</span>
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
