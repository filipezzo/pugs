import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/users";
import { IFeed } from "../services/users/feed";

export function useFeed({ total, page, user }: IFeed) {
	return useQuery({
		queryKey: ["feed"],
		queryFn: () => userService.feed({ total, page, user }),
		refetchOnWindowFocus: false,
	});
}
