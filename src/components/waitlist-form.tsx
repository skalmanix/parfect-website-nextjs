"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type WaitlistFormProps = {
	locale: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({ locale }: WaitlistFormProps) {
	const t = useTranslations("Download.waitlist");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("submitting");
		setErrorMessage(null);

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, locale }),
			});

			const data = (await response.json()) as {
				ok?: boolean;
				error?: string;
			};

			if (!response.ok) {
				setStatus("error");
				setErrorMessage(
					data.error === "invalid"
						? t("errorInvalid")
						: data.error === "duplicate"
							? t("errorDuplicate")
							: t("errorGeneric"),
				);
				return;
			}

			setStatus("success");
			setEmail("");
		} catch {
			setStatus("error");
			setErrorMessage(t("errorGeneric"));
		}
	}

	if (status === "success") {
		return (
			<div
				className="animate-fade-up-delay-2 w-full max-w-md rounded-2xl border border-sage/40 bg-sage/10 p-6 text-left"
				role="status"
			>
				<p className="font-display text-xl font-medium mb-2 text-sage">
					{t("successTitle")}
				</p>
				<p className="text-muted leading-relaxed">{t("successMessage")}</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="animate-fade-up-delay-2 w-full max-w-md"
			noValidate
		>
			<label htmlFor="waitlist-email" className="sr-only">
				{t("emailLabel")}
			</label>
			<div className="flex flex-col sm:flex-row gap-3">
				<input
					id="waitlist-email"
					name="email"
					type="email"
					autoComplete="email"
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder={t("emailPlaceholder")}
					disabled={status === "submitting"}
					className="flex-1 rounded-full border border-border/60 bg-surface/80 px-5 py-3.5 text-sm text-foreground placeholder:text-muted-deep focus:outline-none focus:border-primary/50 disabled:opacity-60"
				/>
				<button
					type="submit"
					disabled={status === "submitting"}
					className="btn-primary shrink-0 px-6 py-3.5 rounded-full text-sm font-semibold disabled:opacity-60"
				>
					{status === "submitting" ? t("submitting") : t("submit")}
				</button>
			</div>
			<p className="mt-3 text-xs text-muted-deep">{t("privacyNote")}</p>
			{errorMessage ? (
				<p className="mt-3 text-sm text-rose" role="alert">
					{errorMessage}
				</p>
			) : null}
		</form>
	);
}
