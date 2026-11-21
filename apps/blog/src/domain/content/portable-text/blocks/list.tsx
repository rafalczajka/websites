type Props = { children?: React.ReactNode };

export const BulletList = ({ children }: Props) => (
  <ul className="list-disc space-y-1 pl-6">{children}</ul>
);

export const NumberList = ({ children }: Props) => (
  <ol className="list-decimal space-y-1 pl-6">{children}</ol>
);

export const ListItem = ({ children }: Props) => (
  <li className="text-base leading-loose text-muted-foreground md:text-lg">{children}</li>
);
