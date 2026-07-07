import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { StoreBadges } from "@/components/store-badges";
import { HomeScreen } from "@/components/app-screens";
import { AppTabs } from "@/components/app-tabs";
import { AvatarCluster, RatingStars } from "@/components/testimonials";
import { FEATURED_TESTIMONIAL, RATING_LINE } from "@/lib/testimonials";
import { SITE_URL, PRIVACY_URL, TERMS_URL, SUPPORT_URL } from "@/lib/constants";

const TITLE = "Download Parfect — The Private App for Couples";
const DESCRIPTION =
	"Get Parfect free on iPhone and Android. Private chat, nightly questions, a shared bucket list, and a date planner — made only for two.";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: `${SITE_URL}/download` },
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: `${SITE_URL}/download`,
		type: "website",
	},
};

const POINTS = [
	{
		title: "Private by design",
		description: "One space for two. No feeds, no followers, no audience.",
	},
	{
		title: "A nightly question",
		description: "Prompts that start the conversations you keep postponing.",
	},
	{
		title: "Plans, not just talk",
		description: "A shared bucket list and date planner that make it real.",
	},
];

export default function DownloadPage() {
	const year = new Date().getFullYear();

	return (
		<>
			{/* Minimal header: logo home link only, no nav to leak clicks */}
			<header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-chrome/75 backdrop-blur-2xl">
				<div className="container-wide section-padding flex items-center justify-between h-16">
					<Logo size={36} href="/" className="hover:opacity-90 transition-opacity" />
					<p className="text-sm text-muted-deep hidden sm:block">
						Free · iPhone &amp; Android
					</p>
				</div>
			</header>

			<main>
				<section className="relative overflow-hidden min-h-svh flex items-center">
					<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
					<div className="absolute inset-0 opacity-40" aria-hidden="true">
						<Image
							src="/images/people/couple-night-walk.webp"
							alt=""
							fill
							loading="eager"
							fetchPriority="low"
							className="object-cover"
							sizes="100vw"
							quality={60}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
					</div>
					<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

					<div className="relative container-wide section-padding pt-28 pb-16 md:pt-32 md:pb-20 w-full">
						<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
							<div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
								<h1 className="animate-fade-up font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight mb-5 text-balance">
									Get Parfect —{" "}
									<span className="text-primary">free, for the two of you</span>
								</h1>
								<p className="animate-fade-up-delay-1 text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
									Private chat, a nightly question, and shared plans that
									actually happen. Download on both phones and pair in under a
									minute.
								</p>

								<div className="animate-fade-up-delay-2 flex flex-col items-center lg:items-start gap-6">
									<StoreBadges size="lg" className="justify-center lg:justify-start" />

									{/* QR: desktop visitors scan to continue on the phone */}
									<div className="hidden lg:flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/60 p-4">
										<Image
											src="/images/qr-download.png"
											alt="QR code — scan with your phone to download Parfect"
											width={96}
											height={96}
											className="rounded-lg"
										/>
										<p className="text-sm text-muted max-w-[180px] leading-relaxed">
											On a computer? Scan with your phone to get the app.
										</p>
									</div>

									<div className="flex items-center gap-3">
										<AvatarCluster />
										<div>
											<RatingStars />
											<p className="text-xs text-muted-deep mt-1">{RATING_LINE}</p>
										</div>
									</div>
								</div>

								<ul className="animate-fade-up-delay-3 grid sm:grid-cols-3 gap-4 mt-10 text-left">
									{POINTS.map((point) => (
										<li
											key={point.title}
											className="rounded-2xl border border-border/50 bg-surface/40 p-4"
										>
											<p className="font-display text-base font-medium mb-1">
												{point.title}
											</p>
											<p className="text-muted text-sm leading-relaxed">
												{point.description}
											</p>
										</li>
									))}
								</ul>
							</div>

							<div className="animate-fade-up-delay-2 hidden sm:flex justify-center lg:justify-end">
								<div className="w-[280px] max-w-full">
									<div className="phone-frame relative">
										<div className="phone-notch" aria-hidden="true" />
										<div className="phone-screen">
											<HomeScreen />
											<div className="absolute bottom-0 inset-x-0 z-10">
												<AppTabs active="chat" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Testimonial strip */}
						<figure className="animate-fade-up-delay-3 max-w-2xl mx-auto lg:mx-0 mt-14 flex items-center gap-4 rounded-2xl border border-border/50 bg-surface/40 p-5">
							<span className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-primary/30">
								<Image
									src={FEATURED_TESTIMONIAL.image}
									alt={FEATURED_TESTIMONIAL.names}
									fill
									sizes="56px"
									className="object-cover"
								/>
							</span>
							<div>
								<blockquote className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-1">
									&ldquo;It's like we found a room in our house we didn't know
									was there.&rdquo;
								</blockquote>
								<figcaption className="text-xs text-muted-deep">
									{FEATURED_TESTIMONIAL.names} · {FEATURED_TESTIMONIAL.context}
								</figcaption>
							</div>
						</figure>
					</div>
				</section>
			</main>

			{/* Minimal footer */}
			<footer className="border-t border-border/40 bg-chrome py-8">
				<div className="container-wide section-padding flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-deep">
					<p>&copy; {year} Parfect. All rights reserved.</p>
					<nav aria-label="Legal" className="flex items-center gap-6">
						<Link href={PRIVACY_URL} className="footer-link">
							Privacy
						</Link>
						<Link href={TERMS_URL} className="footer-link">
							Terms
						</Link>
						<Link href={SUPPORT_URL} className="footer-link">
							Support
						</Link>
					</nav>
				</div>
			</footer>
		</>
	);
}
