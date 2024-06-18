import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/users";
import { ILogin } from "../types/login";

export function useLogin() {
	return useMutation({
		mutationFn: (data: ILogin) => userService.login(data),
	});
}
