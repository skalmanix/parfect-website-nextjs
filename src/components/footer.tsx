"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { LEGAL_LINKS } from "@/lib/schema";
import { getGuides } from "@/lib/guides";
import type { Locale } from "@/i18n/routing";
import { FEATURE_LINKS, AUDIENCE_LINKS } from "@/lib/nav";

export function Footer() {
	const t = useTranslations("Common");
	const locale = useLocale() as Locale;
	const guides = getGuides(locale);
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border/40 bg-chrome pt-12 md:pt-16 pb-28 lg:pb-16">
			<div className="container-wide section-padding">
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
					<div>
						<Logo size={32} href="/" className="mb-4" />
						<p className="text-muted text-sm leading-relaxed max-w-xs">
							{t("footer.tagline")}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">{t("footer.features")}</h3>
						<ul className="space-y-2 text-sm text-muted">
							{FEATURE_LINKS.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="footer-link">
										{t(`links.${item.key}`)}
									</Link>
								</li>
							))}
							{AUDIENCE_LINKS.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="footer-link">
										{t(`links.${item.key}`)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">
							{t("footer.ideasForCouples")}
						</h3>
						<ul className="space-y-2 text-sm text-muted">
							{guides
								.filter((guide) => !guide.seasonal)
								.slice(0, 6)
								.map((guide) => (
									<li key={guide.slug}>
										<Link
											href={`/ideas/${guide.slug}`}
											className="footer-link"
										>
											{guide.cardTitle}
										</Link>
									</li>
								))}
							<li>
								<Link href="/ideas" className="footer-link">
									{t("footer.allGuides")}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">{t("footer.explore")}</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<a href="/#experience" className="footer-link">
									{t("nav.experience")}
								</a>
							</li>
							<li>
								<a href="/#pillars" className="footer-link">
									{t("nav.features")}
								</a>
							</li>
							<li>
								<a href="/#how-it-works" className="footer-link">
									{t("nav.howItWorks")}
								</a>
							</li>
							<li>
								<a href="/#privacy" className="footer-link">
									{t("nav.privacy")}
								</a>
							</li>
							<li>
								<Link href="/download" className="footer-link">
									{t("footer.download")}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">{t("footer.legal")}</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<Link href={LEGAL_LINKS.privacy} className="footer-link">
									{t("footer.privacyPolicy")}
								</Link>
							</li>
							<li>
								<Link href={LEGAL_LINKS.terms} className="footer-link">
									{t("footer.termsOfService")}
								</Link>
							</li>
							<li>
								<Link href={LEGAL_LINKS.support} className="footer-link">
									{t("footer.support")}
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-deep">
					<p>{t("footer.copyright", { year })}</p>
				</div>
			</div>
		</footer>
	);
}
