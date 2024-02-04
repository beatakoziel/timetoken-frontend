import axios from "axios"
import * as SecureStore from "expo-secure-store"
export const BASE_URL = "https://7c3d-83-31-236-1.ngrok-free.app/"

const TIME_OUT = 30000
export const ACCESS_TOKEN_NAME = "access_token"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export const saveToken = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (error) {
    console.log("Error ocurred when saving token", error)
    throw error
  }
}

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_NAME)
    req.headers.Authorization = access_token
    return req
  } catch (error) {
    return req
  }
})

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)

export default axiosInstance
