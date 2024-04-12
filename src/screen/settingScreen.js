import { StyleSheet } from "react-native";
import { Image, ScrollView, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingScreen = () => {
    const { navigate } = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => navigate('stack使用教學')}>
                <Text style={{ fontSize: 18 }}>使用教學</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create(
    {

    }
);

export default SettingScreen;