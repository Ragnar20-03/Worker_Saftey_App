import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ConstructionSitesScreen from "../screens/ConstructionScreen";
import SiteDetailsScreen from "../screens/SiteDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
const ConstructionStack = createNativeStackNavigator();

// Construction stack navigator for nested screens
const ConstructionStackNavigator = () => {
  return (
    <ConstructionStack.Navigator screenOptions={{ headerShown: false }}>
      <ConstructionStack.Screen
        name="ConstructionSites"
        component={ConstructionSitesScreen}
      />
      <ConstructionStack.Screen
        name="SiteDetails"
        component={SiteDetailsScreen}
      />
    </ConstructionStack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          // Custom icon rendering based on route name
          if (route.name === "Home") {
            return <FontAwesome5 name="home" size={size - 2} color={color} />;
          } else if (route.name === "Construction") {
            return (
              <FontAwesome5 name="hard-hat" size={size - 2} color={color} />
            );
          } else if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#FF6B00",
        tabBarInactiveTintColor: "#999999",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#EEEEEE",
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Construction"
        component={ConstructionStackNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Sites</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>Profile</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
});

export default BottomTabs;
