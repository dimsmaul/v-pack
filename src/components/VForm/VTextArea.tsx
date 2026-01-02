/**
 * FIXME: On iOS, it doesn't auto-resize to fit the content inside.
 */

import React, { forwardRef, useState } from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface VTextareaProps extends TextInputProps {
  variant?: 'outline' | 'underline';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  rows?: number;
  autoGrow?: boolean;
  maxHeight?: number;
}

const VTextarea = forwardRef<any, VTextareaProps>(
  (
    {
      variant = 'outline',
      prefix,
      suffix,
      error = false,
      rows = 4,
      autoGrow = false,
      maxHeight,
      style,
      ...props
    },
    ref
  ) => {
    const { tw } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const minHeight = rows * 24;
    const [height, setHeight] = useState(minHeight);
    const isOutline = variant === 'outline';

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleContentSizeChange = (e: any) => {
      if (autoGrow) {
        const contentHeight = e.nativeEvent.contentSize.height;

        // iOS fix: Ignore invalid heights
        if (contentHeight < 10 || contentHeight > 10000) {
          return;
        }

        const calculatedHeight = Math.max(minHeight, contentHeight);

        if (maxHeight) {
          setHeight(Math.min(calculatedHeight, maxHeight));
        } else {
          setHeight(calculatedHeight);
        }
      }

      props.onContentSizeChange?.(e);
    };

    const textInputHeight = autoGrow ? height : minHeight;

    return (
      <View
        style={tw.style(
          'flex-row',
          isOutline && 'border rounded-lg px-3 py-2',
          isOutline && !error && !isFocused && 'border-gray-300',
          isOutline && !error && isFocused && 'border-primary-500',
          isOutline && error && 'border-danger-500',
          !isOutline && 'border-b pb-2',
          !isOutline && !error && !isFocused && 'border-gray-300',
          !isOutline && !error && isFocused && 'border-primary-500',
          !isOutline && error && 'border-danger-500'
        )}
      >
        {prefix && (
          <View style={tw.style('mr-2 self-start pt-1')}>{prefix}</View>
        )}

        <TextInput
          ref={ref}
          multiline
          //   scrollEnabled={maxHeight ? height >= maxHeight : false}
          {...props}
          style={[
            tw.style('flex-1 text-base text-gray-900'),
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: textInputHeight,
              maxHeight: maxHeight,
              paddingTop: 0,
              paddingBottom: 0,
              paddingHorizontal: 0,
              margin: 0,
              textAlignVertical: 'top',
              outlineWidth: 0,
            },
            style,
          ]}
          placeholderTextColor={tw.color('gray-400')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onContentSizeChange={handleContentSizeChange}
        />

        {suffix && (
          <View style={tw.style('ml-2 self-start pt-1')}>{suffix}</View>
        )}
      </View>
    );
  }
);

VTextarea.displayName = 'VTextarea';

export default VTextarea;
