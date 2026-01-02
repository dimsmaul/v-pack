import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCalendarRange } from 'v-pack';
import dayjs from 'dayjs';

const ExampleCalendarRange: React.FC = () => {
  const { tw } = useTheme();
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        CalendarRange
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VCalendarRange
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={(dates) => {
            console.log('Range changed:', dates);
            setDateRange(dates);
          }}
          // Optional: set restrictions
          // minDate={new Date()}
          // maxDate={new Date(2026, 11, 31)}
          // singleMonthView={true}
        />

        {dateRange.startDate && dateRange.endDate && (
          <View
            style={tw`mt-4 p-4 rounded-lg bg-success-50 border border-success-200`}
          >
            <Text style={tw`text-sm font-semibold text-success-800 mb-2`}>
              Range Terpilih:
            </Text>
            <Text style={tw`text-xs text-success-700`}>
              {dayjs(dateRange.startDate).format('DD MMMM YYYY')} -{' '}
              {dayjs(dateRange.endDate).format('DD MMMM YYYY')}
            </Text>
            <Text style={tw`text-xs text-success-600 mt-1`}>
              Total:{' '}
              {dayjs(dateRange.endDate).diff(
                dayjs(dateRange.startDate),
                'day'
              ) + 1}{' '}
              hari
            </Text>
          </View>
        )}
        {/* TODO: Replace with an actual calendarRange component like react-native-calendarRanges */}
      </View>
    </View>
  );
};

export default ExampleCalendarRange;
