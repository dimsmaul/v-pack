// src/components/VToggle/VToggle.tsx
import { forwardRef, useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import tw from '../../utils/tw';

export interface VToggleProps extends Omit<PressableProps, 'onPress'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const sizeConfig = {
  sm: { width: 36, height: 20, thumb: 16, translate: 16 },
  md: { width: 44, height: 24, thumb: 20, translate: 20 },
  lg: { width: 52, height: 28, thumb: 24, translate: 24 },
};

const VToggle = forwardRef<View, VToggleProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      size = 'md',
      variant = 'primary',
      style,
      ...props
    },
    ref
  ) => {
    const { width, height, thumb, translate } = sizeConfig[size];
    const animation = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(animation, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [checked, animation]);

    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [2, translate],
    });

    const handlePress = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <Pressable
        ref={ref as any}
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => {
          const baseStyle = tw.style(
            'rounded-full justify-center',
            checked && !disabled && variant === 'primary' && 'bg-primary-500',
            checked &&
              !disabled &&
              variant === 'secondary' &&
              'bg-secondary-500',
            checked && !disabled && variant === 'success' && 'bg-success-500',
            checked && !disabled && variant === 'danger' && 'bg-danger-500',
            !checked && !disabled && 'bg-gray-300',
            disabled && 'bg-gray-200',
            pressed && !disabled && 'opacity-80'
          );

          return [
            baseStyle,
            { width, height } as ViewStyle,
            style,
          ] as unknown as ViewStyle;
        }}
        {...props}
      >
        <Animated.View
          style={[
            tw.style('rounded-full bg-white shadow-md'),
            {
              width: thumb,
              height: thumb,
              transform: [{ translateX }],
            },
          ]}
        />
      </Pressable>
    );
  }
);

VToggle.displayName = 'VToggle';

export default VToggle;
