import React from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import TeachScreen from "../screen/teachScreen";
import ArticleScreen from "../screen/articleScreen";
import HomeScreen from "../screen/homeScreen";
import AnalyzeScreen from "../screen/analyzeScreen";
import SettingScreen from "../screen/settingScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/darkModeSlice";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
};

const BottomTabNavigator = () => {
  const colorMode = useSelector(selectColorMode);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"} keyboardVerticalOffset={-50}>
      <Tab.Navigator
        initialRouteName="首頁"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor:colorMode === "light"?"#333333":"white",
          },
        })}
      >
        <Tab.Screen name="分析頁"
          component={AnalyzeStack}
          options={{
            title: "分析頁",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={26} />
            ),
            headerShown: false,

          }} />
        <Tab.Screen name="首頁"
          component={HomeScreen}
          options={{
            title: "首頁", headerShown: false,
            tabBarIcon: ({ color }) => (
              // <MaterialCommunityIcons name="home" color={isDarkModeEnabled ? 'white' : color} size={26} />
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }} />
        <Tab.Screen name="個人頁" component={SettingStack}
          options={{
            title: "個人頁",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              // <MaterialCommunityIcons name="account" color={isDarkModeEnabled ? 'white' : color} size={26} />
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  )
};

const AnalyzeStack = () => {
  const colorMode = useSelector(selectColorMode);
  return (
    <Stack.Navigator initialRouteName="stack分析頁">
      <Stack.Screen name="stack分析頁" component={AnalyzeScreen} options={{
        headerShown: true,
        title: "分析頁",
        headerTitleAlign: "center",
        headerBackground: () => (
          <View style={{ backgroundColor:colorMode === "light"?"#333333":"white", flex: 1 }} />
        ),
        headerTintColor: colorMode ? 'white' : 'black'
      }} />
      <Stack.Screen name="stack科普文章" component={ArticleScreen} options={{
        headerShown: true,
        title: "經期小知識",
        headerTitleAlign: "center",
        headerBackground: () => (
          <View style={{ backgroundColor:colorMode === "light"?"#333333":"white", flex: 1 }} />
        ),
        headerTintColor: colorMode ? 'white' : 'black'
      }} />
    </Stack.Navigator>
  )
};

const SettingStack = () => {
  const colorMode = useSelector(selectColorMode);
  return (
    <Stack.Navigator initialRouteName="stack個人頁">
      <Stack.Screen name="stack個人頁" component={SettingScreen} options={{
        headerShown: true,
        title: "個人頁",
        headerTitleAlign: "center",
        headerBackground: () => (
          <View style={{ backgroundColor:colorMode === "light"?"#333333":"white", flex: 1 }} />
        ),
        headerTintColor: colorMode ? 'white' : 'black'
      }} />
      <Stack.Screen name="stack使用教學" component={TeachScreen} options={{
        headerShown: true,
        title: "使用教學",
        headerTitleAlign: "center",
        headerBackground: () => (
          <View style={{ backgroundColor:colorMode === "light"?"#333333":"white", flex: 1 }} />
        ),
        headerTintColor: colorMode ? 'white' : 'black'
      }} />
    </Stack.Navigator>
  )
};

export default Navigation;
