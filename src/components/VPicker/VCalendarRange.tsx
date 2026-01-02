// VCalendarRange.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/id';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.locale('id');

export interface VCalendarRangeProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  minDate?: Date;
  maxDate?: Date;
  singleMonthView?: boolean;
}

const WEEK_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const VCalendarRange: React.FC<VCalendarRangeProps> = ({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  singleMonthView = false,
}) => {
  const { tw } = useTheme();
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    dayjs(startDate || new Date())
  );
  const [selectingStart, setSelectingStart] = useState(true);

  const calendarData = useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = currentDate.daysInMonth();
    const daysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();

    const prevMonthDays = Array.from(
      { length: startDay },
      (_, i) => daysInPrevMonth - startDay + i + 1
    );

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

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

    const clickedDate = newDate.toDate();

    // Range selection logic
    if (!startDate || (startDate && endDate) || selectingStart) {
      // Start new selection
      onChange?.({
        startDate: clickedDate,
        endDate: null,
      });
      setSelectingStart(false);
    } else {
      // Selecting end date
      if (newDate.isBefore(dayjs(startDate), 'day')) {
        // If clicked date is before start, reset and make it new start
        onChange?.({
          startDate: clickedDate,
          endDate: null,
        });
        setSelectingStart(false);
      } else {
        // Valid end date
        onChange?.({
          startDate: startDate,
          endDate: clickedDate,
        });
        setSelectingStart(true);
      }
    }

    // Auto-navigate to clicked month if needed
    if (type !== 'current' && !singleMonthView) {
      setCurrentDate(newDate);
    }
  };

  const isDateInRange = (day: number, type: 'prev' | 'current' | 'next') => {
    if (!startDate || !endDate) return false;

    let checkDate: Dayjs;

    if (type === 'prev') {
      checkDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      checkDate = currentDate.add(1, 'month').date(day);
    } else {
      checkDate = currentDate.date(day);
    }

    return checkDate.isBetween(dayjs(startDate), dayjs(endDate), 'day', '()');
  };

  const isStartDate = (day: number, type: 'prev' | 'current' | 'next') => {
    if (!startDate) return false;

    let checkDate: Dayjs;

    if (type === 'prev') {
      checkDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      checkDate = currentDate.add(1, 'month').date(day);
    } else {
      checkDate = currentDate.date(day);
    }

    return checkDate.isSame(dayjs(startDate), 'day');
  };

  const isEndDate = (day: number, type: 'prev' | 'current' | 'next') => {
    if (!endDate) return false;

    let checkDate: Dayjs;

    if (type === 'prev') {
      checkDate = currentDate.subtract(1, 'month').date(day);
    } else if (type === 'next') {
      checkDate = currentDate.add(1, 'month').date(day);
    } else {
      checkDate = currentDate.date(day);
    }

    return checkDate.isSame(dayjs(endDate), 'day');
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

  const handleClearDates = () => {
    onChange?.({ startDate: null, endDate: null });
    setSelectingStart(true);
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
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
          <ChevronLeft style={tw`text-gray-800`} />
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
          <ChevronRight style={tw`text-gray-800`} />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={tw`flex-row gap-2 mb-3`}>
        <TouchableOpacity
          onPress={handleToday}
          style={tw`flex-1 py-2 px-3 rounded-lg bg-primary-50 border border-primary-200`}
          activeOpacity={0.7}
        >
          <Text style={tw`text-center text-sm font-semibold text-primary-700`}>
            Hari Ini
          </Text>
        </TouchableOpacity>

        {(startDate || endDate) && (
          <TouchableOpacity
            onPress={handleClearDates}
            style={tw`flex-1 py-2 px-3 rounded-lg bg-danger-50 border border-danger-200`}
            activeOpacity={0.7}
          >
            <Text style={tw`text-center text-sm font-semibold text-danger-700`}>
              Reset
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selected Range Info */}
      {startDate && (
        <View
          style={tw`mb-3 p-3 rounded-lg bg-primary-50 border border-primary-100`}
        >
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xs text-secondary-600 mb-1`}>Dari</Text>
              <Text style={tw`text-sm font-bold text-primary-700`}>
                {dayjs(startDate).format('DD MMM YYYY')}
              </Text>
            </View>

            {endDate && (
              <>
                <ArrowRight style={tw`text-primary-400 mx-2`} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xs text-secondary-600 mb-1`}>
                    Sampai
                  </Text>
                  <Text style={tw`text-sm font-bold text-primary-700`}>
                    {dayjs(endDate).format('DD MMM YYYY')}
                  </Text>
                </View>
              </>
            )}
          </View>

          {startDate && endDate && (
            <View style={tw`mt-2 pt-2 border-t border-primary-200`}>
              <Text style={tw`text-xs text-secondary-600`}>
                {dayjs(endDate).diff(dayjs(startDate), 'day') + 1} hari dipilih
              </Text>
            </View>
          )}
        </View>
      )}

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
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <View key={weekIndex} style={tw`flex-row gap-1`}>
            {Array.from({ length: 7 }, (_a, dayIndex) => {
              const totalIndex = weekIndex * 7 + dayIndex;
              const { prevMonthDays, currentMonthDays } = calendarData;

              let day: number;
              let type: 'prev' | 'current' | 'next';

              if (totalIndex < prevMonthDays.length) {
                day = prevMonthDays[totalIndex]!;
                type = 'prev';
              } else if (
                totalIndex <
                prevMonthDays.length + currentMonthDays.length
              ) {
                day = currentMonthDays[totalIndex - prevMonthDays.length]!;
                type = 'current';
              } else {
                day =
                  calendarData.nextMonthDays[
                    totalIndex - prevMonthDays.length - currentMonthDays.length
                  ]!;
                type = 'next';
              }

              const start = isStartDate(day, type);
              const end = isEndDate(day, type);
              const inRange = isDateInRange(day, type);
              const today = type === 'current' && isToday(day);
              const disabled = isDisabled(day, type);

              return (
                <TouchableOpacity
                  key={dayIndex}
                  onPress={() => handleDatePress(day, type)}
                  disabled={disabled}
                  style={tw.style(
                    'flex-1 aspect-square items-center justify-center rounded-lg',
                    (start || end) && 'bg-primary-500',
                    inRange && !start && !end && 'bg-primary-100 ',
                    today &&
                      !start &&
                      !end &&
                      !inRange &&
                      'border-2 border-primary-500',
                    disabled && 'opacity-30'
                  )}
                  activeOpacity={0.7}
                >
                  <Text
                    style={tw.style(
                      'text-base',
                      type !== 'current' &&
                        !start &&
                        !end &&
                        !inRange &&
                        'text-secondary-400',
                      type === 'current' &&
                        !start &&
                        !end &&
                        !inRange &&
                        'text-gray-900',
                      (start || end) && 'text-white font-bold',
                      inRange &&
                        !start &&
                        !end &&
                        'text-primary-700 font-semibold',
                      today &&
                        !start &&
                        !end &&
                        !inRange &&
                        'text-primary-600 font-bold'
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

      {/* Hint text */}
      {!endDate && startDate && (
        <View style={tw`mt-3 p-2 rounded-lg bg-info-50`}>
          <Text style={tw`text-xs text-center text-info-700`}>
            Pilih tanggal akhir untuk melengkapi range
          </Text>
        </View>
      )}
    </View>
  );
};

export default VCalendarRange;
