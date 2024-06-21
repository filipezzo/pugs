import { ComponentProps, ReactNode } from "react";
import { cn } from "../../app/utils/cn";

interface ReactBtnProps extends ComponentProps<"button"> {
	children: ReactNode;
	variant: "primary" | "secondary";
	className?: string;
}

export function Button({
	variant,
	className,
	children,
	...rest
}: ReactBtnProps) {
	return (
		<button
			className={cn(
				"flex h-10 w-full items-center justify-center rounded-md bg-blue-500 text-zinc-900 outline-none transition-opacity focus-within:opacity-90 hover:border hover:border-zinc-500 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-500 md:max-w-44",
				variant === "secondary" && "bg-zinc-500",
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
