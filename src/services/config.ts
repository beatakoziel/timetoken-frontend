import axios from "axios"
import * as SecureStore from "expo-secure-store"
export const BASE_URL = "https://575d-83-31-247-13.ngrok-free.app/"

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
    console.log("Error ocurred in saveToken", error)
    throw error
  }
}

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_NAME)
    console.log("Access token: " + access_token)
    req.headers.Authorization = "Bearer " + access_token
    return req
  } catch (error) {
    return req
  }
})

export const fetcher = (url: string) => {
  console.log('Fetching')
  axiosInstance.get(url).then((res) => {
    console.log("My data: " + res.data)
    return res.data
  })
}

export default axiosInstance
