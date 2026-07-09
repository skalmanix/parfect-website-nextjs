import type { ReactNode } from "react";
import { ResponsiveImage } from "@/components/responsive-image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { StoreBadges } from "./store-badges";
import { ScrollReveal } from "./scroll-reveal";
import { AppTabs } from "./app-tabs";
import { SITE_URL } from "@/lib/constants";
import { localizedUrl } from "@/lib/i18n/metadata";
import { buildSchemaGraph } from "@/lib/schema-helpers";
import type { Locale } from "@/i18n/routing";
import { RatingStars } from "./testimonials";
import {
	ChatScreen,
	DateScreen,
	FantasiesScreen,
	HomeScreen,
	TogetherScreen,
} from "./app-screens";

/* Data-driven layout for feature and use-case landing pages. */

export type FeaturePageContent = {
	slug: string;
	eyebrow: string;
	titlePlain: string;
	title: ReactNode;
	intro: string;
	screen: "home" | "chat" | "fantasies" | "together" | "date";
	tab: "chat" | "fantasies" | "together";
	story: {
		heading: string;
		paragraphs: string[];
	};
	image: {
		src: string;
		alt: string;
		caption: string;
	};
	benefits: {
		heading: string;
		intro: string;
		items: { title: string; description: string; icon: IconName }[];
	};
	steps: {
		heading: string;
		intro: string;
		items: { title: string; description: string }[];
	};
	testimonial?: {
		quote: string;
		names: string;
		context: string;
		image: string;
	};
	faqs: { question: string; answer: string }[];
	related: { href: string; label: string; description: string }[];
	cta: {
		heading: string;
		text: string;
	};
};

const screens = {
	home: HomeScreen,
	chat: ChatScreen,
	fantasies: FantasiesScreen,
	together: TogetherScreen,
	date: DateScreen,
} as const;

type IconName =
	| "lock"
	| "chat"
	| "sparkles"
	| "heart"
	| "calendar"
	| "shield"
	| "clock"
	| "list"
	| "bell"
	| "map"
	| "star"
	| "phone";

const icons: Record<IconName, ReactNode> = {
	lock: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
	),
	chat: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
	),
	sparkles: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
	),
	heart: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
	),
	calendar: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
	),
	shield: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
	),
	clock: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
	),
	list: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
	),
	bell: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
	),
	map: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
	),
	star: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
	),
	phone: (
		<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
	),
};

function Icon({ name }: { name: IconName }) {
	return (
		<svg
			className="w-6 h-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
			aria-hidden="true"
		>
			{icons[name]}
		</svg>
	);
}

export function getFeaturePageJsonLd(
	content: FeaturePageContent,
	locale: Locale,
) {
	const pageUrl = localizedUrl(content.slug, locale);

	return buildSchemaGraph([
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: content.faqs.map((faq) => ({
				"@type": "Question",
				name: faq.question,
				acceptedAnswer: { "@type": "Answer", text: faq.answer },
			})),
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Parfect",
					item: SITE_URL,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: content.titlePlain,
					item: pageUrl,
				},
			],
		},
	]);
}

