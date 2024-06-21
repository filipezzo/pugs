import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function AuthGuard({ isProtected }: { isProtected: boolean }) {
	const { isLoggedIn } = useUser();

	if (!isLoggedIn && isProtected) {
		return <Navigate to="/login" replace />;
	}

	if (isLoggedIn && !isProtected) {
		return <Navigate to="/conta" replace />;
	}

	return <Outlet />;
}
