import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "Couples Bucket List App — Dream It, Plan It, Do It",
	description:
		"Build a shared bucket list with your partner: collect dreams, turn them into planned dates, and check them off together. Free on iOS & Android.",
	alternates: { canonical: "/features/bucket-list" },
	openGraph: {
		title: "Shared Bucket List for Couples | Parfect",
		description:
			"One list for everything you two want to do — from slow dances in the kitchen to the trip you keep talking about.",
	},
};

const content: FeaturePageContent = {
	slug: "/features/bucket-list",
	eyebrow: "Bucket list",
	titlePlain: "Couples Bucket List",
	title: (
		<>
			One list for everything{" "}
			<span className="text-gradient">you two</span> keep talking about
		</>
	),
	intro:
		"The beach town you'd run away to. The restaurant you keep passing. The slow dance in the kitchen. Parfect keeps every \"someday\" in one shared place — and helps you actually get to them.",
	screen: "together",
	tab: "together",
	story: {
		heading: "Someday is not a plan",
		paragraphs: [
			"Couples generate wonderful ideas all the time — on walks, over wine, in the middle of the night. And then the ideas evaporate, because they live in the least reliable storage ever invented: \"we should really do that sometime.\" A year later you're saying the same sentence about the same trip.",
			"A shared bucket list changes the physics of this. The moment an idea is written down where both of you can see it, it stops being a passing comment and becomes a small mutual promise. Parfect keeps that list in the same private space as your chat and your fantasies, so capturing an idea takes two taps — mid-conversation, mid-walk, mid-anything.",
			"And the list isn't a graveyard of good intentions. Any item can be promoted into a planned date with a day, time, and sitter if you need one. Checking things off together — and watching the checked list grow — becomes its own quiet proof that you're building the life you talk about.",
		],
	},
	image: {
		src: "/images/hero-home.webp",
		alt: "A couple walking hand in hand down a lantern-lit path at dusk",
		caption: "The someday list, finally getting shorter.",
	},
	benefits: {
		heading: "A someday list that actually moves",
		intro:
			"Three things make Parfect's bucket list different from a note on your phone.",
		items: [
			{
				title: "Truly shared",
				description:
					"Both of you add, edit, and check off. It's not one partner's wish list — it's a running agreement about the life you want.",
				icon: "heart",
			},
			{
				title: "Fed by your fantasies",
				description:
					"Shared dreams from the Fantasies space can graduate straight onto the list — marked so you remember where they came from.",
				icon: "sparkles",
			},
			{
				title: "One tap from planned",
				description:
					"Any item becomes a date night with a day and time. \"Beach town getaway\" stops being a phrase and starts being an itinerary.",
				icon: "calendar",
			},
			{
				title: "Big and small",
				description:
					"Sunrise hikes next to round-the-world trips. The best lists mix five-minute wins with five-year dreams.",
				icon: "list",
			},
			{
				title: "Private by default",
				description:
					"Your list lives in your encrypted couple space. No social feed, no performative travel goals — just what you two actually want.",
				icon: "lock",
			},
			{
				title: "A shared story",
				description:
					"Every checked item is a memory you made on purpose. Scroll back anytime and see how far you've come together.",
				icon: "star",
			},
		],
	},
	steps: {
		heading: "How the bucket list works",
		intro: "Capture, choose, do — then repeat for the rest of your lives.",
		items: [
			{
				title: "Capture every idea",
				description:
					"Add items the moment they come up — from chat, from a fantasy, or straight onto the list. Nothing gets lost in \"sometime\" again.",
			},
			{
				title: "Pick what's next",
				description:
					"Browse the list together and choose the one that fits this month — or this Tuesday. Promote it to a planned date in one tap.",
			},
			{
				title: "Check it off together",
				description:
					"Do the thing, tick the box, and enjoy the underrated pleasure of a shared dream marked done. Then pick the next one.",
			},
		],
	},
	testimonial: {
		quote:
			"Our list started with 'learn to make pasta' and now has a road trip on it. Checking things off together is weirdly addictive — in the best way.",
		names: "Amira & Daniel",
		context: "Together 3 years",
		image: "/images/people/couple-amira-daniel.webp",
	},
	faqs: [
		{
			question: "How is this different from a shared notes app?",
			answer:
				"A note stores text; Parfect's bucket list is connected to the rest of your relationship. Items flow in from shared fantasies, flow out into planned date nights with reminders and sitter coordination, and live in the same private, encrypted space as your couple's chat.",
		},
		{
			question: "What should we put on a couples bucket list?",
			answer:
				"Mix sizes: tiny weeknight wins (slow dance in the kitchen, sunrise coffee), local adventures (that restaurant, a day trip), and big dreams (the beach town, learning something together). Small items keep the list moving; big ones give it a horizon.",
		},
		{
			question: "Can bucket list items come from our fantasies?",
			answer:
				"Yes — that's one of Parfect's favorite moments. When a shared fantasy is something you both want to make real, promote it to the bucket list. It keeps a small marker showing it started as a dream.",
		},
		{
			question: "Do both partners see the same list?",
			answer:
				"Yes. The list is fully shared: both of you can add, edit, complete, and plan items. It updates in real time, so an idea added on a lunch break is waiting at home.",
		},
		{
			question: "Is the bucket list free?",
			answer:
				"Yes. Parfect is free on iOS and Android, and the shared bucket list is part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/date-planner",
			label: "Date planner",
			description:
				"Where bucket list items become booked Saturdays.",
		},
		{
			href: "/features/fantasies",
			label: "Fantasies",
			description:
				"The gentle way shared dreams get spoken in the first place.",
		},
		{
			href: "/for/married-couples",
			label: "For married couples",
			description:
				"Why a shared list matters even more after years together.",
		},
	],
	cta: {
		heading: "Start your list tonight",
		text: "Download Parfect free, add the first three things you keep talking about, and watch \"someday\" get a date.",
	},
};

export default function BucketListPage() {
	return <FeaturePage content={content} />;
}
