import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCalendar } from 'v-pack';

const ExampleCalendar: React.FC = () => {
  const { tw } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate1, setSelectedDate1] = useState<Date>(new Date());
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Calendar
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VCalendar
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
          }}
        />
        <Text>Selected date: {selectedDate.toDateString()}</Text>

        <VCalendar
          selectedDate={selectedDate1}
          onDateSelect={(date) => {
            setSelectedDate1(date);
          }}
          minDate={new Date('2025-12-10')}
          maxDate={new Date('2026-01-10')}
        />
        <Text>Selected date: {selectedDate1.toDateString()}</Text>
        {/* TODO: Replace with an actual calendar component like react-native-calendars */}
      </View>
    </View>
  );
};

export default ExampleCalendar;
