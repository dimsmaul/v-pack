// src/components/VSnackbar/VSnackbarProvider.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, Animated, Pressable, SafeAreaView } from 'react-native';
import { X } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import tw from '../../utils/tw';

export interface SnackbarOptions {
  message: string;
  type?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  icon?: LucideIcon;
  showCloseButton?: boolean;
}

interface SnackbarContextValue {
  show: (options: SnackbarOptions) => void;
  hide: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within VSnackbarProvider');
  }
  return context;
};

export const VSnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null);
  const translateY = React.useRef(new Animated.Value(100)).current;
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const hide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSnackbar(null);
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [translateY]);

  const show = useCallback(
    (options: SnackbarOptions) => {
      // Hide current snackbar if exists
      if (snackbar) {
        hide();
        setTimeout(() => showSnackbar(options), 300);
      } else {
        showSnackbar(options);
      }

      function showSnackbar(opts: SnackbarOptions) {
        setSnackbar(opts);

        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();

        // Auto hide after duration
        const duration = opts.duration ?? 3000;
        if (duration > 0) {
          timeoutRef.current = setTimeout(() => {
            hide();
          }, duration);
        }
      }
    },
    [snackbar, hide, translateY]
  );

  const colorConfig = {
    success: {
      bg: 'bg-success-50',
      border: 'border-success-500',
      text: 'text-success-700',
      buttonText: 'text-success-700',
    },
    danger: {
      bg: 'bg-danger-50',
      border: 'border-danger-500',
      text: 'text-danger-700',
      buttonText: 'text-danger-700',
    },
    warning: {
      bg: 'bg-warning-50',
      border: 'border-warning-500',
      text: 'text-warning-700',
      buttonText: 'text-warning-700',
    },
    info: {
      bg: 'bg-info-50',
      border: 'border-info-500',
      text: 'text-info-700',
      buttonText: 'text-info-700',
    },
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-500',
      text: 'text-primary-700',
      buttonText: 'text-primary-700',
    },
    secondary: {
      bg: 'bg-gray-200',
      border: 'border-gray-500',
      text: 'text-gray-800',
      buttonText: 'text-gray-800',
    },
  };

  const config = snackbar ? colorConfig[snackbar.type || 'secondary'] : null;
  const IconComponent = snackbar?.icon;
  return (
    <SnackbarContext.Provider value={{ show, hide }}>
      {children}

      {/* Snackbar Overlay */}
      {snackbar && config && (
        <View
          style={tw.style('absolute bottom-0 left-0 right-0 px-4')}
          pointerEvents="box-none"
        >
          <SafeAreaView style={tw.style('px-4 pb-4')} pointerEvents="box-none">
            <Animated.View
              style={[
                tw.style(
                  `flex-row items-center justify-between px-4 py-3 rounded-xl border ${config.bg} ${config.border}`
                ),
                {
                  transform: [{ translateY }],
                },
              ]}
            >
              {/* Icon */}
              {IconComponent && (
                <View style={tw.style('mr-3')}>
                  <IconComponent size={20} style={tw.style(config.text)} />
                </View>
              )}
              {/* Message */}
              <Text
                style={tw.style(`${config.text} text-sm font-medium flex-1`)}
                numberOfLines={2}
              >
                {snackbar.message}
              </Text>

              {/* Action Button or Close Button */}
              {snackbar.action ? (
                <Pressable
                  onPress={() => {
                    snackbar.action?.onPress();
                    hide();
                  }}
                  style={tw.style('ml-3')}
                >
                  <Text
                    style={tw.style(
                      `${config.buttonText} font-semibold text-sm`
                    )}
                  >
                    {snackbar.action.label}
                  </Text>
                </Pressable>
              ) : (
                snackbar.showCloseButton !== false && (
                  <Pressable onPress={hide} style={tw.style('ml-3 p-1')}>
                    <X size={18} color={tw.color(config.text)} />
                  </Pressable>
                )
              )}
            </Animated.View>
          </SafeAreaView>
        </View>
      )}
    </SnackbarContext.Provider>
  );
};
