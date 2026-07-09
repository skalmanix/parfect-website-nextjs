import {
	buildSrcSet,
	defaultSrc,
	IMAGE_PRESETS,
	type ImagePreset,
} from "@/lib/images";

type ResponsiveImageProps = {
	src: string;
	alt: string;
	preset?: ImagePreset;
	widths?: readonly number[];
	sizes?: string;
	defaultWidth?: number;
	fill?: boolean;
	width?: number;
	height?: number;
	className?: string;
	loading?: "lazy" | "eager";
	fetchPriority?: "high" | "low" | "auto";
	priority?: boolean;
	"aria-hidden"?: boolean | "true" | "false";
};

export function ResponsiveImage({
	src,
	alt,
	preset,
	widths,
	sizes,
	defaultWidth,
	fill = false,
	width,
	height,
	className = "",
	loading,
	fetchPriority,
	priority = false,
	"aria-hidden": ariaHidden,
}: ResponsiveImageProps) {
	const presetConfig = preset ? IMAGE_PRESETS[preset] : null;
	const resolvedWidths = widths ?? presetConfig?.widths ?? [768];
	const resolvedSizes = sizes ?? presetConfig?.sizes ?? "100vw";
	const resolvedDefault =
		defaultWidth ?? presetConfig?.default ?? resolvedWidths[resolvedWidths.length - 1];
	const variantExt =
		presetConfig && "variantExt" in presetConfig ? presetConfig.variantExt : undefined;

	return (
		<img
			src={defaultSrc(src, resolvedWidths, resolvedDefault, variantExt)}
			srcSet={buildSrcSet(src, resolvedWidths, variantExt)}
			sizes={resolvedSizes}
			alt={alt}
			width={width}
			height={height}
			loading={priority ? "eager" : (loading ?? "lazy")}
			decoding="async"
			fetchPriority={fetchPriority}
			aria-hidden={ariaHidden}
			className={
				fill
					? `absolute inset-0 h-full w-full object-cover ${className}`.trim()
					: className
			}
		/>
	);
}
