import { forwardRef } from "react";
import { cn } from "../../app/utils/cn";

interface InputLabelProps extends React.ComponentProps<"input"> {
	label: string;
	id: string;
	type?: string;
	className?: string;
}

export const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
	({ label, id, type = "text", className, ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor={id}>{label}</label>
				<input
					{...rest}
					id={id}
					ref={ref}
					type={type}
					className={cn(
						"h-12 rounded-md border border-neutral-600 bg-transparent px-2 outline-none focus-within:border-blue-500",
						className,
					)}
				/>
			</div>
		);
	},
);
