import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { selectColorMode } from '../redux/darkModeSlice';
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/selectedDateSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatedata } from '../screen/analyzeScreen';
import { selectanalyzedata, setanalyzedata } from "../redux/analyzedataSlice";

export default function MyCalendar({ periodIsEnable }) {
    // darkMode
    const colorMode = useSelector(selectColorMode);

    // mark selectDay選擇日期
    const [markedDates, setMarkedDates] = useState({});

    // 經期開始按鈕
    const [onPressDate, setOnPressDate] = useState({});
    useEffect(() => {
        //console.log("按鈕 CHANGE!");
        if (Boolean(periodIsEnable)) {
            setPeriod(onPressDate)
        };
    }, [periodIsEnable]);

    const dispatch = useDispatch();
    const [myData, setMyData] = useState([]);
    const handleDayPress = (day) => {   //選擇日期
        const { dateString } = day;
        // 清除updateDay
        const updatedMarkedDates = {}
        // 設定updateDay
        updatedMarkedDates[dateString] = { startingDay: true, endingDay: true, color: '#EE7B7B', textColor: "#fff", };
        // 渲染
        setMarkedDates(updatedMarkedDates);

        const x = Boolean(periodIsEnable);
        if (x) {
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
        // 標記本次週期
        if (!startDate) {   // 如果开始日期还没有选择，则将选择的日期设为开始日期
            setStartDate(dateString);
        } else if (!endDate) { // 如果结束日期还没有选择，则将选择的日期设为结束日期
            if (dateString < startDate) {   //如果選擇日期比startDate小則會重新選擇startDate
                setStartDate(dateString);
            }
            else {
                setEndDate(dateString);
                markPeriod(startDate, dateString);  // 標記預測未來週期
                markedFertilePeriod(startDate);     // 標記預測易孕期
                enqueueData({ startDate, dateString }); //因為endDate儲存的會是空值，所以改為儲存dateString
                let Month = startDate.match(/-(\d{2})-/)[1];
                let startday = startDate.split("-")[2];
                let endday = dateString.split("-")[2];
                Month = parseInt(Month, 10);    //parseInt將字串轉變為10進制的整數
                startday = parseInt(startday, 10);
                endday = parseInt(endday, 10);
                updatedata(Month, startday, endday);
                //dispatch(setanalyzedata({ month: 3, data: {Month, startday, endday}})); //{key, value}
            }
        } else { // 如果开始日期和结束日期都已经选择，则重置选择
            setStartDate(dateString);
            setEndDate(null);
            setMarkedPeriod({});
        }
    };

    const markPeriod = (start, end) => {    // 標記預測未來週期
        // 測試predictDate
        const predictDate = getPredictDate(start);
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

    const getNextDate = (date) => {    // 獲取下一天
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate.toISOString().split('T')[0];
    };
    const getYesterday = (date) => {    // 獲取上一天
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() - 1);
        return nextDate.toISOString().split('T')[0];
    }    
    const getPredictDate = (start) => { // 推算預測日期
        const pd = new Date(start);
        pd.setDate(pd.getDate() + 28);
        return pd.toISOString().split('T')[0];  //推測的下一次第一天
    };

    //-------------歷史紀錄的週期(近10筆)-------------
    // 儲存 queue 到 AsyncStorage
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('myData', JSON.stringify(myData));
            console.log('資料儲存成功');
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

    // 新增資料到 queue --> 結合dequeueData() ==> 更新queueData
    const enqueueData = async (data) => {
        const newData = [...myData, data];  //更新資料(加入新的data)
        setMyData(newData);
        if (newData.length > 10) {   //最多存10筆資料
            newData.shift();
            setMyData(newData);
        }
        await saveData(myData); //儲存新資料
    };

    // 渲染queue
    const [prePeriodMarked, setPrePeriodMarked] = useState(myData)
    useEffect(() => {
        const marked = {};
        // if(myData[0]!=null){console.log(myData[0].dateString);}

        // 將10筆queue資料的渲染格式存進marked
        for (let i = 0; i < 10; i++) {
            if (myData[i] != null) {
                marked[myData[i].dateString] = { startingDay: false, endingDay: true, color: '#FFC197', textColor: "#fff" };
                marked[myData[i].startDate] = { startingDay: true, endingDay: false, color: '#FFC197', textColor: "#fff" };
                let currentD = getNextDate(myData[i].startDate);
                while (currentD != myData[i].dateString) {
                    marked[currentD] = { startingDay: false, endingDay: false, color: '#FFC197', textColor: "#fff" };
                    currentD = getNextDate(currentD);
                }
            }
        }

        setPrePeriodMarked(marked);

    }, [myData])

    //-------------標記預測的排卵期&易孕期-------------
    // 設定易孕期fertilePeriod
    const [fertilePeriod, setFertilePeriod] = useState({});
    const markedFertilePeriod = (start) => {    //標記易孕期
        // 計算排卵日
        const fertileDate = new Date(start);
        fertileDate.setDate(fertileDate.getDate() + 14);
        const a = fertileDate.toISOString().split('T')[0];
        // 設定所有標記日
        let currentDate = a;
        const marked = {};
        marked[currentDate] = { textColor: "#C686ED" }  //排卵日當天
        for (let i = 0; i < 4; i++) {   //排卵日後推4天
            currentDate = getNextDate(currentDate);
            marked[currentDate] = { textColor: "#C686ED" };
        }
        currentDate = a;
        for (let i = 0; i < 5; i++) {   //排卵日前推5天
            currentDate=getYesterday(currentDate);
            marked[currentDate] = { textColor: "#C686ED" };
        }
        // 儲存標記日
        setFertilePeriod(marked);
    }

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
                            textColor: "#C686ED",
                        },
                        ...fertilePeriod,   //易孕期
                        ...markedDates,     //選擇日期
                        ...markedPeriod,    //本次經期
                        ...prePeriodMarked, //歷史紀錄經期
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
