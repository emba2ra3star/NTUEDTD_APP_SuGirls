import React from "react";
import MyCalendar from "../component/calendar";
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return(
        <View style={{flex:1}}>
            <MyCalendar />
            <Text>{MyCalendar.dayOfWeekNames}</Text>
        </View>
        
    )
};

export default HomeScreen;