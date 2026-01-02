// src/components/VToolbar/VToolbar.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useToolbarContext } from './ToolbarContext';
import { useTheme } from '../../theme/ThemeProvider';
import { isExpoRouter, isReactNavigation } from '../../types/navigation';

const VToolbar: React.FC = () => {
  const { config, navigationInstance } = useToolbarContext();
  const { tw } = useTheme();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  if (config.show === false) {
    return null;
  }

  const showBack = () => {
    if (config.backHandler === null) return false;
    if (config.backHandler !== undefined) return true;

    if (navigationInstance) {
      try {
        return navigationInstance.canGoBack();
      } catch (e) {
        console.warn('VPack: Error checking canGoBack', e);
        return false;
      }
    }

    return false;
  };

  const handleBack = () => {
    if (config.backHandler) {
      config.backHandler();
      return;
    }

    if (navigationInstance) {
      try {
        // ✅ Type-safe check
        if (isExpoRouter(navigationInstance)) {
          navigationInstance.back(); // Router.back()
        } else if (isReactNavigation(navigationInstance)) {
          navigationInstance.goBack(); // NavigationProp.goBack()
        }
      } catch (e) {
        console.warn('VPack: Error going back', e);
      }
    }
  };

  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const closeMenu = () => setActiveMenu(null);

  return (
    <View
      style={tw`bg-white border-b border-gray-300 px-4 py-3 flex-row items-center`}
    >
      {showBack() && (
        <TouchableOpacity
          onPress={handleBack}
          style={tw`mr-3 p-2`}
          accessibilityLabel="Go back"
          activeOpacity={0.7}
        >
          <Text style={tw`text-xl text-primary-600`}>←</Text>
        </TouchableOpacity>
      )}

      <View style={tw`flex-1`}>
        {typeof config.title === 'string' ? (
          <Text
            style={tw`text-lg font-semibold text-gray-900`}
            numberOfLines={1}
          >
            {config.title}
          </Text>
        ) : (
          config.title
        )}
      </View>

      {config.rightActions?.map((action, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => {
              if (action.menu) {
                toggleMenu(index);
              } else if (action.onPress) {
                action.onPress();
              }
            }}
            style={tw`ml-2 p-2`}
            activeOpacity={0.7}
          >
            {action.icon}
          </TouchableOpacity>

          {action.menu && (
            <Modal
              visible={activeMenu === index}
              transparent
              animationType="fade"
              onRequestClose={closeMenu}
            >
              <Pressable style={styles.overlay} onPress={closeMenu}>
                <View
                  style={tw`absolute top-14 right-4 bg-white rounded-lg shadow-lg min-w-48 py-2`}
                >
                  {action.menu.map((menuItem, menuIndex) => (
                    <TouchableOpacity
                      key={menuIndex}
                      onPress={() => {
                        menuItem.onPress?.();
                        closeMenu();
                      }}
                      style={tw`flex-row items-center px-4 py-3`}
                      activeOpacity={0.7}
                    >
                      <View style={tw`mr-3`}>{menuItem.icon}</View>
                      {menuItem.label && (
                        <Text style={tw`text-gray-800 text-sm`}>
                          {menuItem.label}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </Pressable>
            </Modal>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default VToolbar;
