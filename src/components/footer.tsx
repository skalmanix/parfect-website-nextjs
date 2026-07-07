import Link from "next/link";
import { Logo } from "./logo";
import { LEGAL_LINKS } from "@/lib/schema";
import { GUIDES } from "@/lib/guides";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border/40 bg-chrome pt-12 md:pt-16 pb-28 lg:pb-16">
			<div className="container-wide section-padding">
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
					<div>
						<Logo size={32} href="/" className="mb-4" />
						<p className="text-muted text-sm leading-relaxed max-w-xs">
							A private couples companion for intimate chat, shared dreams,
							and turning them into real plans.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Features</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<Link href="/features/private-chat" className="footer-link">
									Private chat
								</Link>
							</li>
							<li>
								<Link href="/features/fantasies" className="footer-link">
									Fantasies
								</Link>
							</li>
							<li>
								<Link href="/features/date-planner" className="footer-link">
									Date planner
								</Link>
							</li>
							<li>
								<Link href="/features/bucket-list" className="footer-link">
									Bucket list
								</Link>
							</li>
							<li>
								<Link href="/for/parents" className="footer-link">
									For parents
								</Link>
							</li>
							<li>
								<Link href="/for/long-distance" className="footer-link">
									For long-distance
								</Link>
							</li>
							<li>
								<Link href="/for/married-couples" className="footer-link">
									For married couples
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Ideas for couples</h3>
						<ul className="space-y-2 text-sm text-muted">
							{GUIDES.filter((guide) => !guide.seasonal)
								.slice(0, 6)
								.map((guide) => (
									<li key={guide.slug}>
										<Link href={`/ideas/${guide.slug}`} className="footer-link">
											{guide.cardTitle}
										</Link>
									</li>
								))}
							<li>
								<Link href="/ideas" className="footer-link">
									All guides
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Explore</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<a href="/#experience" className="footer-link">
									Experience
								</a>
							</li>
							<li>
								<a href="/#pillars" className="footer-link">
									Features
								</a>
							</li>
							<li>
								<a href="/#how-it-works" className="footer-link">
									How it works
								</a>
							</li>
							<li>
								<a href="/#privacy" className="footer-link">
									Privacy
								</a>
							</li>
							<li>
								<Link href="/download" className="footer-link">
									Download
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Legal</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<Link href={LEGAL_LINKS.privacy} className="footer-link">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href={LEGAL_LINKS.terms} className="footer-link">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href={LEGAL_LINKS.support} className="footer-link">
									Support
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-deep">
					<p>&copy; {year} Parfect. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
