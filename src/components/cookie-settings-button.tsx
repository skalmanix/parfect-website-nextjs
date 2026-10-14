"use client";

import { useTranslations } from "next-intl";
import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function CookieSettingsButton({ className }: { className?: string }) {
	const t = useTranslations("Common.cookies");

	return (
		<button
			type="button"
			className={
				className ??
				"footer-link cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-sm text-muted"
			}
			onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
		>
			{t("settings")}
		</button>
	);
}
