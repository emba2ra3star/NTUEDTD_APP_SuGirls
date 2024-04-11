import { Image, ScrollView, Text, View } from "react-native";



const SettingScreen = () => {
    return (
        <ScrollView>
            <Text>【首頁】</Text>
            <View style={{marginHorizontal:20}}>
                <Text>1.經期設定：個人化設定經期與週期長度</Text>

                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>經期長度：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>更改經期開始至結束的時間長度，改變預設標記時長。</Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>週期長度：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>更改上次經期結束到下次開始的時間，改變每次經期的間隔時長。</Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>自動推算：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>經期第一天開始時，自動往後計算、標記到經期結束。</Text>
                    </View>
                </View>
            </View>

            <View style={{marginHorizontal:20}}>
                <Text>2.通知設定</Text>
                
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>經期開始/結束通知：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>於預估經期開始時間的前3天開始通知。</Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>紀錄通知：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>定時提醒使用者打開APP記錄身體狀況。</Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: "https://github.com/emba2ra3star/NTUEDTD_APP_SuGirls/blob/main/assets/Group%2098.png?raw=true"  }} style={{width:"50%",aspectRatio:1 ,marginRight:10,marginVertical:-20}} resizeMode="contain" />
                    <View style={{marginTop:10}}>
                        <Text>身體狀態通知：</Text>
                        <Text style={{width:"50%" ,flexWrap:"wrap"}}>推算目前使用者的身體狀態(黃體期、易孕期...)，並進行通知。</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

export default SettingScreen;