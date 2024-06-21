import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/users";

export function usePhotoDetails(id: number) {
	return useQuery({
		queryKey: ["post", id],
		queryFn: () => userService.photoMe(id),
	});
}
