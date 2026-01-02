// src/components/VToolbar/useToolbar.ts
import { useEffect } from 'react';
import { useToolbarContext, type ToolbarConfig } from '../ToolbarContext';

/**
 * Hook untuk set toolbar config dari page
 *
 * @example
 * ```tsx
 * // Show toolbar with config
 * useToolbar({
 *   show: true, // ✅ Explicitly show
 *   title: 'Profile',
 *   rightActions: [...]
 * });
 *
 * // Hide toolbar
 * useToolbar({
 *   show: false // ✅ Hide toolbar di page ini
 * });
 * ```
 */
export const useToolbar = (config: ToolbarConfig) => {
  const { setConfig, resetConfig } = useToolbarContext();

  useEffect(() => {
    // ✅ Set show to true by default if not specified
    const configWithDefaults = {
      show: true,
      ...config,
    };

    setConfig(configWithDefaults);

    // Cleanup ketika component unmount
    return () => {
      resetConfig();
    };
  }, [
    config.show,
    config.title,
    config.backHandler,
    config.rightActions,
    config,
    setConfig,
    resetConfig,
  ]);
};
