import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import {
  Clock,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  Bell,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import tw from '../../utils/tw';

export interface VBannerProps extends ViewProps {
  type?: 'danger' | 'info' | 'warning' | 'success' | 'secondary' | 'primary';
  title?: string;
  message: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const VBanner: React.FC<VBannerProps> = ({
  type = 'info',
  title,
  message,
  icon: CustomIcon,
  children,
  style,
  ...props
}) => {
  // Default icons per type
  const defaultIcons: Record<string, LucideIcon> = {
    danger: AlertCircle,
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    secondary: Clock,
    primary: Bell,
  };

  // Color configurations
  const colorConfig = {
    danger: {
      bg: 'bg-danger-50',
      text: 'text-danger-700',
      icon: '#F14950',
    },
    info: {
      bg: 'bg-info-50',
      text: 'text-info-700',
      icon: '#5275DF',
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-700',
      icon: '#FFC107',
    },
    success: {
      bg: 'bg-success-50',
      text: 'text-success-700',
      icon: '#33C78E',
    },
    secondary: {
      bg: 'bg-gray-200',
      text: 'text-gray-800',
      icon: '#74788D',
    },
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-700',
      icon: '#2C8DA2',
    },
  };

  const config = colorConfig[type];
  const IconComponent = CustomIcon || defaultIcons[type];

  return (
    <View
      style={[
        tw.style(
          `flex-row items-start p-4 rounded-lg ${config.bg}`,
          !title && !children ? 'items-center' : 'items-start'
        ),
        style,
      ]}
      {...props}
    >
      {/* Icon */}
      {IconComponent && (
        <View style={tw.style('mr-3 mt-0.5')}>
          <IconComponent size={20} color={config.icon} />
        </View>
      )}

      {/* Content */}
      <View style={tw.style('flex-1')}>
        {title && (
          <Text style={tw.style(`font-semibold text-sm mb-0.5 ${config.text}`)}>
            {title}
          </Text>
        )}
        <Text style={tw.style(`text-sm ${config.text}`)}>{message}</Text>
        {children}
      </View>
    </View>
  );
};

export default VBanner;
