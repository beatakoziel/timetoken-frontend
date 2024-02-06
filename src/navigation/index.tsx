import useUserGlobalStore from "../store/useUserGlobalStore"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import AuthStackNavigator from "./auth-stack-navigator"
import AppStackNavigator from "./app-stack-navigator"

const Navigation = () => {
  const { user } = useUserGlobalStore()

  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      <AppStackNavigator />
    </NavigationContainer>
  )
}

export default Navigation
