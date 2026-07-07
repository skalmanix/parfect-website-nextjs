import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("Common.subpage");

	return (
		<div className="min-h-svh flex flex-col items-center justify-center section-padding text-center">
			<h1 className="font-display text-4xl font-medium mb-4">404</h1>
			<p className="text-muted mb-8">{t("notFoundMessage")}</p>
			<Link href="/" className="btn-primary px-6 py-3 rounded-full text-sm">
				{t("backToHome")}
			</Link>
		</div>
	);
}
