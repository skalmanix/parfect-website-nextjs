import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "The Couples App for Parents — Stay Partners, Not Just Co-Parents",
	description:
		"Between school runs and bedtimes, the relationship comes last. Parfect helps parents reconnect: date nights with sitter coordination, private chat, and small daily rituals.",
	alternates: { canonical: "/for/parents" },
	openGraph: {
		title: "Parfect for Parents",
		description:
			"Date night with the sitter handled, a chat that's just yours, and small rituals that keep you close between bedtimes.",
	},
};

const content: FeaturePageContent = {
	slug: "/for/parents",
	eyebrow: "For parents",
	titlePlain: "Parfect for Parents",
	title: (
		<>
			Still <span className="text-gradient">partners</span> — not just
			co-parents
		</>
	),
	intro:
		"You love your kids. You also miss each other. Parfect helps busy parents protect the relationship that started the whole family — in the ten-minute gaps a parent's day actually has.",
	screen: "home",
	tab: "together",
	story: {
		heading: "The couple usually comes last. Let's fix that.",
		paragraphs: [
			"After kids, most couples' conversations quietly turn into logistics: pickups, dinners, whose turn it is. It's not that the love goes anywhere — it's that the relationship stops getting any dedicated time or space. Weeks pass in perfect teamwork and zero romance, and both of you feel it.",
			"The standard advice is \"prioritize date night\", and it's good advice — but anyone with kids knows the real boss fight is logistics. Picking a day, agreeing on a plan, and above all, sorting the sitter. That's exactly the part Parfect handles: date plans live in a shared space, ideas come from your own bucket list, and babysitter coordination is built into the plan itself.",
			"Between date nights, Parfect keeps a thread of just-us running through ordinary days. A private chat that isn't the family group. A daily prompt you can answer from the sofa after bedtime. A message that disappears after it's read. Small things — but small things, repeated, are what closeness is made of.",
		],
	},
	image: {
		src: "/images/hero-date.webp",
		alt: "A candlelit dinner table set for two with city lights in the background",
		caption: "The sitter is booked. The night is yours.",
	},
	benefits: {
		heading: "Built around a parent's reality",
		intro:
			"No grand gestures required — just tools that fit into the day you actually have.",
		items: [
			{
				title: "Sitter-proof date nights",
				description:
					"Coordinate the babysitter inside the plan itself. When Parfect says confirmed, date night is actually happening.",
				icon: "shield",
			},
			{
				title: "A chat that isn't logistics",
				description:
					"Keep flirting somewhere the school schedule can't reach. Your Parfect thread is for you two — not for \"we're out of milk\".",
				icon: "chat",
			},
			{
				title: "Ten-minute rituals",
				description:
					"Daily prompts and check-ins that fit between bedtime and collapsing on the couch. Closeness in the gaps.",
				icon: "clock",
			},
			{
				title: "A shared someday list",
				description:
					"The trip for your anniversary, the restaurant without a kids' menu — kept safe on your bucket list until it's their turn.",
				icon: "list",
			},
			{
				title: "Nothing on the lock screen",
				description:
					"Content-free notifications and app lock mean a curious kid with your phone sees nothing they shouldn't.",
				icon: "lock",
			},
			{
				title: "Anniversaries, remembered",
				description:
					"Your shared calendar tracks the dates that matter, so they never get lost under school events again.",
				icon: "calendar",
			},
		],
	},
	steps: {
		heading: "Getting started (in one nap time)",
		intro: "Parfect takes less time to set up than a school permission slip.",
		items: [
			{
				title: "Pair up",
				description:
					"Download the app, create your account, and send your partner the invite code. Two minutes, start to finish.",
			},
			{
				title: "Put one date on the calendar",
				description:
					"Pick something small — dinner out, or even a proper at-home date after bedtime. Sort the sitter in the plan if you need one.",
			},
			{
				title: "Let the small rituals run",
				description:
					"Answer the daily prompt when you can. Send the occasional message that has nothing to do with the kids. Watch what it does to the week.",
			},
		],
	},
	faqs: [
		{
			question: "We barely have ten minutes a day. Is this realistic?",
			answer:
				"Parfect is designed for exactly that. A daily prompt takes a minute to answer, a message takes seconds, and date planning happens asynchronously — you suggest, your partner confirms when they can. It's built for the gaps in a parent's day, not for people with endless free evenings.",
		},
		{
			question: "How does the babysitter coordination work?",
			answer:
				"When you plan a date, sorting the sitter becomes part of the plan itself instead of a separate text thread. Both partners can see the status at a glance — so \"Saturday 19:30, sitter confirmed\" means the night is real.",
		},
		{
			question: "What if my kid picks up my phone?",
			answer:
				"Parfect can be locked behind a PIN or Face ID, and push notifications never show message content — only that your partner reached out. Your private space stays private, even on a shared-ish family phone.",
		},
		{
			question: "Is this only about date nights?",
			answer:
				"No — date nights are just the most visible part. Most of Parfect's value for parents is in the everyday: a private chat that isn't household logistics, gentle daily prompts, a shared bucket list, and anniversaries that don't get forgotten.",
		},
		{
			question: "How much does it cost?",
			answer:
				"Parfect is free to download on iOS and Android, and everything described here is part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/date-planner",
			label: "Date planner",
			description:
				"Shared plans, sitter coordination, and reminders — the full tour.",
		},
		{
			href: "/features/private-chat",
			label: "Private chat",
			description:
				"An encrypted thread for the two of you — no logistics allowed.",
		},
		{
			href: "/features/bucket-list",
			label: "Bucket list",
			description:
				"Keep every \"after the kids are older\" dream somewhere safe.",
		},
	],
	cta: {
		heading: "Date night is overdue",
		text: "Download Parfect free, pair up during nap time, and put one night for the two of you back on the calendar this week.",
	},
};

export default function ParentsPage() {
	return <FeaturePage content={content} />;
}
