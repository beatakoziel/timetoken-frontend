import axios from "axios"
import * as SecureStore from "expo-secure-store"

export const BASE_URL = "http://localhost:8080/api/v1"

const TIME_OUT = 50000
export const ACCESS_TOKEN_NAME = "access_token"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.log("Error occurred in saveToken", error)
        throw error
    }
}

axiosInstance.interceptors.request.use(async (req) => {
    try {
        const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_NAME)
        req.headers.Authorization = "Bearer " + access_token
        return req
    } catch (error) {
        return req
    }
})

export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data)

export default axiosInstance
