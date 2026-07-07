"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
	AUDIENCE_LINKS,
	DOWNLOAD_PATH,
	FEATURE_LINKS,
	HOW_IT_WORKS_LINK,
	IDEAS_PATH,
	WHY_PARFECT_LINKS,
} from "@/lib/nav";
import { getGuides } from "@/lib/guides";
import type { Locale } from "@/i18n/routing";

const MOBILE_GUIDE_SLUGS = [
	"date-night-ideas-at-home",
	"questions-for-couples",
	"couples-bucket-list-ideas",
	"how-to-reconnect-with-your-partner",
];

export function MobileMenu() {
	const t = useTranslations("Common");
	const locale = useLocale() as Locale;
	const guides = getGuides(locale);
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const close = () => {
		if (menuRef.current?.contains(document.activeElement)) {
			buttonRef.current?.focus();
		}
		setOpen(false);
	};

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close();
		};
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [open]);

	const tabIndex = open ? 0 : -1;

	return (
		<div className="lg:hidden">
			<button
				ref={buttonRef}
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
				className="flex items-center justify-center w-11 h-11 -mr-2 text-foreground"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.75}
					aria-hidden="true"
				>
					{open ? (
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					) : (
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
					)}
				</svg>
			</button>

			<div
				ref={menuRef}
				id="mobile-menu"
				className={`mobile-menu-panel ${open ? "mobile-menu-open" : ""}`}
				inert={!open || undefined}
				aria-hidden={!open}
			>
				<nav aria-label={t("nav.mainNav")}>
					<p className="eyebrow text-xs mt-2 mb-3">{t("nav.features")}</p>
					<ul className="grid grid-cols-2 gap-3 mb-2">
						{FEATURE_LINKS.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={close}
									tabIndex={tabIndex}
									className="mobile-feature-card"
								>
									<span className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/50 mb-2 block">
										<Image
											src={item.image}
											alt=""
											fill
											sizes="(max-width: 1024px) 45vw, 180px"
											quality={50}
											className="object-cover"
										/>
									</span>
									<span className="block font-medium text-sm text-foreground">
										{t(`links.${item.key}`)}
									</span>
								</Link>
							</li>
						))}
					</ul>

					<ul className="mb-2">
						{AUDIENCE_LINKS.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={close}
									tabIndex={tabIndex}
									className="mobile-menu-link text-base!"
								>
									{t(`links.${item.key}`)}
								</Link>
							</li>
						))}
					</ul>

					<p className="eyebrow text-xs mt-5 mb-1">{t("footer.ideasForCouples")}</p>
					<ul className="mb-2">
						{MOBILE_GUIDE_SLUGS.map((slug) => {
							const guide = guides.find((g) => g.slug === slug);
							if (!guide) return null;
							return (
								<li key={slug}>
									<Link
										href={`/ideas/${slug}`}
										onClick={close}
										tabIndex={tabIndex}
										className="mobile-menu-link text-base!"
									>
										{guide.cardTitle}
									</Link>
								</li>
							);
						})}
						<li>
							<Link
								href={IDEAS_PATH}
								onClick={close}
								tabIndex={tabIndex}
								className="mobile-menu-link text-base! text-primary!"
							>
								{t("nav.allGuides")} →
							</Link>
						</li>
					</ul>

					<p className="eyebrow text-xs mt-5 mb-1">{t("nav.whyParfect")}</p>
					<ul>
						<li>
							<a
								href={HOW_IT_WORKS_LINK.href}
								onClick={close}
								tabIndex={tabIndex}
								className="mobile-menu-link"
							>
								{t(`nav.${HOW_IT_WORKS_LINK.key}`)}
							</a>
						</li>
						{WHY_PARFECT_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									onClick={close}
									tabIndex={tabIndex}
									className="mobile-menu-link"
								>
									{t(`links.${link.key}`)}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<Link
					href={DOWNLOAD_PATH}
					onClick={close}
					tabIndex={tabIndex}
					className="btn-primary flex items-center justify-center px-5 py-3.5 rounded-full text-sm mt-5"
				>
					{t("nav.getApp")}
				</Link>
			</div>

			{open && (
				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					onClick={close}
					className="mobile-menu-backdrop"
				/>
			)}
		</div>
	);
}
