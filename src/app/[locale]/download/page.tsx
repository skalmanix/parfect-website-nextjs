import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { StoreBadges } from "@/components/store-badges";
import { HomeScreen } from "@/components/app-screens";
import { AppTabs } from "@/components/app-tabs";
import { AvatarCluster, RatingStars } from "@/components/testimonials";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import { PRIVACY_URL, TERMS_URL, SUPPORT_URL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Download" });

	return createPageMetadata({
		path: "/download",
		locale: locale as Locale,
		title: t("metaTitle"),
		description: t("metaDescription"),
		ogImage: "/images/people/couple-night-walk.webp",
	});
}

export default async function DownloadPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("Download");
	const tRating = await getTranslations("Common.rating");
	const year = new Date().getFullYear();
	const points = t.raw("points") as { title: string; description: string }[];

	return (
		<>
			<header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-chrome/75 backdrop-blur-2xl">
				<div className="container-wide section-padding flex items-center justify-between h-16">
					<Logo size={36} href="/" className="hover:opacity-90 transition-opacity" />
					<p className="text-sm text-muted-deep hidden sm:block">
						{t("headerTagline")}
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
									{t("titleBefore")}
									<span className="text-primary">{t("titleHighlight")}</span>
									{t("titleAfter")}
								</h1>
								<p className="animate-fade-up-delay-1 text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
									{t("description")}
								</p>

								<div className="animate-fade-up-delay-2 flex flex-col items-center lg:items-start gap-6">
									<StoreBadges size="lg" className="justify-center lg:justify-start" />

									<div className="hidden lg:flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/60 p-4">
										<Image
											src="/images/qr-download.png"
											alt={t("qrAlt")}
											width={96}
											height={96}
											className="rounded-lg"
										/>
										<p className="text-sm text-muted max-w-[180px] leading-relaxed">
											{t("qrHint")}
										</p>
									</div>

									<div className="flex items-center gap-3">
										<AvatarCluster />
										<div>
											<RatingStars ariaLabel={tRating("stars")} />
											<p className="text-xs text-muted-deep mt-1">
												{tRating("line")}
											</p>
										</div>
									</div>
								</div>

								<ul className="animate-fade-up-delay-3 grid sm:grid-cols-3 gap-4 mt-10 text-left">
									{points.map((point) => (
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

						<figure className="animate-fade-up-delay-3 max-w-2xl mx-auto lg:mx-0 mt-14 flex items-center gap-4 rounded-2xl border border-border/50 bg-surface/40 p-5">
							<span className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-primary/30">
								<Image
									src="/images/people/couple-laughing.webp"
									alt={t("testimonialNames")}
									fill
									sizes="56px"
									className="object-cover"
								/>
							</span>
							<div>
								<blockquote className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-1">
									&ldquo;{t("testimonialQuote")}&rdquo;
								</blockquote>
								<figcaption className="text-xs text-muted-deep">
									{t("testimonialNames")} · {t("testimonialContext")}
								</figcaption>
							</div>
						</figure>
					</div>
				</section>
			</main>

			<footer className="border-t border-border/40 bg-chrome py-8">
				<div className="container-wide section-padding flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-deep">
					<p>{t("footerCopyright", { year })}</p>
					<nav aria-label="Legal" className="flex items-center gap-6">
						<Link href={PRIVACY_URL} className="footer-link">
							{t("privacyLink")}
						</Link>
						<Link href={TERMS_URL} className="footer-link">
							{t("termsLink")}
						</Link>
						<Link href={SUPPORT_URL} className="footer-link">
							{t("supportLink")}
						</Link>
					</nav>
				</div>
			</footer>
		</>
	);
}
