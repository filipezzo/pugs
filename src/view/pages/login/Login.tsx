import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { Title } from "../../components/Title";
import { LoginContainer } from "./components/LoginContainer";

export function Login() {
	return (
		<LoginContainer>
			<form className="max-w-xl space-y-4">
				<Title>Login</Title>
				<InputLabel label="Usuário" id="user" />
				<InputLabel label="Senha" id="senha" type="password" />
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
