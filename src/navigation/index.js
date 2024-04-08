import React from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import TeachScreen from "../screen/teachScreen";
import ArticleScreen from "../screen/articleScreen";
import HomeScreen from "../screen/homeScreen";
import AnalyzeScreen from "../screen/analyzeScreen";
import SettingScreen from "../screen/settingScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
            {/* <AnalyzeStack /> */}
        </NavigationContainer>
    )
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="首頁"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    if (route.name === "首頁") {
                        iconName = 'Icon_home';
                    }
                    else if (route.name === "分析頁") {
                        iconName = "Icon_analyze"
                    }
                    else if (route.name === "個人頁") {
                        iconName = "Icon_setting"
                    }

                    return (
                        <View style={{ width: "100%" }}>
                            <Image
                                source={{ uri: `https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_Tab/${iconName}-active.png?raw=true` }}
                                style={{ width: 40, height: 40, marginTop: 12,marginHorizontal:12}}
                            />
                        </View>
                    )
                },
                tabBarStyle:{width:"100%",height:50},
                tabBarShowLabel: true,
                tabBarLabelStyle: { fontSize: 8, fontWeight: 500, marginTop: 5 },
                headerShown: true,
            })}
        // tabBarOptions={{
        //     showLabel:true,
        //     labelStyle:{fontSize:8,fontWeight:500,marginTop:5},
        //     showIcon:true,
        // }}
        >
            <Tab.Screen name="首頁" component={HomeScreen} />
            <Tab.Screen name="分析頁" component={AnalyzeStack} />
            <Tab.Screen name="個人頁" component={SettingStack} />
        </Tab.Navigator>
    )
};

const AnalyzeStack = () => {
    return (
        <Stack.Navigator initialRouteName="stack分析頁">
            <Stack.Screen name="stack分析頁" component={AnalyzeScreen} />
            <Stack.Screen name="stack科普文章" component={ArticleScreen} />
        </Stack.Navigator>
    )
};

const SettingStack = () => {
    return (
        <Stack.Navigator initialRouteName="stack個人頁">
            <Stack.Screen name="stack個人頁" component={SettingScreen} />
            <Stack.Screen name="stack使用教學" component={TeachScreen} />
        </Stack.Navigator>
    )
};

export default Navigation;