import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

function LayoutRoot({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex min-h-screen flex-col mx-auto w-full', className)} {...props} />;
}

function LayoutHeader({ className, ...props }: ComponentPropsWithoutRef<'header'>) {
  return <header className={cn('shrink-0', className)} {...props} />;
}

function LayoutMain({ className, ...props }: ComponentPropsWithoutRef<'main'>) {
  return <main className={cn('flex-1', className)} {...props} />;
}

function LayoutFooter({ className, ...props }: ComponentPropsWithoutRef<'footer'>) {
  return <footer className={cn('shrink-0', className)} {...props} />;
}

export const Layout = Object.assign(LayoutRoot, {
  Header: LayoutHeader,
  Main: LayoutMain,
  Footer: LayoutFooter
});
