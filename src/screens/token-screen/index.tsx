import Loader from "@/components/shared/loader"
import NavigateBack from "@/components/shared/navigate-back"
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import {TokensStackParamList} from "@/navigation/types"
import {fetcher} from "@/services/config"
import {IToken} from "@/types"
import {Box, Text} from "@/utils/theme"
import {RouteProp, useRoute} from "@react-navigation/native"
import React from "react"
import useSWR from "swr"
import Button from "@/components/shared/button";

type TokenScreenRouteProp = RouteProp<TokensStackParamList, "Token">

const TokenScreen = () => {
    const route = useRoute<TokenScreenRouteProp>()

    const {id} = route.params

    const {data: token, isLoading: isLoadingToken} = useSWR<IToken>(
        `tokens/${id}`,
        fetcher
    )

    console.log(`token`, JSON.stringify(token, null, 2))

    if (isLoadingToken || !token) {
        return <Loader/>
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="4">
                <Box width={40} flexDirection="column">
                    <NavigateBack/>
                </Box>
                <Text variant="textXl" fontWeight="700">
                    Token details
                </Text>
                <Box flexDirection="column" flex={1} justifyContent="space-between">
                    <Box flexDirection="column">
                        <Text variant="textLg" color="white" fontWeight="700">
                            Name: {token.name}
                        </Text>
                        <Text variant="textLg" color="white" fontWeight="700">
                            Value: {token.value}
                        </Text>
                    </Box>

                    <Box flexDirection="row" justifyContent="space-around">
                        <Box width={"45%"}>
                            <Button label="Edit" onPress={() => {
                            }} outline/>
                        </Box>
                        <Box width={"45%"}>
                            <Button label="Delete" onPress={() => {
                            }} outline/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </SafeAreaWrapper>
    )
}

export default TokenScreen
