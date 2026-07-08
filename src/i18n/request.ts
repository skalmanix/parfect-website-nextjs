import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "../../messages/bundled/en.json";
import sv from "../../messages/bundled/sv.json";
import no from "../../messages/bundled/no.json";
import da from "../../messages/bundled/da.json";
import de from "../../messages/bundled/de.json";
import es from "../../messages/bundled/es.json";

const messagesByLocale = { en, sv, no, da, de, es } as const;

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	return {
		locale,
		messages: messagesByLocale[locale],
	};
});
