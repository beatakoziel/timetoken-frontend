import Button from "@/components/shared/button"
import Loader from "@/components/shared/loader"
import NavigateBack from "@/components/shared/navigate-back"
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper"
import Definition from "@/components/definitions/definition"
import { fetcher } from "@/services/config"
import { IToken} from "@/types"
import { Box, Text } from "@/utils/theme"
import React from "react"
import { StyleSheet, FlatList } from "react-native"
import useSWR from "swr"

const DefinitionsScreen = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<IToken[]>(`tokens`, fetcher, {
    refreshInterval: 1000,
  }) 

  if (isLoadingTasks || !tasks) {
    return <Loader />
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700" ml="3">
            Definitions
            
          </Text>
        </Box>
        <Box height={16} />
        
        <Box flexDirection="row" justifyContent="space-evenly">
            <Text variant="textXl">Tokens</Text>
            <Text variant="textXl">Lists</Text>
            <Text variant="textXl">Tasks</Text>
        </Box>
        <Box my="10" >
        <FlatList
          data={tasks}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <Definition token={item} mutateDefinitions={mutateTasks} />
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={(item) => item.id}
        />
        </Box>

        <Box mb="3">
            <Button
                label="ADD NEW"
                onPress={() => {}}
            />
        </Box>

      </Box>
    </SafeAreaWrapper>
  )
}

export default DefinitionsScreen
