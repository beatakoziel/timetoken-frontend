import { Box, Text } from "../../utils/theme"
import { Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type ButtonProps = {
  label?: string
  onPress: () => void
  onLongPress?: () => void
  disabled?: boolean
  uppercase?: boolean
  style?: any,
  icon?: any
}

const IconButton = ({
  label,
  onLongPress,
  onPress,
  disabled,
  uppercase,
  style,
  icon
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Box
        borderRadius="rounded-7xl"
        style={style}
        marginRight="5"
      >
        <Box alignSelf="center">
          {icon}
        </Box>
        <Text
          my="1"
          variant="textXs"
          fontWeight="400"
          color="white"
          textAlign="center"
          textTransform={uppercase ? "uppercase" : "none"}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  )
}

export default IconButton
