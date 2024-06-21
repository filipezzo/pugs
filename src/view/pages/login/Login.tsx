import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { LoaderSpin } from "../../components/LoaderSpin";
import { Title } from "../../components/Title";
import { LoginContainer } from "./components/LoginContainer";
import { useLoginController } from "./useLoginController";

export function Login() {
	const { errors, handleSubmit, register, isPending } = useLoginController();

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
				<Button disabled={isPending} variant="primary">
					{isPending ? <LoaderSpin /> : "Entrar"}
				</Button>
			</form>
			<div className="mt-16 space-y-4">
				<Title style="underline">Cadastre-se</Title>
				<p className="">Ainda não possui conta?</p>
				<Button variant="secondary">
					<Link className="flex-1" to="/login/registrar">
						Cadastro
					</Link>
				</Button>
			</div>
		</LoginContainer>
	);
}
