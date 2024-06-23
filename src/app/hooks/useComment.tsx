import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/users";

export function useComment() {
	return useMutation({
		mutationFn: ({ id, comment }: { id: number; comment: string }) =>
			userService.comment(id, comment),
	});
}
