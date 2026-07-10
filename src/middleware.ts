import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SECURITY_HEADERS } from "./lib/security-headers";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	const response = handleI18nRouting(request);
	for (const { key, value } of SECURITY_HEADERS) {
		response.headers.set(key, value);
	}
	return response;
}

export const config = {
	matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
