'use client'

import { ThemeProvider } from 'next-themes'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
        <UserProvider>
            {children}
        </UserProvider>
    </ThemeProvider>
  )
}