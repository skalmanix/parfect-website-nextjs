import type { Metadata } from "next";
import { Subpage } from "@/components/subpage";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"How Parfect collects, uses, and protects your data. Built for intimacy, not exposure — no ads, no data sales, and privacy controls you can actually understand.",
	alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
	return (
		<Subpage
			eyebrow="Legal"
			title="Privacy Policy"
			intro="Parfect is a private app for two. This policy explains — in plain language — what we collect, why we collect it, how long we keep it, and the rights you have over your data."
			updated="July 6, 2026"
		>
			<h2 id="controller">Who we are</h2>
			<p>
				Parfect operates the Parfect app and the API at{" "}
				<strong>api.parfect.app</strong>, and is the data controller for
				personal data processed through them. For anything privacy-related,
				contact us at{" "}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
			</p>

			<h2 id="what-we-collect">What we collect</h2>
			<ul>
				<li>
					<strong>Account information</strong> — your email, display name, and
					a password hash. We never store your password in plain text.
				</li>
				<li>
					<strong>Couple data</strong> — pairing information, profile
					settings, and consent timestamps.
				</li>
				<li>
					<strong>Content you sync</strong> — messages, fantasies, calendar
					events, shared lists, and media metadata, so both of you can access
					them across devices.
				</li>
				<li>
					<strong>Shared media</strong> — photos, videos, and audio you share
					in chat, stored on our servers.
				</li>
				<li>
					<strong>Push tokens</strong> — only if you enable notifications.
				</li>
				<li>
					<strong>Technical logs</strong> — the minimum needed to operate,
					secure, and debug the service.
				</li>
			</ul>

			<h2 id="what-we-dont-do">What we never do</h2>
			<div className="legal-callout">
				<ul>
					<li>We do not sell your personal data.</li>
					<li>We do not use your relationship content for advertising.</li>
					<li>
						We do not share your data with third parties, except the
						infrastructure providers needed to run the app.
					</li>
				</ul>
			</div>

			<h2 id="encryption">End-to-end encryption</h2>
			<p>
				Chat message text can be encrypted on your device before it is sent.
				When end-to-end encryption is enabled,{" "}
				<strong>Parfect cannot read the contents of those messages</strong>.
				Media files and other shared app data are stored on our servers so
				both partners can access them.
			</p>

			<h2 id="how-we-use">How we use your data</h2>
			<ul>
				<li>
					To authenticate you and sync data between your devices and your
					partner.
				</li>
				<li>
					To deliver realtime updates and optional push notifications — which
					never include message content.
				</li>
				<li>To maintain, secure, and improve the service.</li>
			</ul>

			<h2 id="lawful-basis">Lawful basis (GDPR)</h2>
			<ul>
				<li>
					<strong>Contract</strong> — to provide the app, sync data between
					you and your partner, and authenticate you.
				</li>
				<li>
					<strong>Consent</strong> — for optional notifications, post-pairing
					safety consent, and 18+ confirmation.
				</li>
				<li>
					<strong>Legitimate interests</strong> — to secure the service,
					prevent abuse, and improve reliability.
				</li>
			</ul>

			<h2 id="subprocessors">Hosting &amp; subprocessors</h2>
			<p>
				We use infrastructure providers to host the API, database, media
				storage, and push delivery (including cloud hosting and Expo push
				services). Your data is processed only to operate the service —
				nothing else.
			</p>

			<h2 id="cookies">Cookies &amp; sessions</h2>
			<p>
				The web version uses a single HttpOnly session cookie to keep you
				signed in. The mobile app stores a session token in secure device
				storage. We do not use advertising or tracking cookies.
			</p>

			<h2 id="retention">How long we keep data</h2>
			<ul>
				<li>
					Account and synced data are kept while your account is active.
				</li>
				<li>
					When you unlink or delete your account, we remove your couple&apos;s
					shared data, messages, and media from our servers.
				</li>
				<li>
					Technical logs are retained for a limited period for security and
					operations, then deleted.
				</li>
			</ul>

			<h2 id="your-rights">Your rights</h2>
			<p>Depending on your location, you may have the right to:</p>
			<ul>
				<li>Access, correct, or delete your personal data.</li>
				<li>
					Export your data — contact{" "}
					<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
				</li>
				<li>Object to or restrict certain processing.</li>
				<li>Withdraw consent where processing is consent-based.</li>
				<li>
					Lodge a complaint with your local data protection authority.
				</li>
			</ul>

			<h2 id="delete">Deleting your account</h2>
			<p>
				You can delete your account in the app under{" "}
				<strong>Settings → Account → Delete account</strong>. This permanently
				removes your account and associated couple data from our servers. You
				can also email{" "}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we&apos;ll
				take care of it.
			</p>

			<h2 id="safety">Safety &amp; reporting</h2>
			<p>
				If you have a safety concern, use{" "}
				<strong>Settings → Report a concern</strong> in the app or email{" "}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. You can
				unlink from your partner at any time from Settings.
			</p>

			<h2 id="contact">Questions?</h2>
			<p>
				We&apos;re happy to explain anything in this policy. Reach us at{" "}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
			</p>
		</Subpage>
	);
}
