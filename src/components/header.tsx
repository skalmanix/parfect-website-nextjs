import { Logo } from "./logo";

const navLinks = [
	{ href: "#experience", label: "Experience" },
	{ href: "#pillars", label: "Features" },
	{ href: "#how-it-works", label: "How it works" },
	{ href: "#privacy", label: "Privacy" },
];

export function Header() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-chrome/75 backdrop-blur-2xl">
			<div className="container-wide section-padding flex items-center justify-between h-16">
				<Logo size={36} href="/" className="group hover:opacity-90 transition-opacity" />

				<nav
					className="hidden lg:flex items-center gap-8 text-sm text-muted"
					aria-label="Main navigation"
				>
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="hover:text-foreground transition-colors"
						>
							{link.label}
						</a>
					))}
				</nav>

				<a
					href="#download"
					className="btn-primary hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm"
				>
					Get the app
				</a>

				<a
					href="#download"
					className="sm:hidden btn-primary inline-flex items-center px-4 py-2 rounded-full text-sm"
				>
					Download
				</a>
			</div>
		</header>
	);
}
