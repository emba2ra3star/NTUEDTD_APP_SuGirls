import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import { myStyle } from '../darkMode/style';
// import { useDarkMode } from '../darkMode/DarkModeContext';
export default function MyCalendar() {

    // const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
    const calendarContainerStyle = {
        // backgroundColor: isDarkModeEnabled ? '#333333' : 'white'
    };
    return (

        <View style={{ width: "100%", marginTop: 5 }}>
            <View style={{ flexDirection: "row", marginLeft: "2%" }}>
                <Image style={{}} source={require('../../assets/img/Vector.png')} />
                <Text style={{ paddingLeft: 5 }}>2024</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8, borderBottomWidth: 3, borderBottomColor: '#ffd5b8' }}>
                {/* <Text style={{ color: "#ffb673" }}>日</Text>
                <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>一</Text>
                <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>二</Text>
                <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>三</Text>
                <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>四</Text>
                <Text style={{ color: isDarkModeEnabled ? "white" : "black" }}>五</Text>
                <Text style={{ color: "#ffb673" }}>六</Text> */}
                <Text style={{ color: "#ffb673" }}>日</Text>
                <Text style={{ color:"black" }}>一</Text>
                <Text style={{ color:"black" }}>二</Text>
                <Text style={{ color:"black" }}>三</Text>
                <Text style={{ color:"black" }}>四</Text>
                <Text style={{ color:"black" }}>五</Text>
                <Text style={{ color: "#ffb673" }}>六</Text>
            </View>

            <View style={{ paddingHorizontal: "2%" }}>
                <Calendar
                    current={'2024-03-20'} // 初始显示的日期
                    minDate={'2024-01-01'} // 允许选择的最早日期
                    maxDate={'2024-12-31'} // 允许选择的最晚日期
                    onDayPress={(day) => { console.log('selected day', day) }} // 选择日期时触发的回调
                    markingType="period"
                    markedDates={{
                        // '2024-03-26': { selected: true, marked: true, selectedColor: '#EE7B7B' }, // 标记特定日期
                        // '2024-03-27': { marked: true },
                        // '2024-03-28': { disabled: true }

                        '2024-03-24': { startingDay: true, color: 'green' },
                        '2024-03-27': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
                        '2024-03-30': { disabled: true, startingDay: true, color: 'green', endingDay: true }

                    }}
                    theme={{
                        //backgroundImage: "https://raw.githubusercontent.com/emba2ra3star/NTUEDTD_APP_SuGirls/main/assets/Group%2098.png",
                        textSectionTitleColor: '#b6c1cd', // 顶部月份文字颜色
                        textMonthFontWeight: 'bold', // 月份文字的粗细
                        textMonthFontSize: 20, // 月份文字的大小
                        todayTextColor: '#00adf5', // 当天文字颜色
                        calendarBackground: 'rgba(255,255,255,0.3)',
                        dayTextColor: 'black'
                    }}

                    hideExtraDays={true}
                    hideDayNames={true}
                    style={[calendarContainerStyle, styles.calendar]}
                // renderHeader={}???
                />

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_period.png?raw=true" }} style={styles.calendarIcon} />
                        {/* <Text style={{ marginHorizontal: 5, color: isDarkModeEnabled ? "white" : "black" }}>經期</Text> */}
                        <Text style={{ marginHorizontal: 5, color:"black" }}>經期</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_today.png?raw=true" }} style={styles.calendarIcon} />
                        {/* <Text style={{ marginHorizontal: 5, color: isDarkModeEnabled ? "white" : "black" }}>今日</Text> */}
                        <Text style={{ marginHorizontal: 5, color:"black" }}>今日</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_predict.png?raw=true" }} style={styles.calendarIcon} />
                        {/* <Text style={{ marginHorizontal: 5, color: isDarkModeEnabled ? "white" : "black" }}>預估經期</Text> */}
                        <Text style={{ marginHorizontal: 5, color:"black" }}>預估經期</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_eggday.png?raw=true" }} style={styles.calendarIcon} />
                        {/* <Text style={{ marginHorizontal: 5, color: isDarkModeEnabled ? "white" : "black" }}>排卵日</Text> */}
                        <Text style={{ marginHorizontal: 5, color:"black" }}>排卵日</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_calendar/Icon_egg.png?raw=true" }} style={{ width: 22, height: 11, marginTop: 3 }} />
                        {/* <Text style={{ marginHorizontal: 5, color: isDarkModeEnabled ? "white" : "black" }}>排卵期 </Text> */}
                        <Text style={{ marginHorizontal: 5, color:"black" }}>排卵期 </Text>
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
