import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StoreBadges } from "@/components/store-badges";
import { CLUSTERS, GUIDES, getGuidesByCluster, type GuideCluster } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Ideas for Couples — Date Nights, Questions & Bucket Lists";
const DESCRIPTION =
	"Practical guides for couples who want more than autopilot: date night ideas, questions that go deeper, bucket lists, and ways to reconnect.";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: `${SITE_URL}/ideas` },
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: `${SITE_URL}/ideas`,
		type: "website",
	},
};

const jsonLd = [
	{
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: TITLE,
		description: DESCRIPTION,
		url: `${SITE_URL}/ideas`,
		hasPart: GUIDES.map((guide) => ({
			"@type": "Article",
			headline: guide.title,
			url: `${SITE_URL}/ideas/${guide.slug}`,
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
		],
	},
];

const CLUSTER_ORDER: GuideCluster[] = [
	"date-nights",
	"conversations",
	"dreams-and-plans",
];

export default function IdeasPage() {
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
					<div className="absolute inset-0 opacity-40" aria-hidden="true">
						<Image
							src="/images/people/couple-laughing.webp"
							alt=""
							fill
							loading="eager"
							fetchPriority="low"
							className="object-cover"
							sizes="100vw"
							quality={60}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
					</div>
					<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

					<div className="relative container-wide section-padding pt-28 md:pt-36 pb-14 md:pb-20 text-center">
						<p className="animate-fade-up eyebrow mb-4">Ideas for couples</p>
						<h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight mb-5 text-balance max-w-3xl mx-auto">
							Inspiration for the two of you
						</h1>
						<p className="animate-fade-up-delay-2 text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
							Date nights worth planning, questions worth asking, and dreams
							worth writing down — practical guides for couples who want more
							than autopilot.
						</p>
					</div>
				</section>

				{/* Clusters */}
				{CLUSTER_ORDER.map((cluster) => {
					const guides = getGuidesByCluster(cluster);
					if (guides.length === 0) return null;
					const meta = CLUSTERS[cluster];

					return (
						<section
							key={cluster}
							className="py-14 md:py-20 odd:bg-background-elevated/40"
							aria-labelledby={`cluster-${cluster}`}
						>
							<div className="container-wide section-padding">
								<div data-reveal className="max-w-2xl mb-9">
									<h2
										id={`cluster-${cluster}`}
										className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-3 text-balance"
									>
										{meta.label}
									</h2>
									<p className="text-muted text-lg">{meta.description}</p>
								</div>

								<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
									{guides.map((guide, index) => (
										<Link
											key={guide.slug}
											href={`/ideas/${guide.slug}`}
											data-reveal
											style={{ transitionDelay: `${(index % 3) * 80}ms` }}
											className="group rounded-2xl border border-border/60 bg-surface/40 overflow-hidden transition-[border-color,background-color,transform,box-shadow] duration-200 hover:border-primary/40 hover:bg-surface hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(232,132,155,0.35)]"
										>
											<div className="relative aspect-[16/9]">
												<Image
													src={guide.image.src}
													alt=""
													fill
													className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
													sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
												/>
												{guide.seasonal && (
													<span className="absolute top-3 right-3 rounded-full bg-chrome/85 backdrop-blur border border-gold/40 text-gold text-[0.65rem] font-semibold px-2.5 py-1">
														Seasonal
													</span>
												)}
											</div>
											<div className="p-6">
												<h3 className="font-display text-xl font-medium mb-2 group-hover:text-primary-strong transition-colors">
													{guide.cardTitle}
												</h3>
												<p className="text-muted text-sm leading-relaxed mb-3">
													{guide.cardDescription}
												</p>
												<p className="text-xs text-muted-deep">
													{guide.readingTime}
												</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						</section>
					);
				})}

				{/* CTA */}
				<section
					className="py-16 md:py-24 border-t border-border/40"
					aria-labelledby="ideas-cta-heading"
				>
					<div className="container-wide section-padding">
						<div data-reveal className="hero-card p-8 md:p-14 text-center">
							<h2
								id="ideas-cta-heading"
								className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
							>
								Turn ideas into your plans
							</h2>
							<p className="text-muted text-lg max-w-xl mx-auto mb-8">
								Save the ones you love to a shared bucket list, plan the next
								date, and keep the conversation going — all in one private app
								for two.
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
