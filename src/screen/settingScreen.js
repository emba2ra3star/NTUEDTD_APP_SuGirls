import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Switch, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SettingScreen = () => {
    const { navigate } = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
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
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
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
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>紀錄提醒</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.listItem}>
                            <Text>身體狀態提醒</Text>
                            <Switch
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
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
                                trackColor={{ false: '#F2D7C2', true: '#FF5656' }}
                                thumbColor={isEnabled ? '#FF5656' : 'white'}
                                ios_backgroundColor="white"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
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
        container:{flex:1,backgroundColor:"white"},
        settingcontent:{marginHorizontal:30,marginTop:10},
        title: { color: "#FF9E9E" },
        listContent: { backgroundColor: "#FFEEE1", borderRadius: 10 ,paddingVertical:5},
        listItem: { flexDirection: "row", justifyContent: "space-between",alignItems:"center",paddingHorizontal:20,paddingVertical:5 }
    }
);

export default SettingScreen;