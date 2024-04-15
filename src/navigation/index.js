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


import { useDarkMode } from '../darkMode/DarkModeContext';
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
  const { isDarkModeEnabled } = useDarkMode();
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={"height"} keyboardVerticalOffset={-50}>
    <Tab.Navigator
      initialRouteName="首頁"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: isDarkModeEnabled ? 'rgba(34,36,40,1)' : 'white',
        },
      })}
    >
      <Tab.Screen name="分析頁"
        component={AnalyzeStack}
        options={{
          title: "分析頁", headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" color={isDarkModeEnabled ? 'white' : color} size={26} />
          ),
          headerBackground: () => (
            <View style={{ backgroundColor: isDarkModeEnabled ? 'rgba(34,36,40,1)' : 'white', flex: 1 }} />
          ),
          headerTintColor: isDarkModeEnabled ? 'white' : 'black'
        }} />
      <Tab.Screen name="首頁"
        component={HomeScreen}
        options={{
          title: "首頁", headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={isDarkModeEnabled ? 'white' : color} size={26} />
          )
        }} />
      <Tab.Screen name="個人頁" component={SettingStack}
        options={{
          title: "個人頁", headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={isDarkModeEnabled ? 'white' : color} size={26} />
          ),
          headerBackground: () => (
            <View style={{ backgroundColor: isDarkModeEnabled ? 'rgba(34,36,40,1)' : 'white', flex: 1 }} />
          ),
          headerTintColor: isDarkModeEnabled ? 'white' : 'black'
        }} />
    </Tab.Navigator>
    </KeyboardAvoidingView>
  )
};

const AnalyzeStack = () => {
  return (
    <Stack.Navigator initialRouteName="stack分析頁">
      <Stack.Screen name="stack分析頁" component={AnalyzeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="stack科普文章" component={ArticleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

const SettingStack = () => {
  return (
    <Stack.Navigator initialRouteName="stack個人頁">
      <Stack.Screen name="stack個人頁" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="stack使用教學" component={TeachScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

export default Navigation;

// screenOptions={}
// tabBarOptions={{
//     showLabel:true,
//     labelStyle:{fontSize:8,fontWeight:500,marginTop:5},
//     showIcon:true,
// }}
// ({ route }) => ({
//     tabBarIcon: ({ focused, size }) => {
//         if (route.name === "首頁") {
//             iconName = 'Icon_home';
//         }
//         else if (route.name === "分析頁") {
//             iconName = "Icon_analyze"
//         }
//         else if (route.name === "個人頁") {
//             iconName = "Icon_setting"
//         }

//         return (
//             <View style={{ width: "100%" }}>
//                 <Image
//                     source={{ uri: `https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_Tab/${iconName}-active.png?raw=true` }}
//                     style={{ width: 40, height: 40, marginTop: 12,marginHorizontal:12}}
//                 />
//             </View>
//         )
//     },
//     tabBarStyle:{width:"100%",height:50},
//     tabBarShowLabel: true,
//     tabBarLabelStyle: { fontSize: 8, fontWeight: 500, marginTop: 5 },
//     headerShown: true,
// })