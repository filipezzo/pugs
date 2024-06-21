import { LogOut, Plus, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../app/hooks/useUser";
import { cn } from "../../app/utils/cn";
import { NavItem } from "../pages/dashboard/account/NavItem";

interface NavListProps {
	type: "mobile" | "default";
	closeModal?: () => void;
}

export function NavList({ type = "default", closeModal }: NavListProps) {
	const ref = useRef<HTMLElement>(null);
	const { hLogout } = useUser();

	useEffect(() => {
		if (type === "mobile") {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					ref.current &&
					closeModal &&
					!ref.current.contains(event.target as Node)
				) {
					closeModal();
				}
			};
			window.addEventListener("mousedown", handleClickOutside);
			return () => {
				window.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [ref, type, closeModal]);

	if (type === "default") {
		return (
			<nav>
				<ul className={cn("flex items-center gap-4")}>
					<NavItem to="/conta/" exact>
						<User />
					</NavItem>
					<NavItem to="/conta/postar">
						<Plus />
					</NavItem>
					<NavItem>
						<LogOut />
					</NavItem>
				</ul>
			</nav>
		);
	}

	if (type === "mobile") {
		return (
			<nav ref={ref}>
				<ul className="flex flex-col gap-2">
					<Link
						to="/conta/"
						className="flex w-full items-center gap-2 text-nowrap transition-colors hover:text-gray-500"
					>
						<User /> <span>Minhas fotos</span>
					</Link>

					<Link
						to="/conta/postar"
						className="flex w-full items-center gap-2 text-nowrap transition-colors hover:text-gray-500"
					>
						<Plus /> <span>Adicionar</span>
					</Link>

					<button
						onClick={hLogout}
						className="flex w-full items-center gap-2 text-nowrap transition-colors hover:text-gray-500"
					>
						<LogOut /> <span>Sair</span>
					</button>
				</ul>
			</nav>
		);
	}
}
