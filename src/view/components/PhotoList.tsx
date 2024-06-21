import PhotoItem from "./PhotoItem";

export interface IFeedItem {
	id: number;
	author: string;
	title: string;
	date: Date;
	src: string;
	peso: number;
	idade: number;
	acessos: number;
	total_comments: number;
}

interface IPhotoProps {
	data: IFeedItem[];
	onSelectingPhoto: (item: IFeedItem) => void;
}

export default function PhotoList({ data, onSelectingPhoto }: IPhotoProps) {
	return (
		<ul className="mb-4 grid grid-cols-2 justify-items-center gap-4 p-5 md:grid-cols-3 md:p-1">
			{data.map((item: IFeedItem) => (
				<PhotoItem
					item={item}
					key={item.id}
					onSelectingPhoto={onSelectingPhoto}
				/>
			))}
		</ul>
	);
}
