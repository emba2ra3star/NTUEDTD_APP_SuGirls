import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useState } from "react";
import teachScreen from "../screen/teachScreen";
import articleScreen from "../screen/articleScreen";
import homeScreen from "../screen/homeScreen";
import analyzeScreen from "../screen/analyzeScreen";
import settingScreen from "../screen/settingScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Naigation = () => {
    return (
        <NavigationContainer>

        </NavigationContainer>
    )
};

const BottomTabNavigator=()=>{
    return(
        <Tab.Navigator 
            screenOptions={({route})=>({
                tabBarIcon:({focused,size})=>{
                    let iconName;
                    if(route.name==="首頁"){
                        iconName='Icon_home';
                    }
                    else if(route.name==="分析頁"){
                        iconName="Icon_analyze"
                    }
                    else if(route.name==="個人頁"){
                        iconName="Icon_setting"
                    }

                    return(
                        <Image source={{uri:focused?"":""}} />
                    )
                }
            })}
        >
            <Tab.Screen name="首頁" component={homeScreen}/>
            <Tab.Screen name="分析頁" component={analyzeStack}/>
            <Tab.Screen name="個人頁" component={settingStack}/>
        </Tab.Navigator>
    )
};

const analyzeStack = () => { 
    return(
        <Stack.Navigator initialRouteName="分析頁">
            <Stack.Screen name="分析頁" component={analyzeScreen}/>
            <Stack.Screen name="科普文章" component={articleScreen}/>
        </Stack.Navigator>
    )
};

const settingStack = () => { 
    return(
        <Stack.Navigator initialRouteName="個人頁">
            <Stack.Screen name="個人頁" component={settingScreen}/>
            <Stack.Screen name="使用教學" component={teachScreen}/>
        </Stack.Navigator>
    )
};