import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

import { externalLinks } from '../../links';
import { HeaderOutlineButton, HeaderSheetButton } from './header-button';

type HomeLinkProps = {
  className?: string;
};

export function DesktopHomeLink({ className }: HomeLinkProps) {
  const { url, label } = externalLinks.rootSite;

  return (
    <HeaderOutlineButton className={cn('rounded-full', className)} asChild>
      <a href={url}>
        <span>{label}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </HeaderOutlineButton>
  );
}

export function MobileHomeLink({ className }: HomeLinkProps) {
  return (
    <HeaderSheetButton className={cn('w-full', className)} asChild>
      <a href={externalLinks.rootSite.url}>
        <span>{externalLinks.rootSite.label}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </HeaderSheetButton>
  );
}
