import Image from "next/image";
import Link from "next/link";
import { Header } from "./header";
import { Footer } from "./footer";
import { StoreBadges } from "./store-badges";
import { ScrollReveal } from "./scroll-reveal";
import { SITE_URL } from "@/lib/constants";
import { CLUSTERS, getGuide, type Guide } from "@/lib/guides";

/* Long-form article layout for /ideas guides. */

/** Render "[label](href)" spans in content strings as internal links. */
function renderInline(text: string) {
	const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
	if (parts.length === 1) return text;
	return parts.map((part, i) => {
		const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
		if (!match) return part;
		return (
			<Link
				key={i}
				href={match[2]}
				className="text-primary hover:text-primary-strong underline decoration-primary/40 underline-offset-2 transition-colors"
			>
				{match[1]}
			</Link>
		);
	});
}

/** Plain-text version of content strings for JSON-LD. */
function stripInline(text: string) {
	return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function getGuideJsonLd(guide: Guide) {
	return [
		{
			"@context": "https://schema.org",
			"@type": "Article",
			headline: guide.title,
			description: guide.metaDescription,
			image: `${SITE_URL}${guide.image.src}`,
			datePublished: guide.datePublished,
			dateModified: guide.dateModified,
			author: {
				"@type": "Organization",
				name: "Parfect",
				url: SITE_URL,
			},
			publisher: {
				"@type": "Organization",
				name: "Parfect",
				logo: {
					"@type": "ImageObject",
					url: `${SITE_URL}/images/icon.png`,
				},
			},
			mainEntityOfPage: `${SITE_URL}/ideas/${guide.slug}`,
		},
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: guide.faqs.map((faq) => ({
				"@type": "Question",
				name: faq.question,
				acceptedAnswer: { "@type": "Answer", text: stripInline(faq.answer) },
			})),
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Parfect", item: SITE_URL },
				{
					"@type": "ListItem",
					position: 2,
					name: "Ideas for couples",
					item: `${SITE_URL}/ideas`,
				},
				{
					"@type": "ListItem",
					position: 3,
					name: guide.cardTitle,
					item: `${SITE_URL}/ideas/${guide.slug}`,
				},
			],
		},
	];
}

function IdeaList({
	ideas,
	startIndex,
}: {
	ideas: NonNullable<Guide["sections"][number]["ideas"]>;
	startIndex: number;
}) {
	const compact = ideas.every((idea) => !idea.description);

	if (compact) {
		return (
			<ol className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-6">
				{ideas.map((idea, i) => (
					<li key={idea.title} className="flex gap-3 items-baseline">
						<span className="font-display text-sm text-primary/70 font-medium shrink-0 w-6 text-right">
							{startIndex + i}.
						</span>
						<p className="leading-relaxed">{idea.title}</p>
					</li>
				))}
			</ol>
		);
	}

	return (
		<ul className="space-y-4 mt-6">
			{ideas.map((idea) => (
				<li
					key={idea.title}
					className="rounded-2xl border border-border/60 bg-surface/50 p-5 sm:p-6"
				>
					<h3 className="font-display text-lg font-medium mb-1.5">
						{idea.title}
					</h3>
					{idea.description && (
						<p className="text-muted leading-relaxed">
							{renderInline(idea.description)}
						</p>
					)}
				</li>
			))}
		</ul>
	);
}

