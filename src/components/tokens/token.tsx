import {TokensNavigationType, TokensStackParamList} from "@/navigation/types"
import axiosInstance from "@/services/config"
import {IToken} from "@/types"
import {AnimatedBox, Box, Text} from "@/utils/theme"
import {useNavigation} from "@react-navigation/native"
import React, {useState} from "react"
import {RouteProp, useRoute} from "@react-navigation/native"
import BASE_URL from "@/services/config"
import {useSWRConfig} from "swr"
import {
    FadeInLeft,
    FadeInRight,
    FadeInUp,
    useSharedValue
} from "react-native-reanimated"
import useSWRMutation from "swr/mutation"
import {Alert, Pressable, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import {palette} from "@/utils/theme/colors"
import IconButton from "../shared/icon-button"
import Toast from "react-native-toast-message"
import {deleteToken} from "@/services/tokenService";

type CreateCategoryRouteTypes = RouteProp<
    TokensStackParamList,
    "CreateToken"
>

type TokenProps = {
    token: IToken
    mutateTokens: () => Promise<IToken[] | undefined>
}


const Token = ({token, mutateTokens}: TokenProps) => {


    const route = useRoute<CreateCategoryRouteTypes>()

    const offset = useSharedValue(1)

    const {mutate} = useSWRConfig()

    const navigation = useNavigation<TokensNavigationType>()

    const deleteTokenRequest = async (
        url: string,
        {arg}: { arg: { id: string } }
    ) => {
        try {
            await axiosInstance.delete(url + arg.id)
        } catch (error) {
            console.log("Error occurred in deleteToken", error)
            throw error
        }
    }

    const {trigger: deleteTrigger} = useSWRMutation(
        "tokens/",
        deleteTokenRequest
    )

    const deleteToken = async () => {
        try {
            if (token.id) {
                Alert.alert('Delete', `Are you sure you want to delete token ${token.name}?`, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await deleteTrigger({
                                id: token?.id,
                            })
                            Toast.show({
                                type: 'success',
                                text1: 'Hello',
                                text2: 'Your token was deleted'
                            })
                            await mutate(BASE_URL + "tokens")
                        }
                    }
                ]);
            } else {
                throw Error("Token id not found")
            }
        } catch (error) {
            console.log("Error occurred in deleteToken", error)
            throw error
        }
    }

    const onDeleteToken = () => {
        // deleteToken(token)
    }

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
                        <Box style={styles.bottomIcons}>
                            <IconButton
                                label="Details"
                                icon={<Ionicons name="reader-outline" size={30} color="white"/>}
                                onPress={() => navigation.navigate("Token", {id: token.id})}
                            />
                            <IconButton
                                label="Edit"
                                icon={<Ionicons name="pencil-outline" size={30} color="white"/>}
                                onPress={() => {
                                }}
                            />
                            <IconButton
                                label="Delete"
                                icon={<Ionicons name="trash-outline" size={30} color="white"/>}
                                onPress={deleteToken}
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
    },
    alert: {
        backgroundColor: palette.amber100
    }
});
export default Token
