// src/types/navigation.d.ts

declare module 'expo-router' {
  export interface Router {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params?: Record<string, any>) => void;
    navigate: (href: string) => void;
  }
}

declare module '@react-navigation/native' {
  export interface NavigationProp {
    navigate: (name: string, params?: object) => void;
    goBack: () => void;
    canGoBack: () => boolean;
    setParams: (params: object) => void;
  }
}
