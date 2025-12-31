// src/components/VBadge/VBadge.tsx
import React, { forwardRef } from 'react';
import { View, Text, type ViewProps, type ViewStyle } from 'react-native';
import tw from '../../utils/tw';

export interface VBadgeProps extends Omit<ViewProps, 'children'> {
  children?: React.ReactNode;
  content?: string | number;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showZero?: boolean;
  max?: number;
  dot?: boolean;
  offset?: { top?: number; right?: number };
  hidden?: boolean;
}

const sizeMap = {
  sm: {
    minHeight: 16,
    minWidth: 16,
    paddingHorizontal: 4,
    text: 'text-[10px]',
    dot: 8,
  },
  md: {
    minHeight: 20,
    minWidth: 20,
    paddingHorizontal: 6,
    text: 'text-xs',
    dot: 10,
  },
  lg: {
    minHeight: 24,
    minWidth: 24,
    paddingHorizontal: 8,
    text: 'text-sm',
    dot: 12,
  },
};

const variantMap = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  info: 'bg-blue-500',
};

const VBadge = forwardRef<View, VBadgeProps>(
  (
    {
      children,
      content,
      variant = 'danger',
      size = 'md',
      showZero = false,
      max = 99,
      dot = false,
      offset,
      hidden = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeMap[size];
    const variantColor = variantMap[variant];

    // Calculate display content
    const getDisplayContent = () => {
      if (dot) return null;
      if (content === undefined || content === null) return null;

      const numContent =
        typeof content === 'number' ? content : parseInt(content, 10);

      if (isNaN(numContent)) return content;
      if (numContent === 0 && !showZero) return null;
      if (numContent > max) return `${max}+`;

      return content;
    };

    const displayContent = getDisplayContent();
    const shouldShow = !hidden && (dot || displayContent !== null);

    // Calculate badge position offset
    const badgeOffset = {
      top: offset?.top ?? -6,
      right: offset?.right ?? -6,
    };

    // If no children, render standalone badge
    if (!children) {
      if (!shouldShow) return null;

      return (
        <View
          ref={ref as any}
          style={[
            tw.style(
              'rounded-full items-center justify-center self-start',
              variantColor
            ),
            {
              minHeight: dot ? sizeConfig.dot : sizeConfig.minHeight,
              minWidth: dot ? sizeConfig.dot : sizeConfig.minWidth,
              paddingHorizontal: dot ? 0 : sizeConfig.paddingHorizontal,
              height: dot ? sizeConfig.dot : sizeConfig.minHeight,
            } as ViewStyle,
            style,
          ]}
          {...props}
        >
          {!dot && displayContent !== null && (
            <Text
              style={tw.style('font-semibold text-white', sizeConfig.text)}
              numberOfLines={1}
            >
              {displayContent}
            </Text>
          )}
        </View>
      );
    }

    // Render with children (positioned badge)
    return (
      <View
        ref={ref as any}
        style={[{ position: 'relative', alignSelf: 'flex-start' }, style]}
        {...props}
      >
        {children}
        {shouldShow && (
          <View
            style={[
              tw.style(
                'absolute rounded-full items-center justify-center border-2 border-white',
                variantColor
              ),
              {
                top: badgeOffset.top,
                right: badgeOffset.right,
                minHeight: dot ? sizeConfig.dot : sizeConfig.minHeight,
                minWidth: dot ? sizeConfig.dot : sizeConfig.minWidth,
                paddingHorizontal: dot ? 0 : sizeConfig.paddingHorizontal,
                height: dot ? sizeConfig.dot : sizeConfig.minHeight,
              } as ViewStyle,
            ]}
          >
            {!dot && displayContent !== null && (
              <Text
                style={tw.style('font-semibold text-white', sizeConfig.text)}
                numberOfLines={1}
              >
                {displayContent}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
);

VBadge.displayName = 'VBadge';

export default VBadge;
