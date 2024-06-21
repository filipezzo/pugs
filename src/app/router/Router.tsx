import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../../view/layouts/Layout";
import { LoginLayout } from "../../view/layouts/LoginLayout";
import { Dashboard } from "../../view/pages/dashboard/Dashboard";
import { Account } from "../../view/pages/dashboard/account/Account";
import { Post } from "../../view/pages/dashboard/post/Post";
import { Home } from "../../view/pages/home/Home";
import { Login } from "../../view/pages/login/Login";
import { Register } from "../../view/pages/register/Register";
import { AuthGuard } from "./AuthGuard";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route element={<AuthGuard isProtected={false} />}>
						<Route path="/login/*" element={<LoginLayout />}>
							<Route index element={<Login />} />
							<Route path="registrar" element={<Register />} />
						</Route>
					</Route>

					<Route element={<AuthGuard isProtected />}>
						<Route path="/conta/*" element={<Dashboard />}>
							<Route index element={<Account />} />
							<Route path="postar" element={<Post />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
