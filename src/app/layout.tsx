import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import {
	getFaqSchema,
	getOrganizationSchema,
	getSoftwareApplicationSchema,
	getWebSiteSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const hanken = Hanken_Grotesk({
	variable: "--font-hanken",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: true,
});

const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: true,
});

export const viewport: Viewport = {
	themeColor: "#160910",
	colorScheme: "dark",
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Parfect — Take the next step together",
		template: "%s | Parfect",
	},
	description:
		"Download Parfect — the private couples app to talk intimately, share dreams, and turn them into real date nights. Just the two of you.",
	keywords: [
		"couples app",
		"relationship app",
		"date night planner",
		"private chat for couples",
		"intimacy app",
		"couples communication",
		"relationship goals",
		"Parfect",
	],
	authors: [{ name: "Parfect" }],
	creator: "Parfect",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		siteName: "Parfect",
		title: "Parfect — Just the two of you",
		description:
			"A private space for couples to talk intimately, share dreams, and turn them into real date nights.",
		images: [
			{
				url: "/images/hero-home.webp",
				width: 720,
				height: 1560,
				alt: "Parfect couples app",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Parfect — Just the two of you",
		description:
			"The private couples app for intimate chat, shared fantasies, and real date nights.",
		images: ["/images/hero-home.webp"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [{ url: "/favicon.png", sizes: "96x96", type: "image/png" }],
		apple: [{ url: "/images/icon.png", sizes: "512x512", type: "image/png" }],
	},
	alternates: {
		canonical: SITE_URL,
	},
	category: "lifestyle",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = [
		getOrganizationSchema(),
		getSoftwareApplicationSchema(),
		getWebSiteSchema(),
		getFaqSchema(),
	];

	return (
		<html lang="en" className="dark">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd),
					}}
				/>
			</head>
			<body
				className={`${hanken.variable} ${newsreader.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
