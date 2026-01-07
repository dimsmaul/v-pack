import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  type ViewStyle,
  type LayoutChangeEvent,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type VTooltipProps = {
  content: string | React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  withArrow?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
};

export default function VTooltip({
  content,
  children,
  placement = 'top',
  backgroundColor,
  textColor,
  withArrow = true,
  onOpen,
  onClose,
  containerStyle,
  contentStyle,
}: VTooltipProps) {
  const { tw } = useTheme();
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const nodeHandle = findNodeHandle(triggerRef.current);
      if (nodeHandle != null) {
        UIManager.measureInWindow(nodeHandle, (x, y, width, height) => {
          setTriggerLayout({ x, y, width, height });
          setVisible(true);
          onOpen?.();
        });
      }
    }
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const getTooltipPosition = useCallback(() => {
    const arrowSize = withArrow ? 8 : 0;
    const spacing = 8;
    const padding = 16;

    let top = 0;
    let left = 0;
    let width: number | undefined;

    switch (placement) {
      case 'top':
      case 'bottom': {
        // Vertical placement
        top =
          placement === 'top'
            ? triggerLayout.y - tooltipSize.height - arrowSize - spacing
            : triggerLayout.y + triggerLayout.height + arrowSize + spacing;

        // Mulai dari edge kiri, full width
        left = padding;
        width = SCREEN_WIDTH - padding * 2;

        // Adjust vertical jika keluar atas/bawah
        if (top < padding) {
          top = padding;
        }
        if (top + tooltipSize.height > SCREEN_HEIGHT - padding) {
          top = SCREEN_HEIGHT - padding - tooltipSize.height;
        }
        break;
      }

      case 'left': {
        top =
          triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
        left = padding;
        width = triggerLayout.x - arrowSize - spacing - padding;

        if (top < padding) {
          top = padding;
        }
        if (top + tooltipSize.height > SCREEN_HEIGHT - padding) {
          top = SCREEN_HEIGHT - padding - tooltipSize.height;
        }
        break;
      }

      case 'right': {
        top =
          triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
        left = triggerLayout.x + triggerLayout.width + arrowSize + spacing;
        width = SCREEN_WIDTH - left - padding;

        if (top < padding) {
          top = padding;
        }
        if (top + tooltipSize.height > SCREEN_HEIGHT - padding) {
          top = SCREEN_HEIGHT - padding - tooltipSize.height;
        }
        break;
      }
    }

    return { top, left, width };
  }, [placement, triggerLayout, tooltipSize, withArrow]);

  const getArrowStyle = useCallback(() => {
    const arrowSize = 8;
    const baseStyle: ViewStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
    };

    const bgColor = backgroundColor || '#0008';
    const tooltipPos = getTooltipPosition();

    switch (placement) {
      case 'top': {
        // Arrow horizontal position mengikuti trigger, bukan center tooltip
        const arrowLeft =
          triggerLayout.x +
          triggerLayout.width / 2 -
          tooltipPos.left -
          arrowSize;
        return {
          ...baseStyle,
          bottom: -arrowSize,
          left: Math.max(
            arrowSize,
            Math.min(tooltipSize.width - arrowSize * 2, arrowLeft)
          ),
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: bgColor,
        };
      }

      case 'bottom': {
        const arrowLeft =
          triggerLayout.x +
          triggerLayout.width / 2 -
          tooltipPos.left -
          arrowSize;
        return {
          ...baseStyle,
          top: -arrowSize,
          left: Math.max(
            arrowSize,
            Math.min(tooltipSize.width - arrowSize * 2, arrowLeft)
          ),
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: bgColor,
        };
      }

      case 'left': {
        // Arrow vertical position mengikuti trigger
        const arrowTop =
          triggerLayout.y +
          triggerLayout.height / 2 -
          tooltipPos.top -
          arrowSize;
        return {
          ...baseStyle,
          right: -arrowSize,
          top: Math.max(
            arrowSize,
            Math.min(tooltipSize.height - arrowSize * 2, arrowTop)
          ),
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: bgColor,
        };
      }

      case 'right': {
        const arrowTop =
          triggerLayout.y +
          triggerLayout.height / 2 -
          tooltipPos.top -
          arrowSize;
        return {
          ...baseStyle,
          left: -arrowSize,
          top: Math.max(
            arrowSize,
            Math.min(tooltipSize.height - arrowSize * 2, arrowTop)
          ),
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: bgColor,
        };
      }

      default:
        return baseStyle;
    }
  }, [
    placement,
    tooltipSize,
    backgroundColor,
    triggerLayout,
    getTooltipPosition,
  ]);

  const tooltipPosition = getTooltipPosition();

  return (
    <>
      <View ref={triggerRef as any} style={containerStyle}>
        <TouchableOpacity onPress={handleOpen} activeOpacity={0.7}>
          {children}
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <View
              style={[
                tw`absolute rounded-lg px-3 py-2 shadow-lg`,
                {
                  top: tooltipPosition.top,
                  left: tooltipPosition.left,
                  width: tooltipPosition.width,
                },
                backgroundColor ? { backgroundColor } : tw`bg-gray-700`,
                contentStyle,
              ]}
              onLayout={(event: LayoutChangeEvent) => {
                const { width, height } = event.nativeEvent.layout;
                if (tooltipSize.width === 0 || tooltipSize.height === 0) {
                  setTooltipSize({ width, height });
                }
              }}
            >
              {typeof content === 'string' ? (
                <Text
                  style={[
                    tw`text-sm`,
                    textColor ? { color: textColor } : tw`text-white`,
                  ]}
                >
                  {content}
                </Text>
              ) : (
                content
              )}

              {withArrow && tooltipSize.width > 0 && (
                <View style={getArrowStyle()} />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
});
