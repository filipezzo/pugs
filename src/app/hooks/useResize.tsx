import { useEffect, useState } from "react";

export function useResize(media: string) {
	const [size, setSize] = useState<boolean | null>(null);

	useEffect(() => {
		const handleResize = () => {
			const { matches } = window.matchMedia(media);
			setSize(matches);
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [media]);

	return size;
}
