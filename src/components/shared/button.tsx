import {Box, Text} from "../../utils/theme"
import {Pressable} from "react-native"

type ButtonProps = {
    label: string
    onPress: () => void
    onLongPress?: () => void
    disabled?: boolean
    uppercase?: boolean,
    outline?: boolean
}

const Button = ({
                    label,
                    onLongPress,
                    onPress,
                    disabled,
                    uppercase,
                    outline
                }: ButtonProps) => {
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
            <Box
                bg={outline ? "transparent" : (disabled ? "gray800" : "primary")}
                py="3.5"
                borderRadius="rounded-7xl"
                borderWidth={outline ? 1 : 0}
                borderColor={outline ? "primary" : "transparent"}
            >
                <Text
                    variant="textSm"
                    fontWeight="700"
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

export default Button
