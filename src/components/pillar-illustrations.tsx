const SIZE = 180;

export function ChatIllustration({ className = "" }: { className?: string }) {
	return (
		<svg
			width={SIZE}
			height={SIZE}
			viewBox="0 0 180 180"
			className={className}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="chatGrad1" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#f0a3b6" stopOpacity="0.9" />
					<stop offset="100%" stopColor="#e8849b" stopOpacity="0.7" />
				</linearGradient>
				<linearGradient id="chatGrad2" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#f0cf94" stopOpacity="0.8" />
					<stop offset="100%" stopColor="#caa24a" stopOpacity="0.6" />
				</linearGradient>
			</defs>
			<circle cx="90" cy="90" r="80" fill="#271320" opacity="0.5" />
			<g transform="translate(25, 45)">
				<path
					d="M10 0 H65 A10 10 0 0 1 75 10 V45 A10 10 0 0 1 65 55 H25 L15 65 V55 H10 A10 10 0 0 1 0 45 V10 A10 10 0 0 1 10 0Z"
					fill="url(#chatGrad1)"
				/>
				<circle cx="22" cy="22" r="4" fill="#2a0c16" opacity="0.5" />
				<circle cx="37" cy="22" r="4" fill="#2a0c16" opacity="0.5" />
				<circle cx="52" cy="22" r="4" fill="#2a0c16" opacity="0.5" />
				<rect x="18" y="34" width="40" height="4" rx="2" fill="#2a0c16" opacity="0.3" />
			</g>
			<g transform="translate(75, 70)">
				<path
					d="M10 0 H70 A10 10 0 0 1 80 10 V40 A10 10 0 0 1 70 50 H10 A10 10 0 0 1 0 40 V10 A10 10 0 0 1 10 0Z M60 50 L65 60 V50Z"
					fill="url(#chatGrad2)"
				/>
				<path
					d="M40 18 C40 14 44 12 47 14 C50 12 54 14 54 18 C54 24 47 30 47 30 C47 30 40 24 40 18Z"
					fill="#2a0c16"
					opacity="0.4"
				/>
			</g>
			<circle cx="80" cy="75" r="3" fill="#f0cf94" opacity="0.8" />
			<circle cx="72" cy="82" r="2" fill="#f0a3b6" opacity="0.6" />
		</svg>
	);
}

export function FantasyIllustration({ className = "" }: { className?: string }) {
	return (
		<svg
			width={SIZE}
			height={SIZE}
			viewBox="0 0 180 180"
			className={className}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="fantGrad" x1="0" y1="0" x2="0.5" y2="1">
					<stop offset="0%" stopColor="#f0a3b6" stopOpacity="0.85" />
					<stop offset="100%" stopColor="#e8849b" stopOpacity="0.6" />
				</linearGradient>
				<linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#f0cf94" />
					<stop offset="100%" stopColor="#f5d9a0" />
				</linearGradient>
			</defs>
			<circle cx="90" cy="90" r="80" fill="#271320" opacity="0.5" />
			<g transform="translate(40, 60)">
				<rect x="0" y="20" width="100" height="65" rx="8" fill="url(#fantGrad)" />
				<path
					d="M0 28 L50 60 L100 28 V20 A8 8 0 0 0 92 12 H8 A8 8 0 0 0 0 20Z"
					fill="#f5b8c8"
					opacity="0.9"
				/>
				<path
					d="M5 28 L50 55 L95 28"
					fill="none"
					stroke="#2a0c16"
					strokeWidth="1.5"
					opacity="0.2"
				/>
			</g>
			<path
				d="M90 50 L92 44 L94 50 L100 52 L94 54 L92 60 L90 54 L84 52Z"
				fill="url(#starGrad)"
			/>
			<path
				d="M65 35 L66 32 L67 35 L70 36 L67 37 L66 40 L65 37 L62 36Z"
				fill="#f0cf94"
				opacity="0.7"
			/>
			<path
				d="M115 42 L116.5 38 L118 42 L122 43.5 L118 45 L116.5 49 L115 45 L111 43.5Z"
				fill="#f0cf94"
				opacity="0.6"
			/>
		</svg>
	);
}

export function TogetherIllustration({ className = "" }: { className?: string }) {
	return (
		<svg
			width={SIZE}
			height={SIZE}
			viewBox="0 0 180 180"
			className={className}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="togGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#9cb89f" stopOpacity="0.8" />
					<stop offset="100%" stopColor="#7da882" stopOpacity="0.6" />
				</linearGradient>
				<linearGradient id="heartGrad" x1="0.5" y1="0" x2="0.5" y2="1">
					<stop offset="0%" stopColor="#f0a3b6" />
					<stop offset="100%" stopColor="#e8849b" />
				</linearGradient>
			</defs>
			<circle cx="90" cy="90" r="80" fill="#271320" opacity="0.5" />
			<g transform="translate(20, 65)">
				<ellipse cx="35" cy="30" rx="28" ry="18" fill="url(#togGrad)" opacity="0.7" />
				<path
					d="M55 25 Q65 20 70 28 Q72 34 65 35 L55 33Z"
					fill="#9cb89f"
					opacity="0.8"
				/>
			</g>
			<g transform="translate(90, 65)">
				<ellipse cx="35" cy="30" rx="28" ry="18" fill="url(#togGrad)" opacity="0.7" />
				<path
					d="M15 25 Q5 20 0 28 Q-2 34 5 35 L15 33Z"
					fill="#9cb89f"
					opacity="0.8"
				/>
			</g>
			<path
				d="M90 85 C90 75 80 68 75 72 C70 68 60 75 60 85 C60 100 75 110 90 120 C105 110 120 100 120 85 C120 75 110 68 105 72 C100 68 90 75 90 85Z"
				fill="url(#heartGrad)"
				opacity="0.85"
			/>
			<circle cx="55" cy="80" r="2" fill="#f0cf94" opacity="0.6" />
			<circle cx="125" cy="80" r="2" fill="#f0cf94" opacity="0.6" />
			<circle cx="90" cy="55" r="2.5" fill="#f0a3b6" opacity="0.5" />
		</svg>
	);
}
