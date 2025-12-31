// src/components/VCheckbox/VCheckbox.tsx
import { forwardRef } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import tw from '../../utils/tw';
import { Check } from 'lucide-react-native';

export interface VCheckboxProps extends Omit<PressableProps, 'onPress'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  type?: 'checkbox' | 'radio';
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

const iconSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
};

const radioInnerSizeMap = {
  sm: 10,
  md: 12,
  lg: 16,
};

const VCheckbox = forwardRef<View, VCheckboxProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      size = 'md',
      variant = 'primary',
      type = 'checkbox',
      style,
      ...props
    },
    ref
  ) => {
    const boxSize = sizeMap[size];
    const iconSize = iconSizeMap[size];
    const radioInnerSize = radioInnerSizeMap[size];

    const handlePress = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    const isRadio = type === 'radio';

    return (
      <Pressable
        ref={ref as any}
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => {
          const baseStyle = tw.style(
            'border-2 items-center justify-center',
            // Border radius based on type
            isRadio ? 'rounded-full' : 'rounded',
            // Radio button - always white background with border
            isRadio && 'bg-white',
            // Radio border colors
            isRadio &&
              !disabled &&
              variant === 'primary' &&
              'border-primary-500',
            isRadio &&
              !disabled &&
              variant === 'secondary' &&
              'border-secondary-500',
            isRadio &&
              !disabled &&
              variant === 'success' &&
              'border-success-500',
            isRadio && !disabled && variant === 'danger' && 'border-danger-500',
            isRadio && disabled && 'border-gray-300',
            // Checkbox checked state styles
            !isRadio &&
              checked &&
              !disabled &&
              variant === 'primary' &&
              'bg-primary-500 border-primary-500',
            !isRadio &&
              checked &&
              !disabled &&
              variant === 'secondary' &&
              'bg-secondary-500 border-secondary-500',
            !isRadio &&
              checked &&
              !disabled &&
              variant === 'success' &&
              'bg-success-500 border-success-500',
            !isRadio &&
              checked &&
              !disabled &&
              variant === 'danger' &&
              'bg-danger-500 border-danger-500',
            // Checkbox unchecked state
            !isRadio && !checked && !disabled && 'bg-white border-gray-300',
            // Checkbox disabled states
            !isRadio && disabled && checked && 'bg-gray-300 border-gray-300',
            !isRadio && disabled && !checked && 'bg-gray-100 border-gray-300',
            // Pressed state
            pressed && !disabled && 'opacity-80'
          );

          return [
            baseStyle,
            { width: boxSize, height: boxSize } as ViewStyle,
            style,
          ] as unknown as ViewStyle;
        }}
        {...props}
      >
        {checked && (
          <>
            {isRadio ? (
              // Radio inner circle (filled)
              <View
                style={[
                  tw.style(
                    'rounded-full',
                    !disabled && variant === 'primary' && 'bg-primary-500',
                    !disabled && variant === 'secondary' && 'bg-secondary-500',
                    !disabled && variant === 'success' && 'bg-success-500',
                    !disabled && variant === 'danger' && 'bg-danger-500',
                    disabled && 'bg-gray-400'
                  ),
                  {
                    width: radioInnerSize,
                    height: radioInnerSize,
                  },
                ]}
              />
            ) : (
              // Checkbox check icon
              <Check
                size={iconSize}
                color={disabled ? tw.color('gray-500') : 'white'}
                strokeWidth={3}
              />
            )}
          </>
        )}
      </Pressable>
    );
  }
);

VCheckbox.displayName = 'VCheckbox';

export default VCheckbox;
