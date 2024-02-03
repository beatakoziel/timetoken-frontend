import useUserGlobalStore from "../store/useUserGlobalStore"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import AuthStackNavigator from "./auth-stack-navigator"

const Navigation = () => {
  const { user } = useUserGlobalStore()

  return (
    <NavigationContainer>
    <AuthStackNavigator />
    </NavigationContainer>
  )
}

export default Navigation
