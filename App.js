import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyCalendar from "./src/component/calendar";

export default function App() {
  return (
    <View style={styles.container}>
      <MyCalendar />
      <Text>{MyCalendar.dayOfWeekNames}</Text>
    </View>
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
