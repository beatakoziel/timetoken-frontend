import { HomeScreenNavigationType, TokensStackParamList } from "@/navigation/types"
import axiosInstance from "@/services/config"
import { IToken } from "@/types"
import { AnimatedBox, Box, Text } from "@/utils/theme"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import Button from "@/components/shared/button"
import { RouteProp, useRoute } from "@react-navigation/native"
import  BASE_URL from "@/services/config"
import { useSWRConfig } from "swr"
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import useSWRMutation from "swr/mutation"


type CreateCategoryRouteTypes = RouteProp<
  TokensStackParamList,
  "CreateToken"
>

type DefinitionProps = {
  token: IToken
  mutateDefinitions: () => Promise<IToken[] | undefined>
}


const Definition = ({ token, mutateDefinitions }: DefinitionProps) => {


const route = useRoute<CreateCategoryRouteTypes>()

  const offset = useSharedValue(1)

  const { mutate } = useSWRConfig()

  const navigation = useNavigation<HomeScreenNavigationType>()

  const deleteDefinitionRequest = async (
    url: string,
    { arg }: { arg: { id: string } }
  ) => {
    try {
      await axiosInstance.delete(url + arg.id)
    } catch (error) {
      console.log("Error ocurred in deleteDefinition", error)
      throw error
    }
  }

  const { trigger: deleteTrigger } = useSWRMutation(
    "tokens/",
    deleteDefinitionRequest
  )

  const deleteDefinition= async () => {
    try {
      console.log(token)
      if (token?.id)
        await deleteTrigger({
          id: token?.id,
        })
      await mutate(BASE_URL + "tokens")
      //TODO refresh list of tokens
    } catch (error) {
      console.log("Error ocurred in deleteDefinition", error)
      throw error
    }
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }],
    }
  })

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
        <Box
          p="4"
          bg="gray8"
          borderRadius="rounded-5xl"
          flexDirection="row"
        >
          <Box flexDirection="row" alignItems="center">
            <AnimatedBox
              style={[animatedStyles]}
              flexDirection="row"
              alignItems="center"
            >
            </AnimatedBox>
            <Text ml="3" variant="textXl">
              {token.name} {token.value}
            </Text>
              <Box flexDirection="row" alignItems="flex-end">
            <Button
                label="Delete"
                onPress={deleteDefinition}
            />
              </Box>
          </Box>
          <Box></Box>
        </Box>
    </AnimatedBox>
  )
}

export default Definition
