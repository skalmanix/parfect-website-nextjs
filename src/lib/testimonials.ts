export type Testimonial = {
	quote: string;
	names: string;
	context: string;
	image: string;
};

/* Featured card on the home page social proof section. */
export const FEATURED_TESTIMONIAL: Testimonial = {
	quote:
		"We've been together six years and talk every single day — but Parfect is the first place we actually say things. It's like we found a room in our house we didn't know was there.",
	names: "Hanna & Viktor",
	context: "Together 6 years · Stockholm",
	image: "/images/people/couple-laughing.webp",
};

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"The prompts started conversations we'd been avoiding for years. Knowing 'not right now' is always okay made all the difference for us.",
		names: "Elin & Jonas",
		context: "Together 8 years",
		image: "/images/people/couple-elin-jonas.webp",
	},
	{
		quote:
			"Two kids, zero spontaneity — date night was a guilty wish. Now it's twice a month, and the sitter step means it actually happens.",
		names: "Sara & Marcus",
		context: "Parents of two",
		image: "/images/people/couple-sara-marcus.webp",
	},
	{
		quote:
			"Different time zones, same ritual. The daily question keeps us inside each other's day, and the bucket list is our reunion countdown.",
		names: "Amira & Daniel",
		context: "Long-distance · Oslo–Lisbon",
		image: "/images/people/couple-amira-daniel.webp",
	},
	{
		quote:
			"After 31 years of marriage we assumed we knew everything about each other. We didn't. It feels playful again — that surprised us both.",
		names: "Kerstin & Lars",
		context: "Married 31 years",
		image: "/images/people/couple-kerstin-lars.webp",
	},
];

export const RATING_LINE = "4.9 / 5 from couples in early access";
