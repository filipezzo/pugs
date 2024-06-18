import { ILogin } from "../../types/login";
import { api } from "../api";

export async function login(user: ILogin) {
	const { data } = await api.post("/jwt-auth/v1/token", user);

	return data;
}
