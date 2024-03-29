import React from 'react';
import { View,Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MyCalendar() {
    return (
        <View style={{ flex: 1, width: "100%", marginTop:"8%",paddingHorizontal:"2%"}}>
            <View>
                <Text>123</Text>
            </View>
            <View >
                <Calendar
                    // 在此设置月历的属性
                    // 比如initialMonth, minDate, maxDate等等
                    // dayOfWeekNames={['日', '一', '二', '三', '四', '五', '六']}
                    // dayOfWeekFormat={(dayOfWeek) => {
                    //     return dayOfWeek.substr(0, 1); // 仅显示星期的首字母
                    // }}

                    current={'2024-03-22'} // 初始显示的日期
                    minDate={'2024-01-01'} // 允许选择的最早日期
                    maxDate={'2024-12-31'} // 允许选择的最晚日期
                    onDayPress={(day) => { console.log('selected day', day) }} // 选择日期时触发的回调
                    markedDates={{
                        '2024-03-26': { selected: true, marked: true, selectedColor: '#EE7B7B' }, // 标记特定日期
                        '2024-03-27': { marked: true },
                        '2024-03-28': { disabled: true }
                    }}
                />
            </View>
        </View>
    );
}
