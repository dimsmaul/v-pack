import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  PanResponder,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type VSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  showMinMax?: boolean;
  trackColor?: string;
  activeTrackColor?: string;
  thumbColor?: string;
  containerStyle?: ViewStyle;
};

export default function VSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = min,
  onChange,
  onChangeEnd,
  disabled = false,
  showValue = true,
  showMinMax = false,
  trackColor,
  activeTrackColor,
  thumbColor,
  containerStyle,
}: VSliderProps) {
  const { tw } = useTheme();
  const [sliderWidth, setSliderWidth] = useState(0);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = controlledValue ?? internalValue;

  // Calculate position from value
  const getPositionFromValue = useCallback(
    (val: number) => {
      if (sliderWidth === 0) return 0;
      const percentage = (val - min) / (max - min);
      return percentage * sliderWidth;
    },
    [min, max, sliderWidth]
  );

  // Calculate value from position
  const getValueFromPosition = useCallback(
    (position: number) => {
      if (sliderWidth === 0) return min;
      const percentage = Math.max(0, Math.min(1, position / sliderWidth));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    },
    [min, max, step, sliderWidth]
  );

  const updateValueFromPosition = useCallback(
    (position: number) => {
      const newValue = getValueFromPosition(position);
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [getValueFromPosition, onChange]
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          return !disabled;
        },
        onMoveShouldSetPanResponder: () => {
          return !disabled;
        },
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          if (disabled || sliderWidth === 0) return;
          const position = evt.nativeEvent.locationX;
          updateValueFromPosition(position);
        },
        onPanResponderMove: (evt: GestureResponderEvent) => {
          if (disabled || sliderWidth === 0) return;
          const position = evt.nativeEvent.locationX;
          updateValueFromPosition(position);
        },
        onPanResponderRelease: () => {
          if (!disabled) {
            onChangeEnd?.(value);
          }
        },
      }),
    [disabled, sliderWidth, updateValueFromPosition, value, onChangeEnd]
  );

  const thumbPosition = getPositionFromValue(value);
  const activeTrackWidth = thumbPosition;

  return (
    <View style={[tw`w-full`, containerStyle]}>
      {/* Value Display */}
      {showValue && (
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Value: {value}
          </Text>
        </View>
      )}

      {/* Slider Track */}
      <View
        style={tw.style(
          `relative justify-center`,
          { width: '100%', height: 40 },
          disabled ? 'opacity-50' : ''
        )}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          if (width > 0) {
            setSliderWidth(width);
          }
        }}
        {...panResponder.panHandlers}
      >
        {/* Background Track */}
        <View
          style={tw.style(
            `absolute h-2 rounded-full`,
            { width: '100%' },
            trackColor ? { backgroundColor: trackColor } : tw`bg-gray-300`
          )}
        />

        {/* Active Track */}
        <View
          style={tw.style(
            `absolute h-2 rounded-full`,
            { width: activeTrackWidth },
            activeTrackColor
              ? { backgroundColor: activeTrackColor }
              : tw`bg-primary-500`
          )}
        />

        {/* Thumb */}
        <View
          pointerEvents="none"
          style={tw.style(
            `absolute w-6 h-6 rounded-full shadow-lg`,
            thumbColor
              ? { backgroundColor: thumbColor }
              : tw`bg-white border-2 border-primary-500`,
            {
              left: thumbPosition - 12,
            }
          )}
        />
      </View>

      {/* Min/Max Labels */}
      {showMinMax && (
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-500 text-sm`}>{min}</Text>
          <Text style={tw`text-gray-500 text-sm`}>{max}</Text>
        </View>
      )}
    </View>
  );
}
