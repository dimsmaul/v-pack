import { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, type ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type VRatingProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: number;
  disabled?: boolean;
  readOnly?: boolean;
  allowHalf?: boolean;
  showValue?: boolean;
  color?: string;
  emptyColor?: string;
  containerStyle?: ViewStyle;
  iconSpacing?: number;
};

export default function VRating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size = 24,
  disabled = false,
  readOnly = false,
  allowHalf = false,
  showValue = false,
  color,
  emptyColor,
  containerStyle,
  iconSpacing = 4,
}: VRatingProps) {
  const { tw } = useTheme();
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = controlledValue ?? internalValue;

  const handlePress = useCallback(
    (rating: number) => {
      if (disabled || readOnly) return;

      setInternalValue(rating);
      onChange?.(rating);
    },
    [disabled, readOnly, onChange]
  );

  const renderStar = useCallback(
    (index: number) => {
      const starValue = index + 1;
      const halfValue = index + 0.5;

      const isFilled = value >= starValue;
      const isHalfFilled = allowHalf && value >= halfValue && value < starValue;

      const fillColor = color || '#FBBF24'; // yellow-400
      const emptyFillColor = emptyColor || '#D1D5DB'; // gray-300

      return (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(starValue)}
          disabled={disabled || readOnly}
          activeOpacity={0.7}
          style={{ marginHorizontal: iconSpacing / 2 }}
        >
          <View style={tw.style({ position: 'relative' })}>
            {/* Empty star */}
            <Star size={size} color={emptyFillColor} fill={emptyFillColor} />

            {/* Filled star (full or half) */}
            {(isFilled || isHalfFilled) && (
              <View
                style={tw.style({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflow: 'hidden',
                  width: isHalfFilled ? size / 2 : size,
                })}
              >
                <Star size={size} color={fillColor} fill={fillColor} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      value,
      allowHalf,
      size,
      color,
      emptyColor,
      disabled,
      readOnly,
      handlePress,
      iconSpacing,
    ]
  );

  return (
    <View style={[tw`flex-row items-center`, containerStyle]}>
      <View style={tw`flex-row items-center`}>
        {Array.from({ length: max }).map((_, index) => renderStar(index))}
      </View>

      {showValue && (
        <Text
          style={[
            tw`ml-2 font-semibold`,
            disabled ? tw`text-gray-400` : tw`text-gray-700`,
          ]}
        >
          {value.toFixed(allowHalf ? 1 : 0)}
        </Text>
      )}
    </View>
  );
}
