import { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

interface TitleProps {
	children: ReactNode;
	style?: "base" | "underline";
}

export function Title({ style, children }: TitleProps) {
	return (
		<h2
			className={cn(
				"relative z-10 text-3xl font-bold before:absolute before:-left-2 before:bottom-0 before:-z-10 before:block before:h-5 before:w-5 before:rounded-md before:bg-blue-500 before:content-[''] md:text-4xl",
				style === "underline" &&
					"before:-bottom-1 before:left-0 before:h-2 before:w-10",
			)}
		>
			{children}
		</h2>
	);
}
