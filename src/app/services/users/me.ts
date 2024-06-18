import { api } from "../api";

export async function me() {
	const { data } = await api.get("/api/user");
	return data;
}
