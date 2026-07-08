"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MHTJWPXG";

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

/*
 * Performance-first GTM loader: nothing is fetched until the visitor
 * interacts (tap, mouse move, scroll, key press). GTM then initiates
 * consent management and all tracking.
 */
export function GoogleTagManager() {
	useEffect(() => {
		if (document.getElementById("gtm-script")) return;

		const events = [
			"pointerdown",
			"touchstart",
			"mousemove",
			"wheel",
			"scroll",
			"keydown",
		] as const;

		const load = () => {
			for (const event of events) window.removeEventListener(event, load);
			if (document.getElementById("gtm-script")) return;

			window.dataLayer = window.dataLayer ?? [];
			window.dataLayer.push({
				"gtm.start": new Date().getTime(),
				event: "gtm.js",
			});

			const script = document.createElement("script");
			script.id = "gtm-script";
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
			document.head.appendChild(script);
		};

		for (const event of events) {
			window.addEventListener(event, load, { once: true, passive: true });
		}
		return () => {
			for (const event of events) window.removeEventListener(event, load);
		};
	}, []);

	return null;
}
