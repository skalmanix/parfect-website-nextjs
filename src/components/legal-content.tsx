import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SUPPORT_EMAIL } from "@/lib/constants";

type ListItem = { strong?: string; text: string };
type Block =
	| { type: "paragraph"; text: string; strong?: string[]; linkText?: string }
	| { type: "list"; items: ListItem[] }
	| {
			type: "callout";
			items?: string[];
			text?: string;
			strong?: string[];
			linkText?: string;
	  };

type Section = {
	id: string;
	heading: string;
	blocks: Block[];
};

function renderInline(text: string, strong?: string[]): ReactNode {
	if (!strong?.length) return text;

	let parts: ReactNode[] = [text];
	for (const word of strong) {
		const next: ReactNode[] = [];
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (typeof part !== "string") {
				next.push(part);
				continue;
			}
			const idx = part.indexOf(word);
			if (idx === -1) {
				next.push(part);
				continue;
			}
			next.push(
				part.slice(0, idx),
				<strong key={`${word}-${i}`}>{word}</strong>,
				part.slice(idx + word.length),
			);
		}
		parts = next;
	}
	return parts;
}

function ParagraphContent({
	text,
	strong,
	linkText,
}: {
	text: string;
	strong?: string[];
	linkText?: string;
}) {
	const content = text.replace("{email}", SUPPORT_EMAIL);

	if (linkText && content.includes(linkText)) {
		const [before, after] = content.split(linkText);
		return (
			<p>
				{before}
				<Link href="/privacy">{linkText}</Link>
				{after}
			</p>
		);
	}

	if (content.includes(SUPPORT_EMAIL)) {
		const [before, after] = content.split(SUPPORT_EMAIL);
		return (
			<p>
				{renderInline(before, strong)}
				<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
				{renderInline(after, strong)}
			</p>
		);
	}

	return <p>{renderInline(content, strong)}</p>;
}

function BlockRenderer({ block }: { block: Block }) {
	if (block.type === "paragraph") {
		return (
			<ParagraphContent
				text={block.text}
				strong={block.strong}
				linkText={block.linkText}
			/>
		);
	}

	if (block.type === "list") {
		return (
			<ul>
				{block.items.map((item) => (
					<li key={item.text.slice(0, 40)}>
						{item.strong ? <strong>{item.strong}</strong> : null}
						{item.text}
					</li>
				))}
			</ul>
		);
	}

	if (block.text) {
		return (
			<div className="legal-callout">
				<ParagraphContent
					text={block.text}
					strong={block.strong}
					linkText={block.linkText}
				/>
			</div>
		);
	}

	return (
		<div className="legal-callout">
			<ul>
				{(block.items ?? []).map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export async function LegalDocument({
	namespace,
}: {
	namespace: "Privacy" | "Terms";
}) {
	const t = await getTranslations(namespace);
	const sections = (t.raw("sections") as Section[] | undefined) ?? [];

	return (
		<>
			{sections.map((section) => (
				<section key={section.id} aria-labelledby={section.id}>
					<h2 id={section.id}>{section.heading}</h2>
					{section.blocks.map((block, i) => (
						<BlockRenderer key={`${section.id}-${i}`} block={block} />
					))}
				</section>
			))}
		</>
	);
}

export async function SupportContent() {
	const t = await getTranslations("Support");
	const faqs = t.raw("faqs") as {
		id: string;
		question: string;
		answer: string;
	}[];

	return (
		<>
			<div className="legal-callout">
				<p>
					<strong>{t("contactLabel")}</strong>{" "}
					<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.{" "}
					{t("contactText")}
				</p>
			</div>

			{faqs.map((faq) => (
				<section key={faq.id} aria-labelledby={faq.id}>
					<h2 id={faq.id}>{faq.question}</h2>
					<p>{faq.answer}</p>
				</section>
			))}

			<h2 id="more">{t("moreHeading")}</h2>
			<p>
				{t("moreText")}{" "}
				<Link href="/privacy">{t("privacyLink")}</Link>
				{t("moreTextBetween")}
				<Link href="/terms">{t("termsLink")}</Link>
				{t("moreTextEnd")}
			</p>
		</>
	);
}
