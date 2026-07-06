"use client";

import { useEffect, useState } from "react";

type MobileMenuProps = {
	links: ReadonlyArray<{ href: string; label: string }>;
};

export function MobileMenu({ links }: MobileMenuProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<div className="lg:hidden">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? "Close menu" : "Open menu"}
				className="flex items-center justify-center w-11 h-11 -mr-2 text-foreground"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.75}
					aria-hidden="true"
				>
					{open ? (
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					) : (
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
					)}
				</svg>
			</button>

			<div
				id="mobile-menu"
				className={`mobile-menu-panel ${open ? "mobile-menu-open" : ""}`}
				aria-hidden={!open}
			>
				<nav aria-label="Mobile navigation" className="flex flex-col">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							tabIndex={open ? 0 : -1}
							className="mobile-menu-link"
						>
							{link.label}
						</a>
					))}
				</nav>
				<a
					href="#download"
					onClick={() => setOpen(false)}
					tabIndex={open ? 0 : -1}
					className="btn-primary flex items-center justify-center px-5 py-3.5 rounded-full text-sm mt-4"
				>
					Get the app
				</a>
			</div>

			{open && (
				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					onClick={() => setOpen(false)}
					className="mobile-menu-backdrop"
				/>
			)}
		</div>
	);
}
