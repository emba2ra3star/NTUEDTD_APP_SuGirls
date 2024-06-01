import React, { useState, useEffect } from 'react';
import { Pressable, View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {
    LineChart,
    BarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { selectColorMode } from "../redux/darkModeSlice";
import EventEmitter from 'eventemitter3';   //需安裝 npm install eventemitter3

export const eventEmitter = new EventEmitter(); //監聽函式

let selectedMonth;
let monthdata = [0]; // 宣告 monthdata

export const updatedata = (month, start, end) => {
    selectedMonth = month;
    monthdata[month] = [start, end];
    eventEmitter.emit('dataUpdated');   //觸發dataUpdated事件 發出一個訊號
};

const initialCycledata = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
            data: [28, 29, 30, 27, 28]
        }
    ]
};

const initialPerioddata = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
            data: [5, 5, 6, 6, 5]
        }
    ]
};

const screenWidth = Dimensions.get('window').width;

const graphStyle = {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginLeft: -60,
    paddingTop: -5,
};

const LinegraphStyle = {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginLeft: -20,
    paddingTop: -5
};

const chartConfig = {
    backgroundGradientFrom: "#FFEEE1",
    backgroundGradientTo: "#FFEEE1",
    color: (opacity = 1) => `rgba(255, 138, 130,${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.8,
    decimalPlaces: 0,
    barRadius: 10
};

let day = 21;
let text="距離下次經期：";
let predictdaysText = "2024年5月3日"

const AnalyzeScreen = () => {
    const { navigate } = useNavigation();
    const colorMode = useSelector(selectColorMode);
    const dispatch = useDispatch();

    const [Cycledata, setCycledata] = useState(initialCycledata);
    const [Perioddata, setPerioddata] = useState(initialPerioddata);

    useEffect(() => {
        const handleDataUpdated = () => {
            console.log("觸發")
            updateGraphs();
        };

        eventEmitter.on('dataUpdated', handleDataUpdated);//當收到dataUpdated訊號 觸發handleDataUpdated

        return () => {
            eventEmitter.off('dataUpdated', handleDataUpdated);//關掉接收器 等待下一個訊號接收
        };
    }, []);
    const updateGraphs = () => {
        Cyclelabels();
        Periodlabels();
        Predict();
    };
    // 週期的標籤函式
    const monthofyear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysofmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const Cyclelabels = () => {
        let FiveMonthData = ((selectedMonth - 5) + 12) % 12 + 1;
        let count = 0;
        let newLabels = [];
        let newData = [];
        for (let i = FiveMonthData; count < 5; i++, count++) {
            i = (i - 1) % 12 + 1;
            let lastmonth = (i - 1) == 0 ? 12 : (i - 1);//前一個月
            newLabels.push(monthofyear[i - 1]);
            if (monthdata[i] !== undefined && monthdata[lastmonth] !== undefined) {
                if (monthdata[lastmonth][0] > monthdata[lastmonth][1]) {    //代表前一個月的endday是有跨到這個月的
                    newData.push((monthdata[i][0]) - monthdata[lastmonth][1]);//假如上一筆4/1(尾)~這一筆4/20(頭)(算式:(20-1)=19(天))
                }
                else {//正常情況
                    // 前一個月的天數的[index] - 前一個月的endday + 這一個月的startday
                    // (daysofmonth[(i-1)-1)] - monthdata[lastmonth][1] + (monthdata[i][0])
                    newData.push((daysofmonth[(i - 1) - 1] - monthdata[lastmonth][1]) + (monthdata[i][0])); // 假如3/30(尾)~4/20(頭)(算式:(31-30)+20=21(天)) (monthdata[i][0]為這個月的startday，monthdata[i-1][1]為前一個月的endday。)
                }

            } else {
                newData.push(0);
            }
        }
        setCycledata(prevData => ({ // 當每次更新labels時，都會即時更新圖表
            ...prevData,
            labels: newLabels,
            datasets: [{ data: newData }]
        }));
    };
    // 經期天數的標籤函式
    const Periodlabels = () => {
        let FiveMonthData = ((selectedMonth - 5) + 12) % 12 + 1;
        let count = 0;
        let newLabels = [];
        let newData = [];
        for (let i = FiveMonthData; count < 5; i++, count++) {
            i = (i - 1) % 12 + 1;
            newLabels.push(monthofyear[i - 1]);
            if (monthdata[i] !== undefined) {
                newData.push(monthdata[i][1] - monthdata[i][0] + 1);
            } else {
                newData.push(0);
            }
        }
        setPerioddata(prevData => ({
            ...prevData,
            labels: newLabels,
            datasets: [{ data: newData }]
        }));
    };

    // 倒數天數函式
    const today = new Date();
    let thisday = today.getDate();
    let month = today.getMonth() + 1; // January is 0!
    month = parseInt(month, 10);    //parseInt將字串轉變為10進制的整數
    thisday = parseInt(thisday, 10);

    const Predict = () => {
        let predictdays = 0;
        if (monthdata[selectedMonth] !== undefined) {
            if (selectedMonth + 1 < month) {
                let days = 0;
                for (let j = selectedMonth + 1; j < month - 1; j++) {
                    days = daysofmonth[j] + days;
                }
                predictdays = -(thisday + (daysofmonth[selectedMonth] - ((monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1])) + days);
            }
            else if(selectedMonth + 1 == month && (monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1] <= 0){    // 選擇5月，預期在5月
                predictdays = -(thisday + (daysofmonth[selectedMonth - 1] - (monthdata[selectedMonth][0] + 28)));
            }
            else if(selectedMonth + 1 == month && (monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1] > 0){     // 選擇5月，預期在6月
                if(thisday > (monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1]){  // 預期在今天之前
                    predictdays = -(thisday - ((monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1]));
                }
                else{   //預期在今天之後
                    predictdays = (((monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1] - thisday));
                }
            }
            else if(selectedMonth + 1 > month ){  //選擇在同月
                if (((monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1]) >= thisday) {    //預期超過今天但還在同個月份
                    predictdays = (((monthdata[selectedMonth][0] + 28)- daysofmonth[selectedMonth - 1]) - thisday);
                }
                else {  //預期跨月
                    predictdays = ((daysofmonth[selectedMonth - 1] - thisday) + ((monthdata[selectedMonth][0] + 28) - daysofmonth[selectedMonth - 1]));
                }
            }
            temp = (monthdata[selectedMonth][0] + 28);  // 預測日期 temp/daysofmonth[selectedMonth - 1]是否超過月份日期  Math.floor->除法取整數
            predictdaysText  = "2024年"+(selectedMonth+Math.floor((temp-1)/daysofmonth[selectedMonth - 1]))+"月"+((temp-1)%daysofmonth[selectedMonth - 1]+1)+"日";
            if(predictdays>=0){
                text="距離下次經期："
                day = predictdays;
            }
            else{
                text="已經超過："
                day = -predictdays;
            }
        }
    }
    return (
        <ScrollView>
            <View style={{ alignItems: 'center', backgroundColor: colorMode === "light" ? "#333333" : "white" }}>
                <View style={{ width: "100%", paddingHorizontal: "5%" }}>
                    <Text style={{ fontSize: 18, justifyContent: "flex-start", color: colorMode === "light" ? "white" : "black" }}>{text}</Text>
                    <View style={{ justifyContent: "center", flexDirection: "row" }}>
                        <Text style={{ fontSize: 40, color: "#ff795c"}}>{day}</Text>
                        <Text style={{ fontSize: 15, marginTop: 30, color: colorMode === "light" ? "white" : "black" }}>天</Text>
                    </View>
                    <View style={{ justifyContent: "center", flexDirection: "row" }}>
                        <Text style={{ fontSize: 16, color: colorMode === "light" ? "white" : "black" }}>{predictdaysText}</Text>
                    </View>
                    <View style={{ margin: 30 }}>
                        <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Group%2097.png?raw=true" }} style={{ width: "100%", height: 11 }} />
                    </View>

                    <View style={[styles.directionRow, { marginHorizontal: 30, marginBottom: 10 }]}>
                        <View style={[styles.directionRow, { marginRight: 15 }]}>
                            <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_analyze/Ellipse%2010.png?raw=true" }} style={{ width: 10, height: 10 }} />
                            <Text style={{ color: colorMode === "light" ? "white" : "black" }}>今日</Text>
                        </View>
                        <View style={[styles.directionRow, { marginRight: 15 }]}>
                            <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_analyze/Rectangle%2032.png?raw=true" }} style={{ width: 26, height: 9 }} />
                            <Text style={{ color: colorMode === "light" ? "white" : "black" }}>生理期</Text>
                        </View>
                        <View style={[styles.directionRow, { marginRight: 15 }]}>
                            <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_analyze/Rectangle%2031.png?raw=true" }} style={{ width: 26, height: 9 }} />
                            <Text style={{ color: colorMode === "light" ? "white" : "black" }}>易孕期</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={() => navigate('stack科普文章')} style={{ backgroundColor: "#FFD5B8", opacity: 0.9, width: "90%", height: 65, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                    <View>
                        <Text>Article</Text>
                    </View>
                </Pressable>

                <View style={styles.container}>
                    <Text style={styles.charttitle}>週期長度</Text>
                    <BarChart
                        style={graphStyle}
                        data={Cycledata}
                        width={screenWidth}
                        height={165}
                        yAxisLabel=""
                        withHorizontalLabels={false}
                        chartConfig={chartConfig}
                        fromZero
                        segments={4}
                        fromNumber={40}
                        withInnerLines={false}
                        showValuesOnTopOfBars={true}
                        showBarTops={false}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.charttitle}>經期長度</Text>
                    <LineChart
                        style={LinegraphStyle}
                        data={Perioddata}
                        width={screenWidth}
                        height={165}
                        yAxisLabel=""
                        withHorizontalLabels={false}
                        chartConfig={chartConfig}
                        fromZero
                        segments={4}
                        fromNumber={20}
                        withInnerLines={false}
                        showValuesOnTopOfBars={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wholeScreen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },
    container: {
        width: "90%",
        alignItems: 'center',
        backgroundColor: "#FFEEE1",
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden', // 使阴影效果生效
        marginTop: "3%"
    },
    charttitle: {
        fontSize: 14,
        marginTop: 20,
        alignItems: "center"
    },
    directionRow: { flexDirection: "row", alignItems: "center" }
});

export default AnalyzeScreen;
