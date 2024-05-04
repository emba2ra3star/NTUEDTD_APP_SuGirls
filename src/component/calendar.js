import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { selectColorMode } from '../redux/darkModeSlice';
import { tr } from 'react-native-paper-dates';


export default function MyCalendar({ periodIsEnable }) {
    // darkMode
    const colorMode = useSelector(selectColorMode);

    // mark selectDay
    const [markedDates, setMarkedDates] = useState({});
    const handleDayPress = (day) => {
        const { dateString } = day;
        // 清除updateDay
        const updatedMarkedDates = {}
        // 設定updateDay
        updatedMarkedDates[dateString] = { startingDay: true, endingDay: true, color: '#EE7B7B' };
        // 渲染
        setMarkedDates(updatedMarkedDates);

        const x = Boolean(periodIsEnable);
        if (x) {
            console.log(`setPeriod,${x}`);
            setPeriod(day);
        }
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
            console.log("1");
        } else if (!endDate) { // 如果结束日期还没有选择，则将选择的日期设为结束日期
            if(dateString<startDate){//如果選擇日期比startDate小則會重新選擇startDate
                setStartDate(dateString);
                console.log("2-1");
            }
            else{
                setEndDate(dateString);
                markPeriod(startDate, dateString);// 标记开始日期到结束日期之间的日期为周期
                console.log("2-2");
            }
        } else { // 如果开始日期和结束日期都已经选择，则重置选择
            console.log("clear");
            setStartDate(dateString);
            setEndDate(null);
            setMarkedPeriod({});
            console.log("3");
        }
        
    };

    // 标记开始日期到结束日期之间的日期为周期
    const markPeriod = (start, end) => {
        const marked = {};
        marked[start] = { startingDay: true, endingDay: false, color: '#FFC197' };
        marked[end] = { startingDay: false, endingDay: true, color: '#FFC197' };

        let currentDate = getNextDate(start);
        while (currentDate < end) {
            marked[currentDate] = { startingDay: false, endingDay: false, color: '#FFC197' };
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



    return (
        <View style={{ width: "100%", marginTop: 5 }}>
            <View style={{ flexDirection: "row", marginLeft: "2%" }}>
                <Image source={require('../../assets/img/Vector.png')} />
                <Text style={{ paddingLeft: 5, color: colorMode === "light" ? "white" : "black" }}>2024</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8, borderBottomWidth: 3, borderBottomColor: '#ffd5b8' }}>
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
                    onDayPress={(day) => { handleDayPress(day) }} // 选择日期时触发的回调
                    markingType="period"
                    markedDates={{
                        ...markedDates,
                        ...markedPeriod,
                    }}
                    theme={{
                        //backgroundImage: "https://raw.githubusercontent.com/emba2ra3star/NTUEDTD_APP_SuGirls/main/assets/Group%2098.png",
                        textSectionTitleColor: 'white', // 顶部月份文字颜色
                        textMonthFontWeight: 'bold', // 月份文字的粗细
                        textMonthFontSize: 20, // 月份文字的大小
                        todayTextColor: '#00adf5', // 当天文字颜色
                        calendarBackground: 'rgba(255,255,255,0.2)',
                        dayTextColor: 'black'
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
