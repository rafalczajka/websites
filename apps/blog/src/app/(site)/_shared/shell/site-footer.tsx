import { cn } from '@/utils/cn';

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('text-center text-sm text-muted-foreground', className)}>
      <p>&copy; {currentYear} Rafał Czajka. All rights reserved.</p>
    </footer>
  );
}
