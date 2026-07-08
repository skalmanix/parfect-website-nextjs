import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { StoreBadges } from "@/components/store-badges";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: true,
	},
};

export default async function NotFound() {
	const t = await getTranslations("Common");

	const links = [
		{ href: "/ideas", label: t("footer.ideasForCouples") },
		{ href: "/faq", label: t("footer.faq") },
		{ href: "/support", label: t("footer.support") },
		{ href: "/download", label: t("footer.download") },
	];

	return (
		<>
			<Header />
			<main className="relative overflow-hidden min-h-svh flex items-center">
				<div className="absolute inset-0 app-gradient-bg" aria-hidden="true" />
				<div className="absolute inset-0 grain-overlay" aria-hidden="true" />

				<div className="relative container-narrow section-padding py-32 text-center w-full">
					<div className="flex justify-center mb-8">
						<Logo size={56} showWordmark={false} />
					</div>
					<p className="eyebrow mb-4">404</p>
					<h1 className="font-display text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight mb-4 text-balance">
						{t("notFound.title")}
					</h1>
					<p className="text-muted text-lg leading-relaxed max-w-md mx-auto mb-8">
						{t("notFound.text")}
					</p>

					<nav
						className="flex flex-wrap justify-center gap-2 mb-10"
						aria-label="404"
					>
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="rounded-full border border-border/60 bg-surface/50 px-4 py-2 text-sm text-muted hover:text-foreground hover:border-primary/40 transition-colors"
							>
								{link.label}
							</Link>
						))}
					</nav>

					<Link
						href="/"
						className="btn-primary inline-flex items-center px-6 py-3 rounded-full text-sm mb-10"
					>
						{t("subpage.backToHome")}
					</Link>

					<StoreBadges className="justify-center" />
				</div>
			</main>
			<Footer />
		</>
	);
}
