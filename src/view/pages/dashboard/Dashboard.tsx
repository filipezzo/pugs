import { Outlet, useLocation } from "react-router-dom";
import { useResize } from "../../../app/hooks/useResize";
import { MobileMenu } from "../../components/MobileMenu";
import { NavList } from "../../components/NavList";
import { Title } from "../../components/Title";

export function Dashboard() {
	let title;
	const { pathname } = useLocation();
	const size = useResize("(max-width: 600px)");

	if (pathname === "/conta" || pathname.endsWith("/conta/")) {
		title = "Minha conta";
	}

	if (pathname === "/conta/postar") {
		title = "Poste Sua Foto";
	}

	return (
		<div className="mx-auto mt-20 max-w-4xl p-5">
			<header className="flex items-center justify-between">
				<Title className="" style="base">
					{title}
				</Title>
				{size ? <MobileMenu /> : <NavList type="default" />}
			</header>
			<Outlet />
		</div>
	);
}
