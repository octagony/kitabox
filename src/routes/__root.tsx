import '@/i18n';
import { HeadContent, Scripts, createRootRoute, useLocation } from '@tanstack/react-router';
import mantineCoreStyles from '@mantine/core/styles.css?url';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { theme } from '@/utils/theme';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/helpers";
import { Header } from "@/components/ui/Header";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/ui/Footer";
import { motion } from 'motion/react';
import { DisplayNotification } from "@/components/ui/DisplayNotification";
import { seo } from "@/utils/seo";

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
      ...seo({
        title: 'Kitabox',
        description: 'Completely free temporary email without registration',
      }),
    ],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
        color: '#fffff'
      },
      {
        rel: 'icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: mantineCoreStyles,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode; }) {
  const location = useLocation();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <DisplayNotification />
            <Header />
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                minHeight: '100vh',
                overflow: 'hidden',
              }}
            >
              {children}
            </motion.div>
            <Footer />
            <ThemeToggle />
          </MantineProvider>
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}
