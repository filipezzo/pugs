import { Dog, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../../../app/hooks/useUser";
import { SectionLoader } from "../../../components/SectionLoader";
import { Title } from "../../../components/Title";
import usePhotoModalController from "./usePhotoModalController";

interface IPhotoModal {
	id: number;
	closeModal: () => void;
}

export function PhotoModalContent({ id, closeModal }: IPhotoModal) {
	const {
		data,
		isFetching,
		isError,
		isSuccess,
		ref,
		comment,
		setComment,
		handleSubmit,
		isPending,
		ulRef,
	} = usePhotoModalController(id, closeModal);

	const { user } = useUser();

	if (isFetching) <SectionLoader />;
	if (isError)
		<p className="mt-40 text-3xl">Erro. tente novamente mais tarde</p>;

	if (isSuccess) {
		return (
			<div className="fixed inset-0 flex items-center justify-center rounded-md bg-transparent p-5 md:p-0">
				<div
					ref={ref}
					className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-md bg-white md:flex-row"
				>
					<div className="xl:h-[576px] xl:min-w-[576px]">
						<img className="h-full w-full object-cover" src={data.photo.src} />
					</div>

					<section className="flex w-full flex-col gap-4 p-5 text-black">
						<header className="flex items-center justify-between text-gray-500">
							<span>@{data.photo.author}</span>
							<span className="flex items-center gap-1">
								<Eye />
								{data.photo.acessos}
							</span>
						</header>
						<div className="mt-10 flex flex-col gap-4">
							<Link to={`/foto/${id}`}>
								<Title>{data.photo.title}</Title>
							</Link>

							<div>
								<span className="mr-4 inline-block text-xl before:content-['|']">
									{data.photo.peso}kg
								</span>
								<span className="inline-block text-xl before:content-['|']">
									{data.photo.idade}anos
								</span>
							</div>
						</div>
						<ul ref={ulRef} className="max-h-[250px] overflow-y-scroll">
							{data.comments &&
								data.comments.map((comment: any) => (
									<li
										className="flex gap-2"
										key={data.photo.id + Math.random()}
									>
										<strong>{comment.comment_author}: </strong>
										<p className="flex-1">{comment.comment_content}</p>
									</li>
								))}
						</ul>
						{user && user?.username !== data.photo.author && (
							<footer className="mt-auto flex w-full items-end gap-2">
								<form
									className="flex w-full items-end gap-2"
									onSubmit={handleSubmit}
								>
									<textarea
										value={comment}
										disabled={isPending}
										onChange={(e) => setComment(e.target.value)}
										placeholder="comente"
										className="flex-1 resize-none rounded-md bg-gray-500 p-2"
									/>
									<button type="submit">
										<Dog className="hover:text-blue-500" />
									</button>
								</form>
							</footer>
						)}
					</section>
				</div>
			</div>
		);
	}
	return null;
}
