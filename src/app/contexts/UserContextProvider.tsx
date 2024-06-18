import { ReactNode, createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { IUser } from "../types/user";

interface IUserContext {
	user: IUser | null;
	isLoggedIn: boolean;
	hLogin(token: string, account: IUser): void;
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
	const [user, setUser] = useState<IUser | null>(() => {
		const hasUserStoraged = localStorage.getItem(localStorageKeys.ACCESS_USER);

		return hasUserStoraged ? JSON.parse(hasUserStoraged) : null;
	});

	const hLogin = useCallback((token: string, account: IUser) => {
		localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
		localStorage.setItem(localStorageKeys.ACCESS_USER, JSON.stringify(account));
		setIsLoggedIn(true);
		setUser(account);
	}, []);

	const hLogout = useCallback(() => {
		localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
		localStorage.removeItem(localStorageKeys.ACCESS_USER);
		setUser(null);
		setIsLoggedIn(false);
	}, []);

	return (
		<UserContext.Provider value={{ isLoggedIn, hLogin, hLogout, user }}>
			{children}
		</UserContext.Provider>
	);
}
