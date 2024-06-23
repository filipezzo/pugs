import PhotoList from "../../components/PhotoList";
import { SectionLoader } from "../../components/SectionLoader";
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

	if (isLoading || isFetching) return <SectionLoader />;
	if (isError) return <p>algo deu errado</p>;

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
