import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "The App for Long-Distance Couples — Close, From Anywhere",
	description:
		"A private space for long-distance relationships: encrypted chat, daily rituals across time zones, and a shared bucket list for your next reunion. Free on iOS & Android.",
	alternates: { canonical: "/for/long-distance" },
	openGraph: {
		title: "Parfect for Long-Distance Couples",
		description:
			"Daily rituals, an encrypted chat that's just yours, and a countdown of plans for when you're together again.",
	},
};

const content: FeaturePageContent = {
	slug: "/for/long-distance",
	eyebrow: "For long-distance couples",
	titlePlain: "Parfect for Long-Distance Couples",
	title: (
		<>
			The distance is real. So is{" "}
			<span className="text-gradient">the closeness</span>.
		</>
	),
	intro:
		"Miles apart, you can't share a couch — but you can share a ritual, a secret, and a list of everything you'll do next time. Parfect gives long-distance couples one private place to stay genuinely close.",
	screen: "chat",
	tab: "chat",
	story: {
		heading: "Long-distance fails on drift, not distance",
		paragraphs: [
			"Ask couples who've survived long distance and they'll rarely say the hard part was the miles. It was the drift: conversations flattening into \"how was your day — good, yours\", intimacy postponed until the next visit, the relationship slowly becoming something you maintain instead of something you live.",
			"What works, consistently, is ritual and depth. A shared thing you do every day, however small, keeps the thread alive across time zones. And conversations that go past logistics — dreams, memories, desires — do more for closeness than hours of dutiful video calls. Parfect is built to supply exactly those two things: a daily prompt that lands for both of you, and a fantasies space that makes deep conversations easy to start, even from far away.",
			"Then there's the future — the thing long-distance couples live on. Your shared bucket list becomes the reunion plan: every restaurant, every lazy morning, every trip gets captured the moment one of you thinks of it. By the time you're together again, the question is never \"what should we do?\" It's \"which one first?\"",
		],
	},
	image: {
		src: "/images/hero-together.webp",
		alt: "Two hands reaching toward each other with rose petals in the air",
		caption: "Every message a bridge. Every plan a countdown.",
	},
	benefits: {
		heading: "Made for the space between visits",
		intro:
			"Everything in Parfect works asynchronously and privately — perfect when your evenings don't overlap.",
		items: [
			{
				title: "A room across time zones",
				description:
					"One private, encrypted chat that's always where you left it. Wake up to something warm from a time zone away.",
				icon: "chat",
			},
			{
				title: "Daily shared rituals",
				description:
					"The same prompt lands for both of you each day. Answer in your morning, read theirs in your evening — the thread never breaks.",
				icon: "clock",
			},
			{
				title: "Depth on demand",
				description:
					"Fantasies and prompts take conversations past small talk — the intimacy that video calls alone rarely reach.",
				icon: "sparkles",
			},
			{
				title: "The reunion list",
				description:
					"Every \"when I see you\" idea goes on the shared bucket list. Your next visit plans itself as you go.",
				icon: "list",
			},
			{
				title: "Countdown to the dates that matter",
				description:
					"Visits, anniversaries, the day you met — tracked in your shared calendar, counted down together.",
				icon: "calendar",
			},
			{
				title: "Private, even far apart",
				description:
					"End-to-end encryption, disappearing messages, and content-free notifications. Intimate stays intimate — on any network, in any country.",
				icon: "lock",
			},
		],
	},
	steps: {
		heading: "How long-distance couples use Parfect",
		intro: "A rhythm that survives time zones, exam seasons, and deployments.",
		items: [
			{
				title: "Pair once, from anywhere",
				description:
					"One of you downloads the app and sends an invite code; the other joins from wherever they are. Your private space works across any distance.",
			},
			{
				title: "Anchor the day",
				description:
					"Let the daily prompt be your fixed point. Even on the busiest days, two answers passing in the night keep you in each other's inner world.",
			},
			{
				title: "Build the next visit",
				description:
					"Add every idea to the bucket list as it comes. When the reunion date lands, promote the best ones into real plans.",
			},
		],
	},
	testimonial: {
		quote:
			"Different time zones, same ritual. The daily question keeps us inside each other's day, and the bucket list has become our countdown to the next reunion.",
		names: "Amira & Daniel",
		context: "Long-distance · Oslo–Lisbon",
		image: "/images/people/couple-amira-daniel.webp",
	},
	faqs: [
		{
			question: "Does Parfect work across countries and time zones?",
			answer:
				"Yes. Everything in Parfect is asynchronous by design — messages, prompts, and plans are always there when your partner wakes up. Pairing works across any two countries, and there are no calls to schedule around.",
		},
		{
			question: "How is this better than texting on WhatsApp?",
			answer:
				"A general messenger gives you a thread; Parfect gives you a relationship space. Daily shared prompts create a ritual, the fantasies feature deepens conversations that texting flattens, and the shared bucket list turns \"I miss you\" into concrete plans for the next visit — all in one private, encrypted place.",
		},
		{
			question: "Can it help when we run out of things to say?",
			answer:
				"That's one of the main reasons long-distance couples use it. Daily prompts hand you a fresh, meaningful question every day, and the fantasies space opens conversations most couples never manage to start — no blank-page pressure.",
		},
		{
			question: "Is it secure enough for intimate conversations?",
			answer:
				"Yes. Message text supports end-to-end encryption, messages can be set to disappear after they're seen, notifications never show content, and the app can be locked with a PIN or biometrics — sensible when you're on shared Wi-Fi or living with roommates.",
		},
		{
			question: "What does it cost?",
			answer:
				"Parfect is free on iOS and Android. Chat, prompts, fantasies, and the bucket list are all part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/private-chat",
			label: "Private chat",
			description:
				"Encryption, disappearing messages, and a room that's only yours.",
		},
		{
			href: "/features/fantasies",
			label: "Fantasies",
			description:
				"Deep conversations, started gently — even from far away.",
		},
		{
			href: "/features/bucket-list",
			label: "Bucket list",
			description:
				"Where every \"when I see you\" becomes a plan.",
		},
	],
	cta: {
		heading: "Shrink the distance tonight",
		text: "Download Parfect free, send your partner the invite code, and start the ritual that makes far away feel close.",
	},
};

export default function LongDistancePage() {
	return <FeaturePage content={content} />;
}
