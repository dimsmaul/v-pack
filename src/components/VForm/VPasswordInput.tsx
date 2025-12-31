// src/components/VInput/VPasswordInput.tsx
import React, { useState, forwardRef, memo } from 'react';
import { Pressable } from 'react-native';
import VInput, { type VInputProps } from './VInput';

export interface VPasswordInputProps
  extends Omit<VInputProps, 'secureTextEntry'> {
  variant?: 'outline' | 'underline';
  error?: boolean;
  showIcon?: boolean;
  defaultVisible?: boolean;
  iconColor?: string;
  IconShow?: React.ComponentType<any>;
  IconHide?: React.ComponentType<any>;
  suffix?: React.ReactNode;
}

const VPasswordInput = memo(
  forwardRef<any, VPasswordInputProps>(
    (
      {
        variant = 'outline',
        error = false,
        showIcon = true,
        defaultVisible = false,
        iconColor = '#6b7280',
        IconShow,
        IconHide,
        suffix,
        ...props
      },
      ref
    ) => {
      const [showPassword, setShowPassword] = useState(defaultVisible);

      // Default icons - using unicode characters if no custom icons provided
      const renderShowIcon = () => {
        if (IconShow) return <IconShow size={20} color={iconColor} />;
        return null;
      };

      const renderHideIcon = () => {
        if (IconHide) return <IconHide size={20} color={iconColor} />;
        return null;
      };

      return (
        <VInput
          ref={ref}
          variant={variant}
          error={error}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          spellCheck={false}
          {...props}
          suffix={
            showIcon ? (
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? renderHideIcon() : renderShowIcon()}
              </Pressable>
            ) : (
              suffix
            )
          }
        />
      );
    }
  )
);

VPasswordInput.displayName = 'VPasswordInput';

export default VPasswordInput;
