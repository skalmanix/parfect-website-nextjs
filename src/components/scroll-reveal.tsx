"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement: elements marked with [data-reveal] fade/slide in
 * as they enter the viewport. Without JS they stay visible (see noscript
 * override in layout). Respects prefers-reduced-motion via CSS.
 */
export function ScrollReveal() {
	useEffect(() => {
		document.documentElement.classList.add("reveal-ready");

		const elements = Array.from(
			document.querySelectorAll<HTMLElement>("[data-reveal]"),
		);
		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("revealed");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
		);

		for (const el of elements) {
			// Elements already in view on load reveal immediately (no pop-in).
			const rect = el.getBoundingClientRect();
			if (rect.top < window.innerHeight && rect.bottom > 0) {
				el.classList.add("revealed");
			} else {
				observer.observe(el);
			}
		}

		return () => observer.disconnect();
	}, []);

	return null;
}
