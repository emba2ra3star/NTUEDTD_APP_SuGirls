import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Switch, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode, toggleColorMode } from "../redux/darkModeSlice";


// import { myStyle } from '../darkMode/style';
// import { useDarkMode } from '../darkMode/DarkModeContext';


//const dispatch = useDispatch();


const SettingScreen = () => {
    const { navigate } = useNavigation();
    const [isAutoCalculateEnabled, setIsAutoCalculateEnabled] = useState(false);
    const [isPeriodNotificationEnabled, setIsPeriodNotificationEnabled] = useState(false);
    const [isRecordReminderEnabled, setIsRecordReminderEnabled] = useState(false);
    const [isBodyStatusReminderEnabled, setIsBodyStatusReminderEnabled] = useState(false);

    //     const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();

    const toggleAutoCalculate = () => setIsAutoCalculateEnabled(previousState => !previousState);
    const togglePeriodNotification = () => setIsPeriodNotificationEnabled(previousState => !previousState);
    const toggleRecordReminder = () => setIsRecordReminderEnabled(previousState => !previousState);
    const toggleBodyStatusReminder = () => setIsBodyStatusReminderEnabled(previousState => !previousState);

    // darkMode
    const colorMode = useSelector(selectColorMode);
    const dispatch = useDispatch();
    const toggle =()=>{dispatch(toggleColorMode())}
    

    return (
        //         <View style={[myStyle.container, isDarkModeEnabled && myStyle.darkModeContainer]}>
        // <View style={myStyle.container}>
        <View style={styles.container}>
            <View style={styles.settingcontent}>
                <Text style={styles.title}>經期設定</Text>
                <View style={styles.listContent}>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>經期長度</Text>
                            <Text>5天</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>週期長度</Text>
                            <Text>28天</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>自動推算</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isAutoCalculateEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleAutoCalculate}
                                value={isAutoCalculateEnabled}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.settingcontent}>
                <Text style={styles.title}>通知設定</Text>
                <View style={styles.listContent}>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>經期開始/結束</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isPeriodNotificationEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={togglePeriodNotification}
                                value={isPeriodNotificationEnabled}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>紀錄提醒</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isRecordReminderEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleRecordReminder}
                                value={isRecordReminderEnabled}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>身體狀態提醒</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isBodyStatusReminderEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleBodyStatusReminder}
                                value={isBodyStatusReminderEnabled}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.settingcontent}>
                <Text style={styles.title}>偏好設定</Text>
                <View style={styles.listContent}>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>深色模式</Text>
                            <Switch
                                name="light Mode"
                                value={colorMode === "light"}
                                onValueChange={()=>toggle()}
                                // onToggle={()=>toggle()}
                                accessibilityLabel="display-mode"
                                accessibilityHint="light or dark mode"
                            />
                            {/* <Switch
                                //                                 trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                //                                 thumbColor={isDarkModeEnabled ? '#FF5656' : 'white'}
                                //                                 ios_backgroundColor="white"
                                //                                 onValueChange={toggleDarkMode}
                                //                                 value={isDarkModeEnabled}
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isBodyStatusReminderEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleBodyStatusReminder}
                                value={isBodyStatusReminderEnabled}
                            /> */}
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>變更背景</Text>
                            <MaterialCommunityIcons name="camera" color={"black"} size={26} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.settingcontent}>
                <Text style={styles.title}>其他</Text>
                <View style={styles.listContent}>
                    <View>
                        <Pressable style={styles.listItem} onPress={() => navigate('stack使用教學')}>
                            <Text>使用教學</Text>
                            <MaterialCommunityIcons name="chevron-right" color={"black"} size={26} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: "white" },
        settingcontent: { marginHorizontal: 30, marginTop: 10 },
        title: { color: "#FF9E9E" },
        listContent: { backgroundColor: "#FFEEE1", opacity: 0.9, borderRadius: 10, paddingVertical: 5 },
        listItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 5 }
    }
);

export default SettingScreen;