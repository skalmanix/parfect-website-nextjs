"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

export function StickyCta() {
	const t = useTranslations("Common");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let ticking = false;

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				setVisible(window.scrollY > window.innerHeight * 0.85);
				ticking = false;
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className={`sticky-cta lg:hidden ${visible ? "sticky-cta-visible" : ""}`}
			aria-hidden={!visible}
		>
			<div className="flex items-center gap-3">
				<img
					src="/images/icon.png"
					alt=""
					width={40}
					height={40}
					className="rounded-[22%] shrink-0"
					aria-hidden="true"
					decoding="async"
				/>
				<div className="min-w-0 flex-1">
					<p className="text-sm font-semibold leading-tight">{t("brand")}</p>
					<p className="text-xs text-muted leading-tight truncate">
						{t("stickyCta.tagline")}
					</p>
				</div>
				<div className="flex items-center gap-2 shrink-0">
					<a
						href={APP_STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t("storeBadges.appStore")}
						className="sticky-cta-store"
						tabIndex={visible ? 0 : -1}
					>
						<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
							<path d="M17.05 12.54c0-2.1 1.28-3.15 1.28-3.15s-1.05-1.5-2.63-1.65c-1.8-.23-3.53 1.05-4.43 1.05s-2.33-.98-3.83-.98c-1.95 0-3.75 1.13-4.8 2.93-2.03 3.53-.53 8.78 1.43 11.63.98 1.43 2.1 3 3.6 2.93 1.43-.08 2.03-.9 3.75-.9s2.25.9 3.75.9c1.5 0 2.48-1.35 3.45-2.78 1.05-1.58 1.5-3.08 1.5-3.15-.08 0-2.93-1.13-3.07-4.83zM14.3 5.4c.83-.98 1.35-2.33 1.2-3.68-1.13.08-2.55.75-3.38 1.73-.75.9-1.43 2.25-1.2 3.6 1.28.08 2.55-.68 3.38-1.65z" />
						</svg>
					</a>
					<a
						href={PLAY_STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t("storeBadges.playStore")}
						className="sticky-cta-store"
						tabIndex={visible ? 0 : -1}
					>
						<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
							<path d="M3.6 2.3c-.4.2-.6.6-.6 1.1v17.2c0 .5.2.9.6 1.1l9-9.7-9-9.7zM14 10.6L5.3 2l10.9 6.3L14 10.6zm2.7 1.5l2.8-1.6c.9.5.9 1.7 0 2.2l-2.8 1.6-2.3-2.1 2.3-2.1v2zm-11.4 10L14 13.4l2.2 2.3L5.3 22z" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
