import Loader from "@/components/shared/loader"
import NavigateBack from "@/components/shared/navigate-back"
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import Task from "@/components/tasks/task"
import TaskActions from "@/components/tasks/task-actions"
import {TokensStackParamList} from "@/navigation/types"
import axiosInstance, {fetcher} from "@/services/config"
import {IToken, ITask} from "@/types"
import {Box, Text} from "@/utils/theme"
import {RouteProp, useRoute} from "@react-navigation/native"
import React, {useEffect} from "react"
import {FlatList} from "react-native"
import useSWR from "swr"

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
                <Box width={40}>
                    <NavigateBack/>
                </Box>
                <Box height={16}/>
                <Box flexDirection="column">
                    <Text variant="textXl" fontWeight="700">
                        Token details
                    </Text>
                    <Text fontWeight="700">
                        {token.name}
                    </Text>
                    <Text fontWeight="700">
                        {token.value}
                    </Text>
                </Box>
                <Box height={16}/>
                <Box height={16}/>
            </Box>
        </SafeAreaWrapper>
    )
}

export default TokenScreen
