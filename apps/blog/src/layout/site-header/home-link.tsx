import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

import { HeaderOutlineButton } from './header-button';
import { externalLinks } from './links';
import { MobileNavLink } from './mobile-nav-link';

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
  const { url, label } = externalLinks.rootSite;

  return (
    <MobileNavLink className={className}>
      <a href={url}>
        <span>{label}</span>
        <ArrowUpRightIcon className="text-muted-foreground size-4" />
      </a>
    </MobileNavLink>
  );
}
