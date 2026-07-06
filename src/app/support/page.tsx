import type { Metadata } from "next";
import Link from "next/link";
import { Subpage } from "@/components/subpage";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Support",
	description:
		"Get help with Parfect — pairing with your partner, login issues, notifications, and managing or deleting your account.",
	alternates: { canonical: "/support" },
};

const faqs = [
	{
		id: "pairing",
		question: "How do I pair with my partner?",
		answer:
			"Create your account, then send your partner the private invite code from the pairing screen. They enter it after signing up and you're connected. Codes are single-use — if one expires or gets lost, just generate a new one.",
	},
	{
		id: "login",
		question: "I can't log in",
		answer:
			"Double-check your email address and use the password reset link on the login screen if needed. If you still can't get in — for example after changing devices — email us and we'll help you recover your account.",
	},
	{
		id: "notifications",
		question: "Notifications aren't arriving",
		answer:
			"Make sure notifications are enabled for Parfect in your phone's system settings, and that they're turned on inside the app under Settings → Notifications. Note that our notifications are content-free by design: they never show what your partner wrote.",
	},
	{
		id: "unlink",
		question: "How do I unlink from my partner?",
		answer:
			"You can unlink at any time from Settings. Unlinking removes your couple's shared data from our servers. If you pair again later, you start fresh.",
	},
	{
		id: "delete",
		question: "How do I delete my account?",
		answer:
			"Go to Settings → Account → Delete account. This permanently removes your account and your couple's shared data, messages, and media from our servers. You can also email us and we'll delete it for you.",
	},
	{
		id: "safety",
		question: "I have a safety concern",
		answer:
			"Use Settings → Report a concern in the app, or email us directly. You can unlink from your partner at any time, and we take every report seriously.",
	},
];

export default function SupportPage() {
	return (
		<Subpage
			eyebrow="Help"
			title="Support"
			intro="Stuck on pairing, login, notifications, or your account? Most answers are below — and if yours isn't, we're one email away."
		>
			<div className="legal-callout">
				<p>
					<strong>Contact us:</strong>{" "}
					<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We read
					every message and usually reply within a couple of days.
				</p>
			</div>

			{faqs.map((faq) => (
				<section key={faq.id} aria-labelledby={faq.id}>
					<h2 id={faq.id}>{faq.question}</h2>
					<p>{faq.answer}</p>
				</section>
			))}

			<h2 id="more">Privacy &amp; terms</h2>
			<p>
				Curious how your data is handled? Read our{" "}
				<Link href="/privacy">Privacy Policy</Link> and{" "}
				<Link href="/terms">Terms of Service</Link>.
			</p>
		</Subpage>
	);
}
