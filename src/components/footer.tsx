import { Logo } from "./logo";
import { LEGAL_LINKS } from "@/lib/schema";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border/40 bg-chrome pt-12 md:pt-16 pb-28 lg:pb-16">
			<div className="container-wide section-padding">
				<div className="grid md:grid-cols-3 gap-10 mb-10">
					<div>
						<Logo size={32} href="/" className="mb-4" />
						<p className="text-muted text-sm leading-relaxed max-w-xs">
							A private couples companion for intimate chat, shared dreams,
							and turning them into real plans.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Explore</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<a
									href="#experience"
									className="footer-link"
								>
									Experience
								</a>
							</li>
							<li>
								<a
									href="#pillars"
									className="footer-link"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#how-it-works"
									className="footer-link"
								>
									How it works
								</a>
							</li>
							<li>
								<a
									href="#privacy"
									className="footer-link"
								>
									Privacy
								</a>
							</li>
							<li>
								<a
									href="#download"
									className="footer-link"
								>
									Download
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-4">Legal</h3>
						<ul className="space-y-2 text-sm text-muted">
							<li>
								<a
									href={LEGAL_LINKS.privacy}
									className="footer-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href={LEGAL_LINKS.terms}
									className="footer-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href={LEGAL_LINKS.support}
									className="footer-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									Support
								</a>
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
