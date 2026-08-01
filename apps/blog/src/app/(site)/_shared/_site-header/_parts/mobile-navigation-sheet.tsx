'use client';

import { Menu, X } from 'lucide-react';

import type { PostCategory } from '@/domain/posts/models';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/ui/sheet';
import { cn } from '@/utils/cn';

import { HeaderIconButton } from './header-button';
import { MobileHomeLink } from './home-link';
import { MobileNav } from './nav';

type MobileNavigationSheetProps = {
  categories: PostCategory[];
  className?: string;
};

export function MobileNavigationSheet({ categories, className }: MobileNavigationSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HeaderIconButton className={cn(className)} aria-label="Toggle navigation menu">
          <Menu className="size-5" />
        </HeaderIconButton>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-dvh w-dvw max-w-none overflow-hidden border-0 p-0 shadow-none sm:max-w-none"
      >
        <SheetHeader className="flex-row items-center justify-between border-b px-4 py-3">
          <SheetTitle className="text-base">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse categories and visit the main website
          </SheetDescription>
          <SheetClose asChild>
            <HeaderIconButton className="-mr-2" aria-label="Close menu">
              <X className="size-5" />
            </HeaderIconButton>
          </SheetClose>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col px-4">
          <div className="min-h-0 flex-1 overflow-y-auto py-4">
            <MobileNav categories={categories} />
          </div>
          <div className="border-t">
            <MobileHomeLink />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
