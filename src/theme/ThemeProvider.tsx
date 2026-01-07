// src/components/VTheme/ThemeProvider.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { create } from 'twrnc';
import { twMerge } from '../utils/twMerge';

const defaultTheme = require('./../../tailwind.config.js');

interface ThemeContextValue {
  tw: ReturnType<typeof create>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: any;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
}) => {
  const tw = useMemo(() => {
    // ✅ Deep merge dengan twMerge
    const mergedConfig = theme ? twMerge(defaultTheme, theme) : defaultTheme;

    const instance = create(mergedConfig);

    // Debug
    if (__DEV__) {
      const colors = mergedConfig?.theme?.extend?.colors || {};
      console.log('🎨 VPack Theme Initialized');
      console.log('📦 Available colors:', Object.keys(colors).join(', '));

      // Test some colors
      if (colors.primary) {
        console.log('✅ Primary-500:', instance.color('primary-500'));
      }
      if (colors.success) {
        console.log('✅ Success-700:', instance.color('success-700'));
      }
    }

    return instance;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ tw }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
