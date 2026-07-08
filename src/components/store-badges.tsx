import { getTranslations } from "next-intl/server";
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

export async function StoreBadges({
	size = "md",
	className = "",
}: StoreBadgesProps) {
	const t = await getTranslations("Common.storeBadges");
	const height = heights[size];

	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<StoreLink href={APP_STORE_URL} label={t("appStore")}>
				<img
					src="/images/badges/app-store.svg"
					alt={t("appStore")}
					height={height}
					style={{ height: `${height}px`, width: "auto" }}
				/>
			</StoreLink>
			<StoreLink href={PLAY_STORE_URL} label={t("playStore")}>
				<img
					src="/images/badges/google-play-badge.png"
					alt={t("playStore")}
					height={height}
					style={{ height: `${height}px`, width: "auto" }}
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
