import React from 'react';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { VSnackbarProvider } from '../VSnackbar/VSnackbar';
import { ToolbarProvider } from '../VToolbar/ToolbarContext';
import VToolbar from '../VToolbar/VToolbar';
import type { VPackNavigation } from '../../types/navigation';

export interface VPackProviderProps {
  theme?: any;
  children: React.ReactNode;
  navigation?: VPackNavigation;
}

const VPackProvider: React.FC<VPackProviderProps> = ({
  theme,
  children,
  navigation,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ToolbarProvider navigationInstance={navigation}>
        <VSnackbarProvider>
          <VToolbar />
          {children}
        </VSnackbarProvider>
      </ToolbarProvider>
      {/* <VSnackbarProvider>{children}</VSnackbarProvider> */}
    </ThemeProvider>
  );
};

export default VPackProvider;
