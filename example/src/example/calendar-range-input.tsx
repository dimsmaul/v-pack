import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCalendarRangePickerInput } from 'v-pack';
import dayjs from 'dayjs';

const ExampleCalendarRangeInput: React.FC = () => {
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
        CalendarRange Input
      </Text>
      <View style={tw`p-4 gap-3`}>
        {/* Basic */}
        <VCalendarRangePickerInput
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
          placeholder="Pilih rentang tanggal"
        />

        {/* With Label */}
        <VCalendarRangePickerInput
          label="Periode Laporan"
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
          placeholder="Pilih periode"
        />

        {/* With Custom Format & Separator */}
        <VCalendarRangePickerInput
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
          format="DD/MM/YYYY"
          separator=" s/d "
          placeholder="DD/MM/YYYY s/d DD/MM/YYYY"
        />

        {/* With Min/Max Date */}
        <VCalendarRangePickerInput
          label="Periode Booking"
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
          minDate={new Date()}
          maxDate={new Date(2026, 11, 31)}
          placeholder="Pilih periode booking"
        />

        {/* With Error */}
        <VCalendarRangePickerInput
          label="Periode"
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
          error={!dateRange.startDate || !dateRange.endDate}
          errorMessage="Periode harus diisi lengkap"
        />

        {/* Display Selected Range */}
        {dateRange.startDate && dateRange.endDate && (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: '#F0F9FF',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 14, color: '#1E40AF' }}>
              Periode terpilih: {dayjs(dateRange.startDate).format('DD MMM')} -{' '}
              {dayjs(dateRange.endDate).format('DD MMM YYYY')}
            </Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
              Total:{' '}
              {dayjs(dateRange.endDate).diff(
                dayjs(dateRange.startDate),
                'day'
              ) + 1}{' '}
              hari
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ExampleCalendarRangeInput;
