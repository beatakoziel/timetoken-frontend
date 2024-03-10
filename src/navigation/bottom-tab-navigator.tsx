import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {useTheme} from "@shopify/restyle"
import {RootBottomTabParamList} from "./types"
import TokensScreen from "src/screens/tokens-screen"
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {palette} from "@/utils/theme/colors";
import TokensStackNavigator from "@/navigation/token-stack-navigator";

const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    const theme = useTheme()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: theme.colors.gray550,
                tabBarHideOnKeyboard: true,
            }}
        >
            {/* <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      /> */}
            {/* <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Completed",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      /> */}
            <Tab.Screen
                name="TokensStack"
                component={TokensStackNavigator}
                options={() => ({
                    title: "Tokens",
                    tabBarIcon: ({color}) => <Ionicons name="library-outline" size={30} color={palette.gray600}/>,
                    headerShown: false,
                })}
            />
            {/* <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          title: "Today",
          tabBarIcon: ({ color }) => <Icons name="calendar" color={color} />,
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: "Categories",
          tabBarIcon: ({ color }) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      /> */}
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
