import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Parfect — Just the two of you",
		short_name: "Parfect",
		description:
			"A private couples app for intimate chat, shared fantasies, and date planning.",
		start_url: "/",
		display: "standalone",
		background_color: "#160910",
		theme_color: "#160910",
		icons: [
			{
				src: "/images/icon.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
