"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
	const t = useTranslations("Common.languageSwitcher");
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const router = useRouter();
	const listboxId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const switchLocale = (code: Locale) => {
		setOpen(false);
		router.replace(pathname, { locale: code });
	};

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-expanded={open}
				aria-controls={listboxId}
				aria-haspopup="listbox"
				className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-surface/60"
				aria-label={t("current", { language: localeNames[locale] })}
			>
				<svg
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.75}
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.747M12 16.5V21"
					/>
				</svg>
				<span className="uppercase font-medium tracking-wide">{locale}</span>
				<svg
					className={`w-3 h-3 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 8.25l-7.5 7.5-7.5-7.5"
					/>
				</svg>
			</button>

			<ul
				id={listboxId}
				role="listbox"
				aria-label={t("label")}
				className={`absolute right-0 top-full mt-1 min-w-[10rem] rounded-xl border border-border/60 bg-chrome/95 backdrop-blur-xl shadow-xl py-1 z-[60] transition-all ${
					open
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
			>
				{locales.map((code) => (
					<li key={code} role="option" aria-selected={code === locale}>
						<button
							type="button"
							onClick={() => switchLocale(code)}
							className={`w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-surface/60 ${
								code === locale
									? "text-primary-strong font-medium"
									: "text-muted hover:text-foreground"
							}`}
						>
							{localeNames[code]}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
