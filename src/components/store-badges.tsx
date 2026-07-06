import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

type StoreBadgesProps = {
	size?: "sm" | "md" | "lg";
	className?: string;
	layout?: "row" | "column";
};

const heights = {
	sm: 40,
	md: 48,
	lg: 56,
} as const;

export function StoreBadges({
	size = "md",
	className = "",
	layout = "row",
}: StoreBadgesProps) {
	const height = heights[size];

	return (
		<div
			className={`flex ${
				layout === "column"
					? "flex-col items-stretch"
					: "flex-col sm:flex-row items-stretch sm:items-center"
			} gap-3 ${className}`}
		>
			<StoreLink href={APP_STORE_URL} label="Download Parfect on the App Store">
				<Image
					src="/images/badges/app-store.svg"
					alt="Download on the App Store"
					width={Math.round(height * 3.25)}
					height={height}
					className="h-auto w-auto"
					style={{ height, width: "auto" }}
				/>
			</StoreLink>
			<StoreLink href={PLAY_STORE_URL} label="Get Parfect on Google Play">
				<Image
					src="/images/badges/google-play.png"
					alt="Get it on Google Play"
					width={Math.round(height * 3.35)}
					height={height}
					className="h-auto w-auto"
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
			className="inline-flex transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg"
			aria-label={label}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{children}
		</a>
	);
}
