import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';
import { Toaster } from '@/shared/ui/toaster';

const manrope = Manrope({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${manrope.className} antialiased flex flex-col gap-1 min-h-screen`}
      >
        <main className="flex-grow">
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
