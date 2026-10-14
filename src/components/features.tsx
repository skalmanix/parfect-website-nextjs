import { ResponsiveImage } from "@/components/responsive-image";
import { getTranslations } from "next-intl/server";

const featureKeys = [
	"wishes",
	"gallery",
	"ideas",
	"checkin",
	"mood",
	"spaces",
	"calendar",
	"constellation",
	"lock",
] as const;
const newFeatures = new Set(["wishes", "gallery", "ideas", "spaces"]);
const iconsWithImages = new Set(["lock"]);
const iconImages: Record<string, string> = {
	lock: "/images/hero-lock.webp",
};

const icons: Record<string, React.JSX.Element> = {
	wishes: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
		</svg>
	),
	gallery: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
		</svg>
	),
	ideas: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
		</svg>
	),
	mood: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
		</svg>
	),
	spaces: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
		</svg>
	),
	checkin: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
		</svg>
	),
	calendar: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
		</svg>
	),
	lock: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
		</svg>
	),
	constellation: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
		</svg>
	),
};

export async function Features() {
	const t = await getTranslations("Home.features");

	return (
		<section
			className="py-20 md:py-28 bg-background-elevated/50 border-y border-border/40"
			aria-labelledby="features-heading"
		>
			<div className="container-wide section-padding">
				<div data-reveal className="text-center max-w-2xl mx-auto mb-14">
					<p className="eyebrow text-rose mb-3">{t("eyebrow")}</p>
					<h2
						id="features-heading"
						className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<p className="text-muted text-lg">{t("description")}</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
					{featureKeys.map((key, index) => (
						<article
							key={key}
							data-reveal
							style={{ transitionDelay: `${(index % 3) * 80}ms` }}
							className={`group relative rounded-2xl border border-border/60 bg-surface/60 p-6 transition-[border-color,background-color,transform,box-shadow] duration-200 hover:border-primary/30 hover:bg-surface hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(232,132,155,0.35)] ${
								iconsWithImages.has(key) ? "overflow-hidden" : ""
							}`}
						>
							{iconsWithImages.has(key) && (
								<div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
									<ResponsiveImage
										src={iconImages[key]}
										alt=""
										preset="mockup"
										sizes="400px"
										fill
										aria-hidden
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/70" />
								</div>
							)}
							<div className="relative">
								<div className="flex items-start justify-between mb-4">
									<div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
										{icons[key]}
									</div>
									{newFeatures.has(key) && (
										<span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
											{t("newBadge")}
										</span>
									)}
								</div>
								<h3 className="font-display text-xl font-medium mb-2">
									{t(`items.${key}.title`)}
								</h3>
								<p className="text-muted leading-relaxed">
									{t(`items.${key}.description`)}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
