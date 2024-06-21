import { useState } from "react";
import { useFeed } from "../../../app/hooks/useFeed";
import { IFeedItem } from "../../components/PhotoList";

export function useHomeController() {
	const [photoModal, setPhotoModal] = useState<IFeedItem | null>(null);
	const { data, isLoading, isError, isSuccess, isFetching } = useFeed({
		page: 1,
		total: 12,
		user: 0,
	});

	const onSelectingPhoto = (photo: IFeedItem) => {
		setPhotoModal(photo);
	};
	const closeModal = () => setPhotoModal(null);

	return {
		photoModal,
		data,
		isLoading,
		isError,
		isSuccess,
		isFetching,
		onSelectingPhoto,
		closeModal,
	};
}
