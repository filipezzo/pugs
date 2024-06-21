import { PawPrint, User } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../app/hooks/useUser";

export function Layout() {
	const { user } = useUser();

	return (
		<div className="h-full bg-zinc-900 text-white antialiased">
			<div className="relative h-full w-full">
				<header className="fixed top-0 z-10 w-full border-b border-b-zinc-600 bg-zinc-900">
					<nav className="mx-auto flex h-20 max-w-4xl items-center justify-between p-5">
						<Link to="/">
							<PawPrint />
						</Link>
						{user ? (
							<Link
								to="/conta"
								className="flex items-center gap-2 transition-colors hover:text-blue-500"
							>
								<p>{user.nome}</p>
								<User />
							</Link>
						) : (
							<Link
								className="flex items-center gap-2 transition-colors hover:text-blue-500"
								to="/login"
							>
								Login <User />
							</Link>
						)}
					</nav>
				</header>
				<Outlet />
			</div>
		</div>
	);
}
