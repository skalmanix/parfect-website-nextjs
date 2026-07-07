"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { MegaMenu, IdeasMegaMenu, WhyParfectMenu } from "./mega-menu";
import { LanguageSwitcher } from "./language-switcher";
import { DOWNLOAD_PATH, HOW_IT_WORKS_LINK } from "@/lib/nav";

export function Header() {
	const t = useTranslations("Common");

	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-chrome/75 backdrop-blur-2xl">
			<div className="container-wide section-padding flex items-center justify-between h-16">
				<Logo
					size={36}
					href="/"
					className="group hover:opacity-90 transition-opacity"
				/>

				<nav
					className="hidden lg:flex items-center gap-8 text-sm text-muted"
					aria-label={t("nav.mainNav")}
				>
					<MegaMenu />
					<a href={HOW_IT_WORKS_LINK.href} className="nav-link">
						{t(`nav.${HOW_IT_WORKS_LINK.key}`)}
					</a>
					<IdeasMegaMenu />
					<WhyParfectMenu />
				</nav>

				<div className="flex items-center gap-2">
					<LanguageSwitcher />
					<Link
						href={DOWNLOAD_PATH}
						className="btn-primary hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm"
					>
						{t("nav.getApp")}
					</Link>

					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
