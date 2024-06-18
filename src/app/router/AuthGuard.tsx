import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function AuthGuard({ isProtected }: { isProtected: boolean }) {
	const { isLoggedIn } = useUser();
	console.log(isLoggedIn);

	if (!isLoggedIn && isProtected) {
		return <Navigate to="/login" replace />;
	}

	if (isLoggedIn && !isProtected) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
