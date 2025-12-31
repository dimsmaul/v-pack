/**
 * FIXME: This is a temporary implementation of VTooltip for React Native.
 */

// src/components/VTooltip/VTooltip.tsx
import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  type ViewProps,
  type ViewStyle,
  type LayoutChangeEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';
import tw from '../../utils/tw';

export interface VTooltipProps extends Omit<ViewProps, 'children'> {
  children: React.ReactNode;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'dark' | 'light';
  disabled?: boolean;
  triggerMode?: 'press' | 'longPress';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VTooltip = forwardRef<View, VTooltipProps>(
  (
    {
      children,
      content,
      placement = 'top',
      variant = 'dark',
      disabled = false,
      triggerMode = 'longPress',
      style,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
    const triggerRef = useRef<View | null>(null);

    const showTooltip = () => {
      if (disabled || !triggerRef.current) return;

      // Cast to any to access measureInWindow
      (triggerRef.current as any).measureInWindow?.(
        (x: number, y: number, width: number, height: number) => {
          setTriggerLayout({ x, y, width, height });
          setVisible(true);
        }
      );
    };

    const hideTooltip = () => {
      setVisible(false);
    };

    const handleTooltipLayout = (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setTooltipSize({ width, height });
    };

    const getTooltipPosition = (): ViewStyle => {
      const arrowSize = 8;
      const offset = 8;
      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerLayout.y - tooltipSize.height - arrowSize - offset;
          left =
            triggerLayout.x + triggerLayout.width / 2 - tooltipSize.width / 2;
          break;
        case 'bottom':
          top = triggerLayout.y + triggerLayout.height + arrowSize + offset;
          left =
            triggerLayout.x + triggerLayout.width / 2 - tooltipSize.width / 2;
          break;
        case 'left':
          top =
            triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
          left = triggerLayout.x - tooltipSize.width - arrowSize - offset;
          break;
        case 'right':
          top =
            triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
          left = triggerLayout.x + triggerLayout.width + arrowSize + offset;
          break;
      }

      // Clamp to screen bounds
      left = Math.max(8, Math.min(screenWidth - tooltipSize.width - 8, left));
      top = Math.max(8, Math.min(screenHeight - tooltipSize.height - 8, top));

      return { top, left };
    };

    const getArrowStyle = (): ViewStyle => {
      const arrowSize = 8;

      const arrowColor =
        variant === 'dark' ? tw.color('gray-800') : tw.color('white');

      switch (placement) {
        case 'top':
          return {
            position: 'absolute',
            bottom: -arrowSize,
            left: tooltipSize.width / 2 - arrowSize,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: arrowSize,
            borderRightWidth: arrowSize,
            borderTopWidth: arrowSize,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: arrowColor,
          };
        case 'bottom':
          return {
            position: 'absolute',
            top: -arrowSize,
            left: tooltipSize.width / 2 - arrowSize,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: arrowSize,
            borderRightWidth: arrowSize,
            borderBottomWidth: arrowSize,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: arrowColor,
          };
        case 'left':
          return {
            position: 'absolute',
            right: -arrowSize,
            top: tooltipSize.height / 2 - arrowSize,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderTopWidth: arrowSize,
            borderBottomWidth: arrowSize,
            borderLeftWidth: arrowSize,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: arrowColor,
          };
        case 'right':
          return {
            position: 'absolute',
            left: -arrowSize,
            top: tooltipSize.height / 2 - arrowSize,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderTopWidth: arrowSize,
            borderBottomWidth: arrowSize,
            borderRightWidth: arrowSize,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: arrowColor,
          };
        default:
          return {};
      }
    };

    const isDark = variant === 'dark';

    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View
        ref={ref as any}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[{ alignSelf: 'flex-start' }, style]}
        {...props}
      >
        <View ref={triggerRef as any} collapsable={false}>
          <Pressable
            onPress={triggerMode === 'press' ? showTooltip : undefined}
            onLongPress={triggerMode === 'longPress' ? showTooltip : undefined}
            onPressOut={hideTooltip}
          >
            {children}
          </Pressable>
        </View>

        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={hideTooltip}
          statusBarTranslucent
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={hideTooltip}>
            <View
              style={[
                tw.style(
                  'absolute rounded-lg px-3 py-2 shadow-lg',
                  isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'
                ),
                getTooltipPosition(),
                // eslint-disable-next-line react-native/no-inline-styles
                { maxWidth: 300 },
              ]}
              onLayout={handleTooltipLayout}
              pointerEvents="none"
            >
              <Text
                style={tw.style(
                  'text-sm',
                  isDark ? 'text-white' : 'text-gray-900'
                )}
              >
                {content}
              </Text>
              <View style={getArrowStyle()} />
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

VTooltip.displayName = 'VTooltip';

export default VTooltip;
