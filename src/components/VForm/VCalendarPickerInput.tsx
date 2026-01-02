// src/components/VCalendarPickerInput/VCalendarPickerInput.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { Calendar, X } from 'lucide-react-native';
import VInput from './VInput';
import VDrawer from '../VDrawer/VDrawer';
import VCalendar from '../VPicker/VCalendar';
import { useTheme } from '../../theme/ThemeProvider';

dayjs.locale('id');

export interface VCalendarPickerInputProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  format?: string; // date format (default: 'DD MMMM YYYY')
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  drawerTitle?: string;
}

const VCalendarPickerInput: React.FC<VCalendarPickerInputProps> = ({
  value,
  onChange,
  placeholder = 'Pilih tanggal',
  format = 'DD MMMM YYYY',
  minDate,
  maxDate,
  label,
  error = false,
  errorMessage,
  disabled = false,
  clearable = true,
  drawerTitle = 'Pilih Tanggal',
}) => {
  const { tw } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const displayValue = selectedDate ? dayjs(selectedDate).format(format) : '';

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    onChange?.(selectedDate);
    setDrawerVisible(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const handleCancel = () => {
    setSelectedDate(value || null);
    setDrawerVisible(false);
  };

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
            clearable && selectedDate ? (
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

      {/* Drawer with Calendar */}
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
              style={tw`flex-1 py-3 rounded-lg bg-primary-500`}
              activeOpacity={0.7}
            >
              <Text style={tw`text-center font-semibold text-white`}>
                Pilih
              </Text>
            </TouchableOpacity>
          </View>
        }
      >
        <VCalendar
          selectedDate={selectedDate || undefined}
          onDateSelect={handleDateSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      </VDrawer>
    </View>
  );
};

export default VCalendarPickerInput;
