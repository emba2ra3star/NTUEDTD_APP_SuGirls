import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";

import Navigation from './src/navigation/index';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      
      
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
