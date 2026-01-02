/**
 * FIXME: This component still can't run properly
 */

// src/components/VSlider/VSlider.tsx
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  PanResponder,
  Animated,
  type ViewProps,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  //   type PanResponderGestureState,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface VSliderProps extends Omit<ViewProps, 'onLayout'> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const VSlider = forwardRef<View, VSliderProps>(
  (
    {
      value = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      variant = 'primary',
      style,
      ...props
    },
    forwardedRef
  ) => {
    const { tw } = useTheme();
    const [sliderWidth, setSliderWidth] = useState(0);
    const containerRef = useRef<View | null>(null);
    const trackRef = useRef<View | null>(null);

    // Track current value internally
    const [currentValue, setCurrentValue] = useState(value);

    // Thumb scale for touch feedback
    const thumbScale = useRef(new Animated.Value(1)).current;

    const normalizedValue = Math.max(min, Math.min(max, currentValue));
    const percentage = ((normalizedValue - min) / (max - min)) * 100;

    // Sync internal state with prop
    React.useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const updateValueFromLocation = useCallback(
      (locationX: number) => {
        if (sliderWidth === 0) return;

        // Clamp locationX to slider bounds
        const clampedX = Math.max(0, Math.min(sliderWidth, locationX));
        const ratio = clampedX / sliderWidth;
        const rawValue = min + ratio * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const newValue = Math.max(min, Math.min(max, steppedValue));

        setCurrentValue(newValue);
        onValueChange?.(newValue);
      },
      [sliderWidth, min, max, step, onValueChange]
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,

        onPanResponderGrant: (evt: GestureResponderEvent) => {
          // Scale up thumb
          Animated.spring(thumbScale, {
            toValue: 1.3,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
          }).start();

          // Update value from touch location
          updateValueFromLocation(evt.nativeEvent.locationX);
        },

        onPanResponderMove: (evt: GestureResponderEvent) => {
          // Update value from current touch location
          updateValueFromLocation(evt.nativeEvent.locationX);
        },

        onPanResponderRelease: () => {
          Animated.spring(thumbScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
          }).start();
        },

        onPanResponderTerminate: () => {
          Animated.spring(thumbScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
          }).start();
        },
      })
    ).current;

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setSliderWidth(width);
    }, []);

    const variantColors = {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      danger: 'bg-danger-500',
    };

    const colorClass = disabled ? 'bg-gray-300' : variantColors[variant];

    return (
      <View
        ref={(ref) => {
          containerRef.current = ref as View | null;
          if (typeof forwardedRef === 'function') {
            forwardedRef(ref as View | null);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<View | null>).current =
              ref as View | null;
          }
        }}
        style={[tw`w-full py-3`, style]}
        {...props}
      >
        <View
          ref={trackRef as any}
          style={tw`relative h-2 rounded-full bg-gray-200`}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          {/* Progress bar */}
          <View
            pointerEvents="none"
            style={[
              tw`absolute h-full rounded-full ${colorClass}`,
              { width: `${percentage}%` },
            ]}
          />

          {/* Thumb */}
          <Animated.View
            pointerEvents="none"
            style={[
              tw`absolute w-6 h-6 rounded-full shadow-lg border-2 border-white ${colorClass}`,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                top: '50%',
                marginTop: -12,
                left: `${percentage}%`,
                marginLeft: -12,
                transform: [{ scale: thumbScale }],
              },
            ]}
          />
        </View>
      </View>
    );
  }
);

VSlider.displayName = 'VSlider';

export default VSlider;
