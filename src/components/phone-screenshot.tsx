import { ResponsiveImage } from "@/components/responsive-image";

/** Real app screenshots captured from the Parfect app with demo data. */
export const APP_SCREENS = [
	"home",
	"chat",
	"fantasies",
	"together-ideas",
	"together-dates",
	"together-wishes",
	"relationship",
	"gallery",
	"ideas-top10",
	"checkin-reveal",
	"calendar",
	"growth",
	"couples",
] as const;

export type AppScreen = (typeof APP_SCREENS)[number];

export function appScreenSrc(screen: AppScreen) {
	return `/images/screens/${screen}.webp`;
}

type PhoneScreenshotProps = {
	screen: AppScreen;
	alt: string;
	priority?: boolean;
	className?: string;
};

export function PhoneScreenshot({
	screen,
	alt,
	priority = false,
	className = "",
}: PhoneScreenshotProps) {
	return (
		<div className={`phone-frame relative ${className}`.trim()}>
			<div className="phone-notch" aria-hidden="true" />
			<div className="phone-screen">
				<ResponsiveImage
					src={appScreenSrc(screen)}
					alt={alt}
					preset="screen"
					fill
					width={393}
					height={852}
					priority={priority}
				/>
			</div>
		</div>
	);
}
