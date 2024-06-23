import { Button } from "../../../components/Button";
import { InputLabel } from "../../../components/InputLabel";
import { LoaderSpin } from "../../../components/LoaderSpin";
import { usePostController } from "./usePostController";

export function Post() {
	const { errors, handleChangeImg, img, register, submit, isPending } =
		usePostController();

	return (
		<main className="md:grid md:grid-cols-2 md:gap-8">
			<form onSubmit={submit} className="mt-10 space-y-2 md:space-y-4">
				<InputLabel label="Nome" id="nome" {...register("nome")} />
				{errors.nome && <p>{errors.nome.message}</p>}

				<InputLabel
					type="number"
					label="Peso"
					id="peso"
					{...register("peso")}
				/>
				{errors.peso && <p>{errors.peso.message}</p>}

				<InputLabel
					type="number"
					label="Idade"
					id="idade"
					{...register("idade")}
				/>
				{errors.idade && <p>{errors.idade.message}</p>}

				<input onChange={handleChangeImg} className="mb-2" type="file" />
				<Button
					disabled={isPending}
					style={{ marginTop: "2rem" }}
					className="mt-4"
					variant="primary"
				>
					{isPending ? <LoaderSpin /> : "Enviar"}
				</Button>
			</form>
			{img.preview && (
				<div
					className="mt-12 rounded-md bg-cover bg-center after:block after:h-0 after:pb-[100%] after:content-[''] md:mt-14"
					style={{ backgroundImage: `url('${img.preview}')` }}
				/>
			)}
		</main>
	);
}
