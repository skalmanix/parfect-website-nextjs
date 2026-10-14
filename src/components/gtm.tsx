const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MHTJWPXG";

/** Loads Google Tag Manager once. Call only after a consent choice exists. */
export function loadGoogleTagManager() {
	if (typeof document === "undefined") return;
	if (document.getElementById("gtm-script")) return;

	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push({
		"gtm.start": Date.now(),
		event: "gtm.js",
	});

	const script = document.createElement("script");
	script.id = "gtm-script";
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(script);
}
