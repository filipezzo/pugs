import { useUser } from "../../../../app/hooks/useUser";
import PhotoList from "../../../components/PhotoList";
import { PhotoModalContent } from "../../home/components/PhotoModalContent";
import { useHomeController } from "../../home/useHomeController";

export function Account() {
	const { user } = useUser();
	const { data, photoModal, onSelectingPhoto, closeModal } =
		useHomeController();

	const filteredData = data
		? data?.filter((item: any) => item.author === user?.username)
		: [];

	return (
		<section className="relative mx-auto mt-32 max-w-4xl">
			{filteredData.length > 0 ? (
				<>
					<PhotoList data={filteredData} onSelectingPhoto={onSelectingPhoto} />
					{photoModal && (
						<PhotoModalContent closeModal={closeModal} id={photoModal.id} />
					)}
				</>
			) : (
				<p>Poste uma foto!</p>
			)}
		</section>
	);
}
