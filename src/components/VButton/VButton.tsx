import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
export type VButtonIconProps = {};

export type VButtonProps = PressableProps & {
  variant?: 'standard' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'warning' | 'success' | 'danger' | 'secondary';
  category?: 'icon' | 'text';
  disabled?: boolean;
  children?: React.ReactNode;
};

const VButton: React.FC<VButtonProps> = ({
  variant = 'standard',
  size = 'medium',
  type = 'primary',
  disabled = false,
  children,
  ...props
}) => {
  const { tw } = useTheme();
  // Base styles
  const baseStyles = 'rounded-md items-center justify-center';

  // Size variants
  const sizeStyles = {
    small: 'px-3 py-1.5',
    medium: 'px-4 py-2',
    large: 'px-6 py-3',
  };

  // Type colors
  const typeColors = {
    primary: 'primary',
    warning: 'warning',
    success: 'success',
    danger: 'danger',
    secondary: 'secondary',
  };

  const colorType = typeColors[type];

  // Variant styles
  const getVariantStyles = () => {
    if (disabled) {
      return variant === 'outline'
        ? 'border border-gray-500 bg-transparent'
        : 'bg-gray-200';
    }

    switch (variant) {
      case 'standard':
        return `bg-${colorType}-500`;
      case 'outline':
        return `border border-${colorType}-500 bg-transparent`;
      case 'ghost':
        return 'bg-transparent';
      default:
        return `bg-${colorType}-500`;
    }
  };

  // Text styles
  const getTextStyles = () => {
    if (disabled) {
      return 'text-gray-500';
    }

    switch (variant) {
      case 'standard':
        return 'text-white font-semibold';
      case 'outline':
        return `text-${colorType}-500 font-semibold`;
      case 'ghost':
        return `text-${colorType}-500 font-semibold`;
      default:
        return 'text-white font-semibold';
    }
  };

  // Text size
  const textSizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <Pressable
      style={({ pressed }) => [
        tw`${baseStyles} ${sizeStyles[size]} ${getVariantStyles()}`,
        pressed && !disabled && tw`opacity-80`,
        disabled && tw`opacity-50`,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={tw`${getTextStyles()} ${textSizeStyles[size]}`}>
        {children}
      </Text>
    </Pressable>
  );
};

export default VButton;
