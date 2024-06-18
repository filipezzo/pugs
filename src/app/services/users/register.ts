import { IResgister } from "../../types/register";
import { api } from "../api";

export async function register(user: IResgister) {
	const { data } = await api.post("/api/user", user);

	return data;
}
