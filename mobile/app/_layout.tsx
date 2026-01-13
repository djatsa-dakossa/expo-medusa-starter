import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppHeader } from "@/src/presentation/components/AppHeader";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen after a short delay
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          header: () => <AppHeader />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen
          name="product/[id]"
          options={({ route }) => ({
            headerShown: true,
            header: () => <AppHeader showBackButton showCartButton />,
          })}
        />
        <Stack.Screen
          name="category/[id]"
          options={{
            headerShown: true,
            header: () => <AppHeader showBackButton title={""} />,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            headerShown: true,
            header: () => <AppHeader showBackButton title="Panier" />,
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerShown: true,
            header: () => <AppHeader showBackButton title="Paiement" />,
          }}
        />
        <Stack.Screen
          name="order-confirmation"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
