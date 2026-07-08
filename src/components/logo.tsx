"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type LogoProps = {
	size?: number;
	showWordmark?: boolean;
	className?: string;
	href?: string;
};

export function LogoMark({
	size = 40,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<img
			src={size <= 40 ? "/images/icon-72.webp" : "/images/icon-144.webp"}
			srcSet="/images/icon-72.webp 72w, /images/icon-144.webp 144w"
			sizes={`${size}px`}
			alt=""
			width={size}
			height={size}
			className={`rounded-[22%] ${className}`}
			aria-hidden="true"
			decoding="async"
		/>
	);
}

export function Logo({
	size = 40,
	showWordmark = true,
	className = "",
	href,
}: LogoProps) {
	const t = useTranslations("Common");
	const content = (
		<>
			<LogoMark size={size} />
			{showWordmark ? (
				<span
					className="font-display font-medium tracking-tight text-foreground"
					style={{ fontSize: size * 0.72, lineHeight: 1 }}
				>
					{t("brand")}
				</span>
			) : null}
		</>
	);

	const classes = `inline-flex items-center gap-2.5 ${className}`;

	if (href) {
		return (
			<Link href={href} className={`${classes} group`} aria-label={t("logoHome")}>
				{content}
			</Link>
		);
	}

	return <div className={classes}>{content}</div>;
}
