import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useLogin } from "../../../app/hooks/useLogin";
import { useUser } from "../../../app/hooks/useUser";

const schema = z.object({
	username: z.string().min(1, "Preencha um valor"),
	password: z.string().min(4, "Sua senha deve conter ao menos 4 caracteres"),
});

type TypeSchema = z.infer<typeof schema>;

export function useLoginController() {
	const {
		register,
		formState: { errors },
		handleSubmit: handleLoginSubmit,
	} = useForm<TypeSchema>({
		resolver: zodResolver(schema),
	});
	const { mutateAsync, isPending } = useLogin();

	const { hLogin } = useUser();

	const handleSubmit = handleLoginSubmit(async (data: TypeSchema) => {
		try {
			const { token } = await mutateAsync(data);
			if (token) {
				hLogin(token);
			} else {
				throw new Error("Token não recebido após autenticação");
			}
		} catch (error: any) {
			if (error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response.data.message);
			}
			toast.error(
				error.message || "Erro ao fazer o login. Tente novamente mais tarde.",
			);
		}
	});
	return {
		handleSubmit,
		register,
		errors,
		isPending,
	};
}
