import Link from "next/link";
import { LEGAL_LINKS } from "@/lib/schema";

const trustPoints = [
	{
		title: "End-to-end encryption",
		description:
			"Optional E2EE for chat text. Your intimate conversations stay between you two.",
	},
	{
		title: "Content-free notifications",
		description:
			"Push alerts never reveal what your partner said — just that they reached out.",
	},
	{
		title: "You're always in control",
		description:
			"Pause contact, unlink, or delete your account anytime. Clear policies, no surprises.",
	},
	{
		title: "App lock & biometrics",
		description:
			"PIN and biometric protection keep your relationship private on your device.",
	},
];

export function PrivacySection() {
	return (
		<section
			id="privacy"
			className="py-20 md:py-28 bg-background-elevated/50 border-y border-border/40 scroll-mt-20"
			aria-labelledby="privacy-heading"
		>
			<div className="container-wide section-padding">
				<div data-reveal className="max-w-2xl mx-auto text-center mb-14">
					<p className="eyebrow text-sage mb-3">
						Privacy & trust
					</p>
					<h2
						id="privacy-heading"
						className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
					>
						Your relationship deserves a safe space
					</h2>
					<p className="text-muted text-lg">
						Parfect is built for intimacy, not exposure. No social feeds, no
						strangers — and privacy controls you can actually understand.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
					{trustPoints.map((point, index) => (
						<article
							key={point.title}
							data-reveal
							style={{ transitionDelay: `${(index % 2) * 90}ms` }}
							className="rounded-2xl border border-border/60 bg-surface/40 p-6"
						>
							<h3 className="font-display text-lg font-medium mb-2 flex items-center gap-2">
								<span
									className="w-2 h-2 rounded-full bg-sage"
									aria-hidden="true"
								/>
								{point.title}
							</h3>
							<p className="text-muted leading-relaxed">{point.description}</p>
						</article>
					))}
				</div>

				<div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted">
					<Link
						href={LEGAL_LINKS.privacy}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						Privacy Policy
					</Link>
					<Link
						href={LEGAL_LINKS.terms}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						Terms of Service
					</Link>
					<Link
						href={LEGAL_LINKS.support}
						className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
					>
						Support
					</Link>
				</div>
			</div>
		</section>
	);
}
