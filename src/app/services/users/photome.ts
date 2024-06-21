import { api } from "../api";

export async function photoMe(id: number) {
	const { data } = await api.get(`api/photo/${id}`);
	return data;
}
