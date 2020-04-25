import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../auth/UserContext';
import './_al.css';

const theme = {
  colors: {
    primary: '#0070f3',
  },
  spacing: {
    xs: 8,
    sm: 12,
    nm: 24,
    md: 36,
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <UserContext>
          <Component {...pageProps} />
        </UserContext>
      </ThemeProvider>
    );
  }
}
