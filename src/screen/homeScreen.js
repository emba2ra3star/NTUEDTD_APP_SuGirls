import React from "react";
import MyCalendar from "../component/calendar";
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1 ,backgroundColor:"#fff" }}>
            <MyCalendar />
            {/* <Text>{MyCalendar.dayOfWeekNames}</Text> */}
            <View style={styles.optionContent}>
                <Text>test1</Text>
                <Text>test2</Text>
                <Text>test</Text>
                <Text>test</Text>
                <Text>test</Text>
                <Text>test</Text>
            </View>
        </View>



    )
};

const styles = StyleSheet.create(
    {
        optionContent: {
            marginHorizontal: "2%",
            paddingHorizontal: 35,
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: "#FFF3EA",
        }
    }
);


export default HomeScreen;