import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Subpage } from "@/components/subpage";
import { SupportContent } from "@/components/legal-content";
import { buildAlternates } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Support" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: buildAlternates({ path: "/support", locale: locale as Locale }),
	};
}

export default async function SupportPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("Support");

	return (
		<Subpage eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
			<SupportContent />
		</Subpage>
	);
}
