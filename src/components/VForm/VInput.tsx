import React, { forwardRef, useState } from 'react';
import { View, TextInput, Platform, type TextInputProps } from 'react-native';
import tw from '../../utils/tw';

export interface VInputProps extends TextInputProps {
  variant?: 'outline' | 'underline';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
}

const VInput = forwardRef<any, VInputProps>(
  (
    { variant = 'outline', prefix, suffix, error = false, style, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isOutline = variant === 'outline';

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <View
        style={tw.style(
          'flex-row items-center h-12',
          isOutline && 'border rounded-lg px-3',
          isOutline && !error && !isFocused && 'border-gray-300',
          isOutline && !error && isFocused && 'border-primary-500',
          isOutline && error && 'border-danger-500',
          !isOutline && 'border-b',
          !isOutline && !error && !isFocused && 'border-gray-300',
          !isOutline && !error && isFocused && 'border-primary-500',
          !isOutline && error && 'border-danger-500'
        )}
      >
        {prefix && <View style={tw`mr-3`}>{prefix}</View>}

        <TextInput
          ref={ref}
          {...props}
          style={[
            tw`flex-1 text-base text-gray-900`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              padding: 0,
              paddingVertical: 0,
              paddingHorizontal: 0,
              margin: 0,
              height: '100%',
              textAlignVertical: 'center',
              outlineWidth: 0,
              ...(Platform.OS === 'ios' && {
                lineHeight: 20,
              }),
              ...(Platform.OS === 'android' && {
                textAlignVertical: 'center',
              }),
            },
            style,
          ]}
          placeholderTextColor={tw.color('gray-400')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          underlineColorAndroid="transparent"
        />

        {suffix && <View style={tw`ml-3`}>{suffix}</View>}
      </View>
    );
  }
);

VInput.displayName = 'VInput';

export default VInput;
