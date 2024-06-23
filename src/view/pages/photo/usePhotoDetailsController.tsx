import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useComment } from "../../../app/hooks/useComment";
import { usePhotoDetails } from "../../../app/hooks/usePhotoDetails";

export function usePhotoDetailsController() {
	const [comment, setComment] = useState("");
	const { id } = useParams();
	const query = useQueryClient();

	const photoId = id ? +id : undefined;

	const { data, isLoading, isError, isSuccess } = usePhotoDetails(photoId!);
	const { mutateAsync } = useComment();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!comment.trim()) {
			return;
		}
		try {
			await mutateAsync({ id: photoId!, comment });
			query.invalidateQueries({ queryKey: ["post", photoId] });
			setComment("");
		} catch (err) {
			toast.error("Erro ao criar comentário");
		}
	};
	return {
		data,
		isLoading,
		isError,
		isSuccess,
		handleSubmit,
		setComment,
		comment,
	};
}
