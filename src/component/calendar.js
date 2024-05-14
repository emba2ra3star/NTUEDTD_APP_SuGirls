import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { selectColorMode } from '../redux/darkModeSlice';
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/selectedDateSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyCalendar({ periodIsEnable }) {
    // darkMode
    const colorMode = useSelector(selectColorMode);

    // mark selectDay
    const [markedDates, setMarkedDates] = useState({});

    // 經期開始按鈕
    const [onPressDate, setOnPressDate] = useState({});
    useEffect(() => {
        console.log("按鈕 CHANGE!");
        if (Boolean(periodIsEnable)) {
            setPeriod(onPressDate)
        };
    }, [periodIsEnable]);

    const dispatch = useDispatch();
    const [myData, setMyData] = useState([]);
    const handleDayPress = (day) => {
        const { dateString } = day;
        // 清除updateDay
        const updatedMarkedDates = {}
        // 設定updateDay
        updatedMarkedDates[dateString] = { startingDay: true, endingDay: true, color: '#EE7B7B', textColor: "#fff", };

        // 渲染
        setMarkedDates(updatedMarkedDates);

        const x = Boolean(periodIsEnable);
        if (x) {
            //console.log(`setPeriod,${x}`);
            setPeriod(day);

        }
        //設一個Date存現在選擇的日期，並用dispatch將Date引入store.js(全域變數)
        let Date = day.dateString;
        dispatch(setSelectedDate(Date)) //setSelectedDate為key和action
    };

    // mark period
    const [markedPeriod, setMarkedPeriod] = useState({});
    const [startDate, setStartDate] = useState(null); // 儲存開始日期
    const [endDate, setEndDate] = useState(null); // 儲存結束日期
    const setPeriod = (day) => {
        const { dateString } = day;
        // 如果开始日期还没有选择，则将选择的日期设为开始日期
        if (!startDate) {
            setStartDate(dateString);
            // console.log("1");
        } else if (!endDate) { // 如果结束日期还没有选择，则将选择的日期设为结束日期
            if (dateString < startDate) {   //如果選擇日期比startDate小則會重新選擇startDate
                setStartDate(dateString);
                // console.log("2-1");
            }
            else {
                setEndDate(dateString);
                markPeriod(startDate, dateString);  // 标记开始日期到结束日期之间的日期为周期
                // console.log("2-2");
                enqueueData({ startDate, dateString }); //因為endDate儲存的會是空值，所以改為儲存dateString
                dequeueData();
                getData().then(data => {    //將資料抓取出來
                    console.log('Queue 中的資料:', data);
                });
            }
        } else { // 如果开始日期和结束日期都已经选择，则重置选择
            //console.log("clear");
            setStartDate(dateString);
            setEndDate(null);
            setMarkedPeriod({});
            // console.log("3");
        }
    };

    // 标记开始日期到结束日期之间的日期为周期
    const markPeriod = (start, end) => {
        // 測試predictDate
        const predictDate = getPredictDate(start);
        console.log(`設定預測日期：${predictDate}，startDate：${start}`);
        // 標記predictDate
        const marked = {};
        let markedPredictDate = predictDate;
        for (let i = 0; i < 5; i++) {
            if (i == 0) {
                marked[markedPredictDate] = { startingDay: true, endingDay: false, color: '#DEE0C7', textColor: "#fff" };
            }
            else if (i == 4) {
                marked[markedPredictDate] = { startingDay: false, endingDay: true, color: '#DEE0C7', textColor: "#fff" };
            }
            else {
                marked[markedPredictDate] = { startingDay: false, endingDay: false, color: '#DEE0C7', textColor: "#fff" };
            }
            markedPredictDate = getNextDate(markedPredictDate);
        }

        marked[start] = { startingDay: true, endingDay: false, color: '#FFC197', textColor: "#fff" };
        marked[end] = { startingDay: false, endingDay: true, color: '#FFC197', textColor: "#fff" };

        let currentDate = getNextDate(start);
        while (currentDate < end) {
            marked[currentDate] = { startingDay: false, endingDay: false, color: '#FFC197', textColor: "#fff" };
            currentDate = getNextDate(currentDate);
        }
        setMarkedPeriod(marked);
    };

    // 获取下一个日期
    const getNextDate = (date) => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate.toISOString().split('T')[0];
    };
    // 推算預測日期
    const getPredictDate = (start) => {
        const pd = new Date(start);
        pd.setDate(pd.getDate() + 28);
        return pd.toISOString().split('T')[0];
    };

    //-----------------------------------------------
    // 儲存 queue 到 AsyncStorage
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('myData', JSON.stringify(myData));
            // console.log('資料儲存成功');
        } catch (error) {
            console.log('儲存資料時發生錯誤:', error);
        }
    };

    // 從 AsyncStorage 讀取 queue
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myData');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.log('讀取資料時發生錯誤:', error);
            return [];
        }
    };

    // 新增資料到 queue
    const enqueueData = async (data) => {
        const newData = [...myData, data];  //更新資料(加入新的data)
        setMyData(newData);
        await saveData(newData); //儲存新資料
    };

    // 從 queue 移除資料
    const dequeueData = async () => {
        if (myData.length > 5) {
            console.log("delete")
            myData.shift();
            const newData = [...myData] ;  //更新變更後的資料
            setMyData(newData);
            await saveData(newData);//儲存更新後的資料
        }
    };

    return (
        <View style={{ width: "100%", marginTop: 5 }}>
            <View style={{ flexDirection: "row", marginLeft: "2%" }}>
                <Image source={require('../../assets/img/Vector.png')} />
                <Text style={{ paddingLeft: 5, color: colorMode === "light" ? "white" : "black" }}>2024</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8, borderBottomWidth: 3, borderBottomColor: '#FFC9B8' }}>
                <Text style={{ color: "#ffb673" }}>日</Text>
                <Text style={{ color: colorMode === "light" ? "white" : "black" }}>一</Text>
                <Text style={{ color: colorMode === "light" ? "white" : "black" }}>二</Text>
                <Text style={{ color: colorMode === "light" ? "white" : "black" }}>三</Text>
                <Text style={{ color: colorMode === "light" ? "white" : "black" }}>四</Text>
                <Text style={{ color: colorMode === "light" ? "white" : "black" }}>五</Text>
                <Text style={{ color: "#ffb673" }}>六</Text>
            </View>

            <View style={{ paddingHorizontal: "2%" }}>
                <Calendar
                    current={'2024-03-20'} // 初始显示的日期
                    minDate={'2024-01-01'} // 允许选择的最早日期
                    maxDate={'2024-12-31'} // 允许选择的最晚日期
                    onDayPress={(day) => { handleDayPress(day), setOnPressDate(day) }} // 选择日期时触发的回调
                    markingType="period"
                    markedDates={{
                        "2024-03-04": {
                            textColor: "#C686ED"
                        },
                        "2024-03-05": {
                            textColor: "#C686ED"
                        },
                        "2024-03-06": {
                            textColor: "#C686ED"
                        },
                        ...markedDates,
                        ...markedPeriod,
                    }}
                    theme={{
                        textMonthFontWeight: 'bold', // 月份文字的粗细
                        textMonthFontSize: 20, // 月份文字的大小
                        todayTextColor: '#00adf5', // 当天文字颜色
                        calendarBackground: "rgba(0,0,0,0)",
                        arrowColor: "#747474",
                        arrowStyle: { backgroundColor: "rgba(0,0,0,0)" },
                        dayTextColor: '#E9B476',
                        textDayFontWeight: "bold",
                        monthTextColor: "#FFC9B8",
                    }}
                    style={{
                        backgroundColor: colorMode === "light" ? "#333333" : "white",
                        shadowColor: "white",
                        shadowOffset: { width: 10, height: 10 },
                        shadowRadius: 20,
                        shadowOpacity: 1,
                    }}
                    hideExtraDays={true}
                    hideDayNames={true}
                />

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_period.png?raw=true" }} style={styles.calendarIcon} />
                        <Text style={{ marginHorizontal: 5, color: colorMode === "light" ? "white" : "black" }}>經期</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_today.png?raw=true" }} style={styles.calendarIcon} />
                        <Text style={{ marginHorizontal: 5, color: colorMode === "light" ? "white" : "black" }}>今日</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_predict.png?raw=true" }} style={styles.calendarIcon} />
                        <Text style={{ marginHorizontal: 5, color: colorMode === "light" ? "white" : "black" }}>預估經期</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_eggday.png?raw=true" }} style={styles.calendarIcon} />
                        <Text style={{ marginHorizontal: 5, color: colorMode === "light" ? "white" : "black" }}>排卵日</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_egg.png?raw=true" }} style={{ width: 22, height: 11, marginTop: 3 }} />
                        <Text style={{ marginHorizontal: 5, color: colorMode === "light" ? "white" : "black" }}>排卵期 </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        calendarIcon: {
            width: 15,
            height: 15,
            marginTop: 3
        },
        calendarView: {
            flexDirection: "row",
            alignItems: "center"
        }
    }
);
