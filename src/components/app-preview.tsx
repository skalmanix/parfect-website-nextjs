"use client";

import { useState } from "react";
import Image from "next/image";
import { APP_SCREENSHOTS } from "@/lib/constants";
import { AppTabs } from "./app-tabs";

export function AppPreview() {
	const [active, setActive] = useState(0);
	const current = APP_SCREENSHOTS[active];

	return (
		<section
			id="experience"
			className="py-20 md:py-28 scroll-mt-20 relative overflow-hidden"
			aria-labelledby="experience-heading"
		>
			<div className="absolute inset-0 app-gradient-bg opacity-60" aria-hidden="true" />

			<div className="container-wide section-padding relative">
				<div data-reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
					<p className="eyebrow text-rose mb-3">Feels like the app</p>
					<h2
						id="experience-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance"
					>
						See what you&apos;re stepping into
					</h2>
					<p className="text-muted text-lg">
						Explore the screens exactly as they appear in Parfect — before
						you even download.
					</p>
				</div>

				<div
					data-reveal
					className="flex lg:hidden gap-2 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory"
					role="tablist"
					aria-label="App screens"
				>
					{APP_SCREENSHOTS.map((screen, index) => (
						<button
							key={screen.id}
							type="button"
							role="tab"
							aria-selected={active === index}
							onClick={() => setActive(index)}
							className={`preview-chip snap-start ${
								active === index ? "preview-chip-active" : ""
							}`}
						>
							{screen.label}
						</button>
					))}
				</div>

				<div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
					<div
						data-reveal
						className="hidden lg:flex flex-col gap-3 order-2 lg:order-1"
						role="tablist"
						aria-label="App screens"
					>
						{APP_SCREENSHOTS.map((screen, index) => (
							<button
								key={screen.id}
								type="button"
								role="tab"
								aria-selected={active === index}
								onClick={() => setActive(index)}
								className={`preview-pill text-left ${
									active === index ? "preview-pill-active" : ""
								}`}
							>
								<span className="preview-pill-label">{screen.label}</span>
								<span className="text-muted text-sm capitalize">
									{screen.tab} tab
								</span>
							</button>
						))}

						<a
							href="#download"
							className="btn-primary mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm self-start"
						>
							Try it yourselves — free
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
							</svg>
						</a>
					</div>

					<div data-reveal className="order-1 lg:order-2 flex justify-center">
						<div className="phone-frame relative w-[min(100%,300px)]">
							<div className="phone-notch" aria-hidden="true" />
							<div className="phone-screen">
								{APP_SCREENSHOTS.map((screen, index) => (
									<Image
										key={screen.id}
										src={screen.src}
										alt={active === index ? `Parfect app — ${screen.label}` : ""}
										width={720}
										height={1560}
										priority={index === 0}
										className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
											active === index ? "opacity-100" : "opacity-0"
										}`}
										sizes="300px"
									/>
								))}
							</div>
							<div className="absolute bottom-0 inset-x-0 z-10">
								<AppTabs active={current.tab} />
							</div>
						</div>
					</div>
				</div>

				<div className="lg:hidden flex justify-center mt-8">
					<a
						href="#download"
						className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm"
					>
						Try it yourselves — free
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
