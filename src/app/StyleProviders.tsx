'use client';

import { PropsWithChildren } from 'react';
import { MantineProvider, type MantineThemeOverride } from '@mantine/core';

export function StyleProviders(
  props: PropsWithChildren<{
    nonce: string;
    theme: MantineThemeOverride;
  }>,
) {
  return (
    <MantineProvider
      forceColorScheme="light"
      theme={props.theme}
      // the whole reason this needs to be a client component is to send the nonce through
      // can't add functions from server components to client components
      getStyleNonce={() => props.nonce}
    >
      {props.children}
    </MantineProvider>
  );
}
