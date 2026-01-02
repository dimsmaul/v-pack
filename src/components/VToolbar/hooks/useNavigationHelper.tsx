// src/components/VToolbar/useNavigationHelper.ts
import { useEffect, useState } from 'react';

interface NavigationHelper {
  canGoBack: boolean;
  goBack: () => void;
}

/**
 * Cross-compatible navigation helper
 * Support both expo-router dan react-navigation
 */
export const useNavigationHelper = (): NavigationHelper => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [navigation, setNavigation] = useState<any>(null);

  useEffect(() => {
    let nav: any = null;

    try {
      // Try expo-router first
      const expoRouter = require('expo-router');
      if (expoRouter.useNavigation) {
        nav = expoRouter.useNavigation();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      try {
        // Fallback to react-navigation
        const reactNav = require('@react-navigation/native');
        if (reactNav.useNavigation) {
          nav = reactNav.useNavigation();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.warn('No navigation library found');
      }
    }

    if (nav) {
      setNavigation(nav);
      setCanGoBack(nav.canGoBack?.() || false);
    }
  }, []);

  const goBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return { canGoBack, goBack };
};

/**
 * Simplified version - Use directly in component
 */
export const getNavigationInstance = () => {
  try {
    // Try expo-router
    const { useRouter } = require('expo-router');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    try {
      // Try react-navigation
      const { useNavigation } = require('@react-navigation/native');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useNavigation();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }
};
