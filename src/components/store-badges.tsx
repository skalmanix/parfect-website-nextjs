import Image from "next/image";
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

/*
 * Official badge intrinsic dimensions (Play badge cropped to content bounds):
 * Apple SVG 119.66×40 (ratio 2.99), Google PNG 564×168 (ratio 3.357).
 * Rendering both at the same fixed height keeps them visually matched.
 */
export function StoreBadges({ size = "md", className = "" }: StoreBadgesProps) {
	const height = heights[size];

	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<StoreLink href={APP_STORE_URL} label="Download Parfect on the App Store">
				<Image
					src="/images/badges/app-store.svg"
					alt="Download on the App Store"
					width={Math.round(height * 2.99)}
					height={height}
					style={{ height, width: "auto" }}
				/>
			</StoreLink>
			<StoreLink href={PLAY_STORE_URL} label="Get Parfect on Google Play">
				<Image
					src="/images/badges/google-play-badge.png"
					alt="Get it on Google Play"
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
