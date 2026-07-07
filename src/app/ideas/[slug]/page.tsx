import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guide-page";
import { GUIDES, getGuide } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const guide = getGuide(slug);
	if (!guide) return {};

	const url = `${SITE_URL}/ideas/${guide.slug}`;
	return {
		title: guide.metaTitle,
		description: guide.metaDescription,
		alternates: { canonical: url },
		openGraph: {
			title: guide.metaTitle,
			description: guide.metaDescription,
			url,
			type: "article",
			images: [{ url: `${SITE_URL}${guide.image.src}` }],
		},
		twitter: {
			card: "summary_large_image",
			title: guide.metaTitle,
			description: guide.metaDescription,
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const guide = getGuide(slug);
	if (!guide) notFound();

	return <GuidePage guide={guide} />;
}
