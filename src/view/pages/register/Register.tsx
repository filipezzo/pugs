import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { LoaderSpin } from "../../components/LoaderSpin";
import { Title } from "../../components/Title";
import { LoginContainer } from "../login/components/LoginContainer";
import { useRegisterController } from "./useRegisterController";

export function Register() {
	const { register, handleSubmit, errors, isPending } = useRegisterController();

	return (
		<LoginContainer>
			<form onSubmit={handleSubmit} className="max-w-xl space-y-4">
				<Title>Cadestre-se</Title>
				<InputLabel
					label="Usuário"
					id="user"
					type="text"
					error={errors?.username?.message}
					{...register("username")}
				/>
				<InputLabel
					label="Email"
					id="email"
					type="email"
					error={errors?.email?.message}
					{...register("email")}
				/>
				<InputLabel
					label="Senha"
					id="senha"
					type="password"
					error={errors?.password?.message}
					{...register("password")}
				/>
				<Button disabled={isPending} variant="primary">
					{isPending ? <LoaderSpin /> : "Cadastrar"}
				</Button>
			</form>
		</LoginContainer>
	);
}
