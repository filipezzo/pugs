import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/users";
import { IResgister } from "../types/register";

export function useRegister() {
	return useMutation({
		mutationFn: (data: IResgister) => userService.register(data),
	});
}
