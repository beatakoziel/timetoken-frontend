import { IUser } from "../types"
import axiosInstance, { ACCESS_TOKEN_NAME, saveToken } from "./config"

type RegisterUserTypes = IUser

export const registerUser = async ({
  email,
  username,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post("/api/v1/users", {
      email,
      username,
      password
    })
    return response.data.user
  } catch (error) {
    console.log("Error ocurred in registerUser", error)
    throw error
  }
}

type LoginUserTypes = Omit<IUser, "name">

export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/login", {
      email,
      password
    })
    const _token = response.data.token
    axiosInstance.defaults.headers.common["Authorization"] = _token
    saveToken(ACCESS_TOKEN_NAME, _token)
    return response.data.user
  } catch (error) {
    console.log("Error ocurred in loginUser", error)
    throw error
  }
}