export async function FeaturePage({ content }: { content: FeaturePageContent }) {
	const t = await getTranslations("Common.featurePage");
	const locale = (await getLocale()) as Locale;
	const Screen = screens[content.screen];
	const jsonLd = getFeaturePageJsonLd(content, locale);
	const heroImage = content.slug.startsWith("/features/")
		? `/images/features/${content.slug.split("/").pop()}.webp`
		: "/images/people/couple-night-walk.webp";

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
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
					<div className="absolute inset-0 opacity-50" aria-hidden="true">
						<ResponsiveImage
							src={heroImage}
							alt=""
							preset="heroBg"
							fill
							priority
							fetchPriority="low"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
					</div>
					<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

					<div className="relative container-wide section-padding pt-28 md:pt-36 pb-16 md:pb-24">
						<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
							<div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
								<p className="animate-fade-up eyebrow mb-4">{content.eyebrow}</p>
								<h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-medium leading-[1.08] tracking-tight mb-5 text-balance">
									{content.title}
								</h1>
								<p className="animate-fade-up-delay-2 text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
									{content.intro}
								</p>
								<div className="animate-fade-up-delay-2 flex flex-col items-center lg:items-start">
									<StoreBadges size="lg" className="mb-4 justify-center lg:justify-start" />
									<p className="text-sm text-muted-deep">
										{t("trustLine")}
									</p>
								</div>
							</div>

							<div className="animate-fade-up-delay-2 flex justify-center lg:justify-end">
								<div className="w-[280px] max-w-full">
									<div className="phone-frame relative">
										<div className="phone-notch" aria-hidden="true" />
										<div className="phone-screen">
											<Screen />
											<div className="absolute bottom-0 inset-x-0 z-10">
												<AppTabs active={content.tab} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Story */}
				<section className="py-16 md:py-24" aria-labelledby="story-heading">
					<div className="container-narrow section-padding">
						<div data-reveal>
							<h2
								id="story-heading"
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-6 text-balance"
							>
								{content.story.heading}
							</h2>
							<div className="space-y-5 text-muted text-lg leading-relaxed">
								{content.story.paragraphs.map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}
							</div>
						</div>

						<figure
							data-reveal
							className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 card-glow mt-12"
						>
							<ResponsiveImage
								src={content.image.src}
								alt={content.image.alt}
								preset="article"
								fill
							/>
							<figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chrome/90 to-transparent px-6 pt-10 pb-4">
								<p className="font-display text-base">{content.image.caption}</p>
							</figcaption>
						</figure>
					</div>
				</section>

				{/* Benefits */}
				<section
					className="py-16 md:py-24 bg-background-elevated/50 border-y border-border/40"
					aria-labelledby="benefits-heading"
				>
					<div className="container-wide section-padding">
						<div data-reveal className="text-center max-w-2xl mx-auto mb-12">
							<h2
								id="benefits-heading"
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
							>
								{content.benefits.heading}
							</h2>
							<p className="text-muted text-lg">{content.benefits.intro}</p>
						</div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
							{content.benefits.items.map((benefit, index) => (
								<article
									key={benefit.title}
									data-reveal
									style={{ transitionDelay: `${(index % 3) * 80}ms` }}
									className="rounded-2xl border border-border/60 bg-surface/60 p-6 transition-[border-color,background-color,transform,box-shadow] duration-200 hover:border-primary/30 hover:bg-surface hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(232,132,155,0.35)]"
								>
									<div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
										<Icon name={benefit.icon} />
									</div>
									<h3 className="font-display text-xl font-medium mb-2">
										{benefit.title}
									</h3>
									<p className="text-muted leading-relaxed">
										{benefit.description}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Steps */}
				<section className="py-16 md:py-24" aria-labelledby="steps-heading">
					<div className="container-narrow section-padding">
						<div data-reveal className="mb-10">
							<h2
								id="steps-heading"
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
							>
								{content.steps.heading}
							</h2>
							<p className="text-muted text-lg">{content.steps.intro}</p>
						</div>

						<ol className="space-y-8">
							{content.steps.items.map((step, index) => (
								<li
									key={step.title}
									data-reveal
									style={{ transitionDelay: `${index * 100}ms` }}
									className="flex gap-5"
								>
									<span className="font-display text-3xl text-primary/60 font-medium shrink-0 w-12">
										{String(index + 1).padStart(2, "0")}
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
				</section>

				{/* Testimonial */}
				{content.testimonial && (
					<section className="pb-16 md:pb-24" aria-label={t("whatCouplesSay")}>
						<div className="container-narrow section-padding">
							<figure
								data-reveal
								className="rounded-2xl border border-border/60 bg-surface/50 card-glow p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 md:gap-8"
							>
								<span className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 border-2 border-primary/30">
									<ResponsiveImage
										src={content.testimonial.image}
										alt={content.testimonial.names}
										preset="avatarLg"
										fill
									/>
								</span>
								<div className="text-center sm:text-left">
									<RatingStars className="mb-3" />
									<blockquote className="font-display text-xl md:text-2xl leading-snug text-balance mb-4">
										&ldquo;{content.testimonial.quote}&rdquo;
									</blockquote>
									<figcaption className="text-sm">
										<span className="font-medium">{content.testimonial.names}</span>
										<span className="text-muted"> · {content.testimonial.context}</span>
									</figcaption>
								</div>
							</figure>
						</div>
					</section>
				)}

				{/* FAQ */}
				<section
					className="py-16 md:py-24 bg-background-elevated/50 border-y border-border/40"
					aria-labelledby="faq-heading"
				>
					<div className="container-narrow section-padding">
						<h2
							id="faq-heading"
							data-reveal
							className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-10 text-balance"
						>
							{t("commonQuestions")}
						</h2>
						<div className="space-y-5">
							{content.faqs.map((faq, index) => (
								<article
									key={faq.question}
									data-reveal
									style={{ transitionDelay: `${index * 60}ms` }}
									className="rounded-2xl border border-border/60 bg-surface/50 p-6"
								>
									<h3 className="font-display text-lg font-medium mb-2">
										{faq.question}
									</h3>
									<p className="text-muted leading-relaxed">{faq.answer}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Related */}
				<section className="py-16 md:py-24" aria-labelledby="related-heading">
					<div className="container-wide section-padding">
						<h2
							id="related-heading"
							data-reveal
							className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-8 text-balance"
						>
							{t("keepExploring")}
						</h2>
						<div className="grid sm:grid-cols-3 gap-5">
							{content.related.map((item, index) => (
								<Link
									key={item.href}
									href={item.href}
									data-reveal
									style={{ transitionDelay: `${index * 80}ms` }}
									className="group rounded-2xl border border-border/60 bg-surface/40 p-6 transition-[border-color,background-color] duration-200 hover:border-primary/40 hover:bg-surface"
								>
									<p className="font-display text-lg font-medium mb-1 group-hover:text-primary-strong transition-colors">
										{item.label}
									</p>
									<p className="text-muted text-sm leading-relaxed">
										{item.description}
									</p>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="pb-20 md:pb-28" aria-labelledby="cta-heading">
					<div className="container-wide section-padding">
						<div data-reveal className="hero-card p-8 md:p-14 text-center">
							<h2
								id="cta-heading"
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
							>
								{content.cta.heading}
							</h2>
							<p className="text-muted text-lg max-w-xl mx-auto mb-8">
								{content.cta.text}
							</p>
							<StoreBadges size="lg" className="justify-center" />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
