import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { Title } from "../../components/Title";
import { LoginContainer } from "../login/components/LoginContainer";
import { useRegisterController } from "./useRegisterController";

export function Register() {
	const { register, handleSubmit } = useRegisterController();

	return (
		<LoginContainer>
			<form onSubmit={handleSubmit} className="max-w-xl space-y-4">
				<Title>Cadestre-se</Title>
				<InputLabel
					label="Usuário"
					id="user"
					type="text"
					{...register("username")}
				/>
				<InputLabel
					label="Email"
					id="email"
					type="email"
					{...register("email")}
				/>
				<InputLabel
					label="Senha"
					id="senha"
					type="password"
					{...register("password")}
				/>
				<Button variant="primary">Cadastrar</Button>
			</form>
		</LoginContainer>
	);
}
