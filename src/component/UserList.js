import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates'; // Import the DatePickerModal
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MyComponent = () => {
    //   const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(null); // 儲存開始日期
    const [endDate, setEndDate] = useState(null); // 儲存結束日期
    const [dates, setDates] = useState([]); // Store selected date range here

    //   const onDismiss = () => {
    //     setOpen(false);
    //   };

    const onConfirm = (selectedDates) => {
        setStartDate(selectedDates[0]);
        setEndDate(selectedDates[1]);
        // setOpen(false);
    };

    return (
        <>
            {/* <Button onPress={() => setOpen(true)}>Select Date Range</Button> */}
            <DatePickerModal
                locale="en" // Set the desired locale
                mode="range" // Specify that it's a range picker
                visible={true}
                // onDismiss={onDismiss}
                startDate={startDate}
                endDate={endDate}
                onConfirm={onConfirm}
                label="Select period" // Optional: Customize the label
                startLabel="From" // Optional: Customize the start label
                endLabel="To" // Optional: Customize the end label
                animationType="slide" // Optional: Set animation type (slide on iOS/Android, none on web)
                startYear={2000} // Optional: Set the start year
                endYear={2100} // Optional: Set the end year
                closeIcon="close" // Optional: Customize the close icon
                presentationStyle='formSheet'
            />
        </>
    );
};

export default MyComponent;