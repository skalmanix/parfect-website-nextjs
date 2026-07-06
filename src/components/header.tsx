import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { MegaMenu } from "./mega-menu";
import { NAV_ANCHORS } from "@/lib/nav";

export function Header() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-chrome/75 backdrop-blur-2xl">
			<div className="container-wide section-padding flex items-center justify-between h-16">
				<Logo size={36} href="/" className="group hover:opacity-90 transition-opacity" />

				<nav
					className="hidden lg:flex items-center gap-8 text-sm text-muted"
					aria-label="Main navigation"
				>
					<a href={NAV_ANCHORS[0].href} className="nav-link">
						{NAV_ANCHORS[0].label}
					</a>
					<MegaMenu />
					{NAV_ANCHORS.slice(1).map((link) => (
						<a key={link.href} href={link.href} className="nav-link">
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<a
						href="/#download"
						className="btn-primary hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm"
					>
						Get the app
					</a>

					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
