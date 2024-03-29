import React from 'react';
import { View, Text, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MyCalendar() {
    return (
        <View style={{ flex: 1, width: "100%", marginTop: 5, paddingHorizontal: "2%" }}>
            <View style={{ flexDirection: "row" }}>
                <Image style={{}} source={require('../../assets/img/Vector.png')} />
                <Text style={{ paddingLeft: 5 }}>2024</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8, borderBottomWidth: 3, borderBottomColor: '#ffd5b8' }}>
                <Text style={{ color: "#ffb673" }}>日</Text>
                <Text>一</Text>
                <Text>二</Text>
                <Text>三</Text>
                <Text>四</Text>
                <Text>五</Text>
                <Text style={{ color: "#ffb673" }}>六</Text>
            </View>

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
                    backgroundImage:"https://raw.githubusercontent.com/emba2ra3star/NTUEDTD_APP_SuGirls/main/assets/Group%2098.png",
                    textSectionTitleColor: '#b6c1cd', // 顶部月份文字颜色
                    textMonthFontWeight: 'bold', // 月份文字的粗细
                    textMonthFontSize: 20, // 月份文字的大小
                    todayTextColor: '#00adf5', // 当天文字颜色
                }}

                hideExtraDays={true}
                hideDayNames={true}
            // renderHeader={}
            />

        </View>
    );
}
