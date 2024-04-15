import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectColorMode } from "../redux/darkModeSlice";
const ArticleScreen = () => {
    const colorMode = useSelector(selectColorMode);
    return (
        <View style={[styles.container,{backgroundColor:colorMode === "light"?"#333333":"white"}]}>
            <Image source={{ uri: `https://raw.githubusercontent.com/emba2ra3star/NTUEDTD_APP_SuGirls/main/assets/img/image%2014.png` }} style={{ width: "100%", height: 185 }} />
            <Text style={[styles.articletext ,{color: colorMode === "light"?"white":"black"}]}>人類的黃體期長度約在十到十六天之間，平均為十四天。如果黃體期時間太短，受孕可能會比較困難。每個女性的黃體期長度會因個體差異而有所不同，但同一個女性每次月經週期的黃體期大約會比較一致。</Text>
            <Image />
            <View style={{marginVertical:8,alignContent:"center",justifyContent:"center"}}>
                <Text style={[styles.articletext2,{color: colorMode === "light"?"white":"black"}]}>■什麼是濾泡期？     ■什麼是排卵日？</Text>
                <Text style={[styles.articletext2,{color: colorMode === "light"?"white":"black"}]}>■什麼是黃體期？</Text>
            </View>
            <Text style={[styles.articletext,{color: colorMode === "light"?"white":"black"}]}>1.濾泡期：這是月經來潮後到排卵日之間的階段。在此期間，卵巢的濾泡發育並產生雌激素。</Text>
            <Text style={[styles.articletext,{color: colorMode === "light"?"white":"black"}]}>排卵日：成熟的濾泡會排卵，此時雌激素濃度上升，也帶動黃體生成素急速上升，讓卵子成熟後排卵。</Text>
            <Text style={[styles.articletext,{color: colorMode === "light"?"white":"black"}]}>黃體期：排卵後，濾泡轉變為黃體組織，生成黃體激素（孕酮），也製造雌激素。黃體期的主要功能是為子宮內膜做胚胎植入的準備，等待受精卵的著床。</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        justifyContent:"center",
        alignItems:"center",
    },
    articletitle: {
        fontSize: 16
    },
    articletext: {
        fontSize: 14,
        lineHeight: 30,
       
    },
    articletext2: {
        fontSize: 16,
        lineHeight: 30,
    }
})

export default ArticleScreen;
