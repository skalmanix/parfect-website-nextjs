"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AppTabs } from "./app-tabs";
import {
	ChatScreen,
	DateScreen,
	FantasiesScreen,
	TogetherScreen,
} from "./app-screens";

const screenIds = ["chat", "fantasies", "together", "date"] as const;
const screens = {
	chat: ChatScreen,
	fantasies: FantasiesScreen,
	together: TogetherScreen,
	date: DateScreen,
} as const;
const tabByScreen = {
	chat: "chat",
	fantasies: "fantasies",
	together: "together",
	date: "together",
} as const;

export function AppPreview() {
	const t = useTranslations("AppPreview");
	const tTabs = useTranslations("AppTabs");
	const [active, setActive] = useState(0);
	const currentId = screenIds[active];
	const currentTab = tabByScreen[currentId];

	return (
		<section
			id="experience"
			className="py-20 md:py-28 scroll-mt-20 relative overflow-hidden"
			aria-labelledby="experience-heading"
		>
			<div className="absolute inset-0 app-gradient-bg opacity-60" aria-hidden="true" />

			<div className="container-wide section-padding relative">
				<div data-reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
					<p className="eyebrow text-rose mb-3">{t("eyebrow")}</p>
					<h2
						id="experience-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						{t("heading")}
					</h2>
					<p className="text-muted text-lg">{t("description")}</p>
				</div>

				<div
					data-reveal
					className="lg:hidden overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory"
				>
					<div
						role="tablist"
						aria-label={t("tablistAria")}
						className="flex gap-2 w-max mx-auto"
					>
						{screenIds.map((id, index) => (
							<button
								key={id}
								type="button"
								role="tab"
								aria-selected={active === index}
								onClick={() => setActive(index)}
								className={`preview-chip snap-start ${
									active === index ? "preview-chip-active" : ""
								}`}
							>
								{t(`screenLabels.${id}`)}
							</button>
						))}
					</div>
				</div>

				<div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
					<div
						data-reveal
						className="hidden lg:flex flex-col gap-3 order-2 lg:order-1"
					>
						<div
							role="tablist"
							aria-label={t("tablistAria")}
							className="flex flex-col gap-3"
						>
							{screenIds.map((id, index) => (
								<button
									key={id}
									type="button"
									role="tab"
									aria-selected={active === index}
									onClick={() => setActive(index)}
									className={`preview-pill text-left ${
										active === index ? "preview-pill-active" : ""
									}`}
								>
									<span className="preview-pill-label">
										{t(`screenLabels.${id}`)}
									</span>
									<span className="text-muted text-sm capitalize">
										{t("tabLabel", { tab: tTabs(tabByScreen[id]) })}
									</span>
								</button>
							))}
						</div>

						<a
							href="#download"
							className="btn-primary mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm self-start"
						>
							{t("cta")}
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
							</svg>
						</a>
					</div>

					<div data-reveal className="order-1 lg:order-2 flex justify-center">
						<div className="w-[300px] max-w-full shrink-0">
							<div className="phone-frame relative">
								<div className="phone-notch" aria-hidden="true" />
								<div className="phone-screen">
									{screenIds.map((id, index) => {
										const Screen = screens[id];
										return (
											<div
												key={id}
												className={`absolute inset-0 transition-opacity duration-300 ${
													active === index
														? "opacity-100"
														: "opacity-0 pointer-events-none"
												}`}
												aria-hidden={active !== index}
											>
												<Screen />
											</div>
										);
									})}
									<div className="absolute bottom-0 inset-x-0 z-10">
										<AppTabs active={currentTab} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:hidden flex justify-center mt-8">
					<a
						href="#download"
						className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm"
					>
						{t("cta")}
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
