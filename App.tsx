import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/hooks/auth";

import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
