import type { ReactElement } from 'react';

import { Button } from '@/ui/button';
import { SheetClose } from '@/ui/sheet';
import { cn } from '@/utils/cn';

type MobileNavLinkProps = {
  children: ReactElement;
  className?: string;
};

export function MobileNavLink({ children, className }: MobileNavLinkProps) {
  return (
    <SheetClose asChild>
      <Button
        asChild
        variant="ghost"
        size="lg"
        className={cn(
          'h-auto min-h-14 w-full justify-between rounded-md px-2 py-3 text-left whitespace-normal',
          className
        )}
      >
        {children}
      </Button>
    </SheetClose>
  );
}
