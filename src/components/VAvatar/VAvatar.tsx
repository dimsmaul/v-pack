// src/components/VAvatar/VAvatar.tsx
import { User } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Image,
  Text,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'rounded' | 'square';

export interface VAvatarProps {
  src?: string | { uri: string } | number; // URL, uri object, or local require()
  icon?: React.ReactNode;
  fallback?: string; // Full name untuk generate initials
  size?: AvatarSize;
  variant?: AvatarVariant;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Extract initials from full name
 * "Dimas Maulana" -> "DM"
 */
const getInitials = (name: string): string => {
  if (!name) return '';

  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) return '';

  if (words.length === 1) {
    return words[0]?.charAt(0).toUpperCase() ?? '';
  }

  // Take first letter of first and last word
  const firstInitial = words[0]?.charAt(0) ?? '';
  const lastInitial = words[words.length - 1]?.charAt(0) ?? '';

  return (firstInitial + lastInitial).toUpperCase();
};

/**
 * Get size dimensions
 */
const getSizeStyles = (size: AvatarSize) => {
  const sizes = {
    'xs': { width: 24, height: 24, fontSize: 10 },
    'sm': { width: 32, height: 32, fontSize: 12 },
    'md': { width: 40, height: 40, fontSize: 14 },
    'lg': { width: 48, height: 48, fontSize: 16 },
    'xl': { width: 64, height: 64, fontSize: 20 },
    '2xl': { width: 96, height: 96, fontSize: 28 },
  };

  return sizes[size] || sizes.md;
};

export const VAvatar: React.FC<VAvatarProps> = ({
  src,
  icon,
  fallback,
  size = 'md',
  variant = 'rounded',
  style,
  imageStyle,
  backgroundColor,
  textColor,
}) => {
  const { tw } = useTheme();
  const sizeStyle = getSizeStyles(size);
  const borderRadius = variant === 'rounded' ? sizeStyle.width / 2 : 8;

  // Default colors
  const bgColor = backgroundColor || '#4A9B9F'; // Teal color from image
  const txtColor = textColor || '#FFFFFF';

  // Base container style
  const containerStyle = [
    tw`items-center justify-center overflow-hidden`,
    {
      width: sizeStyle.width,
      height: sizeStyle.height,
      borderRadius,
      backgroundColor: bgColor,
    },
    style,
  ];

  // Render priority: src > icon > fallback

  // 1. If image source provided
  if (src) {
    const imageSource =
      typeof src === 'string'
        ? { uri: src }
        : typeof src === 'number'
        ? src
        : src;

    return (
      <View style={containerStyle}>
        <Image
          source={imageSource}
          style={[
            {
              width: sizeStyle.width,
              height: sizeStyle.height,
              borderRadius,
            },
            tw`object-cover`, // ✅ object-cover untuk non-square images
            imageStyle,
          ]}
          resizeMode="cover"
        />
      </View>
    );
  }

  // 2. If icon provided
  if (icon) {
    return <View style={containerStyle}>{icon}</View>;
  }

  // 3. If fallback name provided
  if (fallback) {
    const initials = getInitials(fallback);

    return (
      <View style={containerStyle}>
        <Text
          style={[
            tw`font-semibold`,
            {
              fontSize: sizeStyle.fontSize,
              color: txtColor,
            },
          ]}
        >
          {initials}
        </Text>
      </View>
    );
  }

  // 4. Default: empty avatar with person icon placeholder
  return (
    <View style={containerStyle}>
      <View style={tw`w-3/5 h-3/5 items-center justify-center`}>
        {/* Default person icon SVG placeholder */}
        <Text style={{ fontSize: sizeStyle.fontSize * 1.5, color: txtColor }}>
          <User />
        </Text>
      </View>
    </View>
  );
};

export default VAvatar;
