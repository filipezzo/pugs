import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})



api.interceptors.request.use((config) => {
	const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
	if(token){
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})
