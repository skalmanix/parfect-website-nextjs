"use client";

import Image from "next/image";
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
		<Image
			src="/images/icon.png"
			alt=""
			width={size}
			height={size}
			className={`rounded-[22%] ${className}`}
			aria-hidden="true"
			priority
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
