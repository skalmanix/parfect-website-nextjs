import Image from "next/image";
import { FEATURES } from "@/lib/constants";

const icons: Record<string, React.JSX.Element> = {
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
	shield: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
		</svg>
	),
	rings: (
		<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
		</svg>
	),
};

export function Features() {
	return (
		<section
			className="py-20 md:py-28 bg-background-elevated/50 border-y border-border/40"
			aria-labelledby="features-heading"
		>
			<div className="container-wide section-padding">
				<div className="text-center max-w-2xl mx-auto mb-14">
					<p className="text-rose text-sm font-medium tracking-widest uppercase mb-3">
						Built for your relationship
					</p>
					<h2
						id="features-heading"
						className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4"
					>
						More than messaging
					</h2>
					<p className="text-muted text-lg">
						Thoughtful tools that help you check in, plan ahead, and protect
						what matters — without the noise of social media.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
					{FEATURES.map((feature) => (
						<article
							key={feature.title}
							className={`group relative rounded-2xl border border-border/60 bg-surface/60 p-6 transition-colors hover:border-primary/30 hover:bg-surface ${
								"image" in feature && feature.image
									? "sm:col-span-2 lg:col-span-1 overflow-hidden"
									: ""
							}`}
						>
							{"image" in feature && feature.image && (
								<div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
									<Image
										src={feature.image}
										alt=""
										fill
										className="object-cover"
										sizes="400px"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/70" />
								</div>
							)}
							<div className="relative">
								<div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
									{icons[feature.icon]}
								</div>
								<h3 className="font-display text-xl font-medium mb-2">
									{feature.title}
								</h3>
								<p className="text-muted leading-relaxed">
									{feature.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
