import { useQueryClient } from "@tanstack/react-query";
import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";
import { localStorageKeys } from "../config/localStorageKeys";
import useGetUser from "../hooks/useGetUser";
import { IUser } from "../types/user";

interface IUserContext {
	user: IUser | null;
	isLoggedIn: boolean;
	hLogin(token: string): void;
	hLogout(): void;
}

interface UserProvider {
	children: ReactNode;
}

export const UserContext = createContext({} as IUserContext);

export default function UserContextProvider({ children }: UserProvider) {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const hasTokenStoraged = localStorage.getItem(
			localStorageKeys.ACCESS_TOKEN,
		);

		return !!hasTokenStoraged;
	});
	const queryClient = useQueryClient();
	const { data, isSuccess, isError, isFetching } = useGetUser(isLoggedIn);

	const hLogin = useCallback((token: string) => {
		localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
		setIsLoggedIn(true);
	}, []);

	const hLogout = useCallback(() => {
		localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
		localStorage.removeItem(localStorageKeys.ACCESS_USER);
		setIsLoggedIn(false);
		queryClient.removeQueries({
			queryKey: ["user", "me"],
		});
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error("Sua sessão expirou!");
			hLogout();
		}
	}, [isError, hLogout]);

	return (
		<UserContext.Provider
			value={{
				isLoggedIn: isSuccess && isLoggedIn,
				hLogin,
				hLogout,
				user: data,
			}}
		>
			{isFetching && (
				<div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-zinc-900">
					<div className="size-20 animate-spin rounded-full border-r-2 border-t-2 border-r-blue-500 border-t-blue-500" />
				</div>
			)}
			{!isFetching && children}
		</UserContext.Provider>
	);
}
