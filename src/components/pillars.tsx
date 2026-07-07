import { getTranslations } from "next-intl/server";
import {
	ChatIllustration,
	FantasyIllustration,
	TogetherIllustration,
} from "./pillar-illustrations";
import { AppTabs } from "./app-tabs";
import { ChatScreen, FantasiesScreen, TogetherScreen } from "./app-screens";

const pillarIds = ["chat", "fantasies", "together"] as const;
const screens = {
	chat: ChatScreen,
	fantasies: FantasiesScreen,
	together: TogetherScreen,
} as const;
const illustrations = {
	chat: ChatIllustration,
	fantasies: FantasyIllustration,
	together: TogetherIllustration,
} as const;
const tabs = {
	chat: "chat" as const,
	fantasies: "fantasies" as const,
	together: "together" as const,
};
const accentColors = {
	chat: "text-primary border-primary/30 bg-primary/10",
	fantasies: "text-rose border-rose/30 bg-rose/10",
	together: "text-gold border-gold/30 bg-gold/10",
} as const;
const dotColors = {
	chat: "bg-primary",
	fantasies: "bg-rose",
	together: "bg-gold",
} as const;

export async function Pillars() {
	const t = await getTranslations("Home.pillars");

	return (
		<section
			id="pillars"
			className="py-20 md:py-28 scroll-mt-20"
			aria-labelledby="pillars-heading"
		>
			<div className="container-wide section-padding">
				<div data-reveal className="text-center max-w-2xl mx-auto mb-16">
					<p className="eyebrow text-primary mb-3">{t("eyebrow")}</p>
					<h2
						id="pillars-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<p className="text-muted text-lg">{t("description")}</p>
				</div>

				<div className="space-y-8 md:space-y-10">
					{pillarIds.map((id, index) => {
						const Illustration = illustrations[id];
						const Screen = screens[id];
						const highlights = [0, 1, 2].map((i) =>
							t(`items.${id}.highlights.${i}`),
						);

						return (
							<article
								key={id}
								data-reveal
								className={`pillar-card grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center p-6 md:p-8 ${
									index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
								}`}
							>
								<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
									<div className="mb-6">
										<Illustration className="w-36 h-36 sm:w-44 sm:h-44" />
									</div>
									<span
										className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border mb-4 ${accentColors[id]}`}
									>
										{t(`items.${id}.tagline`)}
									</span>
									<h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-3">
										{t(`items.${id}.title`)}
									</h3>
									<p className="text-muted text-lg leading-relaxed mb-5 max-w-md">
										{t(`items.${id}.description`)}
									</p>
									<ul className="space-y-2.5 text-left w-full max-w-md">
										{highlights.map((highlight) => (
											<li
												key={highlight}
												className="flex items-start gap-3 text-foreground/90 text-sm sm:text-base"
											>
												<span
													className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[id]}`}
													aria-hidden="true"
												/>
												{highlight}
											</li>
										))}
									</ul>
								</div>

								<div className="relative mx-auto w-full max-w-[300px]">
									<div className="phone-frame">
										<div className="phone-notch" aria-hidden="true" />
										<div className="phone-screen relative">
											<Screen />
											<div className="absolute bottom-0 inset-x-0 z-10">
												<AppTabs active={tabs[id]} />
											</div>
										</div>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
