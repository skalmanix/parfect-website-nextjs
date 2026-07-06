import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "Private Chat for Couples — Encrypted Messaging for Two",
	description:
		"A private, encrypted chat built only for you and your partner. Disappearing messages, content-free notifications, and no one else in the room. Free on iOS & Android.",
	alternates: { canonical: "/features/private-chat" },
	openGraph: {
		title: "Private Chat for Couples | Parfect",
		description:
			"An encrypted chat made only for two — disappearing messages, app lock, and conversations that stay yours.",
	},
};

const content: FeaturePageContent = {
	slug: "/features/private-chat",
	eyebrow: "Private chat",
	titlePlain: "Private Chat for Couples",
	title: (
		<>
			A chat that belongs to{" "}
			<span className="text-gradient">you two</span> — and no one else
		</>
	),
	intro:
		"Most messaging apps carry your whole life: work threads, group chats, family logistics. Parfect gives your relationship its own room — encrypted, intimate, and free of distractions.",
	screen: "chat",
	tab: "chat",
	story: {
		heading: "Why couples need a separate space to talk",
		paragraphs: [
			"Think about where your most intimate conversations live right now. Squeezed between a delivery notification and a work ping, in an app where a mistyped name could send a private thought to the wrong group chat. That context changes what you're willing to say — most couples simply stop saying certain things at all.",
			"Parfect is different by design. When you open it, there is exactly one conversation, with exactly one person. No feeds to scroll, no contacts list, no status games. Just the thread you share with your partner — which makes it easier to be honest, playful, and vulnerable in ways a general-purpose messenger never invites.",
			"And because some words are meant for a moment rather than a permanent record, you can set messages to disappear. Say the bold thing. It doesn't have to live in a searchable archive forever.",
		],
	},
	image: {
		src: "/images/hero-onboarding.webp",
		alt: "A couple sitting close together under string lights at dusk",
		caption: "Some conversations deserve their own room.",
	},
	benefits: {
		heading: "Built for intimacy, not for everyone",
		intro:
			"Every design decision in Parfect's chat answers one question: does this make it easier for two people to feel close?",
		items: [
			{
				title: "End-to-end encryption",
				description:
					"Optional E2EE means your message text is encrypted on your device before it's sent. Not even Parfect can read it.",
				icon: "lock",
			},
			{
				title: "Disappearing messages",
				description:
					"Set messages to vanish after they've been seen. Perfect for the things you want to say once — not archive forever.",
				icon: "clock",
			},
			{
				title: "Content-free notifications",
				description:
					"Push alerts never show what was written — only that your partner reached out. Nothing intimate on your lock screen.",
				icon: "bell",
			},
			{
				title: "App lock & biometrics",
				description:
					"Protect the app with a PIN or Face ID. Hand your phone to a friend or your kid without a second thought.",
				icon: "shield",
			},
			{
				title: "Read receipts that matter",
				description:
					"With only one person in the room, a read receipt isn't anxiety — it's connection. You always know you've been heard.",
				icon: "chat",
			},
			{
				title: "From words to plans",
				description:
					"When a message sparks an idea — a trip, a date, a promise — send it to your shared bucket list without leaving the conversation.",
				icon: "star",
			},
		],
	},
	steps: {
		heading: "How private chat works in Parfect",
		intro: "From download to your first message in under two minutes.",
		items: [
			{
				title: "Pair with your partner",
				description:
					"Create your account and send your partner a private invite code. Once they enter it, the room is yours — permanently, and only yours.",
			},
			{
				title: "Make it yours",
				description:
					"Turn on end-to-end encryption, choose how long disappearing messages live, and set up app lock — each in one tap from Settings.",
			},
			{
				title: "Say the first thing",
				description:
					"Start with something small or something brave. Daily prompts are there when you want a spark, and it's okay to start slow.",
			},
		],
	},
	faqs: [
		{
			question: "Is Parfect's chat really private?",
			answer:
				"Yes. Parfect is built for exactly two people. There are no group chats, no public profiles, and no discovery features. Message text can be end-to-end encrypted so that no one — including Parfect — can read it, and push notifications never reveal message content.",
		},
		{
			question: "How do disappearing messages work?",
			answer:
				"You can set messages to automatically delete after they've been seen. This is ideal for intimate messages you'd rather not keep in a permanent archive. Both partners can see when disappearing mode is on, so there are never surprises.",
		},
		{
			question: "Can anyone else join our chat?",
			answer:
				"No. Pairing requires a single-use private invite code, and each account can only be paired with one partner. If you ever unlink, your couple's shared data is removed from Parfect's servers.",
		},
		{
			question: "What happens if someone picks up my phone?",
			answer:
				"You can protect Parfect with a PIN code or biometrics (Face ID / fingerprint), so the app stays locked even if your phone is unlocked. Notifications are content-free by default, so nothing intimate ever appears on your lock screen.",
		},
		{
			question: "Is the chat free?",
			answer:
				"Yes — Parfect is free to download on iOS and Android, and private chat is a core part of the free experience.",
		},
	],
	related: [
		{
			href: "/features/fantasies",
			label: "Fantasies",
			description:
				"Gentle prompts that help you share what you've never said out loud.",
		},
		{
			href: "/features/date-planner",
			label: "Date planner",
			description:
				"Turn good conversations into real plans — date nights, sitter and all.",
		},
		{
			href: "/for/long-distance",
			label: "For long-distance couples",
			description:
				"How couples use Parfect to stay close across time zones.",
		},
	],
	cta: {
		heading: "Give your relationship its own room",
		text: "Download Parfect free, pair with your partner in under two minutes, and start the conversation that's just for you two.",
	},
};

export default function PrivateChatPage() {
	return <FeaturePage content={content} />;
}
