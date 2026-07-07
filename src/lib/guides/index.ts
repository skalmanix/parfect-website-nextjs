import type { Guide, GuideCluster } from "./types";
import { dateNightIdeasAtHome } from "./date-night-ideas-at-home";
import { dateIdeasForParents } from "./date-ideas-for-parents";
import { longDistanceDateIdeas } from "./long-distance-date-ideas";
import { questionsForCouples } from "./questions-for-couples";
import { howToReconnectWithYourPartner } from "./how-to-reconnect-with-your-partner";
import { couplesBucketListIdeas } from "./couples-bucket-list-ideas";
import { valentinesDayDateIdeas } from "./valentines-day-date-ideas";
import { anniversaryDateIdeas } from "./anniversary-date-ideas";

export { CLUSTERS } from "./types";
export type { Guide, GuideCluster } from "./types";

export const GUIDES: Guide[] = [
	dateNightIdeasAtHome,
	dateIdeasForParents,
	longDistanceDateIdeas,
	questionsForCouples,
	howToReconnectWithYourPartner,
	couplesBucketListIdeas,
	valentinesDayDateIdeas,
	anniversaryDateIdeas,
];

export function getGuide(slug: string): Guide | undefined {
	return GUIDES.find((guide) => guide.slug === slug);
}

export function getGuidesByCluster(cluster: GuideCluster): Guide[] {
	return GUIDES.filter((guide) => guide.cluster === cluster);
}
