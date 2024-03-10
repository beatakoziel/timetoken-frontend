import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import {Box, Text} from "@/utils/theme"
import React from "react"
import Button from "@/components/shared/button"
import useUserGlobalStore from "@/store/useUserGlobalStore"
import {AxiosError} from "axios"


const ErrorScreen = ({error}: { error: AxiosError }) => {
    const {updateUser} = useUserGlobalStore()

    const onLogout = () => {
        updateUser(null)
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} alignItems="center" justifyContent="center">
                <Text color="white" variant="text2Xl">Something went wrong</Text>
                <Text color="gray500">{error.message}</Text>

                <Box width="50%" mt="5">
                    <Button label="Logout" onPress={onLogout} uppercase/>
                </Box>
            </Box>
        </SafeAreaWrapper>
    )
}

export default ErrorScreen
