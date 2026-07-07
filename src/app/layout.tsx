import type { Metadata } from "next";

export const metadata: Metadata = {
	// Locale-specific metadata lives in [locale]/layout.tsx
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
