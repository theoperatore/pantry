import React from 'react';
import App from 'next/app';
import NextHead from 'next/head';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../auth/UserContext';
import './_al.css';

// color theme generated from:
// https://mycolor.space/?hex=%23845EC2&sub=1
const theme = {
  colors: {
    primary: '#845ec2',
    dark: '#4b4453',
    danger: '#c34a36',
    neutral: '#b0a8b9',
    highlight: '#ff8066',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    nm: '24px',
    md: '36px',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <NextHead>
          <title>Pantry</title>
          <link rel="icon" href="/cropped-garlic.png" />
          <meta charSet="utf-8" />
          <meta name="apple-mobile-web-app-title" content="Pantry"></meta>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta name="mobile-web-app-capable" content="yes" />

          {/* a value of default should be what we want, but that doesn't seem to work */}
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="manifest" href="/manifest.json?id=2" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
          />
          <meta
            name="description"
            content="An IoT app to help keep track of what's in the pantry."
          />

          {/* generated from: https://appsco.pe/developer/splash-screens */}
          <link rel="apple-touch-icon" href="/cropped-garlic.png"></link>
          <link
            href="splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
        </NextHead>
        <UserContext>
          <Component {...pageProps} />
        </UserContext>
      </ThemeProvider>
    );
  }
}
