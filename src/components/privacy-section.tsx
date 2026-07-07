import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LEGAL_LINKS } from "@/lib/schema";

const pointKeys = ["0", "1", "2", "3"] as const;

export async function PrivacySection() {
	const t = await getTranslations("Home.privacy");
	const tCommon = await getTranslations("Common.footer");

	return (
		<section
			id="privacy"
			className="py-20 md:py-28 bg-background-elevated/50 border-y border-border/40 scroll-mt-20"
			aria-labelledby="privacy-heading"
		>
			<div className="container-wide section-padding">
				<div data-reveal className="max-w-2xl mx-auto text-center mb-14">
					<p className="eyebrow text-sage mb-3">{t("eyebrow")}</p>
					<h2
						id="privacy-heading"
						className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<p className="text-muted text-lg">{t("description")}</p>
				</div>

				<div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
					{pointKeys.map((key, index) => (
						<article
							key={key}
							data-reveal
							style={{ transitionDelay: `${(index % 2) * 90}ms` }}
							className="rounded-2xl border border-border/60 bg-surface/40 p-6"
						>
							<h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
								<span
									className="w-2 h-2 rounded-full bg-sage"
									aria-hidden="true"
								/>
								{t(`points.${key}.title`)}
							</h3>
							<p className="text-muted leading-relaxed">
								{t(`points.${key}.description`)}
							</p>
						</article>
					))}
				</div>

				<div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted">
					<Link
						href={LEGAL_LINKS.privacy}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						{tCommon("privacyPolicy")}
					</Link>
					<Link
						href={LEGAL_LINKS.terms}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						{tCommon("termsOfService")}
					</Link>
					<Link
						href={LEGAL_LINKS.support}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						{tCommon("support")}
					</Link>
				</div>
			</div>
		</section>
	);
}
