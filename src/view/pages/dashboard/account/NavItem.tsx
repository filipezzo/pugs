import { NavLink } from "react-router-dom";
import { useUser } from "../../../../app/hooks/useUser";

export function NavItem({
	children,
	to,
	exact = false,
}: {
	to?: string;
	children: React.ReactNode;
	exact?: boolean;
}) {
	const { hLogout } = useUser();

	return (
		<li>
			{to ? (
				<NavLink
					className={({ isActive }) =>
						`flex size-10 items-center justify-center rounded-md transition-opacity hover:opacity-80 ${isActive ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`
					}
					to={to}
					end={exact}
				>
					{children}
				</NavLink>
			) : (
				<button
					onClick={hLogout}
					className="flex size-10 items-center justify-center rounded-md bg-white text-blue-500 transition-opacity hover:opacity-80"
				>
					{children}
				</button>
			)}
		</li>
	);
}
