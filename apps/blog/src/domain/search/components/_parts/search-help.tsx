import { ReactNode } from 'react';

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem] text-foreground">
    {children}
  </code>
);

export function SearchHelp() {
  return (
    <div className="border-t px-3 py-2 text-xs text-muted-foreground">
      Use <Code>tag:</Code> and <Code>cat:</Code> for advanced filtering (with <Code>-</Code> for
      exclusion).
    </div>
  );
}
