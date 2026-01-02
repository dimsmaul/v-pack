import React, { createContext, useContext, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  Animated,
  type ViewProps,
  type PressableProps,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// Context untuk share state
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'pill' | 'underline';
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within VTabs');
  }
  return context;
};

// Props Types
export interface VTabsProps extends ViewProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  variant?: 'pill' | 'underline';
}

export interface VTabsListProps extends ViewProps {
  children: React.ReactNode;
}

export interface VTabsTriggerProps extends Omit<PressableProps, 'children'> {
  value: string;
  children: string;
}

export interface VTabsContentProps extends ViewProps {
  value: string;
  children: React.ReactNode;
}

// VTabs Root Component
const VTabs: React.FC<VTabsProps> = ({
  value,
  onValueChange,
  children,
  style,
  variant = 'underline',
  ...props
}) => {
  const { tw } = useTheme();
  const contextValue: TabsContextValue = {
    value,
    onValueChange,
    variant,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <View style={[tw.style('flex'), style]} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
};

// VTabsList Component
export const VTabsList: React.FC<VTabsListProps> = ({
  children,
  style,
  ...props
}) => {
  const { tw } = useTheme();
  const { variant } = useTabsContext();

  return (
    <View
      style={[
        tw.style(
          'flex-row items-center',
          variant === 'pill' && 'bg-gray-200 rounded-lg p-1',
          variant === 'underline' && 'border-b border-gray-300'
        ),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// VTabsTrigger Component
export const VTabsTrigger: React.FC<VTabsTriggerProps> = ({
  value: triggerValue,
  children,
  style,
  disabled,
  ...props
}) => {
  const { tw } = useTheme();
  const { value, onValueChange, variant } = useTabsContext();
  const isActive = value === triggerValue;

  // Animation values
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, scaleAnim, opacityAnim]);

  return (
    <Pressable
      onPress={() => onValueChange(triggerValue)}
      disabled={disabled}
      style={({ pressed }) => [
        tw.style(
          'flex-1 items-center justify-center',
          variant === 'pill' && 'px-4 rounded-md',
          variant === 'pill' && isActive && 'bg-white shadow-sm',
          pressed && !disabled && 'opacity-70',
          disabled && 'opacity-50'
        ),
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <View style={tw.style('items-center w-full')}>
        <Text
          style={tw.style(
            'text-base font-medium',
            isActive ? 'text-primary-500' : 'text-gray-400',
            variant === 'pill' && 'text-sm py-1'
          )}
        >
          {children}
        </Text>
        {/* Animated Underline Indicator */}
      </View>
      {variant === 'underline' && (
        <Animated.View
          style={[
            tw.style('h-0.5 mt-3 rounded-full bg-primary-500'),
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: '100%',
              transform: [{ scaleX: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        />
      )}
    </Pressable>
  );
};

// VTabsContent Component
export const VTabsContent: React.FC<VTabsContentProps> = ({
  value: contentValue,
  children,
  style,
  ...props
}) => {
  const { tw } = useTheme();
  const { value } = useTabsContext();

  if (value !== contentValue) {
    return null;
  }

  return (
    <View style={[tw.style('pt-4'), style]} {...props}>
      {children}
    </View>
  );
};

export default VTabs;
