import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Subpage } from "@/components/subpage";
import { LegalDocument } from "@/components/legal-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import {
	buildBreadcrumbSchema,
	buildSchemaGraph,
	buildWebPageSchema,
} from "@/lib/schema-helpers";
import { localizedUrl } from "@/lib/i18n/metadata";
import { SITE_URL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Privacy" });

	return createPageMetadata({
		path: "/privacy",
		locale: locale as Locale,
		title: t("metaTitle"),
		description: t("metaDescription"),
	});
}

export default async function PrivacyPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("Privacy");
	const pageUrl = localizedUrl("/privacy", locale as Locale);

	const jsonLd = buildSchemaGraph([
		buildWebPageSchema({
			name: t("metaTitle"),
			description: t("metaDescription"),
			url: pageUrl,
		}),
		buildBreadcrumbSchema([
			{ name: "Parfect", item: SITE_URL },
			{ name: t("title"), item: pageUrl },
		]),
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Subpage
				eyebrow={t("eyebrow")}
				title={t("title")}
				intro={t("intro")}
				updated={t("updated")}
			>
				<LegalDocument namespace="Privacy" />
			</Subpage>
		</>
	);
}
