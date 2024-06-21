import { Ellipsis, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { NavList } from "./NavList";

export function MobileMenu() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<div className="relative">
			<button
				onClick={() => setIsModalOpen((state) => !state)}
				className={cn(
					"flex size-10 items-center justify-center rounded-md bg-white text-blue-500 transition-opacity hover:opacity-80",
					isModalOpen && "border border-blue-500 bg-blue-500 text-white",
				)}
			>
				{isModalOpen ? <Ellipsis /> : <Menu />}
			</button>

			{isModalOpen && (
				<div className="absolute -left-32 right-0.5 z-10 mt-1 rounded-md bg-white p-5 text-blue-500">
					<NavList closeModal={handleCloseModal} type="mobile" />
				</div>
			)}
		</div>
	);
}