export function GuidePage({ guide }: { guide: Guide }) {
	const jsonLd = getGuideJsonLd(guide);
	const related = guide.related
		.map((slug) => getGuide(slug))
		.filter((g): g is Guide => Boolean(g));

	// Continuous numbering across compact (question-style) lists.
	let compactCounter = 1;

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

					<div className="relative container-narrow section-padding pt-28 md:pt-36 pb-10 md:pb-14">
						<nav aria-label="Breadcrumb" className="mb-6">
							<ol className="flex items-center gap-2 text-sm text-muted-deep">
								<li>
									<Link href="/" className="hover:text-foreground transition-colors">
										Home
									</Link>
								</li>
								<li aria-hidden="true">/</li>
								<li>
									<Link
										href="/ideas"
										className="hover:text-foreground transition-colors"
									>
										Ideas
									</Link>
								</li>
								<li aria-hidden="true">/</li>
								<li aria-current="page" className="text-muted">
									{guide.cardTitle}
								</li>
							</ol>
						</nav>

						<p className="animate-fade-up eyebrow mb-4">{guide.eyebrow}</p>
						<h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight mb-5 text-balance">
							{guide.title}
						</h1>
						<p className="animate-fade-up-delay-2 text-sm text-muted-deep">
							{guide.readingTime} · Updated{" "}
							{new Date(guide.dateModified).toLocaleDateString("en-US", {
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
				</section>

				{/* Article */}
				<article className="py-12 md:py-16">
					<div className="container-narrow section-padding">
						<div className="space-y-5 text-muted text-lg leading-relaxed">
							{guide.intro.map((paragraph, i) => (
								<p key={i}>{renderInline(paragraph)}</p>
							))}
						</div>

						<figure className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 card-glow my-10 md:my-12">
							<Image
								src={guide.image.src}
								alt={guide.image.alt}
								fill
								priority
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 768px"
							/>
						</figure>

						{guide.sections.map((section) => {
							const isCompact =
								section.ideas?.every((idea) => !idea.description) ?? false;
							const startIndex = isCompact ? compactCounter : 1;
							if (isCompact && section.ideas) {
								compactCounter += section.ideas.length;
							}

							return (
								<section
									key={section.id}
									id={section.id}
									className="mt-12 md:mt-16 scroll-mt-24"
									aria-labelledby={`${section.id}-heading`}
								>
									<h2
										id={`${section.id}-heading`}
										data-reveal
										className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-5 text-balance"
									>
										{section.heading}
									</h2>
									{section.paragraphs && (
										<div
											data-reveal
											className="space-y-4 text-muted text-lg leading-relaxed"
										>
											{section.paragraphs.map((paragraph, i) => (
												<p key={i}>{renderInline(paragraph)}</p>
											))}
										</div>
									)}
									{section.ideas && (
										<div data-reveal>
											<IdeaList ideas={section.ideas} startIndex={startIndex} />
										</div>
									)}
									{section.tip && (
										<aside
											data-reveal
											className="mt-6 rounded-2xl border border-gold/30 bg-gold/[0.07] p-5 sm:p-6"
										>
											<p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-gold mb-1.5">
												Worth remembering
											</p>
											<p className="leading-relaxed text-foreground/90">
												{section.tip}
											</p>
										</aside>
									)}
								</section>
							);
						})}

						{/* App hook */}
						<aside
							data-reveal
							className="hero-card p-7 sm:p-9 mt-14 md:mt-16"
							aria-label="Try Parfect"
						>
							<h2 className="font-display text-2xl font-medium tracking-tight mb-3 text-balance">
								{guide.appHook.heading}
							</h2>
							<p className="text-muted leading-relaxed mb-5">
								{guide.appHook.text}
							</p>
							<div className="flex flex-col sm:flex-row sm:items-center gap-4">
								<StoreBadges />
								<Link
									href={guide.appHook.href}
									className="text-primary hover:text-primary-strong font-medium text-sm transition-colors"
								>
									{guide.appHook.linkLabel} →
								</Link>
							</div>
						</aside>

						{/* FAQ */}
						<section
							className="mt-14 md:mt-16"
							aria-labelledby="guide-faq-heading"
						>
							<h2
								id="guide-faq-heading"
								data-reveal
								className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-8 text-balance"
							>
								Common questions
							</h2>
							<div className="space-y-5">
								{guide.faqs.map((faq, index) => (
									<article
										key={faq.question}
										data-reveal
										style={{ transitionDelay: `${index * 60}ms` }}
										className="rounded-2xl border border-border/60 bg-surface/50 p-6"
									>
										<h3 className="font-display text-lg font-medium mb-2">
											{faq.question}
										</h3>
										<p className="text-muted leading-relaxed">
											{renderInline(faq.answer)}
										</p>
									</article>
								))}
							</div>
						</section>
					</div>
				</article>

				{/* Related guides */}
				{related.length > 0 && (
					<section
						className="py-14 md:py-20 bg-background-elevated/50 border-t border-border/40"
						aria-labelledby="related-guides-heading"
					>
						<div className="container-wide section-padding">
							<h2
								id="related-guides-heading"
								data-reveal
								className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-8 text-balance"
							>
								More ideas for you two
							</h2>
							<div className="grid sm:grid-cols-3 gap-5">
								{related.map((item, index) => (
									<Link
										key={item.slug}
										href={`/ideas/${item.slug}`}
										data-reveal
										style={{ transitionDelay: `${index * 80}ms` }}
										className="group rounded-2xl border border-border/60 bg-surface/40 overflow-hidden transition-[border-color,background-color] duration-200 hover:border-primary/40 hover:bg-surface"
									>
										<div className="relative aspect-[16/9]">
											<Image
												src={item.image.src}
												alt=""
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
												sizes="(max-width: 640px) 100vw, 340px"
											/>
										</div>
										<div className="p-5">
											<p className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-muted-deep mb-1.5">
												{CLUSTERS[item.cluster].label}
											</p>
											<p className="font-display text-lg font-medium mb-1 group-hover:text-primary-strong transition-colors">
												{item.cardTitle}
											</p>
											<p className="text-muted text-sm leading-relaxed">
												{item.cardDescription}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</section>
				)}

				{/* CTA */}
				<section className="py-16 md:py-20" aria-labelledby="guide-cta-heading">
					<div className="container-narrow section-padding text-center">
						<h2
							id="guide-cta-heading"
							data-reveal
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
						>
							Make it happen — together
						</h2>
						<p data-reveal className="text-muted text-lg max-w-xl mx-auto mb-8">
							Parfect is the private app where couples keep their questions,
							plans, and someday-dreams in one place. Free to download.
						</p>
						<div data-reveal>
							<StoreBadges size="lg" className="justify-center" />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
