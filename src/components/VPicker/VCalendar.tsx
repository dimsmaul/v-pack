// Calendar.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/id'; // optional: untuk bahasa Indonesia
import tw from '../../utils/tw';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

dayjs.extend(localeData);
dayjs.locale('id'); // optional: set ke bahasa Indonesia

export interface VCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const WEEK_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const VCalendar: React.FC<VCalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
}) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    dayjs(selectedDate || new Date())
  );

  const calendarData = useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    // const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.day(); // 0 = Sunday
    const daysInMonth = currentDate.daysInMonth();
    const daysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();

    // Previous month days
    const prevMonthDays = Array.from(
      { length: startDay },
      (_, i) => daysInPrevMonth - startDay + i + 1
    );

    // Current month days
    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

    // Next month days to fill the grid
    const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from(
      { length: remainingDays },
      (_, i) => i + 1
    );

    return { prevMonthDays, currentMonthDays, nextMonthDays };
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleDatePress = (day: number, type: 'prev' | 'current' | 'next') => {
    let newDate: Dayjs;

    if (type === 'prev') {
      newDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      newDate = currentDate.add(1, 'month').date(day);
    } else {
      newDate = currentDate.date(day);
    }

    // Check min/max date restrictions
    if (minDate && newDate.isBefore(dayjs(minDate), 'day')) return;
    if (maxDate && newDate.isAfter(dayjs(maxDate), 'day')) return;

    onDateSelect?.(newDate.toDate());
    if (type !== 'current') {
      setCurrentDate(newDate);
    }
  };

  const isDateSelected = (day: number, type: 'prev' | 'current' | 'next') => {
    if (!selectedDate) return false;

    const selected = dayjs(selectedDate);
    let checkDate: Dayjs;

    if (type === 'prev') {
      checkDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      checkDate = currentDate.add(1, 'month').date(day);
    } else {
      checkDate = currentDate.date(day);
    }

    return checkDate.isSame(selected, 'day');
  };

  const isToday = (day: number) => {
    return (
      currentDate.date(day).isSame(dayjs(), 'day') &&
      currentDate.isSame(dayjs(), 'month')
    );
  };

  const isDisabled = (day: number, type: 'prev' | 'current' | 'next') => {
    let checkDate: Dayjs;

    if (type === 'prev') {
      checkDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      checkDate = currentDate.add(1, 'month').date(day);
    } else {
      checkDate = currentDate.date(day);
    }

    if (minDate && checkDate.isBefore(dayjs(minDate), 'day')) return true;
    if (maxDate && checkDate.isAfter(dayjs(maxDate), 'day')) return true;
    return false;
  };

  return (
    <View style={tw`bg-white rounded-lg p-4`}>
      {/* Header - Month/Year Navigation */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <TouchableOpacity
          onPress={handlePreviousMonth}
          style={tw`p-2 rounded-lg bg-gray-200`}
          activeOpacity={0.7}
        >
          {/* <Text style={tw`text-gray-800 text-lg font-semibold`}>←</Text> */}
          <ChevronLeft style={tw`text-gray-800 `} />
        </TouchableOpacity>

        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>
            {currentDate.format('MMMM')}
          </Text>
          <Text style={tw`text-lg font-bold text-primary-600`}>
            {currentDate.format('YYYY')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleNextMonth}
          style={tw`p-2 rounded-lg bg-gray-200`}
          activeOpacity={0.7}
        >
          <ChevronRight style={tw`text-gray-800 `} />
        </TouchableOpacity>
      </View>

      {/* Week Days Header */}
      <View style={tw`flex-row mb-2`}>
        {WEEK_DAYS.map((day, index) => (
          <View key={index} style={tw`flex-1 items-center py-2`}>
            <Text style={tw`text-xs font-semibold text-secondary-600`}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={tw`gap-1`}>
        {/* Render calendar in rows of 7 */}
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <View key={weekIndex} style={tw`flex-row gap-1`}>
            {Array.from({ length: 7 }, (_a, dayIndex) => {
              const totalIndex = weekIndex * 7 + dayIndex;
              const { prevMonthDays, currentMonthDays } = calendarData;

              let day: number;
              let type: 'prev' | 'current' | 'next';

              if (totalIndex < prevMonthDays.length) {
                // Previous month
                day = prevMonthDays[totalIndex]!;
                type = 'prev';
              } else if (
                totalIndex <
                prevMonthDays.length + currentMonthDays.length
              ) {
                // Current month
                day = currentMonthDays[totalIndex - prevMonthDays.length]!;
                type = 'current';
              } else {
                // Next month
                day =
                  calendarData.nextMonthDays[
                    totalIndex - prevMonthDays.length - currentMonthDays.length
                  ]!;
                type = 'next';
              }

              const selected = isDateSelected(day, type);
              const today = type === 'current' && isToday(day);
              const disabled = isDisabled(day, type);

              return (
                <TouchableOpacity
                  key={dayIndex}
                  onPress={() => handleDatePress(day, type)}
                  disabled={disabled}
                  style={tw.style(
                    'flex-1 aspect-square items-center justify-center rounded-lg',
                    selected && 'bg-primary-500',
                    today && !selected && 'border-2 border-primary-500',
                    disabled && 'opacity-30'
                  )}
                  activeOpacity={0.7}
                >
                  <Text
                    style={tw.style(
                      'text-base',
                      type !== 'current' && !selected && 'text-secondary-400',
                      type === 'current' && !selected && 'text-gray-900',
                      selected && 'bg-primary-500 text-white font-bold',
                      today && !selected && 'text-primary-600 font-bold'
                    )}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default VCalendar;
