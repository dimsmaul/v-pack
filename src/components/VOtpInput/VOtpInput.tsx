import { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  type ViewStyle,
  type TextInputProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type VOtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  focusedInputStyle?: ViewStyle;
  errorInputStyle?: ViewStyle;
  error?: boolean;
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
};

export default function VOtpInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  secureTextEntry = false,
  autoFocus = true,
  containerStyle,
  inputStyle,
  focusedInputStyle,
  errorInputStyle,
  error = false,
  inputProps,
}: VOtpInputProps) {
  const { tw } = useTheme();
  const [otp, setOtp] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : -1);
  const inputRefs = useRef<Array<TextInput | any>>([]);

  // Update internal state when value prop changes from outside
  useEffect(() => {
    setOtp(value);
  }, [value]);

  const handleChange = useCallback(
    (text: string, index: number) => {
      // Only allow numbers
      const sanitized = text.replace(/[^0-9]/g, '');

      if (sanitized.length === 0) {
        // Handle delete
        const newOtp = otp.split('');
        newOtp[index] = '';
        const newOtpString = newOtp.join('');
        setOtp(newOtpString);
        onChange?.(newOtpString);

        // Move to previous input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        return;
      }

      // Handle paste (multiple digits)
      if (sanitized.length > 1) {
        const digits = sanitized.slice(0, length).split('');
        const newOtp = otp.split('');

        digits.forEach((digit, i) => {
          const targetIndex = index + i;
          if (targetIndex < length) {
            newOtp[targetIndex] = digit;
          }
        });

        const newOtpString = newOtp.join('');
        setOtp(newOtpString);
        onChange?.(newOtpString);

        // Focus last filled or next empty
        const nextIndex = Math.min(index + digits.length, length - 1);
        inputRefs.current[nextIndex]?.focus();

        // Check if complete
        if (newOtpString.length === length) {
          onComplete?.(newOtpString);
        }
        return;
      }

      // Handle single digit
      const newOtp = otp.split('');
      newOtp[index] = sanitized;
      const newOtpString = newOtp.join('');
      setOtp(newOtpString);
      onChange?.(newOtpString);

      // Auto-focus next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if complete
      if (newOtpString.length === length) {
        onComplete?.(newOtpString);
        inputRefs.current[index]?.blur();
      }
    },
    [otp, length, onChange, onComplete]
  );

  const handleKeyPress = useCallback(
    (e: any, index: number) => {
      const key = e.nativeEvent?.key || (e as any).key;
      if (key === 'Backspace' && !otp[index] && index > 0) {
        // If current is empty and backspace, go to previous
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  return (
    <View style={[tw`flex-row gap-2`, containerStyle]}>
      {Array.from({ length }).map((_, index) => {
        const isFocused = focusedIndex === index;
        const hasValue = !!otp[index];

        return (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref as any;
              }
            }}
            value={otp[index] || ''}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="number-pad"
            maxLength={1}
            secureTextEntry={secureTextEntry}
            editable={!disabled}
            autoFocus={autoFocus && index === 0}
            selectTextOnFocus
            style={[
              tw`w-12 h-14 text-center text-xl font-semibold rounded-lg border-2`,
              disabled
                ? tw`bg-gray-100 text-gray-400`
                : tw`bg-white text-gray-900`,
              error
                ? tw`border-danger-500`
                : isFocused
                ? tw`border-primary-500`
                : hasValue
                ? tw`border-gray-400`
                : tw`border-gray-300`,
              inputStyle,
              isFocused && focusedInputStyle,
              error && errorInputStyle,
              // eslint-disable-next-line react-native/no-inline-styles
              Platform.OS === 'ios' && {
                lineHeight: 25,
              },
              Platform.OS === 'android' && {
                textAlignVertical: 'center' as const,
              },
            ]}
            {...inputProps}
          />
        );
      })}
    </View>
  );
}
