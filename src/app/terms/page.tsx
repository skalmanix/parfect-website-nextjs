import type { Metadata } from "next";
import Link from "next/link";
import { Subpage } from "@/components/subpage";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"The terms that govern your use of Parfect — eligibility, your account, acceptable use, private couple content, and service availability.",
	alternates: { canonical: "/terms" },
};

export default function TermsPage() {
	return (
		<Subpage
			eyebrow="Legal"
			title="Terms of Service"
			intro="These terms keep Parfect a safe, respectful space for every couple. By creating an account or using the app, you agree to them."
			updated="July 6, 2026"
		>
			<h2 id="eligibility">Eligibility</h2>
			<p>
				Parfect is for adults <strong>18 years or older</strong>. By using the
				app, you confirm that you meet this requirement.
			</p>

			<h2 id="account">Your account</h2>
			<p>
				You are responsible for keeping your login credentials secure and for
				activity that happens on your account. You may delete your account at
				any time from <strong>Settings → Account → Delete account</strong>.
			</p>

			<h2 id="acceptable-use">Acceptable use &amp; content</h2>
			<p>You agree not to:</p>
			<ul>
				<li>Misuse the service or attempt to compromise the platform.</li>
				<li>Harass, threaten, or harm others.</li>
				<li>Upload or share illegal content.</li>
			</ul>
			<p>
				You are responsible for the content you share with your paired
				partner. <strong>Never share intimate media or messages without
				mutual consent.</strong> We may suspend accounts that violate these
				terms or applicable law.
			</p>
			<div className="legal-callout">
				<p>
					If something feels wrong, report it. Use{" "}
					<strong>Settings → Report a concern</strong> in the app or email{" "}
					<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We take
					safety reports seriously.
				</p>
			</div>

			<h2 id="couple-content">Private couple content</h2>
			<p>
				You and your paired partner control the content you share in the app.
				Pairing is a trust decision: only pair with someone you trust with the
				information you share. You can unlink from your partner at any time
				from Settings.
			</p>

			<h2 id="availability">Service availability</h2>
			<p>
				We work hard to keep Parfect available and secure, but the service is
				provided as-is, without guaranteed uptime.
			</p>

			<h2 id="termination">Termination</h2>
			<p>
				You may stop using Parfect at any time. We may suspend or terminate
				accounts that violate these terms.
			</p>

			<h2 id="privacy">Privacy</h2>
			<p>
				How we handle your data is covered in our{" "}
				<Link href="/privacy">Privacy Policy</Link> — including what we
				collect, end-to-end encryption, and how to delete your data.
			</p>

			<h2 id="contact">Questions?</h2>
			<p>
				Reach us anytime at{" "}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
			</p>
		</Subpage>
	);
}
