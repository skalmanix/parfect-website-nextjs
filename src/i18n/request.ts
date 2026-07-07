import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

async function loadMessages(locale: string) {
	const [common, metadata, home, features, guides, legal, legalPages, download, app, faq, about] =
		await Promise.all([
			import(`../../messages/${locale}/common.json`),
			import(`../../messages/${locale}/metadata.json`),
			import(`../../messages/${locale}/home.json`),
			import(`../../messages/${locale}/features.json`),
			import(`../../messages/${locale}/guides-ui.json`),
			import(`../../messages/${locale}/legal.json`),
			import(`../../messages/${locale}/legal-pages.json`),
			import(`../../messages/${locale}/download.json`),
			import(`../../messages/${locale}/app.json`),
			import(`../../messages/${locale}/faq.json`),
			import(`../../messages/${locale}/about.json`),
		]);

	return {
		...common.default,
		...metadata.default,
		...home.default,
		...features.default,
		...guides.default,
		...legal.default,
		...legalPages.default,
		...download.default,
		...app.default,
		...faq.default,
		...about.default,
	};
}

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	return {
		locale,
		messages: await loadMessages(locale),
	};
});
