import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
	APP_STORE_URL,
	PLAY_STORE_URL,
	USE_WAITLIST_DOWNLOAD,
} from "@/lib/constants";
import { DOWNLOAD_PATH } from "@/lib/nav";

type StoreBadgesProps = {
	size?: "sm" | "md" | "lg";
	className?: string;
};

const heights = {
	sm: 40,
	md: 48,
	lg: 54,
} as const;

const playBadgeWidths = {
	sm: 134,
	md: 161,
	lg: 181,
} as const;

export async function StoreBadges({
	size = "md",
	className = "",
}: StoreBadgesProps) {
	const t = await getTranslations("Common.storeBadges");
	const height = heights[size];
	const playBadgeWidth = playBadgeWidths[size];
	const downloadHref = USE_WAITLIST_DOWNLOAD ? DOWNLOAD_PATH : null;

	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<StoreLink
				href={downloadHref ?? APP_STORE_URL}
				label={t("appStore")}
			>
				<img
					src="/images/badges/app-store.svg"
					alt={t("appStore")}
					height={height}
					style={{ height: `${height}px`, width: "auto" }}
				/>
			</StoreLink>
			<StoreLink
				href={downloadHref ?? PLAY_STORE_URL}
				label={t("playStore")}
			>
				<img
					src="/images/badges/google-play-badge.webp"
					srcSet="/images/badges/google-play-badge-sm.webp 268w, /images/badges/google-play-badge.webp 362w"
					sizes={`${playBadgeWidth}px`}
					alt={t("playStore")}
					width={playBadgeWidth}
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
	const className = "store-badge-link";

	if (isExternal) {
		return (
			<a
				href={href}
				className={className}
				aria-label={label}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className} aria-label={label}>
			{children}
		</Link>
	);
}
