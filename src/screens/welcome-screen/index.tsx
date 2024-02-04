import Button from "../../components/shared/button"
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper"
import { AuthScreenNavigationType } from "../../navigation/types"
import { AnimatedBox, Box, Text } from "../../utils/theme"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Image } from "react-native"
import Animated, { ZoomIn } from "react-native-reanimated"

const PUZZLE_IMAGE =
  "./puzzle.png"

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn")
  }
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp")
  }

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#1A1A1A",
          "#2C1F2F",
          "#3E2443",
          "#4F2958",
          "#3E2443",
          "#1A1A1A",
        ]}
        style={{ flex: 1 }}
      >
        <Box flex={1} justifyContent="center">
          <Box alignItems="center" mb="3.5">
            <Animated.View entering={ZoomIn.duration(2000)}>
              <Image
                source={
                  require(PUZZLE_IMAGE)
                }
                style={{
                    width:120, height:120
                  }}
              />
            </Animated.View>
          </Box>
          <Text textAlign="center" variant="textXl" fontWeight="700">
            Do you want to be effective?
          </Text>
          <Box my="3.5" mx="10">
            <Button
              label="Start your journey"
              onPress={navigateToSignUpScreen}
            />
          </Box>
          <Text
            textAlign="center"
            variant="textXs"
            fontWeight="700"
            color="gray5"
          >
            26,698 registered today
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  )
}

export default WelcomeScreen
