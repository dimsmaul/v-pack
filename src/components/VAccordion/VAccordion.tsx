import React, { useRef, useState, createContext, useContext } from 'react';
import {
  View,
  Pressable,
  Animated,
  type LayoutChangeEvent,
  Easing,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

// Context untuk share state antara Trigger dan Content
interface AccordionItemContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
  animatedHeight: Animated.Value;
  animatedRotation: Animated.Value;
  contentHeight: number;
  setContentHeight: (height: number) => void;
  duration: number;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('Accordion components must be used within VAccordionItem');
  }
  return context;
};

// Props Types
export interface VAccordionProps {
  type?: 'single' | 'multiple';
  children: React.ReactNode;
}

export interface VAccordionItemProps {
  value?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  disabled?: boolean;
  duration?: number;
}

export interface VAccordionTriggerProps extends PressableProps {
  children: React.ReactNode;
}

export interface VAccordionContentProps extends ViewProps {
  children: React.ReactNode;
}

// VAccordionItem Component
export const VAccordionItem: React.FC<VAccordionItemProps> = ({
  children,
  isOpen = false,
  onToggle,
  disabled = false,
  duration = 200,
}) => {
  const { tw } = useTheme();
  const [open, setOpen] = useState(isOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const isFirstRender = useRef(true);

  React.useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isOpen && contentHeight > 0) {
        animatedHeight.setValue(contentHeight);
      }
      return;
    }

    // Animate when isOpen changes from parent (single mode)
    if (contentHeight > 0) {
      Animated.timing(animatedHeight, {
        toValue: isOpen ? contentHeight : 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotation, {
        toValue: isOpen ? 1 : 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }

    setOpen(isOpen);
  }, [isOpen, contentHeight, duration, animatedHeight, animatedRotation]);

  const toggle = () => {
    if (disabled) return;

    const newState = !open;
    setOpen(newState);
    onToggle?.(newState);

    // Only animate if we have contentHeight
    if (contentHeight > 0) {
      // Animate height
      Animated.timing(animatedHeight, {
        toValue: newState ? contentHeight : 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();

      // Animate rotation
      Animated.timing(animatedRotation, {
        toValue: newState ? 1 : 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const value: AccordionItemContextValue = {
    open,
    toggle,
    disabled,
    animatedHeight,
    animatedRotation,
    contentHeight,
    setContentHeight,
    duration,
  };

  return (
    <AccordionItemContext.Provider value={value}>
      <View style={tw.style('border-b border-gray-300')}>{children}</View>
    </AccordionItemContext.Provider>
  );
};

// VAccordionTrigger Component
export const VAccordionTrigger: React.FC<VAccordionTriggerProps> = ({
  children,
  style,
  ...props
}) => {
  const { tw } = useTheme();
  const { toggle, disabled, animatedRotation } = useAccordionItem();

  const rotation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={({ pressed }) => [
        tw.style('flex-row items-center justify-between py-4 px-4'),
        pressed && !disabled && tw.style('bg-gray-200'),
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <View style={tw.style('flex-1 flex-row items-center')}>{children}</View>

      {/* Icon */}
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <ChevronDown size={20} color={disabled ? '#9ca3af' : '#374151'} />
      </Animated.View>
    </Pressable>
  );
};

// VAccordionContent Component
export const VAccordionContent: React.FC<VAccordionContentProps> = ({
  children,
  style,
  ...props
}) => {
  const { tw } = useTheme();
  const { animatedHeight, setContentHeight, open } = useAccordionItem();
  const isFirstMeasure = useRef(true);

  const onLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    // Set content height immediately
    setContentHeight(height);

    // If open and this is first measurement, set height directly without animation
    if (open && isFirstMeasure.current) {
      isFirstMeasure.current = false;
      animatedHeight.setValue(height);
    }
  };

  return (
    <Animated.View
      style={[tw.style('overflow-hidden'), { height: animatedHeight }]}
    >
      <View onLayout={onLayout} style={tw.style('absolute w-full')}>
        <View style={[tw.style('px-4 pb-4'), style]} {...props}>
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

// VAccordion Container Component
const VAccordion: React.FC<VAccordionProps> = ({
  type = 'single',
  children,
}) => {
  const { tw } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const renderChildren = () => {
    if (type === 'single') {
      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen: openIndex === index,
            onToggle: (isOpen: boolean) => {
              setOpenIndex(isOpen ? index : null);
            },
          });
        }
        return child;
      });
    }
    return children;
  };

  return (
    <View style={tw.style('w-full bg-white rounded-lg overflow-hidden')}>
      {renderChildren()}
    </View>
  );
};

export default VAccordion;
