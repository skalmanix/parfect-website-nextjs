/** Width-suffixed variants: `/images/foo.webp` → `/images/foo-640w.webp */

import manifest from "./image-manifest.json";

type ImageManifest = Record<string, number[]>;

export function imageVariant(src: string, width: number, ext?: string): string {
	const targetExt = ext ?? src.match(/\.(\w+)$/)?.[1] ?? "webp";
	return src.replace(/\.[^.]+$/, `-${width}w.${targetExt}`);
}

export function availableWidths(
	src: string,
	widths: readonly number[],
): readonly number[] {
	const existing = (manifest as ImageManifest)[src];
	if (!existing?.length) return [];
	return widths.filter((width) => existing.includes(width));
}

export function buildSrcSet(
	src: string,
	widths: readonly number[],
	ext?: string,
): string | undefined {
	const entries = availableWidths(src, widths).map(
		(width) => `${imageVariant(src, width, ext)} ${width}w`,
	);
	return entries.length > 0 ? entries.join(", ") : undefined;
}

/** Preset widths are candidates; only existing variants are emitted in srcset. */
export const IMAGE_PRESETS = {
	menuThumb: { widths: [360], sizes: "180px" },
	guideCard: {
		widths: [360, 768, 1280],
		sizes: "(max-width: 640px) 100vw, 340px",
	},
	article: {
		widths: [360, 640, 768, 1280],
		sizes: "(max-width: 768px) 100vw, 768px",
	},
	heroBg: { widths: [400, 640, 768, 1280], sizes: "100vw" },
	portraitCard: {
		widths: [400, 768],
		sizes: "(max-width: 768px) 45vw, 250px",
	},
	storyPortrait: {
		widths: [400, 768],
		sizes: "(min-width: 1024px) 420px, 90vw",
	},
	testimonialHero: {
		widths: [768, 1280],
		sizes: "(max-width: 1024px) 100vw, 640px",
	},
	avatarXs: { widths: [128], sizes: "32px" },
	avatarSm: { widths: [128, 400], sizes: "44px" },
	avatarMd: { widths: [128, 400], sizes: "56px" },
	avatarLg: { widths: [128, 400], sizes: "112px" },
	mockup: {
		widths: [640, 768],
		sizes: "(max-width: 640px) 270px, 300px",
	},
	featureDeco: { widths: [640, 768], sizes: "400px" },
	qr: { widths: [192], sizes: "96px", variantExt: "webp" },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

export type ImagePresetConfig = (typeof IMAGE_PRESETS)[ImagePreset];
