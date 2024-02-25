import { HomeScreenNavigationType, TokensStackParamList } from "@/navigation/types"
import axiosInstance from "@/services/config"
import { IToken } from "@/types"
import { AnimatedBox, Box, Text } from "@/utils/theme"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import Button from "@/components/shared/button"
import { RouteProp, useRoute } from "@react-navigation/native"
import  BASE_URL from "@/services/config"
import { useSWRConfig } from "swr"
import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import useSWRMutation from "swr/mutation"
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { palette } from "@/utils/theme/colors"
import IconButton from "../shared/icon-button"

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

  const [isManagementSectionVisible, setIsManagementSectionVisible] = useState(false)

  const handleOnPress = () => {
    setIsManagementSectionVisible(!isManagementSectionVisible)
  }

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable onPress={handleOnPress}>
        <Box
          p="4"
          bg="gray8"
          borderRadius="rounded-5xl"
          flexDirection="column"
        >
          <Box flexDirection="row" alignItems="center">
            <Text ml="3" variant="textXl">
              {token.name}
            </Text>
          </Box>
          
          <AnimatedBox entering={FadeInUp} visible={isManagementSectionVisible}>
            <Box style={styles.bottomIcons} >
            <IconButton
                  label="Details"
                  icon={<Ionicons name="reader-outline" size={30} color="white" />}
                  onPress={() => {}}
              />              
              <IconButton
                  label="Edit"
                  icon={<Ionicons name="pencil-outline" size={30} color="white" />}
                  onPress={() => {}}
              />
              <IconButton
                label="Delete"
                icon={<Ionicons name="trash-outline" size={30} color="white" />}
                onPress={deleteDefinition}
              />
            </Box>
          </AnimatedBox>
        </Box>
        </Pressable>

    </AnimatedBox>
  )
}

const styles = StyleSheet.create({
  bottomIcons: {
    marginTop: 10,
    paddingTop: 20,
    flexDirection: "row",
    borderTopColor: palette.gray600,
    borderTopWidth: 0.5,
    justifyContent: "space-evenly"
  }
});
export default Definition
