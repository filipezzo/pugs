import { PawPrint, User } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../app/hooks/useUser";

export function Layout() {
	const { hLogout, user } = useUser();
	const nav = useNavigate();

	const handleClick = () => {
		hLogout();
		nav("/login");
	};
	return (
		<div className="h-full bg-zinc-900 text-white antialiased">
			<div className="relative h-full w-full">
				<header className="fixed top-0 z-10 w-full border-b border-b-zinc-600 bg-zinc-900">
					<nav className="mx-auto flex h-20 max-w-4xl items-center justify-between p-5">
						<Link to="/">
							<PawPrint />
						</Link>
						{user ? (
							<p>{user.nome}</p>
						) : (
							<Link
								className="flex items-center gap-2 transition-colors hover:text-blue-500"
								to="/login"
							>
								Login <User />
							</Link>
						)}
					</nav>
					<button onClick={handleClick}>click</button>
				</header>
				<Outlet />
			</div>
		</div>
	);
}
