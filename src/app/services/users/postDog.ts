import { IPost } from "../../types/post";
import { api } from "../api";

export async function postDog(postData: IPost) {
	const { data } = await api.post("/api/photo", postData);
	return data;
}
