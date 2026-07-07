import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StoreBadges } from "@/components/store-badges";
import { buildAlternates, localizedUrl } from "@/lib/i18n/metadata";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

type FaqCategory = {
	id: string;
	title: string;
	items: { question: string; answer: string }[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Faq" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: buildAlternates({ path: "/faq", locale: locale as Locale }),
		openGraph: {
			title: t("metaTitle"),
			description: t("metaDescription"),
			url: localizedUrl("/faq", locale as Locale),
			type: "website",
		},
	};
}

export default async function FaqPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("Faq");
	const tCommon = await getTranslations("Common");
	const categories = t.raw("categories") as FaqCategory[];

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: categories.flatMap((category) =>
				category.items.map((item) => ({
					"@type": "Question",
					name: item.question,
					acceptedAnswer: { "@type": "Answer", text: item.answer },
				})),
			),
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Parfect", item: SITE_URL },
				{
					"@type": "ListItem",
					position: 2,
					name: t("title"),
					item: localizedUrl("/faq", locale as Locale),
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

					<div className="relative container-narrow section-padding pt-28 md:pt-36 pb-12 md:pb-16">
						<p className="animate-fade-up eyebrow mb-4">{t("eyebrow")}</p>
						<h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight mb-5 text-balance">
							{t("title")}
						</h1>
						<p className="animate-fade-up-delay-2 text-muted text-lg sm:text-xl leading-relaxed max-w-2xl">
							{t("intro")}
						</p>

						{/* Category jump links */}
						<nav
							className="animate-fade-up-delay-2 flex flex-wrap gap-2 mt-8"
							aria-label={t("title")}
						>
							{categories.map((category) => (
								<a
									key={category.id}
									href={`#${category.id}`}
									className="rounded-full border border-border/60 bg-surface/50 px-4 py-2 text-sm text-muted hover:text-foreground hover:border-primary/40 transition-colors"
								>
									{category.title}
								</a>
							))}
						</nav>
					</div>
				</section>

				{/* Categories */}
				<div className="py-12 md:py-16">
					<div className="container-narrow section-padding space-y-14 md:space-y-16">
						{categories.map((category) => (
							<section
								key={category.id}
								id={category.id}
								className="scroll-mt-24"
								aria-labelledby={`${category.id}-heading`}
							>
								<h2
									id={`${category.id}-heading`}
									data-reveal
									className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-balance"
								>
									{category.title}
								</h2>
								<div className="space-y-4">
									{category.items.map((item, index) => (
										<article
											key={item.question}
											data-reveal
											style={{ transitionDelay: `${index * 50}ms` }}
											className="rounded-2xl border border-border/60 bg-surface/50 p-6"
										>
											<h3 className="font-display text-lg font-medium mb-2">
												{item.question}
											</h3>
											<p className="text-muted leading-relaxed">{item.answer}</p>
										</article>
									))}
								</div>
							</section>
						))}

						{/* Contact */}
						<aside data-reveal className="hero-card p-7 sm:p-9" aria-label={t("contactHeading")}>
							<h2 className="font-display text-2xl font-medium tracking-tight mb-3 text-balance">
								{t("contactHeading")}
							</h2>
							<p className="text-muted leading-relaxed mb-5 max-w-xl">
								{t("contactText")}
							</p>
							<div className="flex flex-col sm:flex-row sm:items-center gap-4">
								<Link
									href="/support"
									className="text-primary hover:text-primary-strong font-medium text-sm transition-colors"
								>
									{t("contactLink")} →
								</Link>
								<a
									href={`mailto:${SUPPORT_EMAIL}`}
									className="text-muted hover:text-foreground text-sm transition-colors"
								>
									{SUPPORT_EMAIL}
								</a>
							</div>
						</aside>

						{/* CTA */}
						<section className="text-center" aria-labelledby="faq-cta-heading">
							<h2
								id="faq-cta-heading"
								data-reveal
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-6 text-balance"
							>
								{tCommon("nav.getApp")}
							</h2>
							<div data-reveal>
								<StoreBadges size="lg" className="justify-center" />
							</div>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
