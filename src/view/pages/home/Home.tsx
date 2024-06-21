import PhotoList from "../../components/PhotoList";
import { PhotoModalContent } from "./components/PhotoModalContent";
import { useHomeController } from "./useHomeController";

export function Home() {
	const {
		photoModal,
		data,
		isLoading,
		isError,
		isSuccess,
		isFetching,
		onSelectingPhoto,
		closeModal,
	} = useHomeController();

	if (isLoading || isFetching)
		return <p className="mt-20 text-4xl text-red-500">carregando</p>;
	if (isError) return "errro";

	if (isSuccess) {
		return (
			<section className="relative mx-auto mt-32 max-w-4xl">
				<PhotoList data={data} onSelectingPhoto={onSelectingPhoto} />
				{photoModal && (
					<PhotoModalContent closeModal={closeModal} id={photoModal.id} />
				)}
			</section>
		);
	}

	return null;
}
