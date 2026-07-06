import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "./header";
import { Footer } from "./footer";

type SubpageProps = {
	eyebrow: string;
	title: string;
	intro?: string;
	updated?: string;
	children: ReactNode;
};

export function Subpage({ eyebrow, title, intro, updated, children }: SubpageProps) {
	return (
		<>
			<Header />
			<main className="relative">
				<div className="absolute inset-x-0 top-0 h-[420px] app-gradient-bg opacity-70" aria-hidden="true" />

				<div className="relative container-narrow section-padding pt-32 md:pt-40 pb-20 md:pb-28">
					<nav aria-label="Breadcrumb" className="mb-8">
						<Link
							href="/"
							className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
						>
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
							</svg>
							Back to Parfect
						</Link>
					</nav>

					<p className="eyebrow mb-3">{eyebrow}</p>
					<h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-4 text-balance">
						{title}
					</h1>
					{intro && (
						<p className="text-muted text-lg leading-relaxed max-w-2xl">{intro}</p>
					)}
					{updated && (
						<p className="text-sm text-muted-deep mt-4">Last updated: {updated}</p>
					)}

					<div className="legal-prose mt-12">{children}</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
