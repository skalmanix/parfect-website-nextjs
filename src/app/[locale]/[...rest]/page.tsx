import { notFound } from "next/navigation";

/* Renders the localized 404 for any unmatched route within a locale. */
export default function CatchAllNotFound() {
	notFound();
}
