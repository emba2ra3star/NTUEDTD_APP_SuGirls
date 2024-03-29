import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import MyCalendar from "./src/component/calendar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MyCalendar />
      <Text>{MyCalendar.dayOfWeekNames}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
