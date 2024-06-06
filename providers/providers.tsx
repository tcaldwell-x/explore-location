'use client';

import React from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
    children: React.ReactNode;
  };

const theme = createTheme({
    typography: {
      fontFamily: `Open Sans, sans-serif`,
      h6: {
        fontSize: '14px',
      },
      body2: {
        fontSize: '12px',
      },
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#020617',
      },
      primary: {
        light: '#757ce8',
        main: '#fff',
        dark: '#020617',
        contrastText: '#fff',
      },
    },
  });

const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (

    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <CssBaseline />
    {children}
    </QueryClientProvider>
    </ThemeProvider>

  );
};

export default Providers;