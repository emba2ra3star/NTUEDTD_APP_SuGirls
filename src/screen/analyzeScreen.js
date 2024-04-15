import React from 'react';
import { Pressable, View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

// import { myStyle } from '../darkMode/style';
// import { useDarkMode } from '../darkMode/DarkModeContext';

const screenWidth = Dimensions.get('window').width;
const Cycledata = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
            data: [28, 29, 30, 27, 28]
        }
    ]
};
const Perioddata = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
            data: [5, 5, 6, 6, 5]
        }
    ]
};
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
const AnalyzeScreen = () => {
    const { navigate } = useNavigation();
    // const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
    return (
        // <View style={[{alignItems: 'center'},myStyle.container, isDarkModeEnabled && myStyle.darkModeContainer]}>
        // <View style={[{alignItems: 'center'},myStyle.container]}>
        <View style={{ alignItems: 'center', backgroundColor: "white" }}>
            <View style={{ width: "100%", paddingHorizontal: "5%" }}>
                {/* <Text style={{ fontSize: 14, justifyContent: "flex-start" , color: isDarkModeEnabled ? "white" : "black"}}>距離下次經期：</Text> */}
                <Text style={{ fontSize: 14, justifyContent: "flex-start", color: "black" }}>距離下次經期：</Text>
                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 40, color: "#FF795C" }}>{day}</Text>
                    {/* <Text style={{ fontSize: 15, color: "#000000", marginTop: 30 , color: isDarkModeEnabled ? "white" : "black"}}>天</Text> */}
                    <Text style={{ fontSize: 15, color: "#000000", marginTop: 30, color: "black" }}>天</Text>
                </View>
                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                    {/* <Text style={{ fontSize: 12 , color: isDarkModeEnabled ? "white" : "black"}}>2024年5月3日</Text> */}
                    <Text style={{ fontSize: 12, color: "black" }}>2024年5月3日</Text>
                </View>
                <View style={{margin:30}}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Group%2097.png?raw=true" }} style={{ width: "100%",height:11 }}></Image>
                </View>
            </View>
            <Pressable onPress={() => navigate('stack科普文章')} style={{ backgroundColor: "#FFD5B8", opacity: 0.9, width: "90%", height: 65, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                <View >
                    <Text>
                        Article
                    </Text>
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

    )
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
    }
});

export default AnalyzeScreen;
