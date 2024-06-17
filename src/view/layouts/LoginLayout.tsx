import { Outlet } from "react-router-dom";
import logo from "/pug.jpg";

export function LoginLayout() {
	return (
		<main className="flex h-full overflow-hidden pt-20">
			<div className="hidden h-full w-[45%] overflow-hidden md:flex">
				<img
					className="w-full object-cover"
					src={logo}
					alt="imagem de um pug"
				/>
			</div>
			<Outlet />
		</main>
	);
}
