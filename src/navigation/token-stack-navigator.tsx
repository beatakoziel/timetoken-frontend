import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { TokensStackParamList } from "./types"
import TokensScreen from "src/screens/tokens-screen";
import TokenScreen from "src/screens/token-screen";
import CreateTokenScreen from "@/screens/create-token-screen";

const Stack = createNativeStackNavigator<TokensStackParamList>()

const TokensStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tokens"
        component={TokensScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Token"
        component={TokenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateToken"
        component={CreateTokenScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default TokensStackNavigator
