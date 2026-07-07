export const FEATURE_PAGE_KEYS = [
	"privateChat",
	"fantasies",
	"datePlanner",
	"bucketList",
	"forParents",
	"forLongDistance",
	"forMarriedCouples",
] as const;

export type FeaturePageKey = (typeof FEATURE_PAGE_KEYS)[number];

export const FEATURE_PAGE_PATHS: Record<FeaturePageKey, string> = {
	privateChat: "/features/private-chat",
	fantasies: "/features/fantasies",
	datePlanner: "/features/date-planner",
	bucketList: "/features/bucket-list",
	forParents: "/for/parents",
	forLongDistance: "/for/long-distance",
	forMarriedCouples: "/for/married-couples",
};
