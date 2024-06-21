import { Dog, Eye } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { usePhotoDetails } from "../../../app/hooks/usePhotoDetails";
import { Title } from "../../components/Title";

export default function PhotoDetails() {
	const { id } = useParams();

	if (!id) {
		return <Navigate to="/" />;
	}

	const { data, isLoading, isError, isSuccess } = usePhotoDetails(+id);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading photo details.</p>;
	if (isSuccess) {
		return (
			<main className="mx-auto mt-20 max-w-4xl p-5">
				<section className="pt-10">
					<div className="overflow-hidden rounded-md">
						<img
							className="max-h-[612px] w-full object-cover"
							src={data.photo.src}
							alt={data.photo.alt}
						/>
					</div>
					<article>
						<header className="my-4 flex items-center justify-between text-gray-500">
							<span>@{data.photo.author}</span>
							<span className="flex items-center gap-1">
								<Eye />
								{data.photo.acessos}
							</span>
						</header>
						<Title style="base">{data.photo.title}</Title>
						<div className="my-8">
							<span className="mr-4 inline-block text-xl before:content-['|']">
								{data.photo.peso}kg
							</span>
							<span className="inline-block text-xl before:content-['|']">
								{data.photo.idade}anos
							</span>
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
						<footer className="mt-4 flex w-full items-end gap-2">
							<textarea
								placeholder="comente"
								className="flex-1 resize-none rounded-md bg-gray-500 p-2"
							/>
							<button>
								<Dog />
							</button>
						</footer>
					</article>
				</section>
			</main>
		);
	}
	return null;
}
