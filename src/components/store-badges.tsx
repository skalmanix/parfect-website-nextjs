"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

type StoreBadgesProps = {
	size?: "sm" | "md" | "lg";
	className?: string;
};

const heights = {
	sm: 40,
	md: 48,
	lg: 54,
} as const;

export function StoreBadges({ size = "md", className = "" }: StoreBadgesProps) {
	const t = useTranslations("Common.storeBadges");
	const height = heights[size];

	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<StoreLink href={APP_STORE_URL} label={t("appStore")}>
				<Image
					src="/images/badges/app-store.svg"
					alt={t("appStore")}
					width={Math.round(height * 2.99)}
					height={height}
					style={{ height, width: "auto" }}
				/>
			</StoreLink>
			<StoreLink href={PLAY_STORE_URL} label={t("playStore")}>
				<Image
					src="/images/badges/google-play-badge.png"
					alt={t("playStore")}
					width={Math.round(height * 3.357)}
					height={height}
					style={{ height, width: "auto" }}
				/>
			</StoreLink>
		</div>
	);
}

function StoreLink({
	href,
	label,
	children,
}: {
	href: string;
	label: string;
	children: React.ReactNode;
}) {
	const isExternal = href.startsWith("http");

	return (
		<a
			href={href}
			className="store-badge-link"
			aria-label={label}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{children}
		</a>
	);
}
