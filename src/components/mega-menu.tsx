"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AUDIENCE_LINKS, FEATURE_LINKS } from "@/lib/nav";

export function MegaMenu() {
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
				Features
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
				<div className="grid grid-cols-[1.5fr_1fr] gap-8">
					<div>
						<p className="eyebrow text-xs mb-4">Features</p>
						<ul className="grid grid-cols-2 gap-2">
							{FEATURE_LINKS.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										tabIndex={open ? 0 : -1}
										onClick={() => setOpen(false)}
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
										onClick={() => setOpen(false)}
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

						<Link
							href="/#download"
							tabIndex={open ? 0 : -1}
							onClick={() => setOpen(false)}
							className="mega-menu-cta group"
						>
							Get the app
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
					</div>
				</div>
			</div>
		</div>
	);
}
