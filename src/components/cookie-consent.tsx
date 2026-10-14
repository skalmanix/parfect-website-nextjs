"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
	CONSENT_OPEN_EVENT,
	DENIED_CONSENT,
	applyConsent,
	closeConsentBanner,
	getConsentServerSnapshot,
	getConsentSnapshot,
	readConsent,
	subscribeConsent,
	type ConsentChoice,
} from "@/lib/consent";

const OPTIONAL = ["preferences", "statistics", "marketing"] as const;

export function CookieConsent() {
	const t = useTranslations("Common.cookies");
	const titleId = useId();
	const bodyId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const visibility = useSyncExternalStore(
		subscribeConsent,
		getConsentSnapshot,
		getConsentServerSnapshot,
	);
	const open = visibility === "open";
	const [details, setDetails] = useState(false);
	const [choice, setChoice] = useState<ConsentChoice>(DENIED_CONSENT);

	useEffect(() => {
		const openSettings = () => {
			setChoice(readConsent() ?? DENIED_CONSENT);
			setDetails(true);
		};
		window.addEventListener(CONSENT_OPEN_EVENT, openSettings);
		return () => {
			window.removeEventListener(CONSENT_OPEN_EVENT, openSettings);
		};
	}, []);

	useEffect(() => {
		document.body.toggleAttribute("data-consent-open", open);
		if (!open) return () => document.body.removeAttribute("data-consent-open");

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		dialogRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				return;
			}
			if (event.key !== "Tab") return;
			const root = dialogRef.current;
			if (!root) return;
			const items = [
				...root.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled])',
				),
			];
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			const active = document.activeElement;
			if (event.shiftKey && (active === first || !root.contains(active))) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && (active === last || !root.contains(active))) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown, true);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.body.removeAttribute("data-consent-open");
			document.removeEventListener("keydown", onKeyDown, true);
		};
	}, [open]);

	if (visibility === "closed") return <ConsentWidget />;
	if (!open) return null;

	const save = (next: ConsentChoice) => {
		applyConsent(next);
		setChoice(next);
		setDetails(false);
		closeConsentBanner();
	};

	return (
		<div className="consent-overlay">
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={bodyId}
				tabIndex={-1}
				className="consent-banner w-full max-w-3xl max-h-[min(85vh,40rem)] overflow-y-auto rounded-2xl border border-border/80 bg-chrome/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] outline-none"
			>
				<div className="p-5 sm:p-6">
					<h2 id={titleId} className="font-display text-2xl leading-tight">
						{t("title")}
					</h2>
					<p id={bodyId} className="mt-2 text-sm leading-relaxed text-muted">
						{t.rich("body", {
							privacy: (chunks) => (
								<Link
									href="/privacy"
									className="text-foreground underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
								>
									{chunks}
								</Link>
							),
						})}
					</p>

					{details ? (
						<ul className="mt-5 border-y border-border/70 divide-y divide-border/70">
							<li className="flex items-center gap-4 py-3.5">
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium">{t("necessary")}</p>
									<p className="mt-0.5 text-sm text-muted leading-relaxed">
										{t("necessaryDesc")}
									</p>
								</div>
								<div className="flex items-center gap-3 shrink-0">
									<span className="text-xs text-muted">{t("alwaysOn")}</span>
									<Switch checked disabled label={t("necessary")} />
								</div>
							</li>
							{OPTIONAL.map((key) => (
								<li key={key} className="flex items-center gap-4 py-3.5">
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium">{t(key)}</p>
										<p className="mt-0.5 text-sm text-muted leading-relaxed">
											{t(`${key}Desc`)}
										</p>
									</div>
									<Switch
										checked={choice[key]}
										label={t(key)}
										onChange={(on) =>
											setChoice((current) => ({ ...current, [key]: on }))
										}
									/>
								</li>
							))}
						</ul>
					) : null}

					<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<button
							type="button"
							className="text-sm text-muted underline underline-offset-4 decoration-border hover:text-foreground self-start sm:self-center"
							aria-expanded={details}
							onClick={() => setDetails((openDetails) => !openDetails)}
						>
							{details ? t("hideDetails") : t("showDetails")}
						</button>
						<div className="flex flex-col gap-2 sm:flex-row">
							<button
								type="button"
								className="btn-secondary order-3 sm:order-1 rounded-full px-5 py-2.5 text-sm"
								onClick={() => save(DENIED_CONSENT)}
							>
								{t("deny")}
							</button>
							<button
								type="button"
								className="btn-secondary order-2 rounded-full px-5 py-2.5 text-sm"
								onClick={() => save({ ...choice, v: 1 })}
							>
								{t("allowSelection")}
							</button>
							<button
								type="button"
								className="btn-primary order-1 sm:order-3 rounded-full px-5 py-2.5 text-sm"
								onClick={() =>
									save({
										v: 1,
										preferences: true,
										statistics: true,
										marketing: true,
									})
								}
							>
								{t("allowAll")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ConsentWidget() {
	const t = useTranslations("Common.cookies");

	return (
		<button
			type="button"
			className="consent-widget"
			aria-label={t("settings")}
			onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
				<path
					fill="currentColor"
					d="M12 2a10 10 0 1 0 9.4 13.4 1.15 1.15 0 0 0-1.25-1.55 2.05 2.05 0 0 1-2.2-2.35 1.15 1.15 0 0 0-1.4-1.25A2.25 2.25 0 0 1 13.3 7.2 1.15 1.15 0 0 0 12.05 5.8 10 10 0 0 0 12 2Z"
				/>
				<circle cx="8.7" cy="10.2" r="1.05" className="consent-widget-chip" />
				<circle cx="12.5" cy="13.7" r="1.15" className="consent-widget-chip" />
				<circle cx="15.3" cy="9.5" r="0.9" className="consent-widget-chip" />
			</svg>
		</button>
	);
}

function Switch({
	checked,
	disabled,
	label,
	onChange,
}: {
	checked: boolean;
	disabled?: boolean;
	label: string;
	onChange?: (next: boolean) => void;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			disabled={disabled}
			onClick={() => onChange?.(!checked)}
			className={`relative h-[22px] w-10 shrink-0 rounded-full transition-colors ${
				checked ? "bg-primary" : "bg-border"
			} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
		>
			<span
				aria-hidden="true"
				className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-foreground shadow-sm transition-transform ${
					checked ? "translate-x-[18px]" : ""
				}`}
			/>
		</button>
	);
}
