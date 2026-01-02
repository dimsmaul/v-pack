import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCalendarPickerInput } from 'v-pack';

const ExampleCalendarInput: React.FC = () => {
  const { tw } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Calendar Input
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VCalendarPickerInput
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Pilih tanggal"
        />

        {/* With Label */}
        <VCalendarPickerInput
          label="Tanggal Lahir"
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Pilih tanggal lahir"
        />

        {/* With Min/Max Date */}
        <VCalendarPickerInput
          label="Tanggal Booking"
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()} // Today
          maxDate={new Date(2026, 11, 31)} // End of 2026
          placeholder="Pilih tanggal booking"
        />

        {/* With Custom Format */}
        <VCalendarPickerInput
          value={selectedDate}
          onChange={setSelectedDate}
          format="DD/MM/YYYY" // Custom format
          placeholder="DD/MM/YYYY"
        />

        {/* With Error */}
        <VCalendarPickerInput
          label="Tanggal"
          value={selectedDate}
          onChange={setSelectedDate}
          error={true}
          errorMessage="Tanggal harus diisi"
        />

        {/* Disabled */}
        <VCalendarPickerInput
          value={selectedDate}
          onChange={setSelectedDate}
          disabled={true}
        />

        {/* Not Clearable */}
        <VCalendarPickerInput
          value={selectedDate}
          onChange={setSelectedDate}
          clearable={false}
        />

        {/* Custom Drawer Title */}
        <VCalendarPickerInput
          value={selectedDate}
          onChange={setSelectedDate}
          drawerTitle="Pilih Tanggal Keberangkatan"
        />
      </View>
    </View>
  );
};

export default ExampleCalendarInput;
