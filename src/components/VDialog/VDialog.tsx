// src/components/VDialog/VDialog.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  Pressable,
  Text,
  ScrollView,
  type ViewProps,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface VDialogProps extends ViewProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  showCloseButton?: boolean;
  maxWidth?: number;
  bottomAction?: React.ReactNode;
  scrollable?: boolean; // Tambahkan prop ini
}

const VDialog: React.FC<VDialogProps> = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  maxWidth = 400,
  bottomAction,
  scrollable = true, // Default true
  style,
  ...props
}) => {
  const { tw } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            bounciness: 0,
            speed: 14,
          }),
        ]).start();
      }, 50);
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.9);
      });
    }
  }, [visible, fadeAnim, scaleAnim]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={tw.style('flex-1 justify-center items-center px-4')}>
        {/* Backdrop */}
        <Animated.View
          style={[
            tw.style('absolute inset-0 bg-black'),
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
        >
          <Pressable style={tw.style('flex-1')} onPress={onClose} />
        </Animated.View>

        {/* Dialog Content */}
        <Animated.View
          style={[
            tw.style('bg-white rounded-2xl w-full shadow-xl'),
            {
              maxWidth,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Header with Title and Close Button */}
          {title && (
            <>
              <View
                style={tw.style(
                  'flex-row items-start justify-between px-6 pt-6 pb-4'
                )}
              >
                {/* Title */}
                <View style={tw.style('flex-1 pr-2')}>
                  {typeof title === 'string' ? (
                    <Text style={tw.style('text-xl font-bold text-gray-900')}>
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                </View>

                {/* Close Button */}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    style={tw.style('p-1 -mt-1 -mr-1')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <X size={24} color="#6b7280" />
                  </Pressable>
                )}
              </View>

              {/* Divider */}
              <View style={tw.style('h-px bg-gray-200 mx-6')} />
            </>
          )}

          {/* Content - Conditional ScrollView */}
          {scrollable ? (
            <ScrollView
              style={tw.style('max-h-96')}
              contentContainerStyle={tw.style(
                'px-6',
                title ? 'pt-4' : 'pt-6',
                bottomAction ? 'pb-4' : 'pb-6'
              )}
              showsVerticalScrollIndicator={true}
              bounces={false}
            >
              <View style={style} {...props}>
                {children}
              </View>
            </ScrollView>
          ) : (
            <View
              style={[
                tw.style(
                  'px-6',
                  title ? 'pt-4' : 'pt-6',
                  bottomAction ? 'pb-4' : 'pb-6'
                ),
                style,
              ]}
              {...props}
            >
              {children}
            </View>
          )}

          {/* Bottom Action */}
          {bottomAction && (
            <>
              <View style={tw.style('h-px bg-gray-200 mx-6')} />
              <View style={tw.style('px-6 py-4')}>{bottomAction}</View>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default VDialog;
