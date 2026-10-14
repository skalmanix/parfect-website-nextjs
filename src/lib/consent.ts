import { loadGoogleTagManager } from "@/components/gtm";

export const CONSENT_COOKIE = "parfect_consent";
export const CONSENT_OPEN_EVENT = "parfect-consent-open";
const CONSENT_STORE_EVENT = "parfect-consent-store";

let reopened = false;

export function subscribeConsent(onChange: () => void) {
	const onOpen = () => {
		reopened = true;
		onChange();
	};
	window.addEventListener(CONSENT_STORE_EVENT, onChange);
	window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
	return () => {
		window.removeEventListener(CONSENT_STORE_EVENT, onChange);
		window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
	};
}

/** "pending" on the server, then "open" or "closed" once the cookie can be read. */
export function getConsentSnapshot() {
	if (reopened) return "open";
	return readConsent() ? "closed" : "open";
}

export function getConsentServerSnapshot() {
	return "pending";
}

export function closeConsentBanner() {
	reopened = false;
	window.dispatchEvent(new Event(CONSENT_STORE_EVENT));
}

const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type ConsentChoice = {
	v: 1;
	preferences: boolean;
	statistics: boolean;
	marketing: boolean;
};

export const DENIED_CONSENT: ConsentChoice = {
	v: 1,
	preferences: false,
	statistics: false,
	marketing: false,
};

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		__parfectConsentBooted?: boolean;
		__parfectApplyConsent?: (choice: ConsentChoice, loadGtm: boolean) => void;
	}
}

function isChoice(value: unknown): value is ConsentChoice {
	if (!value || typeof value !== "object") return false;
	const choice = value as ConsentChoice;
	return (
		choice.v === 1 &&
		typeof choice.preferences === "boolean" &&
		typeof choice.statistics === "boolean" &&
		typeof choice.marketing === "boolean"
	);
}

export function readConsent(): ConsentChoice | null {
	if (typeof document === "undefined") return null;
	const prefix = `${CONSENT_COOKIE}=`;
	for (const part of document.cookie.split("; ")) {
		if (!part.startsWith(prefix)) continue;
		try {
			const value = JSON.parse(decodeURIComponent(part.slice(prefix.length)));
			return isChoice(value) ? value : null;
		} catch {
			return null;
		}
	}
	return null;
}

export function writeConsent(choice: ConsentChoice) {
	const secure = location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(choice))}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function granted(on: boolean) {
	return on ? "granted" : "denied";
}

function toGoogleConsent(choice: ConsentChoice) {
	return {
		ad_storage: granted(choice.marketing),
		ad_user_data: granted(choice.marketing),
		ad_personalization: granted(choice.marketing),
		analytics_storage: granted(choice.statistics),
		functionality_storage: granted(choice.preferences),
		personalization_storage: granted(choice.preferences),
		security_storage: "granted",
	};
}

/**
 * Saves the choice, pushes a Consent Mode update, then loads Tag Manager.
 * Tag Manager is not requested until this runs.
 */
export function applyConsent(choice: ConsentChoice) {
	writeConsent(choice);
	if (typeof window.__parfectApplyConsent === "function") {
		window.__parfectApplyConsent(choice, true);
		return;
	}

	window.dataLayer = window.dataLayer ?? [];
	if (!window.gtag) {
		window.gtag = function gtag() {
			// Consent Mode reads an Arguments object. A rest array is ignored.
			// eslint-disable-next-line prefer-rest-params
			window.dataLayer?.push(arguments);
		};
	}
	window.gtag("consent", "update", toGoogleConsent(choice));
	window.dataLayer.push({
		event: "consent_update",
		consent_preferences: granted(choice.preferences),
		consent_statistics: granted(choice.statistics),
		consent_marketing: granted(choice.marketing),
	});
	loadGoogleTagManager();
}

const SAFE_GTM_ID = /^GTM-[A-Z0-9]+$/;

/**
 * Runs before the page hydrates. Sets Consent Mode defaults to denied,
 * and loads Tag Manager immediately only when a choice is already stored.
 */
export function consentBootstrapScript(gtmId: string) {
	const id = SAFE_GTM_ID.test(gtmId) ? gtmId : "GTM-MHTJWPXG";
	return `(function(){
if(window.__parfectConsentBooted)return;
window.__parfectConsentBooted=true;
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag("consent","default",{
ad_storage:"denied",
ad_user_data:"denied",
ad_personalization:"denied",
analytics_storage:"denied",
functionality_storage:"denied",
personalization_storage:"denied",
security_storage:"granted",
wait_for_update:500
});
gtag("set","ads_data_redaction",true);
gtag("set","url_passthrough",true);
function signal(choice){
var on=function(v){return v?"granted":"denied";};
gtag("consent","update",{
ad_storage:on(choice.marketing),
ad_user_data:on(choice.marketing),
ad_personalization:on(choice.marketing),
analytics_storage:on(choice.statistics),
functionality_storage:on(choice.preferences),
personalization_storage:on(choice.preferences),
security_storage:"granted"
});
dataLayer.push({
event:"consent_update",
consent_preferences:on(choice.preferences),
consent_statistics:on(choice.statistics),
consent_marketing:on(choice.marketing)
});
}
function loadGtm(){
if(document.getElementById("gtm-script"))return;
dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
var s=document.createElement("script");
s.id="gtm-script";
s.async=true;
s.src="https://www.googletagmanager.com/gtm.js?id=${id}";
document.head.appendChild(s);
}
window.__parfectApplyConsent=function(choice,load){
signal(choice);
if(load)loadGtm();
};
var prefix="${CONSENT_COOKIE}=";
var parts=("; "+document.cookie).split("; ");
for(var i=0;i<parts.length;i++){
if(parts[i].indexOf(prefix)!==0)continue;
try{
var saved=JSON.parse(decodeURIComponent(parts[i].slice(prefix.length)));
if(saved&&saved.v===1&&typeof saved.statistics==="boolean"&&typeof saved.marketing==="boolean"&&typeof saved.preferences==="boolean"){
window.__parfectApplyConsent(saved,true);
}
}catch(e){}
break;
}
})();`;
}
