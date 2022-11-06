import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/auth";
import { SafeAreaView } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export function Routes() {
  const { isLogged, userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const isLoading = !fontsLoaded || userStorageLoading;

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, userStorageLoading]);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
        {!!isLogged ? <AppRoutes /> : <AuthRoutes />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
