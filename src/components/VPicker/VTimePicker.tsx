// src/components/VPicker/VTimePicker.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import VWheelPicker from './VWheelPicker';
import { useTheme } from '../../theme/ThemeProvider';

const ITEM_HEIGHT = 44;

interface VTimePickerProps {
  value: Date;
  onValueChange: (date: Date) => void;
  mode?: '12h' | '24h';
  showSeconds?: boolean;
  loop?: boolean; // Tambahkan prop loop
}

const VTimePicker: React.FC<VTimePickerProps> = ({
  value,
  onValueChange,
  mode = '24h',
  showSeconds = false,
  loop = true, // Default true untuk loop
}) => {
  const { tw } = useTheme();
  const [selectedHour, setSelectedHour] = useState(
    mode === '12h' ? value.getHours() % 12 || 12 : value.getHours()
  );
  const [selectedMinute, setSelectedMinute] = useState(value.getMinutes());
  const [selectedSecond, setSelectedSecond] = useState(value.getSeconds());
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(
    value.getHours() >= 12 ? 'PM' : 'AM'
  );

  // Generate hours
  const hours = useMemo(() => {
    if (mode === '12h') {
      return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0')
      );
    }
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  }, [mode]);

  // Generate minutes and seconds (00-59)
  const minutes = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
    []
  );
  const seconds = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
    []
  );

  const periods = useMemo(() => ['AM', 'PM'], []);

  const updateDateTime = useCallback(
    (hour: number, minute: number, second: number, period: 'AM' | 'PM') => {
      const newDate = new Date(value);

      if (mode === '12h') {
        let hour24 = hour;
        if (period === 'PM' && hour !== 12) {
          hour24 = hour + 12;
        } else if (period === 'AM' && hour === 12) {
          hour24 = 0;
        }
        newDate.setHours(hour24);
      } else {
        newDate.setHours(hour);
      }

      newDate.setMinutes(minute);
      newDate.setSeconds(second);
      onValueChange(newDate);
    },
    [value, mode, onValueChange]
  );

  const handleHourChange = useCallback(
    (hour: string | number) => {
      const newHour = Number(hour);
      setSelectedHour(newHour);
      updateDateTime(newHour, selectedMinute, selectedSecond, selectedPeriod);
    },
    [selectedMinute, selectedSecond, selectedPeriod, updateDateTime]
  );

  const handleMinuteChange = useCallback(
    (minute: string | number) => {
      const newMinute = Number(minute);
      setSelectedMinute(newMinute);
      updateDateTime(selectedHour, newMinute, selectedSecond, selectedPeriod);
    },
    [selectedHour, selectedSecond, selectedPeriod, updateDateTime]
  );

  const handleSecondChange = useCallback(
    (second: string | number) => {
      const newSecond = Number(second);
      setSelectedSecond(newSecond);
      updateDateTime(selectedHour, selectedMinute, newSecond, selectedPeriod);
    },
    [selectedHour, selectedMinute, selectedPeriod, updateDateTime]
  );

  const handlePeriodChange = useCallback(
    (period: string | number) => {
      const newPeriod = period as 'AM' | 'PM';
      setSelectedPeriod(newPeriod);
      updateDateTime(selectedHour, selectedMinute, selectedSecond, newPeriod);
    },
    [selectedHour, selectedMinute, selectedSecond, updateDateTime]
  );

  return (
    <View style={tw.style('relative')}>
      {/* Selection Highlight Bar */}
      <View
        style={[
          tw.style('absolute left-0 right-0 bg-primary-50 rounded-lg'),
          // eslint-disable-next-line react-native/no-inline-styles
          {
            top: 88,
            height: ITEM_HEIGHT,
            pointerEvents: 'none',
            zIndex: -1,
          },
        ]}
      />

      {/* Pickers */}
      <View style={tw.style('flex-row')}>
        {/* Hour Picker */}
        <VWheelPicker
          data={hours}
          selectedValue={selectedHour.toString().padStart(2, '0')}
          onValueChange={handleHourChange}
          style={tw.style('flex-1')}
          loop={loop}
        />

        {/* Separator */}
        {/* <View style={tw.style('justify-center items-center w-4 h-44')}>
          <Text style={tw.style('text-2xl font-bold text-gray-400')}>:</Text>
        </View> */}

        {/* Minute Picker */}
        <VWheelPicker
          data={minutes}
          selectedValue={selectedMinute.toString().padStart(2, '0')}
          onValueChange={handleMinuteChange}
          style={tw.style('flex-1')}
          loop={loop}
        />

        {showSeconds && (
          <>
            {/* Separator */}
            {/* <View style={tw.style('justify-center items-center w-4 h-44')}>
              <Text style={tw.style('text-2xl font-bold text-gray-400')}>
                :
              </Text>
            </View> */}

            {/* Second Picker */}
            <VWheelPicker
              data={seconds}
              selectedValue={selectedSecond.toString().padStart(2, '0')}
              onValueChange={handleSecondChange}
              style={tw.style('flex-1')}
              loop={loop}
            />
          </>
        )}

        {mode === '12h' && (
          <>
            {/* Spacer */}
            <View style={tw.style('w-2')} />

            {/* Period Picker (AM/PM) - No loop */}
            <VWheelPicker
              data={periods}
              selectedValue={selectedPeriod}
              onValueChange={handlePeriodChange}
              style={tw.style('flex-1')}
              loop={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default VTimePicker;
