import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export function useUser() {
	return useContext(UserContext);
}
