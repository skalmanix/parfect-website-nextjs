import Image from "next/image";

const conversation = [
	{
		from: "partner" as const,
		text: "Remember that little beach town we said we'd run away to? 🏝",
		time: "21:42",
	},
	{
		from: "me" as const,
		text: "Still on my list. Right next to \"slow dance in the kitchen\".",
		time: "21:43",
	},
	{
		from: "partner" as const,
		text: "Added both to our bucket list. Sitter's booked for Saturday…",
		time: "21:45",
	},
	{
		from: "me" as const,
		text: "It's a date. ❤️",
		time: "21:45",
	},
];

const feelings = [
	{
		title: "For the couple who miss each other",
		text: "Even in the same house. Parfect gives you a place where it's only ever the two of you.",
	},
	{
		title: "For the parents who forgot date night",
		text: "Bucket list, babysitter, calendar — the logistics handled, so the romance isn't.",
	},
	{
		title: "For the ones still curious",
		text: "Gentle prompts help you say the things you've been meaning to say. At your pace.",
	},
];

export function Moments() {
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
						<p className="eyebrow text-rose mb-3">This is for us</p>
						<h2
							id="moments-heading"
							className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-5 text-balance"
						>
							The conversation you&apos;ve been meaning to have
						</h2>
						<p className="text-muted text-lg leading-relaxed mb-10 max-w-lg">
							Every relationship has dreams that stay unsaid and date nights
							that stay unplanned. Parfect turns them into messages, plans,
							and memories.
						</p>

						<ul className="space-y-6">
							{feelings.map((feeling, i) => (
								<li
									key={feeling.title}
									data-reveal
									style={{ transitionDelay: `${i * 90}ms` }}
									className="border-l-2 border-primary/40 pl-5"
								>
									<h3 className="font-display text-lg sm:text-xl font-medium mb-1">
										{feeling.title}
									</h3>
									<p className="text-muted leading-relaxed">{feeling.text}</p>
								</li>
							))}
						</ul>
					</div>

					<div data-reveal className="flex justify-center">
						<div className="chat-demo w-full max-w-md" aria-label="Example conversation in Parfect">
							<div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border/50">
								<span className="relative flex h-2.5 w-2.5">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-60" />
									<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage" />
								</span>
								<p className="text-sm text-muted">Your person is here</p>
								<span className="ml-auto text-xs text-muted-deep flex items-center gap-1">
									<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
									</svg>
									Encrypted
								</span>
							</div>

							<div className="space-y-3">
								{conversation.map((msg, i) => (
									<div
										key={i}
										data-reveal
										style={{ transitionDelay: `${150 + i * 130}ms` }}
										className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={
												msg.from === "me" ? "chat-bubble-me" : "chat-bubble-partner"
											}
										>
											<p className="text-[0.9375rem] leading-snug">{msg.text}</p>
											<p className="text-[0.65rem] opacity-60 mt-1 text-right">
												{msg.time}
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
									Say the first thing…
								</p>
								<span className="w-8 h-8 rounded-full btn-primary flex items-center justify-center shrink-0">
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
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
