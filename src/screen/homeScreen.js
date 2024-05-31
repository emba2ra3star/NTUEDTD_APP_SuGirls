import React, { useState } from "react";
import MyCalendar from "../component/calendar";
import { Button, StyleSheet, Text, View, Switch, TextInput, ScrollView, Pressable, TouchableOpacity, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/darkModeSlice";
import MyComponent from "../component/UserList";
import { selectSelectedDate } from "../redux/selectedDateSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectNote, setNote } from "../redux/notesSlice";
import { selectFlow, setFlow } from "../redux/flowSlice";
import { selectPainDegree, setPainDegree } from "../redux/painDegreeSlice";
import { selectMySyndromes, setMySyndromes } from "../redux/syndromesSlice";


const HomeScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //身體狀況(彈出視窗)
    const [modalVisible, setModalVisible] = useState(false);    // 彈出視窗

    // 流量&疼痛程度rating
    const [flowRating, setFlowRating] = useState(false);
    const [PDRating, setPDRating] = useState(false);

    // darkMode
    const colorMode = useSelector(selectColorMode);

    // redux
    const dispatch = useDispatch();
    // 選擇日期
    const selectedDate = useSelector(selectSelectedDate);
    // 1.把對應日期的note叫出來
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

    // 2.flow
    // 把對應日期的flow叫出來
    const flow = useSelector(state => selectFlow(state, selectedDate));
    const [newflow, setNewFlow] = useState(0);
    // 選擇不同的日期或是更改內容就會跟著顯示對應的flow內容，但無法儲存
    useEffect(() => {
        setNewFlow(flow || 0);
    }, [flow]);
    // 更改內容就會更新flow內的內容，會儲存下來
    const handleFlowChange = (value) => {
        setNewFlow(value);
        dispatch(setFlow({ date: selectedDate, flow: value }));
    };

    // 2.painDegree
    // 把對應日期的painDegree叫出來
    const painDegree = useSelector(state => selectPainDegree(state, selectedDate));
    const [newPainDegree, setNewPainDegree] = useState(0);
    // 選擇不同的日期或是更改內容就會跟著顯示對應的painDegree內容，但無法儲存
    useEffect(() => {
        setNewPainDegree(painDegree || 0);
    }, [painDegree]);
    // 更改內容就會更新painDegree內的內容，會儲存下來
    const handlePainDegreeChange = (value) => {
        setNewPainDegree(value);
        dispatch(setPainDegree({ date: selectedDate, painDegree: value }));
    };

    // 設定syndromes
    const mySyndromes = useSelector(state => selectMySyndromes(state, selectedDate)) || [];
    let currentSyndromes = [];

    useEffect(() => {
        console.log("觸發", mySyndromes)
    }, [mySyndromes]);

    const toggleSyndromesBtn = (value) => { //按鈕改變syndromes
        if (mySyndromes.includes(value)) {
            dispatch(setMySyndromes({ date: selectedDate, syndromes: mySyndromes.filter(i => i !== value) }))
        } else {
            dispatch(setMySyndromes({ date: selectedDate, syndromes: [...mySyndromes, value] }))
        }
        // dispatch(setMySyndromes({ date: selectedDate, syndromes: currentSyndromes }))
    };


    return (
        <ScrollView style={{ backgroundColor: colorMode === "light" ? "#333333" : "white" }}>
            <View>
                <MyCalendar periodIsEnable={isEnabled} />
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
                    <View style={{ marginBottom: 15 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 30, marginVertical: 5 }}>
                            <Text style={{ fontSize: 16 }}>流量</Text>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <Pressable key={index} onPress={() => { setNewFlow(index), handleFlowChange(index) }}>
                                            <MaterialCommunityIcons name="water" color={index <= newflow ? "black" : "#CCCCCC"} size={26} />
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 30, marginVertical: 5 }}>
                            <Text style={{ fontSize: 16 }}>疼痛程度</Text>
                            <View style={{ flexDirection: "row" }}>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <Pressable key={index} onPress={() => { setNewPainDegree(index), handlePainDegreeChange(index) }}>
                                        <MaterialCommunityIcons name="lightning-bolt" color={index <= newPainDegree ? "black" : "#CCCCCC"} size={26} />
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                    </View>

                    {/* 身體狀況 */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <MaterialCommunityIcons name="clipboard-list-outline" color="black" size={26} />
                                <Text style={{ fontSize: 18 }}>身體狀況</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", marginRight: 13 }}>
                                <MaterialCommunityIcons name="plus" color="black" size={26} />
                            </View>
                        </View>
                        {/* syndromes顯示標籤列表 */}
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <View style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
                                {mySyndromes.includes("頭痛") && <View style={{ backgroundColor: "#ff8787", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>頭痛</Text>
                                </View>}
                                {mySyndromes.includes("四肢無力") && <View style={{ backgroundColor: "#7BBCF9", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>四肢無力</Text>
                                </View>}
                                {mySyndromes.includes("貧血") && <View style={{ backgroundColor: "#FFB47D", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>貧血</Text>
                                </View>}
                                {mySyndromes.includes("腰痠") && <View style={{ backgroundColor: "#FCDD8C", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>腰痠</Text>
                                </View>}
                                {mySyndromes.includes("腹痛") && <View style={{ backgroundColor: "#D4BEFF", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>腹痛</Text>
                                </View>}
                                {mySyndromes.includes("長痘痘") && <View style={{ backgroundColor: "#AAE1A1", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>長痘痘</Text>
                                </View>}
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* 彈出視窗 */}
                    <Modal animationType="slide" transparent={true} visible={modalVisible}>
                        <View style={{ position: "absolute", bottom: 0, width: "100%", height: "30%", backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                            {/* 視窗標題：選擇身體狀況 */}
                            <View style={{ position: 'absolute', top: 10, left: 20 }}>
                                <Text style={{ color: 'black', fontSize: 18, paddingVertical: 8, textAlign: 'center' }}>
                                    選擇身體狀況
                                </Text>
                            </View>
                            {/* 確認&關閉 按鈕 */}
                            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 20 }} onPress={() => { dispatch(setMySyndromes({ date: selectedDate, syndromes: [] })) }}>
                                <Text style={{ alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, fontSize: 18, }}>
                                    clear
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, }} onPress={() => { setModalVisible(false) }}>
                                <Text style={{ color: "#6974B0", alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, fontSize: 16 }}>
                                    確認
                                </Text>
                            </TouchableOpacity>
                            {/* 身體狀況的按鈕選項 */}
                            <View style={{ flexWrap: "wrap", flexDirection: "row", width: "100%", paddingHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("頭痛") ? "#ff8787" : "#FFC5C5", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("頭痛")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>頭痛</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("四肢無力") ? "#7BBCF9" : "#C7E4FF", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("四肢無力")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>四肢無力</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("貧血") ? "#FFB47D" : "#FFD5B7", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("貧血")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>貧血</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("腰痠") ? "#FCDD8C" : "#FFF4CD", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("腰痠")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>腰痠</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("腹痛") ? "#D4BEFF" : "#E8DFFA", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("腹痛")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>腹痛</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: mySyndromes.includes("長痘痘") ? "#AAE1A1" : "#DAF6D5", paddingHorizontal: 15, paddingVertical: 5, marginVertical: 5, borderRadius: 30, marginLeft: 10 }}
                                    onPress={() => toggleSyndromesBtn("長痘痘")}
                                >
                                    <Text style={{ color: "white", fontSize: 18 }}>長痘痘</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>

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
        },
    }
);


export default HomeScreen;
