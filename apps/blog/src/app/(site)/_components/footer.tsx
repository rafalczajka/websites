import { cn } from '@/utils/cn';

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('text-center text-sm text-muted-foreground', className)}>
      <p>&copy; {currentYear} Rafał Czajka. All rights reserved.</p>
    </footer>
  );
}
