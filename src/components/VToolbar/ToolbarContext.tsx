// src/components/VToolbar/ToolbarContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { VPackNavigation } from '../../types/navigation';

export interface ToolbarMenuItem {
  icon: ReactNode;
  label?: string;
  onPress?: () => void;
  menu?: ToolbarMenuItem[];
}

export interface ToolbarRightAction extends ToolbarMenuItem {}

export interface ToolbarConfig {
  title?: string | ReactNode;
  backHandler?: (() => void) | null;
  rightActions?: ToolbarRightAction[];
  show?: boolean;
}

interface ToolbarContextValue {
  config: ToolbarConfig;
  setConfig: (config: ToolbarConfig) => void;
  resetConfig: () => void;
  navigationInstance?: VPackNavigation; // ✅ Typed
}

const defaultConfig: ToolbarConfig = {
  title: '',
  backHandler: undefined,
  rightActions: [],
  show: true,
};

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export interface ToolbarProviderProps {
  children: ReactNode;
  navigationInstance?: VPackNavigation; // ✅ Typed
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({
  children,
  navigationInstance,
}) => {
  const [config, setConfig] = useState<ToolbarConfig>(defaultConfig);

  const resetConfig = () => setConfig(defaultConfig);

  return (
    <ToolbarContext.Provider
      value={{
        config,
        setConfig,
        resetConfig,
        navigationInstance,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export const useToolbarContext = () => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error('useToolbarContext must be used within ToolbarProvider');
  }
  return context;
};
