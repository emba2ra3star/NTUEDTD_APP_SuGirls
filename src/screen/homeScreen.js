import React, { useState } from "react";
import MyCalendar from "../component/calendar";
import { Button, StyleSheet, Text, View, Switch, TextInput, ScrollView,Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/darkModeSlice";
import MyComponent from "../component/UserList";
import { selectSelectedDate } from "../redux/selectedDateSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectNote, setNote } from "../redux/notesSlice";


const HomeScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // 流量&疼痛程度rating
    const [flowRating, setFlowRating] = useState(false);
    const [PDRating, setPDRating] = useState(false);

    // darkMode
    const colorMode = useSelector(selectColorMode);

    // redux
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectSelectedDate);
    // 把對應日期的note叫出來
    const note = useSelector(state => selectNote(state, selectedDate));
    const [newNote, setNewNote] = useState("");
    // 選擇不同的日期或是更改內容就會跟著顯示對應的note內容，但無法儲存
    useEffect(() => {
        setNewNote(note || "");
      }, [note]);
    // 更改內容就會更新note內的內容，會儲存下來
    const handleNoteChange = (text) => {
        setNewNote(text);
        dispatch(setNote({ date: selectedDate, note: text }));
    };

    return (
        <ScrollView style={{ backgroundColor:colorMode === "light"?"#333333":"white" }}>
            <View>
                <MyCalendar periodIsEnable={isEnabled}/>
                {/* <MyComponent /> */}
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
                        {isEnabled &&(<View style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 30, marginVertical: 5 }}>
                                <Text style={{ fontSize: 16 }}>流量</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <Pressable key={index} onPress={() => setFlowRating(index)}>
                                                <MaterialCommunityIcons name="water" color={index <= flowRating ? "black" : "#CCCCCC"} size={26} />
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 30, marginVertical: 5 }}>
                                <Text style={{ fontSize: 16 }}>疼痛程度</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <Pressable key={index} onPress={() => setPDRating(index)}>
                                            <MaterialCommunityIcons name="lightning-bolt" color={index <= PDRating ? "black" : "#CCCCCC"} size={26} />
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                        </View>)}

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
                            //redux儲存的備註內容，並同步更新
                            value={newNote}
                            onChangeText={handleNoteChange}
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
            backgroundColor: "#FFE2D5",
            opacity: 0.9
        },
        optionText: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    }
);


export default HomeScreen;
