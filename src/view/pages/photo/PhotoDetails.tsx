import { Dog, Eye } from "lucide-react";
import { useUser } from "../../../app/hooks/useUser";
import { SectionLoader } from "../../components/SectionLoader";
import { Title } from "../../components/Title";
import { usePhotoDetailsController } from "./usePhotoDetailsController";

export default function PhotoDetails() {
	const {
		data,
		isLoading,
		isError,
		isSuccess,
		handleSubmit,
		setComment,
		comment,
	} = usePhotoDetailsController();
	const { user } = useUser();

	if (isLoading) return <SectionLoader />;
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
									<li
										key={comment.comment_id + Math.random()}
										className="flex gap-2"
									>
										<strong>{comment.comment_author}: </strong>
										<p className="flex-1">{comment.comment_content}</p>
									</li>
								))}
						</ul>
						{user?.username !== data.photo.author && (
							<footer className="mt-4 flex w-full items-end gap-2">
								<form
									onSubmit={handleSubmit}
									className="flex w-full items-end gap-2"
								>
									<textarea
										onChange={(e) => setComment(e.target.value)}
										value={comment}
										placeholder="comente"
										className="w-full flex-1 resize-none rounded-md bg-gray-500 p-2"
									/>
									<button type="submit">
										<Dog className="hover:text-blue-500" />
									</button>
								</form>
							</footer>
						)}
					</article>
				</section>
			</main>
		);
	}
	return null;
}
