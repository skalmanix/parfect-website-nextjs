/** Width-suffixed variants: `/images/foo.webp` → `/images/foo-640w.webp */

export function imageVariant(src: string, width: number, ext?: string): string {
	const targetExt = ext ?? src.match(/\.(\w+)$/)?.[1] ?? "webp";
	return src.replace(/\.[^.]+$/, `-${width}w.${targetExt}`);
}

export function buildSrcSet(
	src: string,
	widths: readonly number[],
	ext?: string,
): string {
	return widths
		.map((width) => `${imageVariant(src, width, ext)} ${width}w`)
		.join(", ");
}

export function defaultSrc(
	src: string,
	widths: readonly number[],
	preferred = 768,
	ext?: string,
): string {
	const sorted = [...widths].sort((a, b) => a - b);
	const pick = sorted.find((width) => width >= preferred) ?? sorted[sorted.length - 1];
	return imageVariant(src, pick, ext);
}

export const IMAGE_PRESETS = {
	menuThumb: { widths: [360], sizes: "180px", default: 360 },
	guideCard: {
		widths: [400, 800],
		sizes: "(max-width: 640px) 100vw, 340px",
		default: 400,
	},
	article: {
		widths: [640, 768, 1280],
		sizes: "(max-width: 768px) 100vw, 768px",
		default: 768,
	},
	heroBg: { widths: [640, 768, 1280], sizes: "100vw", default: 768 },
	portraitCard: {
		widths: [400, 500, 768],
		sizes: "(max-width: 768px) 45vw, 250px",
		default: 500,
	},
	storyPortrait: {
		widths: [400, 768],
		sizes: "(min-width: 1024px) 420px, 90vw",
		default: 400,
	},
	testimonialHero: {
		widths: [640, 1024, 1280],
		sizes: "(max-width: 1024px) 100vw, 640px",
		default: 1024,
	},
	avatarXs: { widths: [64, 128], sizes: "32px", default: 64 },
	avatarSm: { widths: [88, 176], sizes: "44px", default: 88 },
	avatarMd: { widths: [96, 192], sizes: "56px", default: 96 },
	avatarLg: { widths: [112, 224], sizes: "112px", default: 112 },
	mockup: {
		widths: [640],
		sizes: "(max-width: 640px) 270px, 300px",
		default: 640,
	},
	featureDeco: { widths: [400, 800], sizes: "400px", default: 400 },
	qr: { widths: [192], sizes: "96px", default: 192, variantExt: "webp" },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

export type ImagePresetConfig = (typeof IMAGE_PRESETS)[ImagePreset];
