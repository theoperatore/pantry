import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import { headers } from 'next/headers';
import {
  blueColors,
  brandColors,
  dangerColors,
  darkColors,
  freshnessColors,
  greenColors,
  highlightColors,
  neutralColors,
} from '@/colors';
import { ColorSchemeScript, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { StyleProviders } from './StyleProviders';
import './globals.css';

const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' });

const theme = createTheme({
  fontFamily: comfortaa.style.fontFamily,
  headings: {
    fontWeight: '700',
  },
  primaryColor: 'brand',
  primaryShade: 5,
  colors: {
    brand: brandColors,
    dark: darkColors,
    danger: dangerColors,
    neutral: neutralColors,
    hightlight: highlightColors,
    green: greenColors,
    blue: blueColors,
    freshness: freshnessColors,
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '24px',
    lg: '36px',
    xl: '48px',
  },
});

export const metadata: Metadata = {
  title: 'Pantry',
  description: 'Track whats in your pantry!',
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const nonce = headers().get('x-nonce') || 'default-nonce';
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <StyleProviders theme={theme} nonce={nonce}>
          {children}
        </StyleProviders>
      </body>
    </html>
  );
}
