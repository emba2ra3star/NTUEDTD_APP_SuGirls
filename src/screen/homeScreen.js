import React, { useState } from "react";
import MyCalendar from "../component/calendar";
import { Button, StyleSheet, Text, View, Switch, TextInput, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { myStyle } from '../darkMode/style';
// import { useDarkMode } from '../darkMode/DarkModeContext';

const HomeScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
    return (
        <ScrollView>
            {/* <View style={ [myStyle.container, isDarkModeEnabled && myStyle.darkModeContainer] }> */}
            {/* <View style={ myStyle.container }> */}
            <View>
                <MyCalendar />
                {/* <Text>{MyCalendar.dayOfWeekNames}</Text> */}
                <View style={styles.optionContent}>
                    {/* 月事開始 */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="water-outline" color="black" size={26} />
                            <Text style={{ fontSize: 18 }}>經期開始</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end" }}>
                            <Switch

                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    {/* 身體狀況 */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="clipboard-list-outline" color="black" size={26} />
                            <Text style={{ fontSize: 18 }}>身體狀況</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", marginRight: 13 }}>
                            <MaterialCommunityIcons name="plus" color="black" size={26} />
                        </View>
                    </View>

                    {/* 備註 */}
                    <View style={{ justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="pencil" color="black" size={26} />
                            <Text style={{ fontSize: 18 }}>備註</Text>
                        </View>
                        <TextInput
                            inputMode="text"
                            style={{
                                width: "100%",
                                height: 100,
                                marginTop: 5,
                                backgroundColor: '#FFFEFD',
                                borderRadius: 10,
                                borderColor: '#cbcbcb',


                            }}
                            placeholder="今天狀況如何..."
                            placeholderTextColor="#676767"
                        />

                    </View>

                </View>
            </View>

        </ScrollView>

    )
};

const styles = StyleSheet.create(
    {
        optionContent: {
            marginTop: 20,
            marginHorizontal: "2%",
            paddingHorizontal: 35,
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: "#FFF3EA",
            opacity:0.9
        },
        optionText: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    }
);


export default HomeScreen;
