// src/components/VCalendarRangePickerInput/VCalendarRangePickerInput.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { Calendar, X } from 'lucide-react-native';
import VInput from './VInput';
import VDrawer from '../VDrawer/VDrawer';
import { useTheme } from '../../theme/ThemeProvider';
import VCalendarRange from '../VPicker/VCalendarRange';

dayjs.locale('id');

export interface VCalendarRangePickerInputProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  placeholder?: string;
  format?: string;
  separator?: string; // separator between dates (default: ' - ')
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  drawerTitle?: string;
}

const VCalendarRangePickerInput: React.FC<VCalendarRangePickerInputProps> = ({
  startDate,
  endDate,
  onChange,
  placeholder = 'Pilih rentang tanggal',
  format = 'DD MMM YYYY',
  separator = ' - ',
  minDate,
  maxDate,
  label,
  error = false,
  errorMessage,
  disabled = false,
  clearable = true,
  drawerTitle = 'Pilih Rentang Tanggal',
}) => {
  const { tw } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: startDate || null,
    endDate: endDate || null,
  });

  const displayValue =
    selectedDates.startDate && selectedDates.endDate
      ? `${dayjs(selectedDates.startDate).format(format)}${separator}${dayjs(
          selectedDates.endDate
        ).format(format)}`
      : selectedDates.startDate
      ? dayjs(selectedDates.startDate).format(format)
      : '';

  const handleDateChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setSelectedDates(dates);
  };

  const handleConfirm = () => {
    // Only confirm if both dates are selected
    if (selectedDates.startDate && selectedDates.endDate) {
      onChange?.(selectedDates);
      setDrawerVisible(false);
    }
  };

  const handleClear = () => {
    setSelectedDates({ startDate: null, endDate: null });
    onChange?.({ startDate: null, endDate: null });
  };

  const handleCancel = () => {
    setSelectedDates({
      startDate: startDate || null,
      endDate: endDate || null,
    });
    setDrawerVisible(false);
  };

  // Check if selection is complete
  const isSelectionComplete = selectedDates.startDate && selectedDates.endDate;

  return (
    <View>
      {/* Label */}
      {label && (
        <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>{label}</Text>
      )}

      {/* Input Field */}
      <TouchableOpacity
        onPress={() => !disabled && setDrawerVisible(true)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <VInput
          value={displayValue}
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          error={error}
          prefix={<Calendar size={20} color={tw.color('gray-500')} />}
          suffix={
            clearable && (selectedDates.startDate || selectedDates.endDate) ? (
              <TouchableOpacity onPress={handleClear} hitSlop={10}>
                <X size={20} color={tw.color('gray-500')} />
              </TouchableOpacity>
            ) : undefined
          }
          style={tw.style(disabled && 'opacity-50')}
        />
      </TouchableOpacity>

      {/* Error Message */}
      {error && errorMessage && (
        <Text style={tw`text-xs text-danger-600 mt-1`}>{errorMessage}</Text>
      )}

      {/* Drawer with Calendar Range */}
      <VDrawer
        visible={drawerVisible}
        onClose={handleCancel}
        title={drawerTitle}
        scrollable={false}
        bottomAction={
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              onPress={handleCancel}
              style={tw`flex-1 py-3 rounded-lg border border-gray-300`}
              activeOpacity={0.7}
            >
              <Text style={tw`text-center font-semibold text-gray-700`}>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              disabled={!isSelectionComplete}
              style={tw.style(
                'flex-1 py-3 rounded-lg',
                isSelectionComplete ? 'bg-primary-500' : 'bg-gray-300'
              )}
              activeOpacity={0.7}
            >
              <Text
                style={tw.style(
                  'text-center font-semibold',
                  isSelectionComplete ? 'text-white' : 'text-gray-500'
                )}
              >
                Pilih
              </Text>
            </TouchableOpacity>
          </View>
        }
      >
        <VCalendarRange
          startDate={selectedDates.startDate}
          endDate={selectedDates.endDate}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </VDrawer>
    </View>
  );
};

export default VCalendarRangePickerInput;
