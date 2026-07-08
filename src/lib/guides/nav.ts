import type { Locale } from "@/i18n/routing";
import type { GuideCluster } from "./types";
import guidesNav from "../../../messages/bundled/guides-nav.json";

export type GuideNavItem = {
	slug: string;
	cardTitle: string;
	cluster: GuideCluster;
	seasonal: boolean;
	image: { src: string };
};

const navByLocale = guidesNav as Record<Locale, GuideNavItem[]>;

export function getGuideNavItems(locale: Locale): GuideNavItem[] {
	return navByLocale[locale] ?? navByLocale.en;
}

export function getGuideNavItem(
	slug: string,
	locale: Locale,
): GuideNavItem | undefined {
	return getGuideNavItems(locale).find((guide) => guide.slug === slug);
}
