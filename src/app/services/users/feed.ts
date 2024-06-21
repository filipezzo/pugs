import { api } from "../api";

export interface IFeed {
	total: number;
	page: number;
	user: number;
}

export async function feed({ total, page, user }: IFeed) {
	const { data } = await api.get(
		`/api/photo/?_total=${total}&_page=${page}&_user=${user}`,
	);

	return data;
}
