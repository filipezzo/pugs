import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../../view/layouts/Layout";
import { LoginLayout } from "../../view/layouts/LoginLayout";
import { Login } from "../../view/pages/login/Login";
import { Register } from "../../view/pages/register/Register";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<LoginLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/registrar" element={<Register />} />
					</Route>
					<Route />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
