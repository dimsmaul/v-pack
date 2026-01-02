// // src/types/navigation.ts
// import type { NavigationProp } from '@react-navigation/native';
// import type { Router } from 'expo-router';

// /**
//  * Union type - accept expo Router or React Navigation
//  */
// export type VPackNavigation =
//   | Router
//   | NavigationProp<ReactNavigation.RootParamList>;

// /**
//  * Type guard untuk check expo-router
//  */
// export function isExpoRouter(nav: VPackNavigation): nav is Router {
//   return 'back' in nav && typeof (nav as any).back === 'function';
// }

// /**
//  * Type guard untuk check react-navigation
//  */
// export function isReactNavigation(
//   nav: VPackNavigation
// ): nav is NavigationProp<ReactNavigation.RootParamList> {
//   return 'goBack' in nav && typeof (nav as any).goBack === 'function';
// }

// src/types/navigation.ts

/**
 * Expo Router interface
 * Defined manually to avoid requiring expo-router installation
 */
export interface ExpoRouter {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  canGoBack: () => boolean;
  setParams: (params?: Record<string, any>) => void;
  navigate: (href: string) => void;
}

/**
 * React Navigation interface
 * Defined manually to avoid requiring @react-navigation/native installation
 */
export interface ReactNavigationProp {
  navigate: (name: string, params?: object) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  setParams: (params: object) => void;
  reset: (state: any) => void;
  dispatch: (action: any) => void;
  isFocused: () => boolean;
  addListener: (event: string, callback: (e: any) => void) => () => void;
  getState?: () => any;
  getParent?: () => ReactNavigationProp | undefined;
}

/**
 * Union type - accept any navigation
 */
export type VPackNavigation = ExpoRouter | ReactNavigationProp | any;

/**
 * Type guard for expo-router
 */
export function isExpoRouter(nav: any): nav is ExpoRouter {
  return (
    nav &&
    typeof nav === 'object' &&
    'back' in nav &&
    typeof nav.back === 'function' &&
    'push' in nav &&
    typeof nav.push === 'function'
  );
}

/**
 * Type guard for react-navigation
 */
export function isReactNavigation(nav: any): nav is ReactNavigationProp {
  return (
    nav &&
    typeof nav === 'object' &&
    'goBack' in nav &&
    typeof nav.goBack === 'function' &&
    'navigate' in nav &&
    typeof nav.navigate === 'function'
  );
}
