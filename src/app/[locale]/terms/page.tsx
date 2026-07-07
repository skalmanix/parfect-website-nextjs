import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Subpage } from "@/components/subpage";
import { LegalDocument } from "@/components/legal-content";
import { buildAlternates } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Terms" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: buildAlternates({ path: "/terms", locale: locale as Locale }),
	};
}

export default async function TermsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("Terms");

	return (
		<Subpage
			eyebrow={t("eyebrow")}
			title={t("title")}
			intro={t("intro")}
			updated={t("updated")}
		>
			<LegalDocument namespace="Terms" />
		</Subpage>
	);
}
