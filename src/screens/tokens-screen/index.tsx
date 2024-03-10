import Button from "@/components/shared/button"
import Loader from "@/components/shared/loader"
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import Token from "@/components/tokens/token"
import {fetcher} from "@/services/config"
import {IToken} from "@/types"
import {Box, Text} from "@/utils/theme"
import React from "react"
import {FlatList} from "react-native"
import useSWR from "swr"
import ErrorScreen from "../error-screen"
import {useNavigation} from "@react-navigation/native";
import {TokensNavigationType} from "@/navigation/types";

const navigation = useNavigation<TokensNavigationType>()

const TokensScreen = () => {
    const {
        data: tokens,
        isLoading: isLoadingTokens,
        error: error,
        mutate: mutateTokens,
    } = useSWR<IToken[]>(`tokens`, fetcher, {
        refreshInterval: 1000
    })

    if (error) {
        return <ErrorScreen error={error}/>
    }

    if (isLoadingTokens) {
        return <Loader/>
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="4" justifyContent="space-between">
                <Box>
                    <Text variant="textXl" fontWeight="700" ml="3" pb="5">
                        Tokens
                    </Text>

                    <Box flexDirection="row" justifyContent="space-evenly">
                        <Text variant="textXl">Tokens</Text>
                        <Text variant="textXl">Lists</Text>
                        <Text variant="textXl">Tasks</Text>
                    </Box>
                    <Box my="10">
                        <FlatList
                            data={tokens}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => {
                                return <Token token={item} mutateTokens={mutateTokens}/>
                            }}
                            ItemSeparatorComponent={() => <Box height={14}/>}
                            keyExtractor={(item) => item.id}
                        />
                    </Box>
                </Box>
                <Box mb="3">
                    <Button
                        label="Add new token"
                        onPress={() => navigation.navigate("CreateToken", {})}
                        outline
                    />
                </Box>

            </Box>
        </SafeAreaWrapper>
    )
}

export default TokensScreen
