import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegister } from "../../../app/hooks/useRegister";

const schema = z.object({
	username: z.string().min(1, "Preencha um valor"),
	email: z.string().email("Email inválido").min(1, "Preencha um valor"),
	password: z.string().min(4, "Pelo menos 4 caracteres"),
});

type TypeSchema = z.infer<typeof schema>;

export function useRegisterController() {
	const {
		register,
		handleSubmit: handleFormSubmit,
		formState: { errors },
	} = useForm<TypeSchema>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending } = useRegister();
	const navigate = useNavigate();

	const handleSubmit = handleFormSubmit(async (datax: TypeSchema) => {
		try {
			await mutateAsync(datax);
			navigate("/login");
			toast.success("Conta criada com sucesso");
		} catch (error: any) {
			if (error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response?.data.message);
			}
			toast.error(error.message || "Ocorreu um erro ao criar a conta");
		}
	});
	return {
		register,
		handleSubmit,
		errors,
		isPending,
	};
}
