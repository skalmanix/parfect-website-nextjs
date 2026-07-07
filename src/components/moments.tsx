import Image from "next/image";
import { getTranslations } from "next-intl/server";

const feelingKeys = ["miss", "parents", "curious"] as const;
const messageKeys = ["0", "1", "2", "3"] as const;

export async function Moments() {
	const t = await getTranslations("Home.moments");

	return (
		<section
			className="py-20 md:py-28 relative overflow-hidden"
			aria-labelledby="moments-heading"
		>
			<div className="absolute inset-0" aria-hidden="true">
				<Image
					src="/images/people/couple-dance-kitchen.webp"
					alt=""
					fill
					className="object-cover"
					sizes="100vw"
					quality={60}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/15 to-background" />
			</div>

			<div className="container-wide section-padding relative">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div data-reveal>
						<p className="eyebrow text-rose mb-3">{t("eyebrow")}</p>
						<h2
							id="moments-heading"
							className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-5 text-balance"
						>
							{t("heading")}
						</h2>
						<p className="text-muted text-lg leading-relaxed mb-10 max-w-lg">
							{t("description")}
						</p>

						<ul className="space-y-6">
							{feelingKeys.map((key, i) => (
								<li
									key={key}
									data-reveal
									style={{ transitionDelay: `${i * 90}ms` }}
									className="border-l-2 border-primary/40 pl-5"
								>
									<h3 className="font-display text-lg sm:text-xl font-medium mb-1">
										{t(`feelings.${key}.title`)}
									</h3>
									<p className="text-muted leading-relaxed">
										{t(`feelings.${key}.text`)}
									</p>
								</li>
							))}
						</ul>
					</div>

					<div data-reveal className="flex justify-center">
						<div
							className="chat-demo w-full max-w-md"
							aria-label={t("chatDemo.aria")}
						>
							<div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border/50">
								<span className="relative flex h-2.5 w-2.5">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-60" />
									<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage" />
								</span>
								<p className="text-sm text-muted">{t("chatDemo.online")}</p>
								<span className="ml-auto text-xs text-muted-deep flex items-center gap-1">
									<svg
										className="w-3.5 h-3.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
										/>
									</svg>
									{t("chatDemo.encrypted")}
								</span>
							</div>

							<div className="space-y-3">
								{messageKeys.map((key, i) => (
									<div
										key={key}
										data-reveal
										style={{ transitionDelay: `${150 + i * 130}ms` }}
										className={`flex ${i % 2 === 1 ? "justify-end" : "justify-start"}`}
									>
										<div
											className={
												i % 2 === 1
													? "chat-bubble-me"
													: "chat-bubble-partner"
											}
										>
											<p className="text-[0.9375rem] leading-snug">
												{t(`chatDemo.messages.${key}`)}
											</p>
											<p className="text-[0.65rem] opacity-60 mt-1 text-right">
												{21 + Math.floor(i / 2)}:{42 + i}
											</p>
										</div>
									</div>
								))}
							</div>

							<div
								data-reveal
								style={{ transitionDelay: "700ms" }}
								className="mt-5 flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2.5"
							>
								<p className="text-sm text-muted-deep flex-1">
									{t("chatDemo.placeholder")}
								</p>
								<span className="w-8 h-8 rounded-full btn-primary flex items-center justify-center shrink-0">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
										/>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
