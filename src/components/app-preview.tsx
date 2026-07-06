"use client";

import { useState } from "react";
import Image from "next/image";
import { APP_SCREENSHOTS } from "@/lib/constants";
import { AppTabs } from "./app-tabs";
import { PhoneFrame } from "./phone-frame";

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
				<div className="text-center max-w-2xl mx-auto mb-12">
					<p className="eyebrow text-rose mb-3">Feels like the app</p>
					<h2
						id="experience-heading"
						className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4"
					>
						The same warmth, right in your browser
					</h2>
					<p className="text-muted text-lg">
						Explore the three pillars exactly as they appear in Parfect —
						so you know what you&apos;re stepping into before you download.
					</p>
				</div>

				<div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
					<div className="flex flex-col gap-3 order-2 lg:order-1">
						{APP_SCREENSHOTS.map((screen, index) => (
							<button
								key={screen.id}
								type="button"
								onClick={() => setActive(index)}
								className={`preview-pill text-left ${
									active === index ? "preview-pill-active" : ""
								}`}
								aria-pressed={active === index}
							>
								<span className="preview-pill-label">{screen.label}</span>
								<span className="text-muted text-sm capitalize">
									{screen.tab} tab
								</span>
							</button>
						))}
					</div>

					<div className="order-1 lg:order-2 flex justify-center">
						<PhoneFrame
							src={current.src}
							alt={`Parfect app — ${current.label}`}
							tabBar={<AppTabs active={current.tab} />}
							className="w-[min(100%,320px)]"
						/>
					</div>
				</div>

				<div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
					{APP_SCREENSHOTS.slice(0, 3).map((screen) => (
						<div
							key={screen.id}
							className="rounded-2xl overflow-hidden border border-border/50 opacity-70 hover:opacity-100 transition-opacity"
						>
							<Image
								src={screen.src}
								alt={screen.label}
								width={400}
								height={700}
								className="w-full h-32 object-cover object-top"
								sizes="300px"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
