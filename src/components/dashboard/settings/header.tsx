'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

export function Header() {
  const router = useRouter();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 border-b backdrop-blur">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-4">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-foreground text-lg font-semibold">Settings</h1>
        <div className="w-16" />
      </div>
    </header>
  );
}
