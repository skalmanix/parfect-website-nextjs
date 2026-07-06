import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "The App for Married Couples — Keep Choosing Each Other",
	description:
		"Comfortable is good. Curious is better. Parfect helps married couples rediscover each other with daily prompts, honest conversations, and dates that actually happen.",
	alternates: { canonical: "/for/married-couples" },
	openGraph: {
		title: "Parfect for Married Couples",
		description:
			"Daily prompts, gentle honesty, and a shared someday list — for couples who intend to keep choosing each other.",
	},
};

const content: FeaturePageContent = {
	slug: "/for/married-couples",
	eyebrow: "For married couples",
	titlePlain: "Parfect for Married Couples",
	title: (
		<>
			Comfortable is good.{" "}
			<span className="text-gradient">Curious</span> is better.
		</>
	),
	intro:
		"Years in, you know each other's coffee order, moods, and browser tabs. Parfect is for what comes next: staying curious about the person sleeping next to you — on purpose.",
	screen: "home",
	tab: "fantasies",
	story: {
		heading: "The quiet risk of a good marriage",
		paragraphs: [
			"Nobody warns you that the biggest threat to a long marriage isn't conflict — it's autopilot. You function beautifully together: bills paid, house running, weekends full. And somewhere in all that competence, the questions stop. You assume you know each other completely, so you stop checking. That's how two people who love each other end up feeling like well-coordinated roommates.",
			"The antidote isn't dramatic. Relationship researchers keep finding the same thing: couples stay close through small, frequent bids for connection — a real question, a shared laugh, a plan made together. Parfect turns those bids into a daily habit: one prompt a day that gets you past \"how was work\", a private space to say things that don't fit at the dinner table, and a fantasies feature for the conversations that twenty years of marriage somehow never quite got around to.",
			"And because long marriages are rich in \"we should really\" — the trip, the dance class, the restaurant from your honeymoon — the shared bucket list and date planner make sure those intentions stop rolling over year after year. Not a project. Just a gentle system for keeping the promise you already made: to keep choosing each other.",
		],
	},
	image: {
		src: "/images/hero-onboarding.webp",
		alt: "A couple laughing together under warm string lights in the evening",
		caption: "Twenty years in, still finding out new things.",
	},
	benefits: {
		heading: "Small habits, remarkable marriage",
		intro:
			"Nothing here demands a weekend retreat. Just a few minutes a day, aimed well.",
		items: [
			{
				title: "One real question a day",
				description:
					"Daily prompts that get past logistics — memories, dreams, opinions you've never compared. Autopilot doesn't survive them.",
				icon: "sparkles",
			},
			{
				title: "The overdue conversations",
				description:
					"The fantasies space gently opens what's stayed unsaid for years — at your pace, with \"not right now\" always allowed.",
				icon: "heart",
			},
			{
				title: "A flirt channel",
				description:
					"A private, encrypted chat that isn't the family thread. Somewhere to be partners, not household managers.",
				icon: "chat",
			},
			{
				title: "\"We should really\" — handled",
				description:
					"The shared bucket list catches every intention, and the date planner turns them into actual Saturdays.",
				icon: "list",
			},
			{
				title: "Anniversaries that land",
				description:
					"Your dates, tracked and counted down — with time to plan something worthy of them, not a last-minute save.",
				icon: "calendar",
			},
			{
				title: "Private at home too",
				description:
					"App lock and content-free notifications keep your space yours — even with teenagers who borrow phones.",
				icon: "lock",
			},
		],
	},
	steps: {
		heading: "How married couples settle into Parfect",
		intro: "Start smaller than feels necessary. That's the trick.",
		items: [
			{
				title: "Pair over coffee",
				description:
					"Download the app together some slow morning and link with an invite code. Two minutes, and the space is yours.",
			},
			{
				title: "Answer one prompt a day",
				description:
					"Just the daily question, for a week. Most couples are surprised within days by an answer they didn't see coming.",
			},
			{
				title: "Let it deepen",
				description:
					"When it feels natural, wander into fantasies, load up the bucket list, and put a date on the calendar. No schedule — your marriage, your pace.",
			},
		],
	},
	faqs: [
		{
			question: "We've been married 15 years. Isn't this for new couples?",
			answer:
				"It's arguably built for you. New couples generate novelty for free; long marriages have to create it on purpose. Parfect's prompts, fantasies, and shared lists are designed precisely for couples who know each other deeply and want to keep discovering — which is a different, richer project than getting acquainted.",
		},
		{
			question: "My spouse isn't an app person. Will this work?",
			answer:
				"Parfect asks very little: one question a day takes under a minute, and there's no feed, no streak pressure, no gamification guilt. Many couples have one partner who starts and one who warms up — the daily prompt tends to do the convincing.",
		},
		{
			question: "Is this marriage counseling?",
			answer:
				"No. Parfect is not therapy and doesn't replace it. It's a private space for connection — conversation, playfulness, and plans. Plenty of couples use it alongside counseling, and plenty use it simply to keep a good marriage curious.",
		},
		{
			question: "What about conversations we've avoided for years?",
			answer:
				"That's what the fantasies feature is for. It replaces the impossible face-to-face opener with a gentle, private invitation your partner can answer when ready — and declining is always okay. Pace, consent, and safety are the whole design.",
		},
		{
			question: "How much does it cost?",
			answer:
				"Parfect is free to download on iOS and Android. Daily prompts, private chat, fantasies, the bucket list, and date planning are all part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/fantasies",
			label: "Fantasies",
			description:
				"The gentle way into conversations twenty years postponed.",
		},
		{
			href: "/features/date-planner",
			label: "Date planner",
			description:
				"Anniversaries remembered, Saturdays reclaimed.",
		},
		{
			href: "/for/parents",
			label: "For parents",
			description:
				"When the marriage also comes with a school run.",
		},
	],
	cta: {
		heading: "Stay curious about each other",
		text: "Download Parfect free and answer one real question together tonight. See where a week of them takes you.",
	},
};

export default function MarriedCouplesPage() {
	return <FeaturePage content={content} />;
}
