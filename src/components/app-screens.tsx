"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function StatusBar() {
	return (
		<div className="flex items-center justify-between px-5 pt-2.5 text-[0.65rem] font-semibold text-foreground/90">
			<span>21:41</span>
			<span className="flex items-center gap-1" aria-hidden="true">
				<svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
					<path d="M2 22h20V2L2 22z" opacity="0.9" />
				</svg>
				<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M2 9.5C7.5 4.5 16.5 4.5 22 9.5l-2.2 2.3c-4.3-3.9-11.3-3.9-15.6 0L2 9.5zm4.4 4.5c3.1-2.8 8.1-2.8 11.2 0l-2.2 2.3c-1.9-1.7-4.9-1.7-6.8 0L6.4 14zm4.4 4.5c.7-.6 1.7-.6 2.4 0L12 21l-1.2-2.5z" />
				</svg>
				<span className="inline-block w-5 h-2.5 rounded-[3px] border border-foreground/60 relative">
					<span className="absolute inset-[1.5px] right-[4px] rounded-[1px] bg-sage" />
				</span>
			</span>
		</div>
	);
}

export function HomeScreen() {
	const t = useTranslations("HomeScreen");

	return (
		<div
			className="absolute inset-0 flex flex-col bg-background"
			role="img"
			aria-label={t("ariaLabel")}
		>
			<Image
				src="/images/hero-home.webp"
				alt=""
				fill
				className="object-cover"
				sizes="300px"
				loading="eager"
				fetchPriority="low"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background"
				aria-hidden="true"
			/>
			<div className="relative flex flex-col h-full">
				<StatusBar />
				<div className="px-4 pt-4">
					<p className="text-[0.65rem] text-muted mb-0.5">{t("goodEvening")}</p>
					<p className="font-display text-xl font-medium leading-tight">
						{t("coupleNames")}
					</p>
					<span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.6rem] font-semibold text-gold">
						<svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						{t("streakDays")}
					</span>
				</div>

				<div className="flex-1 flex flex-col justify-end px-3.5 pb-16 space-y-2.5">
					<div className="hero-card p-3.5">
						<p className="flex items-center gap-1 text-[0.55rem] font-semibold tracking-[0.14em] uppercase text-gold mb-1.5">
							<svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							{t("tonightsPrompt")}
						</p>
						<p className="font-display text-[0.85rem] leading-snug">
							{t("promptQuestion")}
						</p>
					</div>

					<div className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-surface/85 px-3 py-2.5">
						<span className="w-7 h-7 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center shrink-0">
							<svg className="w-3.5 h-3.5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
							</svg>
						</span>
						<div className="min-w-0">
							<p className="text-[0.7rem] font-medium leading-tight">
								{t("dateNightPlanned")}
							</p>
							<p className="text-[0.6rem] text-muted leading-tight">
								{t("dateTime")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ChatScreen() {
	const t = useTranslations("ChatScreen");

	return (
		<div
			className="absolute inset-0 flex flex-col bg-background"
			role="img"
			aria-label={t("ariaLabel")}
		>
			<Image
				src="/images/pattern-chat.webp"
				alt=""
				fill
				className="object-cover opacity-70"
				sizes="300px"
				aria-hidden="true"
			/>
			<div className="relative flex flex-col h-full">
				<StatusBar />
				<div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/50">
					<svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
					<div className="w-7 h-7 rounded-full bg-rose/25 border border-rose/40 flex items-center justify-center text-[0.65rem] font-semibold text-rose">
						E
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-[0.8rem] font-semibold leading-tight">
							{t("partnerName")}
						</p>
						<p className="text-[0.6rem] text-sage leading-tight">
							{t("onlineNow")}
						</p>
					</div>
					<svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
					</svg>
				</div>

				<div className="flex-1 flex flex-col justify-end px-3.5 py-3 space-y-2 overflow-hidden">
					<div className="flex justify-center pb-1">
						<span className="text-[0.55rem] text-muted-deep">
							{t("todayTime")}
						</span>
					</div>
					<div className="flex justify-start">
						<div className="chat-bubble-partner !max-w-[85%] !px-3 !py-2">
							<p className="text-[0.7rem] leading-snug">{t("message1")}</p>
						</div>
					</div>
					<div className="flex justify-end">
						<div className="chat-bubble-me !max-w-[85%] !px-3 !py-2">
							<p className="text-[0.7rem] leading-snug">{t("message2")}</p>
						</div>
					</div>
					<div className="flex justify-start">
						<div className="chat-bubble-partner !max-w-[85%] !px-3 !py-2">
							<p className="text-[0.7rem] leading-snug">{t("message3")}</p>
						</div>
					</div>
					<div className="flex justify-center pt-1">
						<span className="flex items-center gap-1 text-[0.55rem] text-muted-deep">
							<svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							{t("disappearingMessages")}
						</span>
					</div>
				</div>

				<div className="px-3.5 pb-16">
					<div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/80 px-3.5 py-2">
						<p className="text-[0.7rem] text-muted-deep flex-1">
							{t("messagePlaceholder")}
						</p>
						<span className="w-6 h-6 rounded-full btn-primary flex items-center justify-center shrink-0">
							<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
							</svg>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export function FantasiesScreen() {
	const t = useTranslations("FantasiesScreen");

	return (
		<div
			className="absolute inset-0 flex flex-col bg-background"
			role="img"
			aria-label={t("ariaLabel")}
		>
			<Image
				src="/images/hero-lock.webp"
				alt=""
				fill
				className="object-cover opacity-40"
				sizes="300px"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background"
				aria-hidden="true"
			/>
			<div className="relative flex flex-col h-full">
				<StatusBar />
				<div className="flex items-center justify-between px-4 py-3">
					<p className="font-display text-lg font-medium">{t("title")}</p>
					<div className="w-7 h-7 rounded-full bg-rose/25 border border-rose/40 flex items-center justify-center text-[0.65rem] font-semibold text-rose">
						E
					</div>
				</div>

				<div className="flex-1 px-3.5 space-y-3 overflow-hidden">
					<div className="hero-card p-3.5">
						<p className="flex items-center gap-1 text-[0.55rem] font-semibold tracking-[0.14em] uppercase text-gold mb-1.5">
							<svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							{t("tonightsPrompt")}
						</p>
						<p className="font-display text-[0.85rem] leading-snug mb-2.5">
							{t("promptQuestion")}
						</p>
						<span className="inline-flex btn-primary px-3 py-1.5 rounded-full text-[0.65rem] font-semibold">
							{t("shareYours")}
						</span>
					</div>

					<div className="rounded-2xl border border-border/60 bg-surface/85 p-3.5">
						<div className="flex items-center gap-2 mb-2">
							<span className="w-5 h-5 rounded-full bg-rose/25 border border-rose/40 flex items-center justify-center text-[0.5rem] font-semibold text-rose">
								E
							</span>
							<p className="text-[0.7rem] font-medium">{t("inviteSent")}</p>
						</div>
						<p className="text-[0.65rem] text-muted leading-snug mb-2.5">
							{t("invitePreview")}
						</p>
						<div className="flex gap-2">
							<span className="flex-1 text-center btn-primary px-2 py-1.5 rounded-full text-[0.65rem] font-semibold">
								{t("respond")}
							</span>
							<span className="flex-1 text-center rounded-full border border-border bg-surface-alt px-2 py-1.5 text-[0.65rem] font-medium text-muted">
								{t("notRightNow")}
							</span>
						</div>
					</div>

					<div className="rounded-2xl border border-gold/30 bg-gold/[0.07] p-3.5">
						<div className="flex items-center gap-2 mb-1">
							<svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<p className="text-[0.7rem] font-semibold text-gold">
								{t("bothSaidYes")}
							</p>
						</div>
						<p className="text-[0.65rem] text-muted leading-snug">
							{t("bucketListAdded")}
						</p>
					</div>
				</div>
				<div className="pb-16" />
			</div>
		</div>
	);
}

export function TogetherScreen() {
	const t = useTranslations("TogetherScreen");

	return (
		<div
			className="absolute inset-0 flex flex-col bg-background"
			role="img"
			aria-label={t("ariaLabel")}
		>
			<div className="relative flex flex-col h-full">
				<StatusBar />
				<div className="flex items-center justify-between px-4 py-3">
					<p className="font-display text-lg font-medium">{t("title")}</p>
					<div className="w-7 h-7 rounded-full bg-rose/25 border border-rose/40 flex items-center justify-center text-[0.65rem] font-semibold text-rose">
						E
					</div>
				</div>

				<div className="flex-1 px-3.5 space-y-3 overflow-hidden">
					<div className="rounded-2xl overflow-hidden border border-border/60 bg-surface/85">
						<div className="relative h-20">
							<Image
								src="/images/hero-date.webp"
								alt=""
								fill
								className="object-cover"
								sizes="280px"
								aria-hidden="true"
							/>
							<span className="absolute top-2 right-2 rounded-full bg-sage/90 text-background text-[0.55rem] font-bold px-2 py-0.5">
								{t("planned")}
							</span>
						</div>
						<div className="p-3">
							<p className="font-display text-[0.85rem] font-medium mb-0.5">
								{t("rooftopDinner")}
							</p>
							<p className="text-[0.65rem] text-muted flex items-center gap-1">
								<svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
								</svg>
								{t("dateDetails")}
							</p>
						</div>
					</div>

					<p className="text-[0.55rem] font-semibold tracking-[0.14em] uppercase text-muted-deep px-1">
						{t("bucketList")}
					</p>

					<div className="space-y-2">
						<div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface/85 px-3 py-2.5">
							<span className="w-4 h-4 rounded-full border-[1.5px] border-sage bg-sage/20 flex items-center justify-center shrink-0">
								<svg className="w-2.5 h-2.5 text-sage" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
							</span>
							<p className="text-[0.7rem] line-through text-muted-deep">
								{t("itemCompleted")}
							</p>
						</div>
						<div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface/85 px-3 py-2.5">
							<span className="w-4 h-4 rounded-full border-[1.5px] border-muted-deep/60 shrink-0" />
							<p className="text-[0.7rem]">{t("itemFromFantasy")}</p>
							<span className="ml-auto text-[0.5rem] text-gold font-semibold rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5">
								{t("fromAFantasy")}
							</span>
						</div>
						<div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface/85 px-3 py-2.5">
							<span className="w-4 h-4 rounded-full border-[1.5px] border-muted-deep/60 shrink-0" />
							<p className="text-[0.7rem]">{t("itemPending")}</p>
						</div>
						<div className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-rose/40 px-3 py-2.5 text-rose">
							<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
							<p className="text-[0.7rem] font-medium">{t("addSomethingNew")}</p>
						</div>
					</div>
				</div>
				<div className="pb-16" />
			</div>
		</div>
	);
}

export function DateScreen() {
	const t = useTranslations("DateScreen");

	return (
		<div
			className="absolute inset-0 flex flex-col bg-background"
			role="img"
			aria-label={t("ariaLabel")}
		>
			<Image
				src="/images/hero-date.webp"
				alt=""
				fill
				className="object-cover opacity-50"
				sizes="300px"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"
				aria-hidden="true"
			/>
			<div className="relative flex flex-col h-full">
				<StatusBar />
				<div className="flex items-center gap-2.5 px-4 py-3">
					<svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
					<p className="font-display text-lg font-medium">{t("title")}</p>
				</div>

				<div className="flex-1 flex flex-col justify-end px-3.5 pb-16">
					<div className="hero-card p-4">
						<span className="inline-block rounded-full bg-sage/20 border border-sage/40 text-sage text-[0.55rem] font-bold px-2 py-0.5 mb-2">
							{t("planned")}
						</span>
						<p className="font-display text-base font-medium mb-2.5">
							{t("rooftopDinner")}
						</p>
						<div className="space-y-1.5 text-[0.7rem] text-muted">
							<p className="flex items-center gap-2">
								<svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
								</svg>
								{t("dateTime")}
							</p>
							<p className="flex items-center gap-2">
								<svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
								</svg>
								{t("location")}
							</p>
							<p className="flex items-center gap-2 text-sage">
								<svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								{t("babysitterConfirmed")}
							</p>
						</div>
						<span className="mt-3 inline-flex btn-primary px-3.5 py-1.5 rounded-full text-[0.65rem] font-semibold">
							{t("itsADate")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
