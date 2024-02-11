import { HomeScreenNavigationType } from "@/navigation/types"
import axiosInstance from "@/services/config"
import { IDefinition } from "@/types"
import { AnimatedBox, Box, Text } from "@/utils/theme"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Pressable } from "react-native"
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import useSWRMutation from "swr/mutation"

type DefinitionProps = {
  definition: IDefinition
  mutateDefinitions: () => Promise<IDefinition[] | undefined>
}

interface IDefinitionStatusRequest {
  id: string
  isCompleted: boolean
}

const toggleDefinitionStatusRequest = async (
  url: string,
  { arg }: { arg: IDefinitionStatusRequest }
) => {
  try {
    await axiosInstance.put(url + "/" + arg.id, {
      ...arg,
    })
  } catch (error) {
    console.log("error in toggleDefinitionStatusRequest", error)
    throw error
  }
}

const Definition = ({ definition, mutateDefinitions }: DefinitionProps) => {
  const { trigger } = useSWRMutation("definitions/update", toggleDefinitionStatusRequest)

  const offset = useSharedValue(1)
  const checkmarkIconSize = useSharedValue(0.8)

  const navigation = useNavigation<HomeScreenNavigationType>()

  const toggleDefinitionStatus = async () => {
    try {
      const _updatedDefinition = {
        id: definition._id,
        isCompleted: !definition.isCompleted,
      }
      await trigger(_updatedDefinition)
      await mutateDefinitions()
      if (!_updatedDefinition.isCompleted) {
        offset.value = 1
        checkmarkIconSize.value = 0
      } else {
        offset.value = 1.1
        checkmarkIconSize.value = 1
      }
    } catch (error) {
      console.log("error in toggleDefinitionStatus", error)
      throw error
    }
  }

  const navigateToEditDefinition = () => {
    navigation.navigate("EditDefinition", {
      definition,
    })
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }],
    }
  })

  const checkMarkIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(checkmarkIconSize.value) }],
      opacity: definition.isCompleted ? offset.value : 0,
    }
  })

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable onPress={toggleDefinitionStatus} onLongPress={navigateToEditDefinition}>
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
              {definition.name}
            </Text>
          </Box>
          <Box></Box>
        </Box>
      </Pressable>
    </AnimatedBox>
  )
}

export default Definition
