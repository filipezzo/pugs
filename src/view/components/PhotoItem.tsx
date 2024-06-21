import { Eye } from "lucide-react";
import { IFeedItem } from "./PhotoList";

interface IPhotoItem {
	item: IFeedItem;
	onSelectingPhoto: (item: IFeedItem) => void;
}

export default function PhotoItem({ item, onSelectingPhoto }: IPhotoItem) {
	const handleClick = () => {
		onSelectingPhoto(item);
	};
	return (
		<li
			onClick={handleClick}
			className="group relative overflow-hidden rounded-md transition-opacity hover:opacity-80 md:[&:nth-child(2)]:col-span-2 md:[&:nth-child(2)]:row-span-2 md:[&:nth-child(8)]:col-span-2 md:[&:nth-child(8)]:row-span-2"
		>
			<img src={item.src} alt={item.title} className="object-cover" />
			<span className="invisible absolute left-[40%] top-[50%] flex select-none items-center gap-1 group-hover:visible">
				<Eye />
				{item.acessos}
			</span>
		</li>
	);
}
