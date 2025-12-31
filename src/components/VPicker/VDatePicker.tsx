// src / components / VPicker / VDatePicker.tsx;
import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import VWheelPicker from './VWheelPicker';
import tw from '../../utils/tw';

const ITEM_HEIGHT = 44;

interface VDatePickerProps {
  value: Date;
  onValueChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const VDatePicker: React.FC<VDatePickerProps> = ({
  value,
  onValueChange,
  minimumDate,
  maximumDate,
}) => {
  const [selectedDay, setSelectedDay] = useState(value.getDate());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Generate days based on selected month and year
  const days = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear]);

  // Generate years (current year ± 100 years)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = minimumDate?.getFullYear() ?? currentYear - 100;
    const endYear = maximumDate?.getFullYear() ?? currentYear + 100;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, [minimumDate, maximumDate]);

  const handleDayChange = (day: string | number) => {
    const newDay = Number(day);
    setSelectedDay(newDay);
    const newDate = new Date(selectedYear, selectedMonth, newDay);
    onValueChange(newDate);
  };

  const handleMonthChange = (_month: string | number, index: number) => {
    setSelectedMonth(index);
    // Adjust day if it exceeds the new month's days
    const daysInNewMonth = new Date(selectedYear, index + 1, 0).getDate();
    const adjustedDay = Math.min(selectedDay, daysInNewMonth);
    setSelectedDay(adjustedDay);
    const newDate = new Date(selectedYear, index, adjustedDay);
    onValueChange(newDate);
  };

  const handleYearChange = (year: string | number) => {
    const newYear = Number(year);
    setSelectedYear(newYear);
    // Adjust day if it exceeds the new year's month days
    const daysInMonth = new Date(newYear, selectedMonth + 1, 0).getDate();
    const adjustedDay = Math.min(selectedDay, daysInMonth);
    setSelectedDay(adjustedDay);
    const newDate = new Date(newYear, selectedMonth, adjustedDay);
    onValueChange(newDate);
  };

  return (
    <View style={tw.style('relative')}>
      {/* Selection Highlight Bar */}
      <View
        style={[
          tw.style('absolute left-0 right-0 bg-primary-50 rounded-lg'),
          // eslint-disable-next-line react-native/no-inline-styles
          {
            top: 88, // (220 - 44) / 2
            height: ITEM_HEIGHT,
          },
        ]}
        pointerEvents="none"
      />

      {/* Pickers */}
      <View style={tw.style('flex-row')}>
        {/* Day Picker */}
        <VWheelPicker
          data={days}
          selectedValue={selectedDay}
          onValueChange={handleDayChange}
          style={tw.style('flex-1')}
        />

        {/* Month Picker */}
        <VWheelPicker
          data={months}
          selectedValue={months[selectedMonth] ?? 'January'}
          onValueChange={handleMonthChange}
          style={tw.style('flex-2')}
        />

        {/* Year Picker */}
        <VWheelPicker
          data={years}
          selectedValue={selectedYear}
          onValueChange={handleYearChange}
          style={tw.style('flex-1')}
        />
      </View>
    </View>
  );
};

export default VDatePicker;
