import Image from "next/image";

type PhoneFrameProps = {
	src: string;
	alt: string;
	priority?: boolean;
	className?: string;
	tabBar?: React.ReactNode;
};

export function PhoneFrame({
	src,
	alt,
	priority = false,
	className = "",
	tabBar,
}: PhoneFrameProps) {
	return (
		<div className={`relative ${className}`}>
			<div
				className="absolute -inset-6 rounded-[3.25rem] bg-gradient-to-b from-rose/20 via-primary/10 to-transparent blur-2xl opacity-80"
				aria-hidden="true"
			/>
			<div className="phone-frame relative mx-auto">
				<div className="phone-notch" aria-hidden="true" />
				<div className="phone-screen">
					<Image
						src={src}
						alt={alt}
						width={720}
						height={1560}
						priority={priority}
						className="w-full h-full object-cover object-top"
						sizes="(max-width: 768px) 280px, 340px"
					/>
				</div>
				{tabBar ? (
					<div className="absolute bottom-0 inset-x-0 z-10">{tabBar}</div>
				) : null}
			</div>
		</div>
	);
}
