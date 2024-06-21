import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/users";
import { IPost } from "../types/post";

export function usePostDog() {
	return useMutation({
		mutationFn: (data: IPost) => userService.postDog(data),
	});
}
