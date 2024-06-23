import { api } from "../api";

export async function comment(id: number, comment: string) {
	const { data } = await api.post(`/api/comment/${id}`, { comment });
	return data;
}
