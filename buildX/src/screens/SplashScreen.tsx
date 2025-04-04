// screens/SplashScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to BuildX</Text>
      <Text style={styles.tagline}>
        Building a Safer Future for Every Worker
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  tagline: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
});

export default SplashScreen;
