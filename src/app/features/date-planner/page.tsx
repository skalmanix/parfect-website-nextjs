import type { Metadata } from "next";
import {
	FeaturePage,
	type FeaturePageContent,
} from "@/components/feature-page";

export const metadata: Metadata = {
	title: "Date Night Planner for Couples — Plan It Together",
	description:
		"Plan date nights together in one place: shared calendar, babysitter coordination, and ideas straight from your bucket list. Free on iOS & Android.",
	alternates: { canonical: "/features/date-planner" },
	openGraph: {
		title: "Date Night Planner | Parfect",
		description:
			"From \"we should go out more\" to a booked Saturday — shared planning, sitter coordination, and anniversary reminders.",
	},
};

const content: FeaturePageContent = {
	slug: "/features/date-planner",
	eyebrow: "Date planner",
	titlePlain: "Date Night Planner",
	title: (
		<>
			From <span className="text-gradient">“we should go out more”</span>{" "}
			to a booked Saturday
		</>
	),
	intro:
		"Every couple says it. Few calendars show it. Parfect turns date night from a vague intention into a plan with a time, a place — and a babysitter who's already confirmed.",
	screen: "date",
	tab: "together",
	story: {
		heading: "Why date nights keep not happening",
		paragraphs: [
			"It's rarely about love, and almost always about logistics. Someone has to pick a day, find something to do, check the other's schedule, sort out the kids — and because that invisible work usually lands on one partner, it quietly turns romance into project management. Eventually, it's easier to just watch something.",
			"Parfect splits the load. Date planning lives in your shared space, where both of you can suggest ideas, pick dates, and see everything in one calendar. Ideas don't have to come from a blank page either — your bucket list and shared fantasies feed straight into it, so the question changes from \"what should we do?\" to \"which one should we do first?\"",
			"For parents, the app handles the step that kills most plans: the sitter. Coordinate babysitting right inside the plan, so \"Saturday, 19:30, sitter confirmed\" is a single glance — not a three-day text relay.",
		],
	},
	image: {
		src: "/images/hero-date.webp",
		alt: "A candlelit dinner table for two on a rooftop overlooking city lights",
		caption: "The best dates start three days earlier — with a plan.",
	},
	benefits: {
		heading: "Everything a date needs, in one place",
		intro:
			"Less coordination overhead, more actual romance. Here's what the planner takes off your plate.",
		items: [
			{
				title: "Shared planning",
				description:
					"Both partners see, suggest, and edit plans. No more one person carrying the whole mental load of romance.",
				icon: "calendar",
			},
			{
				title: "Babysitter coordination",
				description:
					"Line up the sitter as part of the plan itself. When it says confirmed, the night is actually happening.",
				icon: "shield",
			},
			{
				title: "Ideas on tap",
				description:
					"Pull from your shared bucket list and fantasies instead of staring at a blank page every time.",
				icon: "sparkles",
			},
			{
				title: "Anniversaries & milestones",
				description:
					"Birthdays, anniversaries, the day you met — tracked in your shared calendar so they never sneak up on you again.",
				icon: "heart",
			},
			{
				title: "Gentle reminders",
				description:
					"Content-free notifications nudge you before the big night — without spoiling any surprises on your lock screen.",
				icon: "bell",
			},
			{
				title: "Memories that stack",
				description:
					"Completed dates become part of your shared story in the app — proof that you're building the relationship you want.",
				icon: "star",
			},
		],
	},
	steps: {
		heading: "How planning a date works",
		intro: "From idea to confirmed plans in three steps.",
		items: [
			{
				title: "Pick the spark",
				description:
					"Choose an idea from your bucket list, a shared fantasy, or start fresh. \"Rooftop dinner\" is a fine place to begin.",
			},
			{
				title: "Set the details together",
				description:
					"Agree on the day and time in your shared calendar, add the place, and — if you need one — coordinate the babysitter right in the plan.",
			},
			{
				title: "Show up and enjoy",
				description:
					"You both get a gentle reminder before the night. All that's left is the fun part: being there, together.",
			},
		],
	},
	faqs: [
		{
			question: "How is this better than a shared Google Calendar?",
			answer:
				"A general calendar stores events; Parfect plans dates. Ideas flow in from your bucket list and shared fantasies, babysitter coordination is built into the plan, anniversaries are tracked automatically, and it all lives in the same private space as your couple's chat — not between dentist appointments and work meetings.",
		},
		{
			question: "Does it work for couples without kids?",
			answer:
				"Absolutely. Babysitter coordination is optional — most of the planner is about ideas, shared scheduling, and making sure intentions become actual nights out (or in).",
		},
		{
			question: "Can we plan at-home date nights too?",
			answer:
				"Of course. A date is anything you do on purpose together — a cooking night, a movie marathon, a slow dance in the kitchen. The planner cares that it happens, not where.",
		},
		{
			question: "What about anniversaries and important dates?",
			answer:
				"Add them once and Parfect keeps track — your anniversary, birthdays, and the milestones that matter to you two. You'll get a heads-up in time to plan something, not an apology-flowers situation the day after.",
		},
		{
			question: "Is the date planner free?",
			answer:
				"Yes. Parfect is free to download on iOS and Android, and date planning is part of the core experience.",
		},
	],
	related: [
		{
			href: "/features/bucket-list",
			label: "Bucket list",
			description:
				"The shared list of everything you two want to do — the planner's best friend.",
		},
		{
			href: "/for/parents",
			label: "For parents",
			description:
				"How couples with kids get date night back on the calendar.",
		},
		{
			href: "/features/private-chat",
			label: "Private chat",
			description:
				"Where the \"what if we…\" conversations start.",
		},
	],
	cta: {
		heading: "Put the next date on the calendar",
		text: "Download Parfect free and turn this week's \"we really should\" into an actual reservation.",
	},
};

export default function DatePlannerPage() {
	return <FeaturePage content={content} />;
}
