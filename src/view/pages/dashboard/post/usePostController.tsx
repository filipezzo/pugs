import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostDog } from "../../../../app/hooks/usePostDog";
import { IPost } from "../../../../app/types/post";

const schema = z.object({
	nome: z.string().min(1, "o Nome não pode estar vazio"),
	peso: z.string().min(1, "o Peso não pode estar vazio"),
	idade: z.string().min(1, "a idade não pode estar vazio"),
});

type TypeSchema = z.infer<typeof schema>;

export function usePostController() {
	const [img, setImg] = useState<{ raw: File | null; preview: string }>({
		raw: null,
		preview: "",
	});

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files === null) return;

		setImg({
			raw: e.target.files[0],
			preview: URL.createObjectURL(e.target.files[0]),
		});
	};

	const nav = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TypeSchema>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending } = usePostDog();

	const submit = handleSubmit(async (data: TypeSchema) => {
		const formData = new FormData();
		formData.append("nome", data.nome);
		formData.append("peso", data.peso);
		formData.append("idade", data.idade);
		if (img.raw) {
			formData.append("img", img.raw);
		}

		try {
			await mutateAsync(formData as unknown as IPost);
			toast.success("Foto adiciona com sucesso!");
			nav("/");
		} catch (err: any) {
			toast.error(err.message);
		}
	});

	return {
		register,
		errors,
		submit,
		handleChangeImg,
		img,
		isPending,
	};
}
