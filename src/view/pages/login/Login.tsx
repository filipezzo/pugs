import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useLogin } from "../../../app/hooks/useLogin";
import { useUser } from "../../../app/hooks/useUser";
import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { Title } from "../../components/Title";
import { LoginContainer } from "./components/LoginContainer";

const schema = z.object({
	username: z.string().min(1, "Preencha um valor"),
	password: z.string().min(4, "Sua senha deve conter ao menos 4 caracteres"),
});

type TypeSchema = z.infer<typeof schema>;

export function Login() {
	const {
		register,
		formState: { errors },
		handleSubmit: handleLoginSubmit,
	} = useForm<TypeSchema>({
		resolver: zodResolver(schema),
	});
	const { mutateAsync } = useLogin();
	const { hLogin } = useUser();

	const handleSubmit = handleLoginSubmit(async (data: TypeSchema) => {
		try {
			const { token, ...user } = await mutateAsync(data);
			if (token && user) {
				hLogin(token, user);
			} else {
				throw new Error("Dados de autenticação inválidos");
			}
		} catch (error: any) {
			toast.error(error.message || "Erro ao fazer o login");
		}
	});
	return (
		<LoginContainer>
			<form onSubmit={handleSubmit} className="max-w-xl space-y-4">
				<Title>Login</Title>
				<InputLabel
					label="Usuário"
					id="user"
					{...register("username")}
					error={errors?.username?.message}
				/>
				<InputLabel
					label="Senha"
					id="senha"
					type="password"
					{...register("password")}
					error={errors?.password?.message}
				/>
				<Button variant="primary">Entrar</Button>
			</form>
			<div className="mt-16 space-y-4">
				<Title style="underline">Cadastre-se</Title>
				<p className="">Ainda não possui conta?</p>
				<Button variant="secondary">
					<Link className="flex-1" to="/registrar">
						Cadastro
					</Link>
				</Button>
			</div>
		</LoginContainer>
	);
}
