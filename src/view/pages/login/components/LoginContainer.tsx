import React from "react";

interface LoginContainerProps {
	children: React.ReactNode;
}

export function LoginContainer({ children }: LoginContainerProps) {
	return <div className="mt-10 flex-1 p-5 md:mt-40 md:p-10">{children}</div>;
}
