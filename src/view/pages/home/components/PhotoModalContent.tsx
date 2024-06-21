import { Dog, Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePhotoDetails } from "../../../../app/hooks/usePhotoDetails";
import { Title } from "../../../components/Title";

interface IPhotoModal {
	id: number;
	closeModal: () => void;
}

export function PhotoModalContent({ id, closeModal }: IPhotoModal) {
	const ref = useRef<HTMLDivElement>(null);

	const { data, isFetching, isError, isSuccess } = usePhotoDetails(id);

	useEffect(() => {
		const watchClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				closeModal();
			}
		};

		window.addEventListener("mousedown", watchClick);
		return () => {
			window.removeEventListener("mousedown", watchClick);
		};
	}, [ref, closeModal]);

	if (isFetching) <p>loading</p>;
	if (isError) <p>error</p>;

	if (isSuccess) {
		return (
			<div className="fixed inset-0 flex items-center justify-center rounded-md bg-transparent p-5 md:p-0">
				<div
					ref={ref}
					className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-md bg-white md:flex-row"
				>
					<img className="max-h-[576px]" src={data.photo.src} />
					<section className="flex w-full flex-col justify-between gap-4 p-5 text-black">
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
						<ul className="flex-1">
							{data.comments &&
								data.comments.map((comment: any) => (
									<li className="flex gap-2" key={data.photo.id}>
										<strong>{comment.comment_author}: </strong>
										<p className="flex-1">{comment.comment_content}</p>
									</li>
								))}
						</ul>
						<footer className="flex w-full items-end gap-2">
							<textarea
								placeholder="comente"
								className="flex-1 resize-none rounded-md bg-gray-500 p-2"
							/>
							<button>
								<Dog />
							</button>
						</footer>
					</section>
				</div>
			</div>
		);
	}
	return null;
}
