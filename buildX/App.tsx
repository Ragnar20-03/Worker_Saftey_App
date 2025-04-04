// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabs from "./src/navigation/BottomTabs";
import SplashScreen from "./src/screens/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
}
