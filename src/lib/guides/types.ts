export type GuideCluster = "date-nights" | "conversations" | "dreams-and-plans";

export type GuideIdea = {
	title: string;
	/** Omit for compact lists (e.g. question lists). */
	description?: string;
};

export type GuideSection = {
	id: string;
	heading: string;
	paragraphs?: string[];
	ideas?: GuideIdea[];
	/** Highlighted practical tip rendered as a callout. */
	tip?: string;
};

export type Guide = {
	slug: string;
	cluster: GuideCluster;
	seasonal?: boolean;
	/** Short label used on cards and in navigation. */
	cardTitle: string;
	cardDescription: string;
	title: string;
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	intro: string[];
	image: { src: string; alt: string };
	readingTime: string;
	datePublished: string;
	dateModified: string;
	sections: GuideSection[];
	faqs: { question: string; answer: string }[];
	/** In-article bridge from the guide's topic to the app. */
	appHook: {
		heading: string;
		text: string;
		href: string;
		linkLabel: string;
	};
	related: string[];
};

export const CLUSTERS: Record<
	GuideCluster,
	{ label: string; description: string }
> = {
	"date-nights": {
		label: "Date nights",
		description:
			"Real plans for real evenings — at home, out, or across a distance.",
	},
	conversations: {
		label: "Conversations",
		description:
			"Questions and rituals that take you past \u201chow was your day?\u201d",
	},
	"dreams-and-plans": {
		label: "Dreams & plans",
		description:
			"Bucket lists and shared goals — and how to actually make them happen.",
	},
};
