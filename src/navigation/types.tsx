import { ICategory, ITask, IToken } from "../types"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

export type AuthStackParamList = {
  Welcome: undefined
  SignIn: undefined
  SignUp: undefined
}

export type RootBottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  Today: undefined
  Definitions: undefined
  CategoriesStack: NavigatorScreenParams<CategoriesStackParamList>
}

export type HomeStackParamList = {
  Home: undefined
  EditTask: {
    task: ITask
  }
}

export type TokensStackParamList = {
  Tokens: undefined
  Token: {
    id: string
  }
  CreateToken: {
    token?: IToken
  }
}

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList>
  Settings: undefined
}

export type RootStackParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList>
  AuthStack: NavigatorScreenParams<AuthStackParamList>
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthScreenNavigationType<
  RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, RouteName>,
  NativeStackNavigationProp<AppStackParamList, "Root">
>

export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootBottomTabParamList, Screen>,
    NativeStackScreenProps<RootBottomTabParamList>
  >

export type CategoriesNavigationType =
  NativeStackNavigationProp<CategoriesStackParamList>

export type HomeScreenNavigationType =
  NativeStackNavigationProp<HomeStackParamList>
