import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Navigation from './src/navigation/index';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';

// import { Provider } from 'react-redux';
// import { DarkModeProvider } from './src/darkMode/DarkModeContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // 模擬一個加載過程
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3秒後結束加載
  }, []);
  
  return (
    // <DarkModeProvider>

    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {isLoading?<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <LottieView source={require("./src/json/loadingAnimation.json")} style={{ width: 300, height: 300 }} loop autoPlay />
        </View>:<Navigation />}
      </Provider>
    </SafeAreaView>

    // </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
