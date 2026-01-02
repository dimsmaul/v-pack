// src/components/VQuantityInput/VQuantityInput.tsx
import { forwardRef } from 'react';
import {
  View,
  Pressable,
  Text,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface VQuantityInputProps extends Omit<ViewProps, 'children'> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: {
    container: 'h-9',
    width: 100,
    button: 'w-7 h-7',
    text: 'text-sm',
    icon: 16,
  },
  md: {
    container: 'h-11',
    width: 120,
    button: 'w-9 h-9',
    text: 'text-base',
    icon: 18,
  },
  lg: {
    container: 'h-13',
    width: 140,
    button: 'w-10 h-10',
    text: 'text-lg',
    icon: 20,
  },
};

const VQuantityInput = forwardRef<View, VQuantityInputProps>(
  (
    {
      value = 1,
      onValueChange,
      min = 1,
      max = 999,
      step = 1,
      disabled = false,
      showDelete = false,
      onDelete,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const { tw } = useTheme();
    const sizeConfig = sizeMap[size];

    const handleIncrement = () => {
      if (disabled) return;
      const newValue = Math.min(value + step, max);
      onValueChange?.(newValue);
    };

    const handleDecrement = () => {
      if (disabled) return;
      const newValue = Math.max(value - step, min);
      onValueChange?.(newValue);
    };

    const handleDelete = () => {
      if (disabled) return;
      onDelete?.();
    };

    const isMinimum = value <= min;
    const isMaximum = value >= max;
    const canShowDelete = showDelete && isMinimum;

    return (
      <View
        ref={ref as any}
        style={[
          tw`flex-row items-center justify-between rounded-lg bg-white border border-gray-200 px-2`,
          tw.style(sizeConfig.container, disabled && 'opacity-50'),
          { width: sizeConfig.width } as ViewStyle,
          style,
        ]}
        {...props}
      >
        {/* Left Button (Delete or Minus) */}
        <Pressable
          onPress={canShowDelete ? handleDelete : handleDecrement}
          disabled={disabled || (!canShowDelete && isMinimum)}
          style={({ pressed }) =>
            tw.style(
              'items-center justify-center rounded-full',
              sizeConfig.button,
              pressed && !disabled && 'bg-gray-100'
            )
          }
        >
          {canShowDelete ? (
            <Trash2
              size={sizeConfig.icon}
              color={disabled ? tw.color('gray-300') : tw.color('red-500')}
              strokeWidth={2}
            />
          ) : (
            <Minus
              size={sizeConfig.icon}
              color={
                disabled || isMinimum
                  ? tw.color('gray-300')
                  : tw.color('gray-700')
              }
              strokeWidth={2.5}
            />
          )}
        </Pressable>

        {/* Value Display */}
        <View style={tw`flex-1 items-center justify-center`}>
          <Text
            style={tw.style(
              'font-semibold text-gray-900',
              sizeConfig.text,
              disabled && 'text-gray-400'
            )}
          >
            {value}
          </Text>
        </View>

        {/* Plus Button */}
        <Pressable
          onPress={handleIncrement}
          disabled={disabled || isMaximum}
          style={({ pressed }) =>
            tw.style(
              'items-center justify-center rounded-full',
              sizeConfig.button,
              pressed && !disabled && 'bg-gray-100'
            )
          }
        >
          <Plus
            size={sizeConfig.icon}
            color={
              disabled || isMaximum
                ? tw.color('gray-300')
                : tw.color('gray-700')
            }
            strokeWidth={2.5}
          />
        </Pressable>
      </View>
    );
  }
);

VQuantityInput.displayName = 'VQuantityInput';

export default VQuantityInput;
