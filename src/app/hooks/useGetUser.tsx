import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/users";

export default function useGetUser(isLoggedIn: boolean) {
	return useQuery({
		queryKey: ["user", "me"],
		queryFn: () => userService.me(),
		enabled: isLoggedIn,
		staleTime: Infinity,
	});
}
