import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import UserMenu from '@/components/UserMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Personal ERP',
  description: 'Journal-driven personal ERP powered by AI',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-[#0c0d13] via-[#0a0a0f] to-[#06070a] text-white bg-grid`}
      >
        {/* radial glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,180,255,0.15)_0%,_transparent_60%)]"></div>
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="container mx-auto flex items-center justify-between">
            <a href="/" className="gradient-text text-2xl font-bold">Nexus</a>
            <nav className="hidden items-center space-x-8 md:flex">
              <a href="/#features" className="text-gray-400 transition-colors hover:text-white">
                Features
              </a>
              {session && (
                <>
                  <a href="/journal" className="text-gray-400 transition-colors hover:text-white">
                    Journal
                  </a>
                  <a href="/tasks" className="text-gray-400 transition-colors hover:text-white">
                    Tasks
                  </a>
                </>
              )}
            </nav>
            <div className="hidden items-center space-x-4 md:flex">
              {session ? (
                <UserMenu user={session.user} />
              ) : (
                <>
                  <a href="/login" className="text-gray-300 transition-colors hover:text-white">
                    Log In
                  </a>
                  <a
                    href="/login"
                    className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                    <span>Sign Up with GitHub</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
