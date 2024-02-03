import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import React from "react"
import { ThemeProvider } from "@shopify/restyle"
import theme from './src/utils/theme'
import Navigation from './src/navigation'
import { SWRConfig } from "swr"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <SafeAreaProvider>
    <SWRConfig
          value={{
            provider: () => new Map(),
            isVisible: () => {
              return true
            },

          }}
        >
          <Navigation />
        </SWRConfig>
    </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
