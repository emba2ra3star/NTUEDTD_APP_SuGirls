import { StyleSheet } from "react-native";
import { Image, ScrollView, Text, View } from "react-native";
import { myStyle } from '../darkMode/style';
import { useDarkMode } from '../darkMode/DarkModeContext';
const TeachScreen=()=>{
    const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
    return (
        <ScrollView style={ [myStyle.container, isDarkModeEnabled && myStyle.darkModeContainer] }>
            <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>【首頁】</Text>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>1.經期設定：個人化設定經期與週期長度</Text>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%205.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>經期長度：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>更改經期開始至結束的時間長度，改變預設標記時長。</Text>
                    </View>
                </View>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%206.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>週期長度：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>更改上次經期結束到下次開始的時間，改變每次經期的間隔時長。</Text>
                    </View>
                </View>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%207.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>自動推算：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>經期第一天開始時，自動往後計算、標記到經期結束。</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginHorizontal: 20 }}>
                <Text style={[styles.articletext,{color: isDarkModeEnabled ? "white" : "black"}]}>2.通知設定</Text>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%208.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>經期開始/結束通知：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>於預估經期開始時間的前3天開始通知。</Text>
                    </View>
                </View>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%2011.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>紀錄通知：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>定時提醒使用者打開APP記錄身體狀況。</Text>
                    </View>
                </View>

                <View style={styles.Direction_row}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/img/Icon_teachScreen/image%2010.png?raw=true" }} style={styles.directions_img} resizeMode="contain" />
                    <View style={styles.marginTop_10}>
                        <Text style={{color: isDarkModeEnabled ? "white" : "black"}}>身體狀態通知：</Text>
                        <Text style={[styles.directions_text,{color: isDarkModeEnabled ? "white" : "black"}]}>推算目前使用者的身體狀態(黃體期、易孕期...)，並進行通知。</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create(
    {
        Direction_row: { flexDirection: "row",alignItems:"flex-start", flex:1,justifyItems:"center"},
        marginTop_10: { marginTop: 10 },
        directions_text:{ width:"50%",flexWrap: "wrap"},
        directions_img:{ width: "50%", aspectRatio: 1, marginRight: 10, marginVertical: -20 }
    }
);

export default TeachScreen;
