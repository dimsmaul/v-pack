import React from 'react';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { VSnackbarProvider } from '../VSnackbar/VSnackbar';

export interface VPackProviderProps {
  theme?: any;
  children: React.ReactNode;
}

const VPackProvider: React.FC<VPackProviderProps> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <VSnackbarProvider>{children}</VSnackbarProvider>
      {/* <VSnackbarProvider>{children}</VSnackbarProvider> */}
    </ThemeProvider>
  );
};

export default VPackProvider;
