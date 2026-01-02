// src/components/VDatePickerInput/VDatePickerInput.tsx
import { forwardRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Calendar } from 'lucide-react-native';
import VDrawer from '../VDrawer/VDrawer';
import VButton from '../VButton/VButton';
import VDatePicker from '../VPicker/VDatePicker';
import type { VInputProps } from './VInput';
import VInput from './VInput';
import { useTheme } from '../../theme/ThemeProvider';

export interface VDatePickerInputProps
  extends Omit<VInputProps, 'value' | 'onChangeText'> {
  value?: Date;
  onValueChange?: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  format?: 'short' | 'medium' | 'long';
  drawerTitle?: string;
  cancelText?: string;
  confirmText?: string;
}

const VDatePickerInput = forwardRef<any, VDatePickerInputProps>(
  (
    {
      value = new Date(),
      onValueChange,
      minimumDate,
      maximumDate,
      format = 'medium',
      drawerTitle = 'Select Date',
      // cancelText = 'Cancel',
      confirmText = 'Done',
      placeholder = 'Select date',
      error,
      ...inputProps
    },
    ref
  ) => {
    const { tw } = useTheme();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [tempDate, setTempDate] = useState(value);

    const formatDate = (date: Date): string => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const monthShort = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      switch (format) {
        case 'short':
          return `${day}/${date.getMonth() + 1}/${year}`;
        case 'medium':
          return `${day} ${monthShort} ${year}`;
        case 'long':
          return `${day} ${month} ${year}`;
        default:
          return `${day} ${monthShort} ${year}`;
      }
    };

    const displayValue = value ? formatDate(value) : '';

    const handleOpen = () => {
      setTempDate(value);
      setIsDrawerVisible(true);
    };

    const handleClose = () => {
      setIsDrawerVisible(false);
    };

    // const handleCancel = () => {
    //   setTempDate(value);
    //   handleClose();
    // };

    const handleConfirm = () => {
      onValueChange?.(tempDate);
      handleClose();
    };

    const handleDateChange = (date: Date) => {
      setTempDate(date);
    };

    return (
      <>
        <Pressable onPress={handleOpen}>
          <VInput
            ref={ref}
            value={displayValue}
            placeholder={placeholder}
            editable={false}
            pointerEvents="none"
            error={error}
            suffix={
              <Calendar
                size={20}
                color={error ? tw.color('danger-500') : tw.color('gray-400')}
              />
            }
            {...inputProps}
          />
        </Pressable>

        <VDrawer
          visible={isDrawerVisible}
          onClose={handleClose}
          title={drawerTitle}
          scrollable={false}
          // Di VDatePickerInput, ganti bottomAction menjadi:
          bottomAction={
            <VButton variant="standard" onPress={handleConfirm}>
              <Text style={tw.style('text-base font-semibold text-white')}>
                {confirmText}
              </Text>
            </VButton>
          }
        >
          <VDatePicker
            value={tempDate}
            onValueChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        </VDrawer>
      </>
    );
  }
);

VDatePickerInput.displayName = 'VDatePickerInput';

export default VDatePickerInput;
