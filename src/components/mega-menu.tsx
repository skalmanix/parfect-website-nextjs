"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AUDIENCE_LINKS, FEATURE_LINKS } from "@/lib/nav";
import { CLUSTERS, GUIDES } from "@/lib/guides";

function MegaMenuShell({
	label,
	children,
}: {
	label: string;
	children: (open: boolean, close: () => void) => ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<number | undefined>(undefined);

	const cancelClose = () => window.clearTimeout(closeTimer.current);
	const scheduleClose = () => {
		cancelClose();
		closeTimer.current = window.setTimeout(() => setOpen(false), 120);
	};

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [open]);

	return (
		<div
			ref={rootRef}
			className="relative"
			onMouseEnter={() => {
				cancelClose();
				setOpen(true);
			}}
			onMouseLeave={scheduleClose}
		>
			<button
				type="button"
				className="nav-link gap-1.5"
				aria-expanded={open}
				aria-haspopup="true"
				onClick={() => setOpen((v) => !v)}
			>
				{label}
				<svg
					className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
			</button>

			<div
				className={`mega-menu-panel ${open ? "mega-menu-open" : ""}`}
				aria-hidden={!open}
			>
				{children(open, () => setOpen(false))}
			</div>
		</div>
	);
}

function MenuCta({
	href,
	label,
	open,
	close,
}: {
	href: string;
	label: string;
	open: boolean;
	close: () => void;
}) {
	return (
		<Link
			href={href}
			tabIndex={open ? 0 : -1}
			onClick={close}
			className="mega-menu-cta group"
		>
			{label}
			<svg
				className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
				aria-hidden="true"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
			</svg>
		</Link>
	);
}

export function MegaMenu() {
	return (
		<MegaMenuShell label="Features">
			{(open, close) => (
				<div className="grid grid-cols-[1.5fr_1fr] gap-8">
					<div>
						<p className="eyebrow text-xs mb-4">Features</p>
						<ul className="grid grid-cols-2 gap-2">
							{FEATURE_LINKS.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										tabIndex={open ? 0 : -1}
										onClick={close}
										className="mega-menu-card group"
									>
										<span className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/50 mb-2.5 block">
											<Image
												src={item.image}
												alt=""
												fill
												sizes="180px"
												quality={50}
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</span>
										<span className="block font-medium text-sm text-foreground group-hover:text-primary-strong transition-colors">
											{item.label}
										</span>
										<span className="block text-xs text-muted leading-relaxed mt-0.5">
											{item.description}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="border-l border-border/50 pl-8">
						<p className="eyebrow text-xs mb-4">Made for</p>
						<ul className="flex flex-col gap-1">
							{AUDIENCE_LINKS.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										tabIndex={open ? 0 : -1}
										onClick={close}
										className="mega-menu-row group"
									>
										<span className="block font-medium text-sm text-foreground group-hover:text-primary-strong transition-colors">
											{item.label}
										</span>
										<span className="block text-xs text-muted leading-relaxed mt-0.5">
											{item.description}
										</span>
									</Link>
								</li>
							))}
						</ul>

						<MenuCta href="/download" label="Get the app" open={open} close={close} />
					</div>
				</div>
			)}
		</MegaMenuShell>
	);
}

/* Featured guides get image cards; the rest are listed as text rows. */
const FEATURED_GUIDE_SLUGS = [
	"date-night-ideas-at-home",
	"questions-for-couples",
	"couples-bucket-list-ideas",
	"how-to-reconnect-with-your-partner",
];

export function IdeasMegaMenu() {
	const featured = FEATURED_GUIDE_SLUGS.map(
		(slug) => GUIDES.find((guide) => guide.slug === slug)!,
	);
	const more = GUIDES.filter(
		(guide) => !FEATURED_GUIDE_SLUGS.includes(guide.slug),
	);

	return (
		<MegaMenuShell label="Ideas">
			{(open, close) => (
				<div className="grid grid-cols-[1.5fr_1fr] gap-8">
					<div>
						<p className="eyebrow text-xs mb-4">Popular guides</p>
						<ul className="grid grid-cols-2 gap-2">
							{featured.map((guide) => (
								<li key={guide.slug}>
									<Link
										href={`/ideas/${guide.slug}`}
										tabIndex={open ? 0 : -1}
										onClick={close}
										className="mega-menu-card group"
									>
										<span className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/50 mb-2.5 block">
											<Image
												src={guide.image.src}
												alt=""
												fill
												sizes="180px"
												quality={50}
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</span>
										<span className="block font-medium text-sm text-foreground group-hover:text-primary-strong transition-colors">
											{guide.cardTitle}
										</span>
										<span className="block text-xs text-muted leading-relaxed mt-0.5">
											{CLUSTERS[guide.cluster].label}
											{guide.seasonal ? " · Seasonal" : ""}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="border-l border-border/50 pl-8">
						<p className="eyebrow text-xs mb-4">More guides</p>
						<ul className="flex flex-col gap-1">
							{more.map((guide) => (
								<li key={guide.slug}>
									<Link
										href={`/ideas/${guide.slug}`}
										tabIndex={open ? 0 : -1}
										onClick={close}
										className="mega-menu-row group"
									>
										<span className="block font-medium text-sm text-foreground group-hover:text-primary-strong transition-colors">
											{guide.cardTitle}
										</span>
										<span className="block text-xs text-muted leading-relaxed mt-0.5">
											{CLUSTERS[guide.cluster].label}
											{guide.seasonal ? " · Seasonal" : ""}
										</span>
									</Link>
								</li>
							))}
						</ul>

						<MenuCta href="/ideas" label="All guides" open={open} close={close} />
					</div>
				</div>
			)}
		</MegaMenuShell>
	);
}
