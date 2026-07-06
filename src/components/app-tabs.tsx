import { APP_TABS } from "@/lib/constants";

type AppTabsProps = {
	active?: (typeof APP_TABS)[number]["id"];
	className?: string;
};

export function AppTabs({ active = "fantasies", className = "" }: AppTabsProps) {
	return (
		<nav
			className={`app-tab-bar ${className}`}
			aria-label="App navigation preview"
		>
			{APP_TABS.map((tab) => {
				const isActive = tab.id === active;
				return (
					<div
						key={tab.id}
						className={`app-tab ${isActive ? "app-tab-active" : ""}`}
						aria-current={isActive ? "page" : undefined}
					>
						<TabIcon name={tab.icon} active={isActive} />
						<span>{tab.label}</span>
					</div>
				);
			})}
		</nav>
	);
}

function TabIcon({
	name,
	active,
}: {
	name: string;
	active: boolean;
}) {
	const color = active ? "var(--primary)" : "var(--muted)";

	const paths: Record<string, React.JSX.Element> = {
		chat: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
			/>
		),
		sparkles: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
			/>
		),
		heart: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
			/>
		),
	};

	return (
		<svg
			className="w-5 h-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke={color}
			strokeWidth={1.75}
			aria-hidden="true"
		>
			{paths[name]}
		</svg>
	);
}
