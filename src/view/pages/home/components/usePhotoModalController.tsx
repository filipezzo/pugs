import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useComment } from "../../../../app/hooks/useComment";
import { usePhotoDetails } from "../../../../app/hooks/usePhotoDetails";

export default function usePhotoModalController(
	id: number,
	closeModal: () => void,
) {
	const ref = useRef<HTMLDivElement>(null);
	const ulRef = useRef<HTMLUListElement>(null);
	const [comment, setComment] = useState("");
	const { data, isFetching, isError, isSuccess } = usePhotoDetails(id);
	const { mutateAsync, isPending } = useComment();
	const query = useQueryClient();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!comment.trim()) {
			return;
		}

		try {
			await mutateAsync({ id, comment });
			query.invalidateQueries({ queryKey: ["post", id] });
			setComment("");
		} catch (err) {
			toast.error("Erro ao criar comentário");
		}
	};

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

	useEffect(() => {
		if (ulRef.current) {
			ulRef.current.scrollTop = ulRef.current?.scrollHeight;
		}
	}, [data]);

	return {
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
	};
}
