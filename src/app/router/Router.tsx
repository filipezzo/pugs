import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../../view/layouts/Layout";
import { LoginLayout } from "../../view/layouts/LoginLayout";
import { Login } from "../../view/pages/login/Login";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/login" element={<LoginLayout />}>
						<Route path="/login" element={<Login />} />
					</Route>
					<Route />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
