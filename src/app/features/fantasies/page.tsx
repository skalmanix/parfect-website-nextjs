import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "Fantasies — Share What You Imagine, at Your Own Pace",
	description:
		"Parfect's fantasy prompts help couples open up about desires safely — share when you're ready, and 'not right now' is always okay. Private, encrypted, free.",
	alternates: { canonical: "/features/fantasies" },
	openGraph: {
		title: "Share Your Fantasies Safely | Parfect",
		description:
			"Gentle prompts that help couples say the things they've been meaning to say — at their own pace, in private.",
	},
};

const content: FeaturePageContent = {
	slug: "/features/fantasies",
	eyebrow: "Fantasies",
	titlePlain: "Fantasies",
	title: (
		<>
			Say the things you've{" "}
			<span className="text-gradient">never said</span> out loud
		</>
	),
	intro:
		"Every couple has dreams and desires that stay unspoken — not because they don't matter, but because starting the conversation feels impossible. Parfect gives you a gentle, private way to begin.",
	screen: "fantasies",
	tab: "fantasies",
	story: {
		heading: "The conversation most couples never have",
		paragraphs: [
			"Research on long-term relationships keeps pointing to the same thing: couples who talk openly about their desires report deeper satisfaction and stronger connection. And yet it's the conversation most of us avoid — the fear of being misunderstood, of awkwardness, of rocking a good thing, keeps fantasies locked away for years.",
			"Parfect lowers the stakes. Instead of a high-pressure face-to-face confession, you get a private space with thoughtful prompts — from sweet to daring — that make sharing feel like a game you play together rather than a test you can fail. You choose what to share and when. Your partner responds when they're ready.",
			"Crucially, \"not right now\" is a first-class answer. Declining an invite is always okay and never punished — because real openness only grows where there's real safety. Over time, the small shares become bigger ones, and the things you both imagined quietly become plans you make together.",
		],
	},
	image: {
		src: "/images/hero-together.webp",
		alt: "Two hands reaching toward each other surrounded by rose petals",
		caption: "Openness grows where it feels safe.",
	},
	benefits: {
		heading: "Designed to make opening up feel easy",
		intro:
			"Fantasies in Parfect are built around consent, pace, and play — never pressure.",
		items: [
			{
				title: "Daily prompts",
				description:
					"A fresh question each day — from playful to profound — so you never have to invent the conversation from scratch.",
				icon: "sparkles",
			},
			{
				title: "Share or ask",
				description:
					"Send a fantasy of your own, or invite your partner to share one. Either way, it starts with curiosity, not confrontation.",
				icon: "chat",
			},
			{
				title: "\"Not right now\" is okay",
				description:
					"Every invite can be gently declined. No guilt, no scoreboard — just respect for each other's pace.",
				icon: "heart",
			},
			{
				title: "Completely private",
				description:
					"Fantasies live inside your encrypted couple space. No community, no strangers, no algorithm reading along.",
				icon: "lock",
			},
			{
				title: "From dream to bucket list",
				description:
					"When a shared fantasy is ready to become real, promote it to your bucket list and start planning it together.",
				icon: "star",
			},
			{
				title: "Grows with you",
				description:
					"Start sweet and go deeper over time. The prompts adapt to what you're both comfortable with — you set the temperature.",
				icon: "map",
			},
		],
	},
	steps: {
		heading: "How sharing a fantasy works",
		intro: "Three small steps between \"never said it\" and \"we're planning it\".",
		items: [
			{
				title: "Get a spark",
				description:
					"Open tonight's prompt, or start from something that's been on your mind. Write it down privately first — no one sees it until you decide.",
			},
			{
				title: "Share when ready",
				description:
					"Send it to your partner as an invite. They can respond, ask questions, share their own — or say \"not right now\" with one tap.",
			},
			{
				title: "Make it real (if you want)",
				description:
					"Some fantasies are lovely as words. Others deserve a date on the calendar. Promote the ones you both choose to your shared bucket list.",
			},
		],
	},
	faqs: [
		{
			question: "What if my partner isn't ready to share?",
			answer:
				"That's built into the design. Every invite can be declined with a gentle \"not right now\", and nothing is ever forced or scored. Many couples start with the sweet, low-stakes prompts and grow into deeper sharing over weeks or months — at whatever pace feels right.",
		},
		{
			question: "Can anyone else see what we share?",
			answer:
				"No. Fantasies exist only inside your private couple space. Parfect has no feeds, no community features, and no strangers. Chat text supports end-to-end encryption, notifications never reveal content, and you can lock the app behind Face ID or a PIN.",
		},
		{
			question: "Are the prompts explicit?",
			answer:
				"They range from sweet and romantic to daring — and you control the depth. Parfect is made for adults (18+), but it's built around emotional intimacy first: many prompts are about dreams, memories, and connection rather than anything explicit.",
		},
		{
			question: "What happens to a fantasy after we share it?",
			answer:
				"Whatever you choose. It can stay as a conversation, be revisited later, or be promoted to your shared bucket list — where it becomes something you actively plan together, like a date night or a trip.",
		},
		{
			question: "Is this feature free?",
			answer:
				"Yes. Parfect is free on iOS and Android, and fantasy prompts are part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/private-chat",
			label: "Private chat",
			description:
				"The encrypted, two-person chat where every conversation lives.",
		},
		{
			href: "/features/bucket-list",
			label: "Bucket list",
			description:
				"Where shared dreams become plans you actually carry out.",
		},
		{
			href: "/for/married-couples",
			label: "For married couples",
			description:
				"Keeping curiosity alive after years together.",
		},
	],
	cta: {
		heading: "Start the conversation tonight",
		text: "Download Parfect free and let a single gentle prompt do what years of \"we should talk about this someday\" couldn't.",
	},
};

export default function FantasiesPage() {
	return <FeaturePage content={content} />;
}
