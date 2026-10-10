import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import mantineCoreStyles from '@mantine/core/styles.css?url';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { theme } from '@/utils/theme';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Kitabox',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: mantineCoreStyles,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <HeadContent />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
