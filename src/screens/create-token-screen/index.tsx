import Button from "@/components/shared/button"
import NavigateBack from "@/components/shared/navigate-back"
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import {TokensStackParamList} from "@/navigation/types"
import axiosInstance, {BASE_URL} from "@/services/config"
import {IColor, IIcon, IToken, ITokenRequest} from "@/types"
import {getColors, getIcons} from "@/utils/helpers"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Box, Text, Theme} from "@/utils/theme"
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native"
import {useTheme} from "@shopify/restyle"
import React, {useState} from "react"
import {Pressable, TextInput} from "react-native"
import {useSWRConfig} from "swr"

import useSWRMutation from "swr/mutation"

const COLORS = getColors()
const ICONS = getIcons()

const DEFAULT_COLOR = COLORS[0]
const DEFAULT_ICON = ICONS[0]

const createTokenRequest = async (
    url: string,
    {arg}: { arg: ITokenRequest }
) => {
    try {
        await axiosInstance.post(url, {
            ...arg,
        })
    } catch (error) {
        console.log("error in createTokenRequest", error)
        throw error
    }
}
const updateTokenRequest = async (
    url: string,
    {arg}: { arg: ITokenRequest }
) => {
    try {
        await axiosInstance.put(url, {
            ...arg,
        })
    } catch (error) {
        console.log("error in updateTokenRequest", error)
        throw error
    }
}

const deleteTokenRequest = async (
    url: string,
    {arg}: { arg: { id: string } }
) => {
    try {
        await axiosInstance.delete(url + "/" + arg.id)
    } catch (error) {
        console.log("error in deleteTokenRequest", error)
        throw error
    }
}

type CreateTokenRouteTypes = RouteProp<
    TokensStackParamList,
    "CreateToken"
>

const CreateTokenScreen = () => {
    const theme = useTheme<Theme>()
    const navigation = useNavigation()

    const route = useRoute<CreateTokenRouteTypes>()

    const isEditing = route.params.token ? true : false

    const {trigger, isMutating} = useSWRMutation(
        "tokens/create",
        createTokenRequest
    )

    const {trigger: updateTrigger} = useSWRMutation(
        "tokens/update",
        updateTokenRequest
    )

    const {trigger: deleteTrigger} = useSWRMutation(
        "tokens/",
        deleteTokenRequest
    )

    const {mutate} = useSWRConfig()

    console.log(`route.params`, JSON.stringify(route.params, null, 2))

    const [newToken, setNewToken] = useState<
        Omit<IToken, "id">
    >({
        name: route.params.token?.name ?? "",
        value: route.params.token?.value ?? 0
    })

    const createNewToken = async () => {
        try {
            if (isEditing) {
                const updatedTokenItem = {
                    ...route.params.token,
                    ...newToken,
                }
                await updateTrigger({
                    ...updatedTokenItem,
                })
            } else {
                await trigger({
                    ...newToken,
                })
            }
            await mutate(BASE_URL + "tokens")
            navigation.goBack()
        } catch (error) {
            console.log("error in createNewToken", error)
            throw error
        }
    }

    const updateColor = (color: IColor) => {
        setNewToken((prev) => {
            return {
                ...prev,
                color,
            }
        })
    }
    const updateIcon = (icon: IIcon) => {
        setNewToken((prev) => {
            return {
                ...prev,
                icon,
            }
        })
    }

    const deleteToken = async () => {
        try {
            if (isEditing && route.params.token?.id)
                await deleteTrigger({
                    id: route.params.token?.id,
                })
            await mutate(BASE_URL + "tokens")
            navigation.goBack()
        } catch (error) {
            console.log("error in deleteCategor", error)
            throw error
        }
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="4">
                <Box height={16}/>
                <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <NavigateBack/>
                    {isEditing && (
                        <Pressable onPress={deleteToken}>
                            <MaterialCommunityIcons
                                name="delete"
                                size={24}
                                color={theme.colors.rose500}
                            />
                        </Pressable>
                    )}
                </Box>
                <Box height={16}/>
                <Box bg="gray250" borderRadius="rounded-2xl">
                    <TextInput
                        style={{
                            fontSize: 20,
                            lineHeight: 26,
                            padding: 16,
                        }}
                        value={newToken.name}
                        maxLength={36}
                        placeholder="Create new list"
                        placeholderTextColor={theme.colors.gray5}
                        onChangeText={(text) => {
                            setNewToken((prev) => {
                                return {
                                    ...prev,
                                    name: text,
                                }
                            })
                        }}
                    />
                </Box>
                <Box height={24}/>
                <Box bg="gray250" p="4" borderRadius="rounded-2xl">

                    <Box flexDirection="row" justifyContent="space-evenly">
                        {COLORS.map((_color) => {
                            return (
                                <Pressable
                                    key={_color.id}
                                    onPress={() => {
                                        updateColor(_color)
                                    }}
                                >
                                    <Box
                                        style={{
                                            backgroundColor: _color.code,
                                        }}
                                        width={24}
                                        height={24}
                                        borderRadius="rounded-2xl"
                                    ></Box>
                                </Pressable>
                            )
                        })}
                    </Box>
                </Box>

                <Box height={24}/>

                <Box bg="gray250" p="4" borderRadius="rounded-2xl">

                    <Box flexDirection="row" justifyContent="space-evenly">
                        {ICONS.map((icon) => {
                            return (
                                <Pressable
                                    key={icon.id}
                                    onPress={() => {
                                        updateIcon(icon)
                                    }}
                                >
                                    <Box width={24} height={24} borderRadius="rounded-2xl">
                                        <Text>{icon.symbol}</Text>
                                    </Box>
                                </Pressable>
                            )
                        })}
                    </Box>
                </Box>
                <Box position="absolute" bottom={4} left={0} right={0}>
                    <Button
                        label={isEditing ? "Edit token" : "Create new Token"}
                        onPress={createNewToken}
                    />
                </Box>
            </Box>
        </SafeAreaWrapper>
    )
}

export default CreateTokenScreen
