import { IUser } from "../types"
import axiosInstance, { ACCESS_TOKEN_NAME, saveToken } from "./config"

type RegisterUserTypes = IUser

export const registerUser = async ({
  email,
  username,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post("/users", {
      email,
      username,
      password
    })
    return response.data.user
  } catch (error) {
    console.log("Error occurred in registerUser", error)
    throw error
  }
}

type LoginUserTypes = Omit<IUser, "username">

export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password
    })
    const _token = response.data
    axiosInstance.defaults.headers.common["Authorization"] = _token
    saveToken(ACCESS_TOKEN_NAME, _token)
    return response.data.user
  } catch (error) {
    console.log("Error occurred in loginUser", error)
    throw error
  }
}
